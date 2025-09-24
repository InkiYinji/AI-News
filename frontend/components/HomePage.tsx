import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { X } from 'lucide-react';

interface PushSettings {
  pushDays: string[];
  pushTimes: string[];
  pushCount: number;
  everyday: boolean;
  keywords: string[];
}

interface HomePageProps {
  onSearchComplete?: (keywords: string[], settings: PushSettings) => void;
}

export function HomePage({ onSearchComplete }: HomePageProps) {
  const [keywordInput, setKeywordInput] = useState('');
  const [newTimeInput, setNewTimeInput] = useState('');
  const [pushSettings, setPushSettings] = useState<PushSettings>({
    pushDays: ['monday', 'wednesday', 'friday'],
    pushTimes: ['08:00', '18:00'],
    pushCount: 5,
    everyday: false,
    keywords: []
  });
  const [customCount, setCustomCount] = useState('5');

  const weekDays = [
    { value: 'monday', label: '周一' },
    { value: 'tuesday', label: '周二' },
    { value: 'wednesday', label: '周三' },
    { value: 'thursday', label: '周四' },
    { value: 'friday', label: '周五' },
    { value: 'saturday', label: '周六' },
    { value: 'sunday', label: '周日' },
    { value: 'everyday', label: '每天' }
  ];

  const handleDayToggle = (day: string) => {
    if (day === 'everyday') {
      setPushSettings(prev => ({
        ...prev,
        everyday: !prev.everyday,
        pushDays: !prev.everyday ? weekDays.slice(0, -1).map(d => d.value) : []
      }));
    } else {
      setPushSettings(prev => ({
        ...prev,
        pushDays: prev.pushDays.includes(day)
          ? prev.pushDays.filter(d => d !== day)
          : [...prev.pushDays, day],
        everyday: false
      }));
    }
  };

  const validateAndFormatTime = (value: string): string => {
    // 提取时间中的小时部分
    const timeMatch = value.match(/^(\d{1,2})/);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1]);
      if (hour >= 0 && hour <= 23) {
        return hour.toString().padStart(2, '0') + ':00';
      }
    }
    return '';
  };

  const addTime = () => {
    const formattedTime = validateAndFormatTime(newTimeInput);
    if (formattedTime && !pushSettings.pushTimes.includes(formattedTime)) {
      setPushSettings(prev => ({
        ...prev,
        pushTimes: [...prev.pushTimes, formattedTime]
      }));
      setNewTimeInput('');
    }
  };

  const removeTime = (time: string) => {
    setPushSettings(prev => ({
      ...prev,
      pushTimes: prev.pushTimes.filter(t => t !== time)
    }));
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTimeInput(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCount(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      // 如果输入大于等于20，自动设为20
      const finalValue = numValue >= 20 ? 20 : numValue;
      setPushSettings(prev => ({ ...prev, pushCount: finalValue }));
      // 如果用户输入的是大于20的数，更新显示值为20
      if (numValue >= 20) {
        setCustomCount('20');
      }
    }
  };

  const handleCancel = () => {
    setKeywordInput('');
  };

  const handleConfirm = () => {
    if (keywordInput.trim()) {
      // 提取关键词（简单分词）
      const keywords = keywordInput.trim().split(/\s+/);
      const completeSettings = {
        ...pushSettings,
        keywords
      };
      
      if (onSearchComplete) {
        onSearchComplete(keywords, completeSettings);
      }
      setKeywordInput('');
    }
  };

  const getSettingsPreview = () => {
    const dayText = pushSettings.everyday ? '每天' : 
      pushSettings.pushDays.length > 0 
        ? weekDays.slice(0, -1).filter(d => pushSettings.pushDays.includes(d.value)).map(d => d.label).join('、')
        : '未设置日期';
    
    const timeText = pushSettings.pushTimes.length > 0 ? ` 的 ${pushSettings.pushTimes.join('、')}` : '';
    
    return `${dayText}${timeText} 推送${pushSettings.pushCount}条新闻`;
  };

  // 检查是否所有必填项都已填写
  const isFormComplete = () => {
    const hasDays = pushSettings.everyday || pushSettings.pushDays.length > 0;
    const hasTimes = pushSettings.pushTimes.length > 0;
    const hasCount = pushSettings.pushCount > 0;
    const hasKeywords = keywordInput.trim().length > 0;
    
    return hasDays && hasTimes && hasCount && hasKeywords;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50/30 to-white">
      {/* 标题栏 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
        <h1 className="text-center text-gray-800">智能推荐</h1>
      </div>

      {/* 推送设置区域 */}
      <div className="flex-1 p-3 overflow-y-auto">
        <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 space-y-6">
            {/* 推送日期设置 */}
            <div className="space-y-3">
              <label className="text-gray-700 block text-left">推送日期</label>
              <div className="grid grid-cols-4 gap-2">
                {weekDays.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.value}
                      checked={day.value === 'everyday' ? pushSettings.everyday : pushSettings.pushDays.includes(day.value)}
                      onCheckedChange={() => handleDayToggle(day.value)}
                    />
                    <label
                      htmlFor={day.value}
                      className="text-gray-700 cursor-pointer text-sm"
                    >
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 推送时间设置 */}
            <div className="space-y-3">
              <label className="text-gray-700 block text-left">推送时间</label>
              
              {/* 添加新时间和显示已设置时间在同一行 */}
              <div className="flex gap-2 items-center flex-wrap">
                <Input
                  type="text"
                  value={newTimeInput}
                  onChange={handleTimeInputChange}
                  className="w-20 rounded-lg text-sm"
                  placeholder="8"
                />
                <Button
                  onClick={addTime}
                  variant="outline"
                  className="rounded-lg px-3 py-2 text-sm"
                  disabled={!newTimeInput || !validateAndFormatTime(newTimeInput)}
                >
                  添加
                </Button>
                
                {/* 已设置的时间显示在同一行 */}
                {pushSettings.pushTimes.map((time) => (
                  <div
                    key={time}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm"
                  >
                    <span>{time}</span>
                    <button
                      onClick={() => removeTime(time)}
                      className="hover:bg-blue-200 rounded p-0.5 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 推送数量设置 */}
            <div className="space-y-3">
              <label className="text-gray-700 block text-left">推送数量</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={customCount}
                  onChange={handleCountChange}
                  className="flex-1 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="5"
                  min="1"
                  max="20"
                />
                <span className="text-gray-600 self-center text-sm">条 (最多20条)</span>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 新闻关键词输入 */}
            <div className="space-y-3">
              <label className="text-gray-700 block text-left">新闻关键词</label>
              <Input
                placeholder="输入您感兴趣的新闻关键词"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="w-full rounded-lg"
              />
              <p className="text-xs text-gray-500">输入您感兴趣的新闻关键词，AI将为您推荐相关资讯</p>
            </div>

            {/* 设置预览 */}
            <div className="bg-gray-50/80 rounded-lg p-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                当前设置：{getSettingsPreview()}
              </p>
            </div>

            {/* 确认和取消按钮 */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 rounded-lg"
              >
                取消
              </Button>
              <Button
                onClick={handleConfirm}
                className={`flex-1 rounded-lg ${
                  isFormComplete() 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : ''
                }`}
                disabled={!keywordInput.trim()}
              >
                确认
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}