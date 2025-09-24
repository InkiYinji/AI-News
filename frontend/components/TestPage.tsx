import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">
          AI新闻助手 - 测试页面
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              微信登录
            </h2>
            <p className="text-muted-foreground mb-4">
              使用微信账号快速登录
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              微信登录
            </button>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              手机登录
            </h2>
            <p className="text-muted-foreground mb-4">
              使用手机号登录
            </p>
            <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/90 transition-colors">
              手机登录
            </button>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            微信一键登录
          </h2>
          <p className="text-muted-foreground mb-4">
            智能推荐 · 精准资讯
          </p>
          <button className="w-full bg-green-600 text-white px-6 py-4 rounded-md hover:bg-green-700 transition-colors text-lg font-medium">
            微信一键登录
          </button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          登录即表示同意用户协议和隐私政策
        </div>
      </div>
    </div>
  );
};

export default TestPage;
