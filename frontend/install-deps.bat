@echo off
echo 正在安装 AI-News 前端依赖...
echo.

echo 1. 安装 npm 依赖...
npm install

echo.
echo 2. 安装 Tailwind CSS 相关依赖...
npm install -D tailwindcss postcss autoprefixer

echo.
echo 3. 初始化 Tailwind CSS...
npx tailwindcss init -p

echo.
echo 依赖安装完成！
echo 现在可以运行: npm run dev
pause
