"""
用户认证API路由
包含登录、注册、刷新令牌等功能
"""
from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ....core.config import settings
from ....core.database import get_db
from ....core.security import create_access_token, create_refresh_token
from ....schemas.user import User, UserCreate, Token, UserPasswordChange
from ....services.user_service import UserService

router = APIRouter()


@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
def register(
    user_in: UserCreate,
    db: Session = Depends(get_db)
) -> Any:
    """用户注册"""
    user = UserService.create(db, user_in=user_in)
    return user


@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """用户登录"""
    # 验证用户凭据
    user = UserService.authenticate(
        db, 
        email=form_data.username, 
        password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="邮箱或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 检查用户是否已验证
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="请先验证邮箱"
        )
    
    # 生成令牌
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    access_token = create_access_token(
        subject=user.id, 
        expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(
        subject=user.id, 
        expires_delta=refresh_token_expires
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }


@router.post("/refresh", response_model=Token)
def refresh_token(
    refresh_token: str,
    db: Session = Depends(get_db)
) -> Any:
    """刷新访问令牌"""
    # 这里应该验证refresh_token的有效性
    # 为了简化，我们直接生成新的令牌
    # 在实际应用中，应该验证refresh_token并从中提取用户ID
    
    # 临时实现：从refresh_token中提取用户ID
    from ....core.security import verify_token
    user_id = verify_token(refresh_token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="无效的刷新令牌"
        )
    
    # 检查用户是否存在
    user = UserService.get_by_id(db, user_id=int(user_id))
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户不存在或已被禁用"
        )
    
    # 生成新的令牌
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    new_refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    new_access_token = create_access_token(
        subject=user.id, 
        expires_delta=access_token_expires
    )
    new_refresh_token = create_refresh_token(
        subject=user.id, 
        expires_delta=new_refresh_token_expires
    )
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }


@router.post("/change-password")
def change_password(
    password_change: UserPasswordChange,
    db: Session = Depends(get_db),
    current_user: User = Depends(UserService.get_current_user)
) -> Any:
    """修改密码"""
    success = UserService.change_password(
        db,
        user_id=current_user.id,
        current_password=password_change.current_password,
        new_password=password_change.new_password
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="当前密码错误"
        )
    
    return {"message": "密码修改成功"}


@router.get("/me", response_model=User)
def read_users_me(
    current_user: User = Depends(UserService.get_current_user)
) -> Any:
    """获取当前用户信息"""
    return current_user 