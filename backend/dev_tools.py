#!/usr/bin/env python3
"""
AI-News 开发工具脚本
包含常用的开发命令
"""
import os
import sys
import subprocess
from pathlib import Path

# 项目根目录
PROJECT_ROOT = Path(__file__).parent


def run_command(command: str, description: str = ""):
    """运行命令"""
    if description:
        print(f"🔄 {description}")
    
    print(f"💻 执行命令: {command}")
    result = subprocess.run(command, shell=True, cwd=PROJECT_ROOT)
    
    if result.returncode == 0:
        print(f"✅ 命令执行成功")
    else:
        print(f"❌ 命令执行失败，退出码: {result.returncode}")
    
    return result.returncode == 0


def install_dependencies():
    """安装依赖"""
    print("📦 安装Python依赖...")
    return run_command("poetry install", "安装项目依赖")


def run_tests():
    """运行测试"""
    print("🧪 运行测试...")
    return run_command("poetry run pytest", "运行测试套件")


def run_linting():
    """运行代码检查"""
    print("🔍 运行代码检查...")
    
    # 运行black格式化
    print("🎨 运行Black代码格式化...")
    run_command("poetry run black .", "代码格式化")
    
    # 运行ruff检查
    print("🔧 运行Ruff代码检查...")
    run_command("poetry run ruff check .", "代码检查")
    
    # 运行mypy类型检查
    print("📝 运行MyPy类型检查...")
    run_command("poetry run mypy .", "类型检查")


def create_migration(message: str):
    """创建数据库迁移"""
    if not message:
        message = "update"
    
    print(f"🗄️ 创建数据库迁移: {message}")
    return run_command(f"poetry run alembic revision --autogenerate -m '{message}'", "创建迁移")


def run_migration():
    """运行数据库迁移"""
    print("🔄 运行数据库迁移...")
    return run_command("poetry run alembic upgrade head", "运行迁移")


def reset_database():
    """重置数据库"""
    print("🗑️ 重置数据库...")
    
    # 删除所有迁移
    run_command("poetry run alembic downgrade base", "回退到基础版本")
    
    # 删除迁移文件（保留初始迁移）
    versions_dir = PROJECT_ROOT / "alembic" / "versions"
    if versions_dir.exists():
        for file in versions_dir.glob("*.py"):
            if file.name != "__init__.py" and file.name != "0001_initial.py":
                file.unlink()
                print(f"🗑️ 删除迁移文件: {file.name}")
    
    # 重新创建初始迁移
    create_migration("initial")
    
    # 运行迁移
    run_migration()


def show_help():
    """显示帮助信息"""
    help_text = """
🤖 AI-News 开发工具

可用命令:
  install     - 安装项目依赖
  test        - 运行测试
  lint        - 运行代码检查
  migrate     - 运行数据库迁移
  create-mig  - 创建数据库迁移
  reset-db    - 重置数据库
  help        - 显示此帮助信息

使用示例:
  python dev_tools.py install
  python dev_tools.py test
  python dev_tools.py create-mig "add user table"
  python dev_tools.py migrate
"""
    print(help_text)


def main():
    """主函数"""
    if len(sys.argv) < 2:
        show_help()
        return
    
    command = sys.argv[1].lower()
    
    if command == "install":
        install_dependencies()
    elif command == "test":
        run_tests()
    elif command == "lint":
        run_linting()
    elif command == "migrate":
        run_migration()
    elif command == "create-mig":
        message = sys.argv[2] if len(sys.argv) > 2 else "update"
        create_migration(message)
    elif command == "reset-db":
        reset_database()
    elif command == "help":
        show_help()
    else:
        print(f"❌ 未知命令: {command}")
        show_help()


if __name__ == "__main__":
    main()
