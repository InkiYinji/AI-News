import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Globe, Moon, Smartphone, Wifi } from 'lucide-react';

interface GeneralSettingsPageProps {
  onBack: () => void;
}

export function GeneralSettingsPage({ onBack }: GeneralSettingsPageProps) {
  const [language, setLanguage] = useState('zh-CN');
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);


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
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-800">通用设置</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 语言设置 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                语言与地区
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">应用语言</p>
                  <p className="text-gray-500 text-sm">选择应用显示语言</p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="zh-TW">繁體中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 主题设置 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Moon className="w-5 h-5" />
                主题设置
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">深色模式</p>
                  <p className="text-gray-500 text-sm">减少眼部疲劳，节省电量</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* 应用更新 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                应用更新
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">自动更新</p>
                  <p className="text-gray-500 text-sm">自动下载并安装应用更新</p>
                </div>
                <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">仅Wi-Fi下载</p>
                  <p className="text-gray-500 text-sm">仅在连接Wi-Fi时下载更新</p>
                </div>
                <Switch checked={wifiOnly} onCheckedChange={setWifiOnly} />
              </div>
            </CardContent>
          </Card>



          {/* 存储管理 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">存储管理</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">应用缓存</p>
                  <p className="text-gray-500 text-sm">当前缓存大小：125.6 MB</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">
                  清理缓存
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">离线新闻</p>
                  <p className="text-gray-500 text-sm">已保存：45篇文章</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">
                  管理
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}