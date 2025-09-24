"""
新闻模型
包含新闻的基本信息、分类、标签等
"""
from typing import Optional, List
from sqlalchemy import String, Text, Boolean, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base


class Category(Base):
    """新闻分类模型"""
    __tablename__ = "categories"
    
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    # 关联关系
    news: Mapped[List["News"]] = relationship("News", back_populates="category")
    
    def __repr__(self) -> str:
        return f"<Category(id={self.id}, name='{self.name}')>"


class Tag(Base):
    """新闻标签模型"""
    __tablename__ = "tags"
    
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    color: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)  # HEX颜色码
    
    # 关联关系
    news: Mapped[List["News"]] = relationship("News", secondary="news_tags", back_populates="tags")
    
    def __repr__(self) -> str:
        return f"<Tag(id={self.id}, name='{self.name}')>"


class News(Base):
    """新闻模型"""
    __tablename__ = "news"
    
    # 基本信息
    title: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(500), unique=True, index=True, nullable=False)
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    
    # 媒体相关
    cover_image: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    video_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    # 状态和权限
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_breaking: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    # 统计信息
    view_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    like_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    comment_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    # 关联关系
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    
    author: Mapped["User"] = relationship("User", backref="news")
    category: Mapped["Category"] = relationship("Category", back_populates="news")
    tags: Mapped[List["Tag"]] = relationship("Tag", secondary="news_tags", back_populates="news")
    
    def __repr__(self) -> str:
        return f"<News(id={self.id}, title='{self.title[:50]}...')>"


# 新闻标签关联表
class NewsTag(Base):
    """新闻标签关联表"""
    __tablename__ = "news_tags"
    
    news_id: Mapped[int] = mapped_column(ForeignKey("news.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True) 