import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ArrowLeft, Camera, User, Mail, Phone, Calendar } from 'lucide-react';

interface EditProfilePageProps {
  onBack: () => void;
}

export function EditProfilePage({ onBack }: EditProfilePageProps) {
  const [name, setName] = useState('张三');
  const [bio, setBio] = useState('科技爱好者');
  const [email, setEmail] = useState('zhangsan@example.com');
  const [phone, setPhone] = useState('138****8888');
  const [birthday, setBirthday] = useState('1990-01-01');

  const handleSave = () => {
    // 保存用户信息的逻辑
    console.log('保存用户信息:', { name, bio, email, phone, birthday });
    onBack();
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
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-800">编辑资料</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* 头像设置 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-blue-500 text-white text-2xl">张</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-blue-500 hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-600 text-sm text-center">点击相机图标更换头像</p>
              </div>
            </CardContent>
          </Card>

          {/* 基本信息 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                基本信息
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <Input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-lg"
                  placeholder="简单介绍一下自己..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 联系信息 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                联系信息
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* 个人详情 */}
          <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                个人详情
              </h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthday">生日</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          <div className="flex gap-3 pb-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 rounded-lg"
            >
              取消
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 rounded-lg bg-blue-500 hover:bg-blue-600"
            >
              保存
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}