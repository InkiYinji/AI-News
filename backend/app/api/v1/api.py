"""
API v1 路由聚合
将所有API端点组织在一起
"""
from fastapi import APIRouter

from .endpoints import auth, news

api_router = APIRouter()

# 包含认证相关路由
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["认证"]
)

# 包含新闻相关路由
api_router.include_router(
    news.router,
    prefix="/news",
    tags=["新闻"]
) 