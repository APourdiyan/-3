import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Search, 
  Filter, 
  Heart, 
  Share2, 
  PlusCircle, 
  ChevronRight, 
  SlidersHorizontal,
  Info,
  Clock,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PrayerTimesBar } from './components/PrayerTimesBar';
import { HeroSection } from './components/HeroSection';
import { StatsBento } from './components/StatsBento';
import { VenueCard } from './components/VenueCard';
import { VenueDetailModal } from './components/VenueDetailModal';
import { CalendarSyncView } from './components/CalendarSyncView';
import { NeighborhoodsMapSection } from './components/NeighborhoodsMapSection';
import { AIPromptSuite } from './components/AIPromptSuite';
import { CharityServicesSection } from './components/CharityServicesSection';
import { AddVenueOrEventModal } from './components/AddVenueOrEventModal';
import { AIAskAssistantModal } from './components/AIAskAssistantModal';
import { 
  INITIAL_VENUES, 
  INITIAL_CEREMONY_EVENTS, 
  INITIAL_OCCASIONS, 
  INITIAL_NEIGHBORHOODS, 
  AI_PROMPT_TEMPLATES 
} from './data/mockData';
import { Venue, CeremonyEvent, Occasion, NeighborhoodInfo } from './types';

export default function App() {
  // State for Venues and Events with localStorage fallback
  const [venues, setVenues] = useState<Venue[]>(() => {
    const saved = localStorage.getItem('dezful_venues_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_VENUES;
  });

  const [events, setEvents] = useState<CeremonyEvent[]>(() => {
    const saved = localStorage.getItem('dezful_events_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_CEREMONY_EVENTS;
  });

  const [occasions] = useState<Occasion[]>(INITIAL_OCCASIONS);
  const [neighborhoods] = useState<NeighborhoodInfo[]>(INITIAL_NEIGHBORHOODS);

  // Active Main Tab: 'home' | 'venues' | 'calendar' | 'neighborhoods' | 'charity' | 'ai_prompts'
  const [activeTab, setActiveTab] = useState<string>('home');

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhoodFilter, setSelectedNeighborhoodFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'capacity' | 'name' | 'programs'>('capacity');

  // Modals State
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Liked / Bookmarked Venues
  const [likedVenueIds, setLikedVenueIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('dezful_liked_venues');
    return saved ? JSON.parse(saved) : ['v1'];
  });

  // Save to localStorage when venues or events change
  useEffect(() => {
    localStorage.setItem('dezful_venues_data', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('dezful_events_data', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('dezful_liked_venues', JSON.stringify(likedVenueIds));
  }, [likedVenueIds]);

  const handleToggleLike = (id: string) => {
    setLikedVenueIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddVenue = (newVenue: Venue) => {
    setVenues(prev => [newVenue, ...prev]);
  };

  const handleAddEvent = (newEvent: CeremonyEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  // Filtered & Sorted Venues List
  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      // Search query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        v.name.toLowerCase().includes(q) ||
        v.neighborhood.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q) ||
        v.imamJamaat.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.weeklyPrograms.some(p => p.title.toLowerCase().includes(q) || p.instructorOrHost.toLowerCase().includes(q));

      // Category / Quick Filter check
      let matchesCategory = true;
      if (selectedCategory === 'historic') matchesCategory = v.isHistoric;
      if (selectedCategory === 'husseiniya') matchesCategory = v.type === 'husseiniya' || v.type === 'tekyeh';
      if (selectedCategory === 'prayer') matchesCategory = v.prayerSchedule.morning.isCongregational;
      if (selectedCategory === 'charity') matchesCategory = v.charityServices && v.charityServices.length > 0;
      if (selectedCategory === 'virtual_tour') matchesCategory = v.features.hasVirtualTour;

      // Type filter
      let matchesType = true;
      if (selectedTypeFilter !== 'all') {
        matchesType = v.type === selectedTypeFilter;
      }

      // Neighborhood filter
      let matchesNeighborhood = true;
      if (selectedNeighborhoodFilter !== 'all') {
        matchesNeighborhood = v.neighborhood === selectedNeighborhoodFilter;
      }

      return matchesSearch && matchesCategory && matchesType && matchesNeighborhood;
    }).sort((a, b) => {
      if (sortBy === 'capacity') return b.approxCapacity - a.approxCapacity;
      if (sortBy === 'programs') return b.weeklyPrograms.length - a.weeklyPrograms.length;
      return a.name.localeCompare(b.name, 'fa');
    });
  }, [venues, searchQuery, selectedCategory, selectedTypeFilter, selectedNeighborhoodFilter, sortBy]);

  const uniqueNeighborhoods = Array.from(new Set(venues.map(v => v.neighborhood)));

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1C1B1A] flex flex-col font-['Vazirmatn',sans-serif]">
      {/* Top Live Prayer Times Notification Bar */}
      <PrayerTimesBar />

      {/* Main Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        totalVenuesCount={venues.length}
        totalEventsCount={events.length}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* VIEW 1: HOME & OVERVIEW */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Section with Search and Fast Category Chips */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onNavigateToCalendar={() => setActiveTab('calendar')}
              onNavigateToNeighborhoods={() => setActiveTab('neighborhoods')}
              onNavigateToAIPrompts={() => setActiveTab('ai_prompts')}
              totalMosques={venues.filter(v => v.type === 'mosque').length}
              totalHusseiniyas={venues.filter(v => v.type !== 'mosque').length}
              totalEvents={events.length}
            />

            {/* Statistics & Insights Bento */}
            <StatsBento
              venues={venues}
              events={events}
              onFilterType={(type) => {
                setSelectedTypeFilter(type);
                setActiveTab('venues');
              }}
            />

            {/* Featured Mosques & Husseiniyas Directory Preview */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#84320F] flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-[#A34925]" />
                    <span>فهرست مساجد و حسینیه‌های شاخص</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#56423C]">
                    نمایش {filteredVenues.length} مکان مذهبی فعال با امکان بررسی جدول نمازها، صالحین و خیریه
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('venues')}
                    className="text-xs sm:text-sm font-bold text-[#84320F] hover:text-[#A34925] flex items-center gap-1 bg-[#84320F]/10 px-3.5 py-2 rounded-xl"
                  >
                    <span>مشاهده تمام {venues.length} مکان مذهبی</span>
                    <span>←</span>
                  </button>
                </div>
              </div>

              {/* Venues Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVenues.slice(0, 6).map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onSelect={(v) => setSelectedVenue(v)}
                    onToggleLike={handleToggleLike}
                    isLiked={likedVenueIds.includes(venue.id)}
                  />
                ))}
              </div>
            </section>

            {/* Teaser for Calendar Sync */}
            <section className="bg-gradient-to-l from-[#84320F] to-[#5D220A] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#FFDEA5]/20 text-[#FFDEA5] px-3 py-1 rounded-full text-xs font-bold mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>تقویم مناسبتی یکپارچه با برنامه‌ها</span>
                </div>
                <h3 className="text-2xl font-black text-white">امروز و روزهای آینده در مساجد دزفول چه خبر است؟</h3>
                <p className="text-xs sm:text-sm text-[#FFD9CD] mt-1 max-w-xl">
                  دیگر نیازی به سردرگمی بین کانال‌های مختلف نیست؛ تمام مراسمات عزاداری، جشن‌های ولادت، دعای کمیل و ندبه به صورت خودکار در تقویم شهری متصل شده‌اند.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('calendar')}
                className="bg-[#FFDEA5] hover:bg-[#FFE8C2] text-[#380D00] px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                مشاهده تقویم و مراسمات ←
              </button>
            </section>
          </div>
        )}

        {/* VIEW 2: FULL VENUES DIRECTORY */}
        {activeTab === 'venues' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header and Filter Controls */}
            <div className="bg-white rounded-3xl p-6 border border-[#E6E2DF] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E6E2DF]">
                <div>
                  <h2 className="text-2xl font-black text-[#84320F] flex items-center gap-2">
                    <Building2 className="w-6 h-6" />
                    <span>بانک اطلاعات جامع مساجد و حسینیه‌ها</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#56423C] mt-0.5">
                    جستجو و فیلتر پیشرفته بر اساس محله، امکانات رفاهی، سبک معماری و فعالیت‌های هفتگی
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#84320F] hover:bg-[#A34925] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>ثبت مسجد / حسینیه</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                {/* Search Box */}
                <div>
                  <label className="block text-xs font-bold text-[#84320F] mb-1">جستجوی متنی:</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="نام مسجد، امام جماعت، محله..."
                    className="w-full bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3.5 py-2 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-xs font-bold text-[#84320F] mb-1">نوع مکان مذهبی:</label>
                  <select
                    value={selectedTypeFilter}
                    onChange={(e) => setSelectedTypeFilter(e.target.value)}
                    className="w-full bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3.5 py-2 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="all">همه انواع (مسجد، حسینیه، تکیه)</option>
                    <option value="mosque">فقط مساجد</option>
                    <option value="husseiniya">فقط حسینیه‌ها</option>
                    <option value="tekyeh">تکایای سنتی</option>
                    <option value="mahdieh">مهدیه‌ها</option>
                  </select>
                </div>

                {/* Neighborhood Filter */}
                <div>
                  <label className="block text-xs font-bold text-[#84320F] mb-1">انتخاب محله:</label>
                  <select
                    value={selectedNeighborhoodFilter}
                    onChange={(e) => setSelectedNeighborhoodFilter(e.target.value)}
                    className="w-full bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3.5 py-2 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="all">تمام محله‌های دزفول</option>
                    {uniqueNeighborhoods.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-xs font-bold text-[#84320F] mb-1">مرتب‌سازی بر اساس:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3.5 py-2 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="capacity">بیشترین ظرفیت نمازگزار</option>
                    <option value="programs">بیشترین برنامه‌های فعال هفتگی</option>
                    <option value="name">حروف الفبا (نام مکان)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  onSelect={(v) => setSelectedVenue(v)}
                  onToggleLike={handleToggleLike}
                  isLiked={likedVenueIds.includes(venue.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: CALENDAR & SYNCED CEREMONIES */}
        {activeTab === 'calendar' && (
          <CalendarSyncView
            events={events}
            occasions={occasions}
            venues={venues}
            onSelectVenue={(v) => setSelectedVenue(v)}
            onOpenAddEventModal={() => setIsAddModalOpen(true)}
          />
        )}

        {/* VIEW 4: NEIGHBORHOODS & HISTORIC MAP */}
        {activeTab === 'neighborhoods' && (
          <NeighborhoodsMapSection
            neighborhoods={neighborhoods}
            venues={venues}
            onSelectVenue={(v) => setSelectedVenue(v)}
          />
        )}

        {/* VIEW 5: CHARITY & SOCIAL SERVICES */}
        {activeTab === 'charity' && (
          <CharityServicesSection
            venues={venues}
            onSelectVenue={(v) => setSelectedVenue(v)}
          />
        )}

        {/* VIEW 6: AI PROMPT ENGINEERING SUITE */}
        {activeTab === 'ai_prompts' && (
          <AIPromptSuite
            promptTemplates={AI_PROMPT_TEMPLATES}
          />
        )}
      </main>

      {/* Modals */}
      <VenueDetailModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
        allEvents={events}
      />

      <AddVenueOrEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVenue={handleAddVenue}
        onAddEvent={handleAddEvent}
        venuesList={venues}
      />

      <AIAskAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        venues={venues}
        events={events}
        onSelectVenue={(v) => setSelectedVenue(v)}
      />

      {/* Quick Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-5 border border-[#E6E2DF]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E2DF]">
              <span className="font-bold text-sm text-[#84320F]">جستجوی جامع در تمام اطلاعات سامانه</span>
              <button 
                onClick={() => setIsSearchModalOpen(false)}
                className="text-xs text-[#89726B] hover:text-[#1C1B1A]"
              >
                بستن (Esc)
              </button>
            </div>

            <div className="relative mb-4">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="نام مسجد، حسینیه، سخنران، محله، یا موضوع برنامه..."
                className="w-full bg-[#F8F3F0] border border-[#E6E2DF] px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#84320F]"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
              {filteredVenues.slice(0, 5).map(v => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVenue(v);
                    setIsSearchModalOpen(false);
                  }}
                  className="p-3 bg-[#FDF8F5] hover:bg-[#F2EDEA] rounded-xl flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#1C1B1A]">{v.name}</span>
                    <span className="text-[#89726B] block mt-0.5">{v.neighborhood} - امام جماعت: {v.imamJamaat}</span>
                  </div>
                  <span className="text-[#84320F] font-bold">مشاهده ←</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1C1B1A] text-white border-t border-black/30 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10 text-xs sm:text-sm">
            {/* Col 1: About */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#A34925] flex items-center justify-center text-white">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-bold text-base text-[#FFDEA5]">سامانه مساجد و حسینیه‌های دزفول</span>
              </div>
              <p className="text-white/70 leading-relaxed text-xs">
                پایگاه یکپارچه ثبت و معرفی مساجد، تکایا، حسینیه‌ها و بقاع متبرکه بافت تاریخی و نوین دزفول. همگام‌ساز هوشمند تقویم مناسبت‌ها، جلسات قرآنی، حلقه‌های صالحین و شبکه‌های نیکوکاری مردمی.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs sm:text-sm">دسترسی سریع</h4>
              <ul className="space-y-1.5 text-white/70 text-xs">
                <li><button onClick={() => setActiveTab('venues')} className="hover:text-[#FFDEA5]">بانک مساجد و حسینیه‌ها</button></li>
                <li><button onClick={() => setActiveTab('calendar')} className="hover:text-[#FFDEA5]">تقویم مراسمات و مناسبت‌ها</button></li>
                <li><button onClick={() => setActiveTab('neighborhoods')} className="hover:text-[#FFDEA5]">محله‌های کهن و ساباط‌ها</button></li>
                <li><button onClick={() => setActiveTab('charity')} className="hover:text-[#FFDEA5]">مراکز خیریه و قرض‌الحسنه</button></li>
              </ul>
            </div>

            {/* Col 3: Developer & Prompts */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs sm:text-sm">هوش مصنوعی و توسعه</h4>
              <ul className="space-y-1.5 text-white/70 text-xs">
                <li><button onClick={() => setActiveTab('ai_prompts')} className="hover:text-[#A0EFFA] text-[#A0EFFA]">پرامپت‌های ساخت سامانه</button></li>
                <li><button onClick={() => setIsAIAssistantOpen(true)} className="hover:text-[#FFDEA5]">گفتگو با دستیار هوشمند</button></li>
                <li><button onClick={() => setIsAddModalOpen(true)} className="hover:text-[#FFDEA5]">ثبت مسجد یا مراسم جدید</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
            <span>© ۱۴۰۳ - طراحی و توسعه یافته با دیزاین سیستم Heritage-Modern دزفول</span>
            <span>طراحی با تمرکز بر سرعت، کارایی، تایپوگرافی فارسی و دسترسی‌پذیری</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
