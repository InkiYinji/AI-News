#!/usr/bin/env python3
"""
AI-News 后端启动脚本
用于快速启动开发环境
"""
import os
import sys
import uvicorn
from pathlib import Path

# 添加项目根目录到Python路径
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app.core.config import settings


def main():
    """主函数"""
    print("🚀 启动 AI-News 后端服务...")
    print(f"📁 项目根目录: {project_root}")
    print(f"🔧 环境: {'开发' if settings.DEBUG else '生产'}")
    print(f"🌐 端口: 8000")
    print(f"📚 API文档: http://localhost:8000/api/v1/docs")
    print(f"🔍 健康检查: http://localhost:8000/health")
    print("-" * 50)
    
    # 启动服务器
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
        access_log=True
    )


if __name__ == "__main__":
    main()
