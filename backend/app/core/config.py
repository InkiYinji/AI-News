"""
应用配置管理模块
使用 Pydantic Settings 来管理环境变量和配置
"""
from typing import List, Optional
from pydantic import Field, validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """应用配置类"""
    
    # 应用基础配置
    APP_NAME: str = "AI-News API"
    DEBUG: bool = False
    API_V1_STR: str = "/api/v1"
    
    # 数据库配置
    DATABASE_URL: str = "postgresql+psycopg://app:app@localhost:5432/ai_news"
    ASYNC_DATABASE_URL: str = "postgresql+asyncpg://app:app@localhost:5432/ai_news"
    
    # Redis配置
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # 安全配置
    SECRET_KEY: str = Field(..., description="用于JWT签名的密钥")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS配置
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # 邮件配置
    SMTP_TLS: bool = True
    SMTP_PORT: Optional[int] = None
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    # 文件上传配置
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v):
        """处理CORS配置"""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 创建全局配置实例
settings = Settings() 