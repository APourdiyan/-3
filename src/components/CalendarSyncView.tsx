import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CalendarDays, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  MapPin, 
  User, 
  Mic2, 
  Sparkles, 
  Share2, 
  Bell, 
  Filter, 
  CheckCircle,
  Download,
  Building2,
  Shield,
  Layers
} from 'lucide-react';
import { CeremonyEvent, Occasion, Venue } from '../types';

interface CalendarSyncViewProps {
  events: CeremonyEvent[];
  occasions: Occasion[];
  venues: Venue[];
  onSelectVenue?: (venue: Venue) => void;
  onOpenAddEventModal: () => void;
}

export const CalendarSyncView: React.FC<CalendarSyncViewProps> = ({
  events,
  occasions,
  venues,
  onSelectVenue,
  onOpenAddEventModal
}) => {
  // We simulate the current active month (آبان و آذر ۱۴۰۳)
  const [selectedDate, setSelectedDate] = useState<string>('1403/08/24');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('all');
  const [savedReminders, setSavedReminders] = useState<Record<string, boolean>>({});

  // Simulated days of Aban 1403 (10 to 30)
  const daysInMonth = [
    { day: 15, dateStr: '1403/08/15', dayName: 'سه‌شنبه' },
    { day: 16, dateStr: '1403/08/16', dayName: 'چهارشنبه' },
    { day: 17, dateStr: '1403/08/17', dayName: 'پنج‌شنبه' },
    { day: 18, dateStr: '1403/08/18', dayName: 'جمعه' },
    { day: 19, dateStr: '1403/08/19', dayName: 'شنبه' },
    { day: 20, dateStr: '1403/08/20', dayName: 'یکشنبه' },
    { day: 21, dateStr: '1403/08/21', dayName: 'دوشنبه' },
    { day: 22, dateStr: '1403/08/22', dayName: 'سه‌شنبه' },
    { day: 23, dateStr: '1403/08/23', dayName: 'چهارشنبه' },
    { day: 24, dateStr: '1403/08/24', dayName: 'پنج‌شنبه' },
    { day: 25, dateStr: '1403/08/25', dayName: 'جمعه' },
    { day: 26, dateStr: '1403/08/26', dayName: 'شنبه' },
    { day: 27, dateStr: '1403/08/27', dayName: 'یکشنبه' },
    { day: 28, dateStr: '1403/08/28', dayName: 'دوشنبه' },
    { day: 29, dateStr: '1403/08/29', dayName: 'سه‌شنبه' },
    { day: 30, dateStr: '1403/08/30', dayName: 'چهارشنبه' },
  ];

  // Get active occasion for selected date
  const currentOccasion = occasions.find(o => o.solarDate === selectedDate);

  // Filter events for the selected date or overall
  const eventsOnSelectedDate = events.filter(ev => {
    const matchesDate = ev.date === selectedDate;
    const matchesType = eventTypeFilter === 'all' || ev.type === eventTypeFilter;
    const matchesNeighborhood = neighborhoodFilter === 'all' || ev.neighborhood === neighborhoodFilter;
    return matchesDate && matchesType && matchesNeighborhood;
  });

  // Unique neighborhoods for filter
  const neighborhoods = Array.from(new Set(venues.map(v => v.neighborhood)));

  const toggleReminder = (eventId: string) => {
    setSavedReminders(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleExportICS = () => {
    // Generate iCal content for download
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Dezful Mosques and Husseiniyas Calendar//FA\nCALSCALE:GREGORIAN\n";
    events.forEach(ev => {
      icsContent += `BEGIN:VEVENT\nSUMMARY:${ev.title}\nLOCATION:${ev.venueName}, ${ev.neighborhood}\nDESCRIPTION:${ev.description}\\nسخنران: ${ev.speaker || ''}\\nمداح: ${ev.eulogist || ''}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dezful-ceremonies-calendar.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Calendar Header Banner */}
      <div className="bg-gradient-to-l from-[#84320F] via-[#A34925] to-[#7E5F1F] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFDEA5]/20 border border-[#FFDEA5]/30 text-[#FFDEA5] px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>موتور همگام‌ساز هوشمند تقویم مناسبتی و مراسمات مساجد</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">تقویم جامع مناسبت‌ها و برنامه‌های دزفول</h2>
            <p className="text-xs sm:text-sm text-[#FFD9CD] mt-1 max-w-2xl">
              تقویم زنده رویدادهای مذهبی؛ با انتخاب هر روز، تمام مساجد و حسینیه‌هایی که در آن تاریخ برنامه، عزاداری، جشن یا محفل قرآنی دارند را بلافاصله مشاهده کنید.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleExportICS}
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all backdrop-blur-md"
              title="دانلود فایل تقویم برای اضافه به گوشی و گوگل کلندر"
            >
              <Download className="w-4 h-4 text-[#FFDEA5]" />
              <span>خروجی تقویم (.ics)</span>
            </button>

            <button
              onClick={onOpenAddEventModal}
              className="bg-[#FFDEA5] hover:bg-[#FFE8C2] text-[#380D00] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>ثبت مراسم جدید در تقویم</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Calendar Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E6E2DF] shadow-sm">
        {/* Month Selector Bar */}
        <div className="flex items-center justify-between border-b border-[#E6E2DF] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#84320F]/10 text-[#84320F] flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-[#1C1B1A]">آبان و آذر ماه ۱۴۰۳</h3>
              <span className="text-xs text-[#89726B]">ربیع‌الثانی و جمادی‌الاول ۱۴۴۶ هـ.ق</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#56423C] hidden sm:inline">روز مورد نظر خود را برای مشاهده رویدادها انتخاب کنید:</span>
          </div>
        </div>

        {/* Days Horizontal Carousel */}
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2 mb-6">
          {daysInMonth.map((d) => {
            const isSelected = selectedDate === d.dateStr;
            const hasOccasion = occasions.some(o => o.solarDate === d.dateStr);
            const eventsCountForDay = events.filter(e => e.date === d.dateStr).length;
            const dayOccasion = occasions.find(o => o.solarDate === d.dateStr);

            return (
              <button
                key={d.dateStr}
                onClick={() => setSelectedDate(d.dateStr)}
                className={`relative p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                  isSelected
                    ? 'bg-[#84320F] text-white border-[#84320F] shadow-md scale-105 z-10'
                    : hasOccasion
                    ? 'bg-[#FFDEA5]/25 hover:bg-[#FFDEA5]/40 text-[#1C1B1A] border-[#FFDEA5]'
                    : 'bg-[#FDF8F5] hover:bg-[#F2EDEA] text-[#56423C] border-[#E6E2DF]'
                }`}
              >
                <span className={`text-[10px] font-bold ${isSelected ? 'text-white/80' : 'text-[#89726B]'}`}>
                  {d.dayName}
                </span>
                <span className="text-lg font-black my-0.5">{d.day}</span>

                {/* Event or Occasion indicators */}
                <div className="flex items-center gap-1 mt-1">
                  {eventsCountForDay > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white text-[#84320F]' : 'bg-[#006972] text-white'
                    }`}>
                      {eventsCountForDay}
                    </span>
                  )}
                  {hasOccasion && (
                    <span 
                      className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FFDEA5]' : dayOccasion?.type === 'celebration' ? 'bg-emerald-600' : 'bg-red-500'}`}
                      title={dayOccasion?.title}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Date Occasion Highlight Banner */}
        {currentOccasion && (
          <div className={`p-4 rounded-2xl mb-6 border flex items-start justify-between gap-3 ${
            currentOccasion.type === 'celebration'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : currentOccasion.type === 'mourning'
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                currentOccasion.type === 'celebration' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/70">
                    مناسبت رسمی تقویم ({currentOccasion.hijriDate})
                  </span>
                  {currentOccasion.isHoliday && (
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-md font-bold">تعطیل رسمی</span>
                  )}
                </div>
                <h4 className="font-extrabold text-base mt-1">{currentOccasion.title}</h4>
                <p className="text-xs opacity-85 mt-0.5">{currentOccasion.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters Bar for Events */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-[#E6E2DF] mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#84320F]">
            <Filter className="w-4 h-4" />
            <span>فیلتر مراسمات این روز:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Type selector */}
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3 py-1.5 rounded-xl font-medium focus:outline-none"
            >
              <option value="all">همه موضوعات مراسمات</option>
              <option value="mourning">عزاداری و سوگواری</option>
              <option value="celebration">جشن و میلاد</option>
              <option value="prayer_dua">دعا و مناجات (ندبه/کمیل)</option>
              <option value="quran">محافل قرآنی و تجوید</option>
              <option value="workshop">کارگاه و نشست تخصصی</option>
            </select>

            {/* Neighborhood selector */}
            <select
              value={neighborhoodFilter}
              onChange={(e) => setNeighborhoodFilter(e.target.value)}
              className="bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3 py-1.5 rounded-xl font-medium focus:outline-none"
            >
              <option value="all">همه محله‌های شهر</option>
              {neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Synced Events List for Selected Day */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base text-[#1C1B1A] flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#84320F]" />
              <span>مراسمات مساجد و حسینیه‌ها در تاریخ {selectedDate}</span>
            </h4>
            <span className="text-xs font-bold bg-[#A34925]/10 text-[#84320F] px-2.5 py-1 rounded-full">
              {eventsOnSelectedDate.length} برنامه هماهنگ شده
            </span>
          </div>

          {eventsOnSelectedDate.length === 0 ? (
            <div className="bg-[#FDF8F5] rounded-2xl p-8 border border-dashed border-[#E6E2DF] text-center">
              <CalendarDays className="w-12 h-12 text-[#89726B] mx-auto mb-2 opacity-50" />
              <h5 className="font-bold text-sm text-[#1C1B1A]">برنامه مناسبتی ویژه‌ای برای این تاریخ ثبت نشده است</h5>
              <p className="text-xs text-[#89726B] max-w-md mx-auto mt-1 mb-4">
                نمازهای جماعت و محافل قرآنی مستمر مساجد طبق روال عادی برقرار است. اگر متولی مسجدی هستید، برنامه خود را ثبت کنید.
              </p>
              <button
                onClick={onOpenAddEventModal}
                className="bg-[#84320F] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#A34925] transition-colors"
              >
                ثبت مراسم در این تاریخ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventsOnSelectedDate.map((ev) => {
                const venueObj = venues.find(v => v.id === ev.venueId);
                const isSaved = savedReminders[ev.id];

                return (
                  <div
                    key={ev.id}
                    className="bg-[#FDF8F5] hover:bg-white rounded-2xl p-5 border border-[#E6E2DF] hover:border-[#84320F]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      {/* Venue & Time Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div 
                          onClick={() => venueObj && onSelectVenue?.(venueObj)}
                          className="flex items-center gap-1.5 text-xs font-extrabold text-[#84320F] hover:underline cursor-pointer"
                        >
                          {ev.venueType === 'mosque' ? <Building2 className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                          <span>{ev.venueName}</span>
                          <span className="text-[11px] font-normal text-[#89726B]">({ev.neighborhood})</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold bg-black/5 text-[#006972] px-2.5 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          <span>ساعت {ev.time}</span>
                        </div>
                      </div>

                      {/* Event Title */}
                      <h4 className="font-black text-base text-[#1C1B1A] group-hover:text-[#84320F] transition-colors mb-2">
                        {ev.title}
                      </h4>

                      {/* Speakers & Eulogists */}
                      <div className="bg-white p-3 rounded-xl border border-[#E6E2DF]/60 space-y-1.5 text-xs text-[#56423C] mb-2">
                        {ev.speaker && (
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-[#84320F]" />
                            <span>سخنران: <strong className="text-[#1C1B1A]">{ev.speaker}</strong></span>
                          </div>
                        )}
                        {ev.eulogist && (
                          <div className="flex items-center gap-2">
                            <Mic2 className="w-3.5 h-3.5 text-[#006972]" />
                            <span>مداح / قاری: <strong className="text-[#1C1B1A]">{ev.eulogist}</strong></span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-[#56423C] line-clamp-2 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-[#E6E2DF]/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleReminder(ev.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSaved
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-white border border-[#E6E2DF] text-[#56423C] hover:bg-[#F2EDEA]'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>{isSaved ? 'یادآور فعال شد' : 'تنظیم یادآور'}</span>
                      </button>

                      {venueObj && (
                        <button
                          onClick={() => onSelectVenue?.(venueObj)}
                          className="text-xs font-bold text-[#84320F] hover:text-[#A34925] flex items-center gap-1"
                        >
                          <span>مشاهده مسجد و مسیر</span>
                          <span>←</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
