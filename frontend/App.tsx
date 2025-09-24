import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { NewsPage } from './components/NewsPage';
import { NewsDetailPage } from './components/NewsDetailPage';
import { ProfilePage } from './components/ProfilePage';
import { EditProfilePage } from './components/EditProfilePage';
import { GeneralSettingsPage } from './components/GeneralSettingsPage';
import { NotificationSettingsPage } from './components/NotificationSettingsPage';
import { PrivacySettingsPage } from './components/PrivacySettingsPage';
import { HelpFeedbackPage } from './components/HelpFeedbackPage';
import { BottomNavigation } from './components/BottomNavigation';
import TestPage from './components/TestPage';

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

interface PushSettings {
  pushDays: string[];
  pushTimes: string[];
  pushCount: number;
  everyday: boolean;
  keywords: string[];
}

type ProfileSubPage = 'main' | 'edit-profile' | 'general-settings' | 'notifications' | 'privacy' | 'help-feedback';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [pushSettings, setPushSettings] = useState<PushSettings | null>(null);
  const [showNewsList, setShowNewsList] = useState(false);
  const [profileSubPage, setProfileSubPage] = useState<ProfileSubPage>('main');
  const [showTestPage, setShowTestPage] = useState(false); // 添加测试页面状态

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleBackToNews = () => {
    setSelectedNews(null);
  };

  const handleBackToSummary = () => {
    setShowNewsList(false);
  };

  const handleSummaryClick = () => {
    setShowNewsList(true);
  };

  const handleSearchComplete = (keywords: string[], settings: PushSettings) => {
    setSearchKeywords(keywords);
    setPushSettings(settings);
    setShowNewsList(false); // 重置到摘要界面
    // 自动切换到新闻页面
    setActiveTab('news');
  };

  const handleDeleteSettings = () => {
    setPushSettings(null);
    setSearchKeywords([]);
    setShowNewsList(false);
  };

  const handleProfileNavigation = (page: ProfileSubPage) => {
    setProfileSubPage(page);
  };

  const handleBackToProfile = () => {
    setProfileSubPage('main');
  };

  // 添加测试页面切换函数
  const toggleTestPage = () => {
    setShowTestPage(!showTestPage);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <button 
          onClick={toggleTestPage}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {showTestPage ? '返回登录' : '测试样式'}
        </button>
        {showTestPage ? <TestPage /> : <LoginPage onLogin={handleLogin} />}
      </div>
    );
  }

  // 如果选中了新闻，显示新闻详情页
  if (selectedNews) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          <NewsDetailPage 
            newsItem={selectedNews} 
            onBack={handleBackToNews}
          />
        </div>
      </div>
    );
  }

  const renderProfilePage = () => {
    switch (profileSubPage) {
      case 'edit-profile':
        return <EditProfilePage onBack={handleBackToProfile} />;
      case 'general-settings':
        return <GeneralSettingsPage onBack={handleBackToProfile} />;
      case 'notifications':
        return <NotificationSettingsPage onBack={handleBackToProfile} />;
      case 'privacy':
        return <PrivacySettingsPage onBack={handleBackToProfile} />;
      case 'help-feedback':
        return <HelpFeedbackPage onBack={handleBackToProfile} />;
      default:
        return <ProfilePage onNavigate={handleProfileNavigation} />;
    }
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onSearchComplete={handleSearchComplete} />;
      case 'news':
        return (
          <NewsPage 
            onNewsClick={handleNewsClick} 
            searchKeywords={searchKeywords} 
            pushSettings={pushSettings}
            showNewsList={showNewsList}
            onSummaryClick={handleSummaryClick}
            onBackToSummary={handleBackToSummary}
            onDeleteSettings={handleDeleteSettings}
          />
        );
      case 'profile':
        return renderProfilePage();
      default:
        return <HomePage onSearchComplete={handleSearchComplete} />;
    }
  };

  // 如果在个人资料子页面，不显示底部导航
  const showBottomNav = profileSubPage === 'main';

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderCurrentPage()}
      </div>
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      )}
    </div>
  );
}