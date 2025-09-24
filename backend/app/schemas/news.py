"""
新闻相关的Pydantic模式
用于新闻API的数据验证
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class CategoryBase(BaseModel):
    """分类基础模式"""
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    slug: str = Field(..., min_length=1, max_length=100)


class CategoryCreate(CategoryBase):
    """创建分类模式"""
    pass


class CategoryUpdate(BaseModel):
    """更新分类模式"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    slug: Optional[str] = Field(None, min_length=1, max_length=100)
    is_active: Optional[bool] = None


class Category(CategoryBase):
    """分类响应模式"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime


class TagBase(BaseModel):
    """标签基础模式"""
    name: str = Field(..., min_length=1, max_length=100)
    slug: str = Field(..., min_length=1, max_length=100)
    color: Optional[str] = Field(None, max_length=7)  # HEX颜色码


class TagCreate(TagBase):
    """创建标签模式"""
    pass


class TagUpdate(BaseModel):
    """更新标签模式"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    slug: Optional[str] = Field(None, min_length=1, max_length=100)
    color: Optional[str] = Field(None, max_length=7)


class Tag(TagBase):
    """标签响应模式"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int


class NewsBase(BaseModel):
    """新闻基础模式"""
    title: str = Field(..., min_length=1, max_length=500)
    slug: str = Field(..., min_length=1, max_length=500)
    summary: Optional[str] = None
    content: str = Field(..., min_length=1)
    cover_image: Optional[str] = None
    video_url: Optional[str] = None
    is_published: bool = False
    is_featured: bool = False
    is_breaking: bool = False
    category_id: int


class NewsCreate(NewsBase):
    """创建新闻模式"""
    tag_ids: Optional[List[int]] = []


class NewsUpdate(BaseModel):
    """更新新闻模式"""
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    slug: Optional[str] = Field(None, min_length=1, max_length=500)
    summary: Optional[str] = None
    content: Optional[str] = Field(None, min_length=1)
    cover_image: Optional[str] = None
    video_url: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_breaking: Optional[bool] = None
    category_id: Optional[int] = None
    tag_ids: Optional[List[int]] = None


class News(NewsBase):
    """新闻响应模式"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    author_id: int
    view_count: int
    like_count: int
    comment_count: int
    created_at: datetime
    updated_at: datetime
    
    # 关联数据
    author: Optional["User"] = None
    category: Optional[Category] = None
    tags: List[Tag] = []


class NewsList(BaseModel):
    """新闻列表响应模式"""
    items: List[News]
    total: int
    page: int
    size: int
    pages: int


class NewsSearch(BaseModel):
    """新闻搜索模式"""
    q: Optional[str] = None
    category_id: Optional[int] = None
    tag_ids: Optional[List[int]] = None
    is_featured: Optional[bool] = None
    is_breaking: Optional[bool] = None
    page: int = Field(1, ge=1)
    size: int = Field(10, ge=1, le=100)


# 解决循环引用
News.model_rebuild() 