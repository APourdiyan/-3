import React from 'react';
import { Search, Compass, Sparkles, Building2, Calendar, MapPin, HeartHandshake, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onNavigateToCalendar: () => void;
  onNavigateToNeighborhoods: () => void;
  onNavigateToAIPrompts: () => void;
  totalMosques: number;
  totalHusseiniyas: number;
  totalEvents: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onNavigateToCalendar,
  onNavigateToNeighborhoods,
  onNavigateToAIPrompts,
  totalMosques,
  totalHusseiniyas,
  totalEvents
}) => {
  const quickFilters = [
    { id: 'all', label: 'همه اماکن', icon: Building2 },
    { id: 'historic', label: 'مساجد و ابنیه تاریخی', icon: Compass },
    { id: 'husseiniya', label: 'حسینیه‌ها و تکایا', icon: ShieldCheck },
    { id: 'prayer', label: 'نماز جماعت فعال', icon: Building2 },
    { id: 'charity', label: 'صندوق خیریه و نیکوکاری', icon: HeartHandshake },
    { id: 'virtual_tour', label: 'دارای تور مجازی ۳۶۰°', icon: Sparkles },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#84320F]/90 to-[#5D220A] text-white shadow-xl mb-10">
      {/* Background Architectural Texture Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center">
        {/* City of Bricks Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFDEA5]/15 border border-[#FFDEA5]/30 text-[#FFDEA5] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#FFDEA5]" />
          <span>میراث معنوی و معماری آجری دزفول (شهر آجر و هزار مسجد)</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
          سامانه جامع مساجد، حسینیه‌ها و تقویم مراسمات
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#FFD9CD] max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          راهنمای مساجد و حسینیه‌های شهر، جدول فعالیت‌ها و برنامه‌های هفتگی (نماز جماعت، حلقه‌های صالحین، آموزش قرآن)، صندوق‌های خیریه و تقویم مناسبتی یکپارچه با رویدادهای زنده.
        </p>

        {/* Main Search Input */}
        <div className="w-full max-w-2xl relative mb-6 group">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84320F] pointer-events-none">
            <Search className="w-6 h-6" />
          </div>
          <input
            id="hero-main-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی نام مسجد، حسینیه، محله، پیش‌نماز، سخنران، مداح یا نوع برنامه..."
            className="w-full h-14 pr-13 pl-4 rounded-2xl bg-white text-[#1C1B1A] placeholder:text-[#89726B] font-medium text-sm sm:text-base shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#006972]/40 transition-all border border-white/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#89726B] hover:text-[#1C1B1A] bg-[#F2EDEA] px-2 py-1 rounded-md"
            >
              پاک کردن
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl">
          {quickFilters.map((qf) => {
            const isSelected = selectedCategory === qf.id;
            return (
              <button
                key={qf.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : qf.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all backdrop-blur-md ${
                  isSelected
                    ? 'bg-[#FFDEA5] text-[#380D00] shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                }`}
              >
                <qf.icon className="w-3.5 h-3.5" />
                <span>{qf.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
          <button 
            onClick={onNavigateToCalendar}
            className="bg-white/10 hover:bg-white/15 border border-white/20 p-3.5 rounded-2xl flex items-center justify-between text-right transition-all group hover:translate-y-[-2px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006972] text-white flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-white/70">مناسبت‌های پیش‌رو</span>
                <span className="font-bold text-sm text-white">تقویم مراسمات ({totalEvents} رویداد)</span>
              </div>
            </div>
            <span className="text-white/60 text-xs group-hover:translate-x-[-2px] transition-transform">←</span>
          </button>

          <button 
            onClick={onNavigateToNeighborhoods}
            className="bg-white/10 hover:bg-white/15 border border-white/20 p-3.5 rounded-2xl flex items-center justify-between text-right transition-all group hover:translate-y-[-2px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7E5F1F] text-white flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-white/70">کاوش در بافت تاریخی</span>
                <span className="font-bold text-sm text-white">راهنمای محله‌ها و ساباط‌ها</span>
              </div>
            </div>
            <span className="text-white/60 text-xs group-hover:translate-x-[-2px] transition-transform">←</span>
          </button>

          <button 
            onClick={onNavigateToAIPrompts}
            className="bg-white/10 hover:bg-white/15 border border-[#A0EFFA]/40 p-3.5 rounded-2xl flex items-center justify-between text-right transition-all group hover:translate-y-[-2px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#006972] to-[#A0EFFA] text-[#001F23] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-[#A0EFFA]">جعبه ابزار توسعه‌دهنده</span>
                <span className="font-bold text-sm text-white">پرامپت‌های هوش مصنوعی</span>
              </div>
            </div>
            <span className="text-white/60 text-xs group-hover:translate-x-[-2px] transition-transform">←</span>
          </button>
        </div>
      </div>
    </section>
  );
};
