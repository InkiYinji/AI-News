import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, HelpCircle, MessageSquare, Star, Mail, Phone, Globe } from 'lucide-react';

interface HelpFeedbackPageProps {
  onBack: () => void;
}

export function HelpFeedbackPage({ onBack }: HelpFeedbackPageProps) {
  const [feedbackText, setFeedbackText] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitFeedback = () => {
    // 提交反馈的逻辑
    console.log('提交反馈:', { feedbackText, contactEmail, rating });
    setFeedbackText('');
    setContactEmail('');
    setRating(0);
  };

  const faqData = [
    {
      question: "如何设置个性化新闻推送？",
      answer: "在主页面设置推送时间、推送条数和感兴趣的新闻关键词，确认后即可接收个性化推荐。"
    },
    {
      question: "刷新点是什么，如何获得更多？",
      answer: "刷新点用于获取更多个性化推荐。您可以通过每日签到、分享新闻、邀请好友等方式获得，也可以直接充值购买。"
    },
    {
      question: "如何更改推送通知设置？",
      answer: "进入我的页面 > 消息通知，可以设置通知类型、声音、震动和免打扰时间等选项。"
    },
    {
      question: "为什么收不到新闻推送？",
      answer: "请检查：1) 是否开启了推送通知权限；2) 是否在免打扰时间内；3) 网络连接是否正常；4) 应用是否为最新版本。"
    },
    {
      question: "如何删除阅读历史？",
      answer: "进入我的页面 > 隐私设置 > 阅读数据，点击\"清除阅读历史\"即可删除所有记录。"
    },
    {
      question: "如何更换头像和个人信息？",
      answer: "在我的页面点击用户信息卡片，进入编辑页面即可修改头像、姓名、简介等信息。"
    }
  ];

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
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-800">帮助与反馈</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 常见问题 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                常见问题
              </h3>
            </CardHeader>
            <CardContent className="pt-0">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* 意见反馈 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                意见反馈
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {/* 评分 */}
              <div className="space-y-2">
                <p className="text-gray-900">您对我们的应用满意吗？</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </Button>
                  ))}
                </div>
              </div>

              {/* 反馈内容 */}
              <div className="space-y-2">
                <p className="text-gray-900">详细反馈</p>
                <Textarea
                  placeholder="请描述您遇到的问题或建议..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="min-h-24 rounded-lg"
                />
              </div>

              {/* 联系方式 */}
              <div className="space-y-2">
                <p className="text-gray-900">联系邮箱（可选）</p>
                <Input
                  type="email"
                  placeholder="您的邮箱地址"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="rounded-lg"
                />
                <p className="text-gray-500 text-xs">
                  提供邮箱后，我们会及时回复您的反馈
                </p>
              </div>

              <Button 
                onClick={handleSubmitFeedback}
                className="w-full rounded-lg bg-blue-500 hover:bg-blue-600"
                disabled={!feedbackText.trim()}
              >
                提交反馈
              </Button>
            </CardContent>
          </Card>

          {/* 联系我们 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">联系我们</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-900">邮箱支持</p>
                  <p className="text-gray-600 text-sm">support@newsapp.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-900">客服热线</p>
                  <p className="text-gray-600 text-sm">400-888-8888</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-900">官方网站</p>
                  <p className="text-gray-600 text-sm">www.newsapp.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 应用信息 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800">应用信息</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">版本</span>
                <span className="text-gray-900">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">更新时间</span>
                <span className="text-gray-900">2025-01-20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">应用大小</span>
                <span className="text-gray-900">45.2 MB</span>
              </div>
              
              <div className="pt-3 space-y-2">
                <Button variant="outline" className="w-full rounded-lg">
                  检查更新
                </Button>
                <Button variant="outline" className="w-full rounded-lg">
                  用户使用协议
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}