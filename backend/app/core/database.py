"""
数据库连接管理模块
包含数据库引擎、会话管理和依赖注入
"""
from typing import Generator, AsyncGenerator
from sqlalchemy import create_engine, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool

from .config import settings
from ..models.base import Base


# 同步数据库引擎
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    echo=settings.DEBUG,
)

# 异步数据库引擎
async_engine = create_async_engine(
    settings.ASYNC_DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    echo=settings.DEBUG,
)

# 同步会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 异步会话工厂
AsyncSessionLocal = async_sessionmaker(
    async_engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)


def get_db() -> Generator[Session, None, None]:
    """获取同步数据库会话的依赖函数"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_async_db() -> AsyncGenerator[AsyncSession, None]:
    """获取异步数据库会话的依赖函数"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


def create_tables() -> None:
    """创建所有数据库表（开发环境使用）"""
    Base.metadata.create_all(bind=engine)


async def create_async_tables() -> None:
    """异步创建所有数据库表"""
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


def check_database_connection() -> bool:
    """检查数据库连接是否正常"""
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return True
    except Exception:
        return False


async def check_async_database_connection() -> bool:
    """异步检查数据库连接是否正常"""
    try:
        async with async_engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        return True
    except Exception:
        return False 