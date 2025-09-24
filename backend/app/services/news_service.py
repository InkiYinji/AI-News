"""
新闻服务层
包含新闻的CRUD操作、搜索和统计功能
"""
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select, func, and_, or_
from fastapi import HTTPException, status

from ..models.news import News, Category, Tag, NewsTag
from ..schemas.news import NewsCreate, NewsUpdate, NewsSearch, NewsList


class NewsService:
    """新闻服务类"""
    
    @staticmethod
    def get_by_id(db: Session, news_id: int) -> Optional[News]:
        """根据ID获取新闻"""
        return db.get(News, news_id)
    
    @staticmethod
    def get_by_slug(db: Session, slug: str) -> Optional[News]:
        """根据slug获取新闻"""
        stmt = select(News).where(News.slug == slug)
        result = db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    def get_multi(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        published_only: bool = True
    ) -> List[News]:
        """获取多个新闻"""
        stmt = select(News)
        if published_only:
            stmt = stmt.where(News.is_published == True)
        stmt = stmt.offset(skip).limit(limit).order_by(News.created_at.desc())
        
        result = db.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    def create(db: Session, news_in: NewsCreate, author_id: int) -> News:
        """创建新闻"""
        # 检查slug是否已存在
        if NewsService.get_by_slug(db, news_in.slug):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="新闻slug已存在"
            )
        
        # 创建新闻对象
        news_data = news_in.model_dump()
        tag_ids = news_data.pop("tag_ids", [])
        
        db_news = News(**news_data, author_id=author_id)
        db.add(db_news)
        db.commit()
        db.refresh(db_news)
        
        # 添加标签关联
        if tag_ids:
            NewsService.add_tags_to_news(db, db_news.id, tag_ids)
        
        return db_news
    
    @staticmethod
    def update(
        db: Session, 
        news_id: int, 
        news_in: NewsUpdate
    ) -> Optional[News]:
        """更新新闻"""
        news = NewsService.get_by_id(db, news_id)
        if not news:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="新闻不存在"
            )
        
        # 更新字段
        update_data = news_in.model_dump(exclude_unset=True)
        tag_ids = update_data.pop("tag_ids", None)
        
        for field, value in update_data.items():
            setattr(news, field, value)
        
        # 更新标签
        if tag_ids is not None:
            NewsService.update_news_tags(db, news_id, tag_ids)
        
        db.commit()
        db.refresh(news)
        return news
    
    @staticmethod
    def delete(db: Session, news_id: int) -> bool:
        """删除新闻"""
        news = NewsService.get_by_id(db, news_id)
        if not news:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="新闻不存在"
            )
        
        db.delete(news)
        db.commit()
        return True
    
    @staticmethod
    def search_news(db: Session, search_params: NewsSearch) -> NewsList:
        """搜索新闻"""
        # 构建查询
        stmt = select(News).where(News.is_published == True)
        
        # 关键词搜索
        if search_params.q:
            search_term = f"%{search_params.q}%"
            stmt = stmt.where(
                or_(
                    News.title.ilike(search_term),
                    News.summary.ilike(search_term),
                    News.content.ilike(search_term)
                )
            )
        
        # 分类过滤
        if search_params.category_id:
            stmt = stmt.where(News.category_id == search_params.category_id)
        
        # 标签过滤
        if search_params.tag_ids:
            # 这里需要复杂的标签查询逻辑
            pass
        
        # 精选新闻
        if search_params.is_featured is not None:
            stmt = stmt.where(News.is_featured == search_params.is_featured)
        
        # 突发新闻
        if search_params.is_breaking is not None:
            stmt = stmt.where(News.is_breaking == search_params.is_breaking)
        
        # 计算总数
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total = db.execute(count_stmt).scalar()
        
        # 分页
        stmt = stmt.order_by(News.created_at.desc())
        stmt = stmt.offset((search_params.page - 1) * search_params.size)
        stmt = stmt.limit(search_params.size)
        
        result = db.execute(stmt)
        items = result.scalars().all()
        
        # 计算总页数
        pages = (total + search_params.size - 1) // search_params.size
        
        return NewsList(
            items=items,
            total=total,
            page=search_params.page,
            size=search_params.size,
            pages=pages
        )
    
    @staticmethod
    def increment_view_count(db: Session, news_id: int) -> None:
        """增加浏览次数"""
        stmt = select(News).where(News.id == news_id)
        result = db.execute(stmt)
        news = result.scalar_one_or_none()
        
        if news:
            news.view_count += 1
            db.commit()
    
    @staticmethod
    def add_tags_to_news(db: Session, news_id: int, tag_ids: List[int]) -> None:
        """为新闻添加标签"""
        # 清除现有标签
        db.execute(select(NewsTag).where(NewsTag.news_id == news_id)).delete()
        
        # 添加新标签
        for tag_id in tag_ids:
            news_tag = NewsTag(news_id=news_id, tag_id=tag_id)
            db.add(news_tag)
        
        db.commit()
    
    @staticmethod
    def update_news_tags(db: Session, news_id: int, tag_ids: List[int]) -> None:
        """更新新闻标签"""
        NewsService.add_tags_to_news(db, news_id, tag_ids)
    
    # 分类相关方法
    @staticmethod
    def get_categories(db: Session) -> List[Category]:
        """获取所有分类"""
        stmt = select(Category).where(Category.is_active == True)
        result = db.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    def create_category(db: Session, category_in) -> Category:
        """创建分类"""
        db_category = Category(**category_in.model_dump())
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    
    # 标签相关方法
    @staticmethod
    def get_tags(db: Session) -> List[Tag]:
        """获取所有标签"""
        stmt = select(Tag)
        result = db.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    def create_tag(db: Session, tag_in) -> Tag:
        """创建标签"""
        db_tag = Tag(**tag_in.model_dump())
        db.add(db_tag)
        db.commit()
        db.refresh(db_tag)
        return db_tag 