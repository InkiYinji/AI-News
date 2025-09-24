# AI-News 后端（FastAPI）

## 目录结构

```
backend/
  app/
    api/        # 路由
    core/       # 配置、依赖
    models/     # 数据库模型
    schemas/    # Pydantic 校验
    services/   # 业务逻辑
    main.py     # FastAPI 入口
  alembic/      # 数据库迁移
  pyproject.toml
```

## 依赖安装

推荐使用 Poetry：

```bash
cd backend
poetry install
```

## 启动开发环境

建议用 Docker Compose 一键启动（需先安装 Docker）：

```bash
docker-compose up --build
```

本地手动启动：

```bash
poetry run uvicorn app.main:app --reload
```

## 主要依赖
- fastapi
- sqlalchemy
- alembic
- pydantic
- uvicorn
- psycopg2-binary
- asyncpg

## 健康检查接口

访问 [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

如需数据库迁移、用户认证等进阶用法，详见项目文档或咨询开发者。

