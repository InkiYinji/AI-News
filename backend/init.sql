-- AI-News 数据库初始化脚本
-- 创建初始分类和标签数据

-- 插入默认分类
INSERT INTO categories (name, description, slug, is_active, created_at, updated_at) VALUES
('科技', '科技相关新闻', 'tech', true, NOW(), NOW()),
('政治', '政治相关新闻', 'politics', true, NOW(), NOW()),
('经济', '经济相关新闻', 'economy', true, NOW(), NOW()),
('体育', '体育相关新闻', 'sports', true, NOW(), NOW()),
('娱乐', '娱乐相关新闻', 'entertainment', true, NOW(), NOW()),
('健康', '健康相关新闻', 'health', true, NOW(), NOW()),
('教育', '教育相关新闻', 'education', true, NOW(), NOW()),
('环境', '环境相关新闻', 'environment', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 插入默认标签
INSERT INTO tags (name, slug, color, created_at, updated_at) VALUES
('AI', 'ai', '#FF6B6B', NOW(), NOW()),
('区块链', 'blockchain', '#4ECDC4', NOW(), NOW()),
('5G', '5g', '#45B7D1', NOW(), NOW()),
('电动汽车', 'ev', '#96CEB4', NOW(), NOW()),
('可持续发展', 'sustainability', '#FFEAA7', NOW(), NOW()),
('远程工作', 'remote-work', '#DDA0DD', NOW(), NOW()),
('网络安全', 'cybersecurity', '#FF8C42', NOW(), NOW()),
('金融科技', 'fintech', '#A8E6CF', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 创建默认管理员用户（密码：admin123）
-- 注意：在实际生产环境中，应该使用更安全的密码
INSERT INTO users (email, username, full_name, hashed_password, is_active, is_superuser, is_verified, created_at, updated_at) VALUES
('admin@ai-news.com', 'admin', '系统管理员', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqjqGm', true, true, true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING; 