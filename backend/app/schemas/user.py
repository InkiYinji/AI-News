"""
用户相关的Pydantic模式
用于API请求和响应的数据验证
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserBase(BaseModel):
    """用户基础模式"""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = Field(None, max_length=200)
    bio: Optional[str] = None
    phone: Optional[str] = None


class UserCreate(UserBase):
    """创建用户模式"""
    password: str = Field(..., min_length=8, max_length=100)


class UserUpdate(BaseModel):
    """更新用户模式"""
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    full_name: Optional[str] = Field(None, max_length=200)
    bio: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None


class UserInDB(UserBase):
    """数据库中的用户模式"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    is_active: bool
    is_superuser: bool
    is_verified: bool
    avatar_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    last_login: Optional[datetime] = None
    email_verified_at: Optional[datetime] = None


class User(UserInDB):
    """用户响应模式（公开信息）"""
    hashed_password: Optional[str] = None  # 不暴露密码


class UserLogin(BaseModel):
    """用户登录模式"""
    email: EmailStr
    password: str


class UserPasswordChange(BaseModel):
    """用户密码修改模式"""
    current_password: str
    new_password: str = Field(..., min_length=8, max_length=100)


class Token(BaseModel):
    """令牌响应模式"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class TokenData(BaseModel):
    """令牌数据模式"""
    user_id: Optional[int] = None 