# AI-News 项目总览

一个基于 FastAPI + React 的现代化新闻聚合平台，采用前后端分离架构。

## 🏗️ 技术架构

### 后端技术栈
- **FastAPI** - 现代、快速的Python Web框架
- **SQLAlchemy 2.0** - 强大的ORM框架
- **PostgreSQL** - 主数据库
- **Redis** - 缓存和会话存储
- **Alembic** - 数据库迁移管理
- **JWT** - 用户认证
- **Poetry** - 依赖管理

### 前端技术栈
- **React 18** - 用户界面框架
- **Vite** - 构建工具
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架

## 📁 目录结构

```
AI-News/
├── backend/                 # FastAPI 后端
│   ├── app/
│   │   ├── api/            # API路由
│   │   ├── core/           # 核心配置
│   │   ├── models/         # 数据库模型
│   │   ├── schemas/        # Pydantic模式
│   │   ├── services/       # 业务逻辑
│   │   └── main.py         # 应用入口
│   ├── alembic/            # 数据库迁移
│   ├── tests/              # 测试文件
│   ├── pyproject.toml      # Poetry配置
│   ├── Dockerfile          # Docker配置
│   └── start.py            # 启动脚本
├── frontend/                # React 前端
├── docker-compose.yml       # 容器编排
└── README.md               # 项目文档
```

## 🚀 快速开始

### 方式一：Docker Compose（推荐）

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd AI-News
   ```

2. **启动服务**
   ```bash
   docker-compose up --build
   ```

3. **访问应用**
   - 前端：http://localhost:5173
   - 后端API：http://localhost:8000
   - API文档：http://localhost:8000/api/v1/docs

### 方式二：本地开发

#### 后端设置

1. **安装依赖**
   ```bash
   cd backend
   poetry install
   ```

2. **环境配置**
   ```bash
   cp env.example .env
   # 编辑 .env 文件，设置数据库连接等
   ```

3. **数据库设置**
   ```bash
   # 创建数据库
   createdb ai_news
   
   # 运行迁移
   poetry run alembic upgrade head
   ```

4. **启动服务**
   ```bash
   poetry run python start.py
   # 或者
   poetry run uvicorn app.main:app --reload
   ```

#### 前端设置

1. **安装依赖**
   ```bash
   cd frontend
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

## 🔧 开发工具

### 后端开发命令

```bash
cd backend

# 安装依赖
python dev_tools.py install

# 运行测试
python dev_tools.py test

# 代码检查
python dev_tools.py lint

# 数据库迁移
python dev_tools.py create-mig "migration message"
python dev_tools.py migrate

# 重置数据库
python dev_tools.py reset-db
```

### 常用Poetry命令

```bash
# 安装依赖
poetry install

# 添加依赖
poetry add package-name

# 添加开发依赖
poetry add --group dev package-name

# 运行命令
poetry run python start.py
poetry run pytest
poetry run alembic upgrade head
```

## 📚 API文档

启动后端服务后，访问以下地址查看API文档：

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

## 🗄️ 数据库

### 主要数据模型

- **User** - 用户信息
- **News** - 新闻内容
- **Category** - 新闻分类
- **Tag** - 新闻标签

### 数据库操作

```bash
# 创建迁移
poetry run alembic revision --autogenerate -m "description"

# 应用迁移
poetry run alembic upgrade head

# 回退迁移
poetry run alembic downgrade -1

# 查看迁移历史
poetry run alembic history
```

## 🧪 测试

```bash
cd backend

# 运行所有测试
poetry run pytest

# 运行特定测试文件
poetry run pytest tests/test_main.py

# 运行测试并生成覆盖率报告
poetry run pytest --cov=app --cov-report=html

# 运行特定标记的测试
poetry run pytest -m "unit"
poetry run pytest -m "integration"
```

## 🔒 环境变量

创建 `.env` 文件并配置以下变量：

```env
# 数据库配置
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/ai_news
ASYNC_DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/ai_news

# Redis配置
REDIS_URL=redis://localhost:6379/0

# 安全配置
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# 应用配置
DEBUG=true
API_V1_STR=/api/v1
BACKEND_CORS_ORIGINS=["http://localhost:5173"]
```

## 🐳 Docker

### 构建镜像

```bash
# 构建后端镜像
docker build -t ai-news-backend ./backend

# 构建前端镜像
docker build -t ai-news-frontend ./frontend
```

### 运行容器

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 📝 开发规范

### 代码风格

- 使用 **Black** 进行代码格式化
- 使用 **Ruff** 进行代码检查
- 使用 **MyPy** 进行类型检查

### 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 🚀 部署

### 生产环境

1. **环境变量**
   - 设置 `DEBUG=false`
   - 配置生产数据库
   - 设置强密钥

2. **数据库**
   - 运行迁移：`alembic upgrade head`
   - 创建索引优化查询性能

3. **反向代理**
   - 使用 Nginx 或 Traefik
   - 配置 SSL 证书

4. **监控**
   - 应用性能监控
   - 日志收集和分析

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 🆘 支持

如果遇到问题，请：

1. 查看 [Issues](https://github.com/your-repo/issues)
2. 搜索现有问题
3. 创建新 Issue 并详细描述问题

---

**Happy Coding! 🎉**

