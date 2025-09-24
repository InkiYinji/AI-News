"""
数据库基础模型
包含所有模型共用的字段和方法
"""
from datetime import datetime
from typing import Any
from sqlalchemy import DateTime, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    """SQLAlchemy 2.0 基础模型类"""
    
    # 通用字段
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
    
    def to_dict(self) -> dict[str, Any]:
        """将模型转换为字典"""
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
    
    def update(self, **kwargs) -> None:
        """更新模型字段"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

