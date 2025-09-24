# AI-News

## 项目简介
AI-News 是一个基于 React + TypeScript + Vite 的新闻推荐和阅读应用，支持用户登录、新闻浏览、个性化推送设置、个人资料管理等功能。界面美观，支持深色模式。

## 主要功能
- 用户登录/登出
- 新闻摘要与详情浏览
- 关键词搜索与个性化推送设置
- 个人资料查看与编辑
- 通知、隐私、通用设置
- 帮助与反馈
- 底部导航栏快速切换

## 目录结构
```
AI-News/
  App.tsx                  # 应用主入口
  index.tsx                # React 应用入口
  index.html               # 页面 HTML 入口
  package.json             # 依赖与脚本
  tsconfig.json            # TypeScript 配置
  vite.config.ts           # Vite 配置
  components/              # 主要页面和UI组件
    BottomNavigation.tsx   # 底部导航栏
    ...                    # 其他页面和UI组件
  styles/
    globals.css            # 全局样式，含深色模式
  guidelines/Guidelines.md # 设计和开发规范
  Attributions.md          # 资源归属说明
```

## 一键启动
1. 安装依赖：
```bash
npm install
```
2. 启动开发环境：
```bash
npm run dev
```
3. 浏览器自动打开 http://localhost:5173 即可访问。

## 构建与预览
- 构建生产包：
  ```bash
  npm run build
  ```
- 本地预览生产包：
  ```bash
  npm run preview
  ```

## 依赖说明
- React 18+
- TypeScript 5+
- Vite 4+
- 详见 package.json

## 常见问题
- 启动报错：请确认已安装依赖并使用正确的 Node 版本（建议 Node 18+）。
- 样式异常：请检查 styles/globals.css 是否被正确引入。
- 其他问题：请补充 issue 或联系开发者。

---
如需补充功能说明、API文档或有其他疑问，请告知！
