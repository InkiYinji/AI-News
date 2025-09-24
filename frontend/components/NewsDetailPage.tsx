import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  keywords?: string[];
}

interface NewsDetailPageProps {
  newsItem: NewsItem;
  onBack: () => void;
}

export function NewsDetailPage({ newsItem, onBack }: NewsDetailPageProps) {
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

  return (
    <div className="h-full bg-gradient-to-b from-blue-50/30 to-white">
      {/* 标题栏 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-center flex-1 text-gray-800">新闻详情</h1>
        </div>
      </div>

      {/* 新闻内容 */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge 
                  variant="secondary" 
                  className={`${getCategoryColor(newsItem.category)} rounded-lg`}
                >
                  {newsItem.category}
                </Badge>
                <span className="text-gray-500 text-sm">{newsItem.publishTime}</span>
              </div>
              <h1 className="text-xl leading-relaxed text-gray-900">{newsItem.title}</h1>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 新闻图片 */}
              <div className="w-full h-52 overflow-hidden rounded-xl">
                <ImageWithFallback
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 新闻概述 */}
              <div className="space-y-3">
                <h3 className="text-gray-800">新闻概述</h3>
                <p className="text-gray-700 leading-relaxed">
                  {newsItem.fullContent}
                </p>
              </div>

              {/* 新闻来源 */}
              <div className="bg-gray-50/80 rounded-xl p-4 space-y-4">
                <div>
                  <h3 className="text-gray-800 mb-2">新闻来源</h3>
                  <p className="text-gray-600">{newsItem.source}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-800 mb-2">原文链接</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 rounded-lg"
                    onClick={() => window.open(newsItem.sourceLink, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    查看原文
                  </Button>
                </div>
              </div>

              {/* 相关推荐 */}
              <div className="space-y-3">
                <h3 className="text-gray-800">相关推荐</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="rounded-lg">更多{newsItem.category}新闻</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">AI相关资讯</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">热门推荐</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}