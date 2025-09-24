import { useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ChevronRight, Trash2 } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  publishTime: string;
  source: string;
  sourceLink: string;
  imageUrl: string;
  keywords: string[];
}

interface PushSettings {
  pushDays: string[];
  pushTimes: string[];
  pushCount: number;
  everyday: boolean;
  keywords: string[];
}

interface NewsPageProps {
  onNewsClick: (newsItem: NewsItem) => void;
  searchKeywords?: string[];
  pushSettings?: PushSettings | null;
  showNewsList?: boolean;
  onSummaryClick?: () => void;
  onBackToSummary?: () => void;
  onDeleteSettings?: () => void;
}

export function NewsPage({ 
  onNewsClick, 
  searchKeywords = [], 
  pushSettings,
  showNewsList = false,
  onSummaryClick,
  onBackToSummary,
  onDeleteSettings
}: NewsPageProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const swipeThreshold = 80;

  const allNewsData: NewsItem[] = [
    {
      id: '1',
      title: '人工智能技术在医疗领域的新突破',
      summary: '最新研究显示，AI技术在疾病诊断准确率方面取得重大进展，为医疗行业带来革命性变化...',
      fullContent: '最新研究显示，人工智能技术在疾病诊断准确率方面取得重大进展，为医疗行业带来革命性变化。斯坦福大学医学院的研究团队开发了一种基于深度学习的诊断系统，能够在几秒钟内准确识别皮肤癌，准确率达到95%以上。该系统通过分析超过13万张皮肤病变图像进行训练，能够区分良性和恶性病变。研究人员表示，这项技术不仅能够提高诊断效率，还能够减少医疗资源的浪费，特别是在医疗资源匮乏的地区具有重要意义。目前，该系统正在进行临床试验，预计将在未来两年内投入使用。',
      category: '科技',
      publishTime: '2025-01-20 14:30',
      source: '科技日报',
      sourceLink: 'https://example.com/tech-news-1',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      keywords: ['人工智能', 'AI', '医疗', '诊断', '技术']
    },
    {
      id: '2',
      title: '全球气候变化对经济的深远影响',
      summary: '专家分析指出，极端天气事件频发正在重塑全球供应链，各国需要制定更完善的应对策略...',
      fullContent: '专家分析指出，极端天气事件频发正在重塑全球供应链，各国需要制定更完善的应对策略。联合国气候变化专门委员会最新报告显示，过去十年间，因极端天气造成的全球经济损失超过1.5万亿美元。干旱、洪涝、高温等极端天气事件不仅影响农业生产，还对制造业、物流业造成严重冲击。国际货币基金组织预测，如果不采取有效措施，到2030年，气候变化将导致全球GDP减少2.3%。多国政府和企业正在加大对可再生能源的投资，推动经济向低碳模式转型。专家建议，各国应建立更加完善的气候风险评估体系，增强经济韧性。',
      category: '财经',
      publishTime: '2025-01-20 12:15',
      source: '经济参考报',
      sourceLink: 'https://example.com/economy-news-1',
      imageUrl: 'https://images.unsplash.com/photo-1569163139394-de44aa8719de?w=300&h=200&fit=crop',
      keywords: ['气候变化', '经济', '供应链', '环保', '投资']
    },
    {
      id: '3',
      title: '体育科技融合：智能设备助力运动员训练',
      summary: '新一代智能穿戴设备为专业运动员提供实时数据分析，帮助优化训练效果和预防运动伤害...',
      fullContent: '新一代智能穿戴设备为专业运动员提供实时数据分析，帮助优化训练效果和预防运动伤害。奥运会备战期间，多支国家队开始使用最新的生物力学监测设备，通过传感器收集运动员的心率、肌肉活动、动作轨迹等数据。这些设备不仅能够实时监测运动员的身体状态，还能够分析技术动作的精准度，为教练员提供科学的训练建议。人工智能算法能够识别运动员的疲劳状态，预测潜在的运动损伤风险。目前，这些技术已经在田径、游泳、举重等项目中得到广泛应用。专家表示，科技与体育的深度融合将极大提升运动员的竞技水平，为体育事业发展注入新的活力。',
      category: '体育',
      publishTime: '2025-01-20 10:45',
      source: '体坛周报',
      sourceLink: 'https://example.com/sports-news-1',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      keywords: ['体育', '科技', '智能设备', '训练', '运动员']
    },
    {
      id: '4',
      title: 'AI教育应用：个性化学习新时代',
      summary: '人工智能在教育领域的应用不断深入，为学生提供个性化学习体验，教育效果显著提升...',
      fullContent: '人工智能在教育领域的应用不断深入，为学生提供个性化学习体验，教育效果显著提升。最新调研显示，使用AI辅助学习系统的学生，学习效率平均提高40%。这些系统能够根据学生的学习习惯、知识掌握程度和学习进度，自动调整教学内容和难度。同时，AI还能够识别学生的薄弱环节，提供针对性的练习和辅导。虚拟教师助手24小时在线，随时解答学生疑问。专家认为，AI技术将彻底改变传统教育模式，让因材施教成为现实。',
      category: '教育',
      publishTime: '2025-01-20 09:20',
      source: '中国教育报',
      sourceLink: 'https://example.com/education-news-1',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
      keywords: ['AI', '教育', '个性化', '学习', '人工智能']
    },
    {
      id: '5',
      title: '智能汽车技术突破：自动驾驶进入新阶段',
      summary: '最新自动驾驶技术在复杂城市道路测试中表现优异，智能汽车商业化应用步伐加快...',
      fullContent: '最新自动驾驶技术在复杂城市道路测试中表现优异，智能汽车商业化应用步伐加快。多家科技公司发布的L4级自动驾驶系统，在处理复杂交通场景方面取得重大突破。新系统采用多传感器融合技术，结合高精度地图和5G通信，能够实时识别并应对各种交通状况。测试数据显示，在城市道路环境下，系统的安全性和可靠性已达到商用标准。业内专家预测，未来3-5年内，自动驾驶汽车将在特定区域实现大规模商业化运营。',
      category: '汽车',
      publishTime: '2025-01-20 08:10',
      source: '汽车之家',
      sourceLink: 'https://example.com/auto-news-1',
      imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=300&h=200&fit=crop',
      keywords: ['智能汽车', '自动驾驶', '技术', '5G', '人工智能']
    }
  ];

  // 根据搜索关键词过滤和排序新闻
  const getFilteredNews = () => {
    if (searchKeywords.length === 0) {
      return allNewsData;
    }

    // 计算每条新闻与搜索关键词的匹配度
    const newsWithScore = allNewsData.map(news => {
      let score = 0;
      const searchText = (news.title + ' ' + news.summary + ' ' + news.keywords.join(' ')).toLowerCase();
      
      searchKeywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        if (searchText.includes(lowerKeyword)) {
          score += 1;
        }
        // 关键词在标题中匹配权重更高
        if (news.title.toLowerCase().includes(lowerKeyword)) {
          score += 2;
        }
      });
      
      return { ...news, score };
    });

    // 按匹配度排序，匹配度高的在前面
    return newsWithScore
      .filter(news => news.score > 0)
      .sort((a, b) => b.score - a.score)
      .concat(newsWithScore.filter(news => news.score === 0));
  };

  const newsData = getFilteredNews();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '科技': 'bg-blue-100 text-blue-800',
      '财经': 'bg-green-100 text-green-800',
      '体育': 'bg-orange-100 text-orange-800',
      '教育': 'bg-purple-100 text-purple-800',
      '汽车': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getWeekDayLabel = (day: string) => {
    const dayLabels: Record<string, string> = {
      'monday': '周一',
      'tuesday': '周二',
      'wednesday': '周三',
      'thursday': '周四',
      'friday': '周五',
      'saturday': '周六',
      'sunday': '周日'
    };
    return dayLabels[day] || day;
  };

  const getPushDaysText = (settings: PushSettings) => {
    if (settings.everyday) {
      return '每天';
    }
    return settings.pushDays.map(day => getWeekDayLabel(day)).join('、');
  };

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwipeActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipeActive) return;
    
    touchCurrentX.current = e.touches[0].clientX;
    const deltaX = touchStartX.current - touchCurrentX.current;
    
    if (deltaX > 0 && deltaX <= 120) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipeActive) return;
    
    setIsSwipeActive(false);
    const deltaX = touchStartX.current - touchCurrentX.current;
    
    if (deltaX > swipeThreshold) {
      setSwipeOffset(120); // 完全显示删除按钮
    } else {
      setSwipeOffset(0); // 回到原位
    }
  };

  const handleDelete = () => {
    if (onDeleteSettings) {
      onDeleteSettings();
    }
    setSwipeOffset(0);
  };

  const handleSummaryCardClick = () => {
    if (swipeOffset === 0 && onSummaryClick) {
      onSummaryClick();
    }
  };

  // 如果没有推送设置，显示默认新闻页面
  if (!pushSettings) {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50/30 to-white">
        {/* 标题栏 */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
          <h1 className="text-center text-gray-800">新闻</h1>
        </div>

        {/* 新闻列表 */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {newsData.map((news) => (
              <Card 
                key={news.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-sm bg-white/80 backdrop-blur-sm"
                onClick={() => onNewsClick(news)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`${getCategoryColor(news.category)} rounded-lg`}
                        >
                          {news.category}
                        </Badge>
                        <span className="text-gray-500 text-sm">{news.publishTime}</span>
                      </div>
                      <h3 className="line-clamp-2 text-gray-900 leading-relaxed">{news.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                      <p className="text-gray-500 text-xs">
                        新闻来源：{news.source}
                      </p>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // 如果显示新闻列表
  if (showNewsList) {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50/30 to-white">
        {/* 标题栏 */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
          <div className="relative flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToSummary}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-800">新闻</h1>
          </div>
        </div>

        {/* 新闻列表 */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {newsData.map((news) => (
              <Card 
                key={news.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-sm bg-white/80 backdrop-blur-sm"
                onClick={() => onNewsClick(news)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`${getCategoryColor(news.category)} rounded-lg`}
                        >
                          {news.category}
                        </Badge>
                        <span className="text-gray-500 text-sm">{news.publishTime}</span>
                      </div>
                      <h3 className="line-clamp-2 text-gray-900 leading-relaxed">{news.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                      <p className="text-gray-500 text-xs">
                        新闻来源：{news.source}
                      </p>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // 显示摘要界面
  return (
    <div className="h-full bg-gradient-to-b from-blue-50/30 to-white">
      {/* 标题栏 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
        <h1 className="text-center text-gray-800">新闻</h1>
      </div>

      {/* 推送设置摘要 */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-md relative overflow-hidden">
          <div className="relative">
            {/* 主内容卡片 */}
            <div
              className="relative"
              style={{
                transform: `translateX(-${swipeOffset}px)`,
                transition: isSwipeActive ? 'none' : 'transform 0.3s ease-out'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Card 
                className="shadow-lg border-0 bg-white/90 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200"
                onClick={handleSummaryCardClick}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* 突出显示新闻关键字 */}
                    <div className="text-center">
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {pushSettings.keywords.map((keyword, index) => (
                          <Badge 
                            key={index} 
                            className="bg-blue-500 text-white hover:bg-blue-600 text-base px-4 py-2 shadow-md"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">推送时间：</span>
                        <span className="text-gray-800">{getPushDaysText(pushSettings)} {pushSettings.pushTimes.join('、')}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">推送条数：</span>
                        <span className="text-gray-800">{pushSettings.pushCount}条</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center pt-3">
                      <div className="flex items-center gap-2 text-blue-600">
                        <span className="text-sm">点击查看推荐新闻</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 删除按钮 */}
            <div
              className="absolute top-0 right-0 h-full flex items-center"
              style={{
                transform: `translateX(${120 - swipeOffset}px)`,
                transition: isSwipeActive ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white h-full px-8 rounded-l-none rounded-r-lg shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}