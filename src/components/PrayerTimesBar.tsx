import React, { useState, useEffect } from 'react';
import { PRAYER_TIMES_DEZFUL } from '../data/mockData';

export const PrayerTimesBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{ name: string; time: string; remaining: string }>({
    name: 'اذان مغرب',
    time: PRAYER_TIMES_DEZFUL.maghrib,
    remaining: '۲ ساعت و ۱۸ دقیقه'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="prayer-times-widget" className="w-full bg-gradient-to-l from-[#004f56] via-[#006972] to-[#086d77] text-white py-2.5 px-4 shadow-md text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 md:gap-4">
        {/* Left side info */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A0EFFA] animate-pulse"></span>
          <span className="font-bold text-[#FFDEA5]">اوقات شرعی دزفول</span>
          <span className="text-white/70 hidden sm:inline">|</span>
          <span className="text-white/80 hidden sm:inline">
            تا <strong className="text-[#A0EFFA]">{nextPrayerInfo.name}</strong> ({nextPrayerInfo.time}): <span className="font-mono text-xs">{nextPrayerInfo.remaining}</span>
          </span>
        </div>

        {/* Prayer times pills */}
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto py-0.5 scrollbar-none font-medium">
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full text-white/90">
            <span className="text-white/60">اذان صبح:</span>
            <span className="font-bold">{PRAYER_TIMES_DEZFUL.fajr}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full text-white/90">
            <span className="text-white/60">طلوع:</span>
            <span>{PRAYER_TIMES_DEZFUL.sunrise}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFDEA5]/20 border border-[#FFDEA5]/40 text-[#FFDEA5] px-2.5 py-1 rounded-full font-bold shadow-sm">
            <span>اذان ظهر:</span>
            <span>{PRAYER_TIMES_DEZFUL.dhuhr}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full text-white/90">
            <span className="text-white/60">اذان مغرب:</span>
            <span className="font-bold">{PRAYER_TIMES_DEZFUL.maghrib}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full text-white/90 hidden lg:flex">
            <span className="text-white/60">نیمه‌شب:</span>
            <span>{PRAYER_TIMES_DEZFUL.midnight}</span>
          </div>
        </div>

        {/* Clock */}
        <div className="hidden md:flex items-center gap-1 font-mono text-white/90 text-xs bg-white/10 px-2.5 py-1 rounded-full">
          <span>ساعت:</span>
          <span>{currentTime || '۱۲:۱۵:۰۰'}</span>
        </div>
      </div>
    </div>
  );
};
