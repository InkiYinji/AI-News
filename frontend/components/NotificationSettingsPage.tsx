import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Bell, Smartphone, Volume2, Vibrate } from 'lucide-react';

interface NotificationSettingsPageProps {
  onBack: () => void;
}

export function NotificationSettingsPage({ onBack }: NotificationSettingsPageProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(true);
  const [breakingNews, setBreakingNews] = useState(true);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [quietHours, setQuietHours] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');

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
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-800">消息通知</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 推送通知总开关 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                推送通知
              </h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">启用推送通知</p>
                  <p className="text-gray-500 text-sm">接收应用通知消息</p>
                </div>
                <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* 通知类型 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">通知类型</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">新闻更新</p>
                  <p className="text-gray-500 text-sm">个性化新闻推荐通知</p>
                </div>
                <Switch 
                  checked={newsUpdates && pushEnabled} 
                  onCheckedChange={setNewsUpdates}
                  disabled={!pushEnabled}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">突发新闻</p>
                  <p className="text-gray-500 text-sm">重要突发新闻即时推送</p>
                </div>
                <Switch 
                  checked={breakingNews && pushEnabled} 
                  onCheckedChange={setBreakingNews}
                  disabled={!pushEnabled}
                />
              </div>
              

            </CardContent>
          </Card>

          {/* 通知样式 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                通知样式
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-900">通知声音</p>
                    <p className="text-gray-500 text-sm">播放通知提示音</p>
                  </div>
                </div>
                <Switch 
                  checked={soundEnabled && pushEnabled} 
                  onCheckedChange={setSoundEnabled}
                  disabled={!pushEnabled}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Vibrate className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-900">振动提醒</p>
                    <p className="text-gray-500 text-sm">接收通知时震动</p>
                  </div>
                </div>
                <Switch 
                  checked={vibrationEnabled && pushEnabled} 
                  onCheckedChange={setVibrationEnabled}
                  disabled={!pushEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* 免打扰时间 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">免打扰时间</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">启用免打扰</p>
                  <p className="text-gray-500 text-sm">在指定时间段内静音通知</p>
                </div>
                <Switch 
                  checked={quietHours && pushEnabled} 
                  onCheckedChange={setQuietHours}
                  disabled={!pushEnabled}
                />
              </div>
              
              {quietHours && pushEnabled && (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900">开始时间</p>
                    <Select value={quietStart} onValueChange={setQuietStart}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900">结束时间</p>
                    <Select value={quietEnd} onValueChange={setQuietEnd}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>


        </div>
      </ScrollArea>
    </div>
  );
}