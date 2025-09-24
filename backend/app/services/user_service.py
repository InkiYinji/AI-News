"""
用户服务层
包含用户的CRUD操作和认证逻辑
"""
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select, update
from fastapi import HTTPException, status

from ..models.user import User
from ..schemas.user import UserCreate, UserUpdate
from ..core.security import get_password_hash, verify_password


class UserService:
    """用户服务类"""
    
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        """根据ID获取用户"""
        return db.get(User, user_id)
    
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        """根据邮箱获取用户"""
        stmt = select(User).where(User.email == email)
        result = db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        """根据用户名获取用户"""
        stmt = select(User).where(User.username == username)
        result = db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    def get_multi(
        db: Session, 
        skip: int = 0, 
        limit: int = 100
    ) -> List[User]:
        """获取多个用户"""
        stmt = select(User).offset(skip).limit(limit)
        result = db.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    def create(db: Session, user_in: UserCreate) -> User:
        """创建新用户"""
        # 检查邮箱是否已存在
        if UserService.get_by_email(db, email=user_in.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="邮箱已被注册"
            )
        
        # 检查用户名是否已存在
        if UserService.get_by_username(db, username=user_in.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="用户名已被使用"
            )
        
        # 创建用户对象
        user_data = user_in.model_dump()
        hashed_password = get_password_hash(user_data.pop("password"))
        
        db_user = User(
            **user_data,
            hashed_password=hashed_password,
            is_active=True,
            is_superuser=False,
            is_verified=False
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def update(
        db: Session, 
        user_id: int, 
        user_in: UserUpdate
    ) -> Optional[User]:
        """更新用户信息"""
        user = UserService.get_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )
        
        # 更新字段
        update_data = user_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def delete(db: Session, user_id: int) -> bool:
        """删除用户"""
        user = UserService.get_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="用户不存在"
            )
        
        db.delete(user)
        db.commit()
        return True
    
    @staticmethod
    def authenticate(
        db: Session, 
        email: str, 
        password: str
    ) -> Optional[User]:
        """用户认证"""
        user = UserService.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        if not user.is_active:
            return None
        return user
    
    @staticmethod
    def is_active(user: User) -> bool:
        """检查用户是否激活"""
        return user.is_active
    
    @staticmethod
    def is_superuser(user: User) -> bool:
        """检查用户是否是超级用户"""
        return user.is_superuser
    
    @staticmethod
    def verify_email(db: Session, user_id: int) -> bool:
        """验证用户邮箱"""
        user = UserService.get_by_id(db, user_id)
        if not user:
            return False
        
        user.is_verified = True
        db.commit()
        return True
    
    @staticmethod
    def change_password(
        db: Session, 
        user_id: int, 
        current_password: str, 
        new_password: str
    ) -> bool:
        """修改用户密码"""
        user = UserService.get_by_id(db, user_id)
        if not user:
            return False
        
        if not verify_password(current_password, user.hashed_password):
            return False
        
        user.hashed_password = get_password_hash(new_password)
        db.commit()
        return True 