"""
测试配置文件
包含测试夹具和配置
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import get_db
from app.main import app
from app.models.base import Base


# 创建测试数据库引擎
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    """覆盖数据库依赖"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


# 覆盖应用依赖
app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="function")
def db():
    """数据库会话夹具"""
    # 创建表
    Base.metadata.create_all(bind=engine)
    
    # 创建会话
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # 清理表
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client():
    """测试客户端夹具"""
    with TestClient(app) as c:
        yield c


@pytest.fixture
def test_user_data():
    """测试用户数据"""
    return {
        "email": "test@example.com",
        "username": "testuser",
        "full_name": "Test User",
        "password": "testpassword123"
    }


@pytest.fixture
def test_news_data():
    """测试新闻数据"""
    return {
        "title": "Test News Title",
        "slug": "test-news-title",
        "summary": "This is a test news summary",
        "content": "This is the full content of the test news article.",
        "category_id": 1,
        "is_published": True,
        "tag_ids": [1, 2]
    }
