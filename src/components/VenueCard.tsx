import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Clock, 
  Sparkles, 
  Heart, 
  BookOpen, 
  HeartHandshake, 
  Calendar,
  Compass,
  CheckCircle2,
  Headphones
} from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onSelect: (venue: Venue) => void;
  onToggleLike?: (venueId: string) => void;
  isLiked?: boolean;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  onSelect,
  onToggleLike,
  isLiked = false
}) => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'mosque':
        return { label: 'مسجد', bg: 'bg-[#84320F]/10 text-[#84320F] border-[#84320F]/20' };
      case 'husseiniya':
        return { label: 'حسینیه', bg: 'bg-[#006972]/10 text-[#006972] border-[#006972]/20' };
      case 'tekyeh':
        return { label: 'تکیه سنتی', bg: 'bg-[#7E5F1F]/10 text-[#7E5F1F] border-[#7E5F1F]/20' };
      case 'mahdieh':
        return { label: 'مهدیه', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      default:
        return { label: 'مکان مذهبی', bg: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const badge = getTypeBadge(venue.type);

  return (
    <div 
      id={`venue-card-${venue.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-[#E6E2DF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-[#84320F]/30"
    >
      {/* Card Media Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F2EDEA]">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 flex-wrap">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${badge.bg}`}>
            {badge.label}
          </span>
          {venue.isHistoric && (
            <span className="bg-[#FFDEA5] text-[#380D00] px-2.5 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              <Compass className="w-3 h-3" />
              <span>اثر تاریخی</span>
            </span>
          )}
        </div>

        {/* Top Left Actions (Virtual Tour / Audio Guide / Like) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {venue.features.hasVirtualTour && (
            <span className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#A0EFFA]" />
              <span>تور ۳۶۰°</span>
            </span>
          )}

          {venue.audioGuideAvailable && (
            <span className="bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full text-xs" title="دارای راهنمای صوتی">
              <Headphones className="w-3.5 h-3.5 text-[#FFDEA5]" />
            </span>
          )}

          {onToggleLike && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(venue.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
              }`}
              title="نشان‌کردن"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 right-3 left-3 text-white">
          <h3 className="text-lg font-bold drop-shadow-md text-white line-clamp-1">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-white/90 drop-shadow-sm mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#A0EFFA] shrink-0" />
            <span className="line-clamp-1">{venue.neighborhood}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {/* Description snippet */}
        <p className="text-xs sm:text-sm text-[#56423C] line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        {/* Feature Tags Bento Grid */}
        <div className="grid grid-cols-2 gap-1.5 text-[11px] py-2 border-y border-[#E6E2DF]/60 bg-[#FDF8F5] -mx-4 px-4">
          <div className="flex items-center gap-1.5 text-[#56423C]">
            <Clock className="w-3.5 h-3.5 text-[#006972] shrink-0" />
            <span>اقامه ۳ وعده نماز</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#56423C]">
            <Users className="w-3.5 h-3.5 text-[#84320F] shrink-0" />
            <span>ظرفیت: {venue.approxCapacity.toLocaleString()} نفر</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#56423C]">
            <BookOpen className="w-3.5 h-3.5 text-[#7E5F1F] shrink-0" />
            <span>{venue.weeklyPrograms.length} برنامه فعال هفتگی</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#56423C]">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{venue.charityServices.length > 0 ? 'دارای مرکز نیکوکاری' : 'فعالیت خیریه محلی'}</span>
          </div>
        </div>

        {/* Prayer Time & Imam Jamaat quick note */}
        <div className="bg-[#F8F3F0] rounded-xl p-2.5 text-xs flex items-center justify-between">
          <div>
            <span className="text-[#89726B] block text-[10px]">پیش‌نماز و امام جماعت:</span>
            <span className="font-bold text-[#1C1B1A] line-clamp-1">{venue.imamJamaat}</span>
          </div>
          <div className="text-left shrink-0">
            <span className="text-[#89726B] block text-[10px]">نماز مغرب:</span>
            <span className="font-bold text-[#006972]">{venue.prayerSchedule.evening.time}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(venue)}
          className="w-full bg-[#84320F] hover:bg-[#A34925] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md active:scale-98"
        >
          <span>مشاهده جدول برنامه‌ها و جزئیات</span>
          <span>←</span>
        </button>
      </div>
    </div>
  );
};
