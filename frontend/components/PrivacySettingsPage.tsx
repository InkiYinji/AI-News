import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Shield, Eye, MapPin, BarChart, Trash2 } from 'lucide-react';

interface PrivacySettingsPageProps {
  onBack: () => void;
}

export function PrivacySettingsPage({ onBack }: PrivacySettingsPageProps) {
  const [locationTracking, setLocationTracking] = useState(false);
  const [readingHistory, setReadingHistory] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);
  const [analyticsSharing, setAnalyticsSharing] = useState(false);

  const handleClearHistory = () => {
    // 清除阅读历史的逻辑
    console.log('清除阅读历史');
  };

  const handleExportData = () => {
    // 导出个人数据的逻辑
    console.log('导出个人数据');
  };

  const handleDeleteAccount = () => {
    // 删除账户的逻辑
    console.log('删除账户');
  };

  return (
    <div className="h-full bg-gradient-to-b from-blue-50/30 to-white">
      {/* 标题栏 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
        <div className="relative flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-800">隐私设置</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 位置信息 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                位置信息
              </h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">位置跟踪</p>
                  <p className="text-gray-500 text-sm">用于提供本地化新闻推荐</p>
                </div>
                <Switch checked={locationTracking} onCheckedChange={setLocationTracking} />
              </div>
            </CardContent>
          </Card>

          {/* 阅读数据 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                阅读数据
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">保存阅读历史</p>
                  <p className="text-gray-500 text-sm">记录您的阅读偏好以改善推荐</p>
                </div>
                <Switch checked={readingHistory} onCheckedChange={setReadingHistory} />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">清除阅读历史</p>
                  <p className="text-gray-500 text-sm">删除所有已保存的阅读记录</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleClearHistory} className="rounded-lg">
                  清除
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 广告设置 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">广告设置</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">个性化广告</p>
                  <p className="text-gray-500 text-sm">基于您的兴趣显示相关广告</p>
                </div>
                <Switch checked={personalizedAds} onCheckedChange={setPersonalizedAds} />
              </div>
            </CardContent>
          </Card>

          {/* 数据收集 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                数据收集
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">使用数据收集</p>
                  <p className="text-gray-500 text-sm">收集应用使用数据以改善服务</p>
                </div>
                <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">分析数据共享</p>
                  <p className="text-gray-500 text-sm">与合作伙伴共享匿名分析数据</p>
                </div>
                <Switch checked={analyticsSharing} onCheckedChange={setAnalyticsSharing} />
              </div>
            </CardContent>
          </Card>

          {/* 数据管理 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">数据管理</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">导出个人数据</p>
                  <p className="text-gray-500 text-sm">下载您的所有个人数据副本</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData} className="rounded-lg">
                  导出
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 账户管理 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                账户管理
              </h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">删除账户</p>
                  <p className="text-gray-500 text-sm">永久删除您的账户和所有数据</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDeleteAccount} 
                  className="rounded-lg"
                >
                  删除
                </Button>
              </div>
              <p className="text-red-500 text-xs mt-2">
                警告：此操作不可撤销，将永久删除您的所有数据
              </p>
            </CardContent>
          </Card>

          {/* 隐私政策 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 space-y-3">
              <Button variant="outline" className="w-full rounded-lg">
                查看隐私政策
              </Button>
              <Button variant="outline" className="w-full rounded-lg">
                查看用户协议
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}