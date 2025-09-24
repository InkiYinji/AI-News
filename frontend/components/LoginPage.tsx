import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const handleWechatLogin = () => {
    console.log('微信登录');
    onLogin();
  };

  const handlePhoneLogin = () => {
    if (phone && code) {
      console.log('手机号登录:', phone);
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-md">
            <span className="text-white text-2xl font-medium">AI</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl text-gray-900">AI新闻助手</h1>
            <p className="text-gray-600">智能推荐 · 精准资讯</p>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <Tabs defaultValue="wechat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="wechat">微信登录</TabsTrigger>
              <TabsTrigger value="phone">手机登录</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wechat" className="space-y-6">
              <Button 
                onClick={handleWechatLogin}
                className="w-full bg-green-500 hover:bg-green-600 h-12 rounded-xl shadow-sm"
              >
                微信一键登录
              </Button>
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                登录即表示同意用户协议和隐私政策
              </p>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-6">
              <div className="space-y-4">
                <Input
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 rounded-xl"
                />
                <div className="flex gap-3">
                  <Input
                    placeholder="验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 h-12 rounded-xl"
                  />
                  <Button variant="outline" className="px-6 h-12 rounded-xl whitespace-nowrap">
                    获取验证码
                  </Button>
                </div>
                <Button 
                  onClick={handlePhoneLogin}
                  className="w-full h-12 rounded-xl shadow-sm"
                  disabled={!phone || !code}
                >
                  登录
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                登录即表示同意用户协议和隐私政策
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}