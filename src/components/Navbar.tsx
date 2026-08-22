import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Sparkles, 
  PlusCircle, 
  Search, 
  Menu, 
  X, 
  Home, 
  HeartHandshake,
  MessageSquareText,
  Compass
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAddModal: () => void;
  onOpenAIAssistant: () => void;
  totalVenuesCount: number;
  totalEventsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAddModal,
  onOpenAIAssistant,
  totalVenuesCount,
  totalEventsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'صفحه اصلی', icon: Home },
    { id: 'venues', label: 'مساجد و حسینیه‌ها', icon: Building2, badge: totalVenuesCount },
    { id: 'calendar', label: 'تقویم و مراسمات', icon: Calendar, badge: totalEventsCount },
    { id: 'neighborhoods', label: 'محله‌ها و نقشه', icon: MapPin },
    { id: 'charity', label: 'خیریه و خدمات', icon: HeartHandshake },
    { id: 'ai_prompts', label: 'پرامپت‌های هوش مصنوعی', icon: Sparkles, highlight: true },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDF8F5]/95 backdrop-blur-md border-b border-[#E6E2DF] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#56423C] hover:bg-[#F2EDEA] transition-colors"
            aria-label="منو"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#84320F] to-[#A34925] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-[#84320F] tracking-tight">مساجد و حسینیه‌های دزفول</span>
                <span className="text-[10px] font-bold bg-[#A34925]/15 text-[#84320F] px-1.5 py-0.5 rounded-md border border-[#84320F]/20">جامع</span>
              </div>
              <p className="text-[11px] text-[#56423C] hidden sm:block">راهنمای هوشمند برنامه‌ها، تقویم مناسبتی و خیریه</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#A34925] text-white shadow-sm font-semibold'
                    : item.highlight
                    ? 'text-[#006972] bg-[#006972]/10 hover:bg-[#006972]/20 font-bold border border-[#006972]/30'
                    : 'text-[#56423C] hover:bg-[#F2EDEA] hover:text-[#1C1B1A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#006972]' : 'text-[#89726B]'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E6E2DF] text-[#56423C]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* AI Helper Button */}
          <button
            id="ai-assistant-btn"
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 bg-gradient-to-l from-[#006972] to-[#086D77] text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 transition-all active:scale-95"
            title="پرسش و پاسخ هوشمند درباره مراسمات و مساجد"
          >
            <MessageSquareText className="w-4 h-4" />
            <span className="hidden sm:inline">دستیار هوشمند</span>
          </button>

          {/* Quick Search */}
          <button
            id="search-trigger-btn"
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl bg-[#F2EDEA] hover:bg-[#E6E2DF] text-[#56423C] transition-colors"
            title="جستجوی سریع"
            aria-label="جستجو"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Register Venue / Event */}
          <button
            id="add-venue-event-btn"
            onClick={onOpenAddModal}
            className="hidden sm:flex items-center gap-1.5 border border-[#84320F]/30 bg-[#84320F]/10 hover:bg-[#84320F]/20 text-[#84320F] px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all"
            title="ثبت مسجد، حسینیه یا مراسم جدید"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ثبت مکان یا مراسم</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDF8F5] border-b border-[#E6E2DF] px-4 py-3 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-[#A34925] text-white font-bold'
                    : item.highlight
                    ? 'bg-[#006972]/10 text-[#006972] font-bold border border-[#006972]/30'
                    : 'text-[#1C1B1A] hover:bg-[#F2EDEA]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E6E2DF] text-[#56423C]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#E6E2DF] flex gap-2">
            <button
              onClick={() => {
                onOpenAddModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#84320F] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت مسجد / مراسم جدید</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
