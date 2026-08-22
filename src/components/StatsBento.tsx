import React from 'react';
import { Building2, Shield, CalendarDays, HeartHandshake, Users, BookOpen, Clock } from 'lucide-react';
import { Venue, CeremonyEvent } from '../types';

interface StatsBentoProps {
  venues: Venue[];
  events: CeremonyEvent[];
  onFilterType?: (type: string) => void;
}

export const StatsBento: React.FC<StatsBentoProps> = ({ venues, events, onFilterType }) => {
  const mosqueCount = venues.filter(v => v.type === 'mosque').length;
  const husseiniyaCount = venues.filter(v => v.type === 'husseiniya' || v.type === 'tekyeh' || v.type === 'mahdieh').length;
  const historicCount = venues.filter(v => v.isHistoric).length;
  const activeCharitiesCount = venues.reduce((acc, v) => acc + (v.charityServices?.length || 0), 0);
  const totalWeeklyPrograms = venues.reduce((acc, v) => acc + (v.weeklyPrograms?.length || 0), 0);
  const upcomingEventsCount = events.filter(e => e.status === 'upcoming').length;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#84320F] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#A34925]" />
            <span>شناسنامه و آمار مساجد و حسینیه‌های شهر</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#56423C]">
            پوشش جامع اماکن مذهبی، تنوع فعالیت‌های فرهنگی، خیریه‌ها و تجمعات مردمی
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Mosques */}
        <div 
          onClick={() => onFilterType?.('mosque')}
          className="bg-white rounded-2xl p-4 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all hover:border-[#84320F]/40 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#89726B]">تعداد مساجد</span>
            <div className="w-8 h-8 rounded-xl bg-[#84320F]/10 text-[#84320F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#84320F] tracking-tight">{mosqueCount} <span className="text-xs font-normal text-[#56423C]">مسجد</span></div>
          <p className="text-[11px] text-[#56423C] mt-1">شامل مساجد جامع و محله‌ای</p>
        </div>

        {/* Total Husseiniyas & Tekyehs */}
        <div 
          onClick={() => onFilterType?.('husseiniya')}
          className="bg-white rounded-2xl p-4 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all hover:border-[#006972]/40 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#89726B]">حسینیه‌ها و تکایا</span>
            <div className="w-8 h-8 rounded-xl bg-[#006972]/10 text-[#006972] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#006972] tracking-tight">{husseiniyaCount} <span className="text-xs font-normal text-[#56423C]">مجموعه</span></div>
          <p className="text-[11px] text-[#56423C] mt-1">حسینیه، تکیه و مهدیه</p>
        </div>

        {/* Weekly Programs & Salihin */}
        <div className="bg-white rounded-2xl p-4 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all hover:border-[#7E5F1F]/40 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#89726B]">برنامه‌های مستمر</span>
            <div className="w-8 h-8 rounded-xl bg-[#7E5F1F]/10 text-[#7E5F1F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#7E5F1F] tracking-tight">{totalWeeklyPrograms}+ <span className="text-xs font-normal text-[#56423C]">جلسه</span></div>
          <p className="text-[11px] text-[#56423C] mt-1">صالحین، قرآن و مهدویت</p>
        </div>

        {/* Synced Events & Ceremonies */}
        <div className="bg-white rounded-2xl p-4 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all hover:border-[#84320F]/40 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#89726B]">مراسمات همگام</span>
            <div className="w-8 h-8 rounded-xl bg-[#A34925]/10 text-[#A34925] flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#A34925] tracking-tight">{upcomingEventsCount} <span className="text-xs font-normal text-[#56423C]">رویداد</span></div>
          <p className="text-[11px] text-[#56423C] mt-1">ثبت شده در تقویم مناسبتی</p>
        </div>

        {/* Charity & Welfare */}
        <div className="bg-white rounded-2xl p-4 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all hover:border-emerald-600/40 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#89726B]">مراکز نیکوکاری</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">{activeCharitiesCount} <span className="text-xs font-normal text-[#56423C]">صندوق</span></div>
          <p className="text-[11px] text-[#56423C] mt-1">قرض‌الحسنه و توزیع معیشتی</p>
        </div>

        {/* Historic & Heritage */}
        <div className="bg-white rounded-2xl p-4 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all hover:border-amber-600/40 cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#89726B]">آثار ملی ثبت‌شده</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900 tracking-tight">{historicCount} <span className="text-xs font-normal text-[#56423C]">بنای کهن</span></div>
          <p className="text-[11px] text-[#56423C] mt-1">دوران ساسانی، صفوی، قاجار</p>
        </div>
      </div>
    </section>
  );
};
