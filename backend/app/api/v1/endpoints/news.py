"""
新闻API路由
包含新闻的CRUD操作和搜索功能
"""
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from ....core.database import get_db
from ....core.deps import get_current_active_user, get_optional_current_user
from ....models.user import User
from ....schemas.news import (
    News, NewsCreate, NewsUpdate, NewsList, NewsSearch,
    Category, CategoryCreate, CategoryUpdate,
    Tag, TagCreate, TagUpdate
)
from ....services.news_service import NewsService

router = APIRouter()


# 新闻相关端点
@router.get("/", response_model=NewsList)
def get_news(
    q: str = Query(None, description="搜索关键词"),
    category_id: int = Query(None, description="分类ID"),
    tag_ids: List[int] = Query([], description="标签ID列表"),
    is_featured: bool = Query(None, description="是否精选"),
    is_breaking: bool = Query(None, description="是否突发"),
    page: int = Query(1, ge=1, description="页码"),
    size: int = Query(10, ge=1, le=100, description="每页数量"),
    db: Session = Depends(get_db)
) -> Any:
    """获取新闻列表"""
    search_params = NewsSearch(
        q=q,
        category_id=category_id,
        tag_ids=tag_ids,
        is_featured=is_featured,
        is_breaking=is_breaking,
        page=page,
        size=size
    )
    
    return NewsService.search_news(db, search_params)


@router.get("/{news_id}", response_model=News)
def get_news_by_id(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
) -> Any:
    """根据ID获取新闻详情"""
    news = NewsService.get_by_id(db, news_id)
    if not news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="新闻不存在"
        )
    
    # 增加浏览次数
    NewsService.increment_view_count(db, news_id)
    
    return news


@router.post("/", response_model=News, status_code=status.HTTP_201_CREATED)
def create_news(
    news_in: NewsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """创建新闻"""
    news = NewsService.create(db, news_in=news_in, author_id=current_user.id)
    return news


@router.put("/{news_id}", response_model=News)
def update_news(
    news_id: int,
    news_in: NewsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """更新新闻"""
    news = NewsService.get_by_id(db, news_id)
    if not news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="新闻不存在"
        )
    
    # 检查权限：只有作者或超级用户可以编辑
    if news.author_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="没有权限编辑此新闻"
        )
    
    news = NewsService.update(db, news_id=news_id, news_in=news_in)
    return news


@router.delete("/{news_id}")
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """删除新闻"""
    news = NewsService.get_by_id(db, news_id)
    if not news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="新闻不存在"
        )
    
    # 检查权限：只有作者或超级用户可以删除
    if news.author_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="没有权限删除此新闻"
        )
    
    NewsService.delete(db, news_id=news_id)
    return {"message": "新闻删除成功"}


# 分类相关端点
@router.get("/categories/", response_model=List[Category])
def get_categories(
    db: Session = Depends(get_db)
) -> Any:
    """获取所有分类"""
    return NewsService.get_categories(db)


@router.post("/categories/", response_model=Category, status_code=status.HTTP_201_CREATED)
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """创建分类（需要管理员权限）"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="需要管理员权限"
        )
    
    return NewsService.create_category(db, category_in=category_in)


# 标签相关端点
@router.get("/tags/", response_model=List[Tag])
def get_tags(
    db: Session = Depends(get_db)
) -> Any:
    """获取所有标签"""
    return NewsService.get_tags(db)


@router.post("/tags/", response_model=Tag, status_code=status.HTTP_201_CREATED)
def create_tag(
    tag_in: TagCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """创建标签（需要管理员权限）"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="需要管理员权限"
        )
    
    return NewsService.create_tag(db, tag_in=tag_in) 