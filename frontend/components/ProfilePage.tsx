import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ChevronRight, Settings, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: 'edit-profile' | 'general-settings' | 'notifications' | 'privacy' | 'help-feedback') => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <div className="h-full bg-gradient-to-b from-blue-50/30 to-white">
      {/* 标题栏 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
        <h1 className="text-center text-gray-800">我的</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 用户信息卡片 - 可点击 */}
          <Card 
            className="shadow-sm border-0 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => onNavigate('edit-profile')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-blue-500 text-white">张</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-gray-900">张三</h3>
                  <p className="text-gray-500 text-sm">科技爱好者</p>
                  <p className="text-gray-500 text-sm">加入于 2024年</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* 刷新点余额 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">刷新点</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl text-gray-900">1,250</span>
                <Button size="sm" className="rounded-lg">充值</Button>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                剩余刷新点，可用于获取更多个性化推荐
              </p>
            </CardContent>
          </Card>

          {/* 设置选项 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('general-settings')}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900">通用设置</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('notifications')}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900">消息通知</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('privacy')}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900">隐私设置</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('help-feedback')}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900">帮助与反馈</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 退出登录 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <Button variant="destructive" className="w-full rounded-xl">
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}