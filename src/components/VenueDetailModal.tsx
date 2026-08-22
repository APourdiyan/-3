import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  BookOpen, 
  HeartHandshake, 
  Shield, 
  Users, 
  Sparkles, 
  Share2, 
  Bookmark, 
  Navigation, 
  Headphones, 
  CheckCircle2, 
  Info,
  CalendarDays,
  Heart
} from 'lucide-react';
import { Venue, CeremonyEvent } from '../types';

interface VenueDetailModalProps {
  venue: Venue | null;
  onClose: () => void;
  allEvents: CeremonyEvent[];
  onOpenEventDetail?: (event: CeremonyEvent) => void;
}

export const VenueDetailModal: React.FC<VenueDetailModalProps> = ({
  venue,
  onClose,
  allEvents,
  onOpenEventDetail
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'prayers' | 'programs' | 'charity' | 'events' | 'features'>('info');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!venue) return null;

  const venueEvents = allEvents.filter(e => e.venueId === venue.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: `اطلاعات و برنامه‌های ${venue.name} در سامانه مساجد دزفول`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${venue.name} - ${venue.address}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-[#FDF8F5] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[#E6E2DF] text-[#1C1B1A]">
        {/* Modal Header & Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-black shrink-0">
          <img
            src={venue.images[selectedImageIndex] || venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover opacity-90 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-transparent to-black/40" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1C1B1A] flex items-center justify-center shadow-lg transition-all z-10"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#1C1B1A] text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'کپی شد!' : 'اشتراک'}</span>
            </button>
            {venue.audioGuideAvailable && (
              <span className="bg-[#84320F] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Headphones className="w-4 h-4 text-[#FFDEA5]" />
                <span>راهنمای صوتی</span>
              </span>
            )}
          </div>

          {/* Image thumbnails overlay */}
          {venue.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
              {venue.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-[#FFDEA5] scale-105' : 'border-white/50 opacity-70'
                  }`}
                >
                  <img src={img} alt="نمای بنا" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Info on image */}
          <div className="absolute bottom-4 right-4 text-white max-w-xl">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-[#A34925] text-white px-2.5 py-0.5 rounded-md text-xs font-bold">
                {venue.type === 'mosque' ? 'مسجد' : venue.type === 'husseiniya' ? 'حسینیه' : venue.type === 'tekyeh' ? 'تکیه' : 'مهدیه'}
              </span>
              {venue.isHistoric && (
                <span className="bg-[#FFDEA5] text-[#380D00] px-2.5 py-0.5 rounded-md text-xs font-bold">
                  {venue.establishedEra}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md text-white">
              {venue.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-[#A0EFFA] shrink-0" />
              <span>{venue.address}</span>
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-[#E6E2DF] bg-[#F2EDEA] px-4 sm:px-6 flex gap-2 overflow-x-auto scrollbar-none shrink-0 font-medium text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#84320F] text-[#84320F]'
                : 'border-transparent text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>معرفی و تاریخچه</span>
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'prayers'
                ? 'border-[#84320F] text-[#84320F]'
                : 'border-transparent text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>نماز جماعت و اوقات</span>
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'programs'
                ? 'border-[#84320F] text-[#84320F]'
                : 'border-transparent text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>برنامه‌های هفتگی و صالحین ({venue.weeklyPrograms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('charity')}
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'charity'
                ? 'border-[#84320F] text-[#84320F]'
                : 'border-transparent text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>خیریه و نیکوکاری ({venue.charityServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-[#84320F] text-[#84320F]'
                : 'border-transparent text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>مراسمات پیش‌رو ({venueEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-[#84320F] text-[#84320F]'
                : 'border-transparent text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>امکانات و موقعیت</span>
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* TAB 1: INFO & ARCHITECTURE */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6E2DF] text-center">
                  <span className="text-xs text-[#89726B] block mb-1">قدمت و دوره بنا</span>
                  <span className="font-bold text-[#84320F] text-sm sm:text-base">{venue.establishedEra}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6E2DF] text-center">
                  <span className="text-xs text-[#89726B] block mb-1">ظرفیت کل</span>
                  <span className="font-bold text-[#006972] text-sm sm:text-base">{venue.approxCapacity.toLocaleString()} نفر</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6E2DF] text-center">
                  <span className="text-xs text-[#89726B] block mb-1">محله تاریخی</span>
                  <span className="font-bold text-[#7E5F1F] text-sm sm:text-base">{venue.neighborhood}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6E2DF] text-center">
                  <span className="text-xs text-[#89726B] block mb-1">وضعیت ثبتی</span>
                  <span className="font-bold text-emerald-800 text-sm sm:text-base">
                    {venue.registrationNumber ? `ثبت ملی (${venue.registrationNumber})` : 'مجموعه معاصر فعال'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6E2DF]">
                <h4 className="font-bold text-base text-[#84320F] mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>تاریخچه، معماری و هویت فرهنگی</span>
                </h4>
                <p className="text-[#56423C] leading-relaxed text-justify">
                  {venue.description}
                </p>
              </div>

              {/* Trustees and Imam */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8F3F0] p-4 rounded-2xl border border-[#E6E2DF]">
                  <span className="text-xs text-[#89726B] font-bold block mb-1">امام جماعت و پیش‌نماز:</span>
                  <p className="font-bold text-[#1C1B1A] text-sm">{venue.imamJamaat}</p>
                </div>
                <div className="bg-[#F8F3F0] p-4 rounded-2xl border border-[#E6E2DF]">
                  <span className="text-xs text-[#89726B] font-bold block mb-1">هیئت امنا و متولیان موقوفه:</span>
                  <p className="font-bold text-[#1C1B1A] text-sm">{venue.trustee}</p>
                  <p className="text-xs text-[#89726B] mt-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>شماره تماس هماهنگی: {venue.contactPhone}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRAYERS */}
          {activeTab === 'prayers' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#006972] to-[#004F56] text-white p-5 rounded-2xl shadow-md">
                <h4 className="font-bold text-base mb-1 text-[#FFDEA5]">برنامه منظم اقامه نمازهای جماعت</h4>
                <p className="text-xs text-white/80">تمام وعده‌های نماز با حضور مؤمنین و به صورت جماعت اقامه می‌گردد.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Morning */}
                <div className="bg-white p-4 rounded-2xl border border-[#E6E2DF] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#89726B] block">نماز صبح</span>
                    <span className="text-2xl font-black text-[#84320F] block my-2">{venue.prayerSchedule.morning.time}</span>
                    <span className="text-xs text-[#56423C] block">امام جماعت: {venue.prayerSchedule.morning.imam}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E6E2DF] text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>اقامه جماعت دایر است</span>
                  </div>
                </div>

                {/* Noon */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#FFDEA5] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#84320F] block">نماز ظهر و عصر</span>
                    <span className="text-2xl font-black text-[#006972] block my-2">{venue.prayerSchedule.noon.time}</span>
                    <span className="text-xs text-[#56423C] block">امام جماعت: {venue.prayerSchedule.noon.imam}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E6E2DF] text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>همراه با بیان احکام بین‌الصلاتین</span>
                  </div>
                </div>

                {/* Evening */}
                <div className="bg-white p-4 rounded-2xl border border-[#E6E2DF] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#89726B] block">نماز مغرب و عشاء</span>
                    <span className="text-2xl font-black text-[#84320F] block my-2">{venue.prayerSchedule.evening.time}</span>
                    <span className="text-xs text-[#56423C] block">امام جماعت: {venue.prayerSchedule.evening.imam}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E6E2DF] text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>اقامه اول وقت و تلاوت نور</span>
                  </div>
                </div>
              </div>

              {venue.prayerSchedule.notes && (
                <div className="bg-[#F8F3F0] p-4 rounded-2xl border border-[#E6E2DF] text-xs text-[#56423C]">
                  <strong className="text-[#84320F]">توضیحات و آیین‌های عبادی: </strong>
                  {venue.prayerSchedule.notes}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WEEKLY PROGRAMS & SALIHIN */}
          {activeTab === 'programs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#84320F]">جدول جلسات آموزشی، حلقه‌های صالحین و محافل قرآنی</h4>
                <span className="text-xs text-[#89726B]">{venue.weeklyPrograms.length} برنامه فعال</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {venue.weeklyPrograms.map((prog) => (
                  <div key={prog.id} className="bg-white p-4 rounded-2xl border border-[#E6E2DF] shadow-sm flex flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-bold text-sm text-[#1C1B1A]">{prog.title}</h5>
                      <span className="text-[11px] font-bold bg-[#A34925]/10 text-[#84320F] px-2 py-0.5 rounded-md whitespace-nowrap">
                        {prog.dayOfWeek}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-[#56423C]">
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#006972]" />
                        <span>زمان برگزاری: <strong>{prog.time}</strong></span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#7E5F1F]" />
                        <span>مخاطب: {prog.targetAudience}</span>
                      </p>
                      <p className="text-xs text-[#89726B]">
                        استاد / مربی: <span className="font-semibold text-[#1C1B1A]">{prog.instructorOrHost}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CHARITY & SERVICES */}
          {activeTab === 'charity' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <h4 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-700" />
                  <span>خدمات عام‌المنفعه، صندوق‌های قرض‌الحسنه و مراکز نیکوکاری</span>
                </h4>
                <p className="text-xs text-emerald-800">
                  این مکان مذهبی علاوه بر ابعاد عبادی، کانون حل مشکلات معیشتی، درمانی و اجتماعی اهالی محله است.
                </p>
              </div>

              {venue.charityServices.length === 0 ? (
                <p className="text-xs text-[#89726B] text-center py-6">خدمات خیریه رسمی در این بخش ثبت نشده است.</p>
              ) : (
                <div className="space-y-3">
                  {venue.charityServices.map((ch) => (
                    <div key={ch.id} className="bg-white p-4 rounded-2xl border border-[#E6E2DF] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-sm text-[#1C1B1A]">{ch.title}</h5>
                        <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                          فعال در تمام طول سال
                        </span>
                      </div>
                      <p className="text-xs text-[#56423C] leading-relaxed mb-3">
                        {ch.description}
                      </p>
                      {ch.contactPerson && (
                        <p className="text-xs text-[#89726B]">
                          مسئول هماهنگی خیریه: <strong className="text-[#1C1B1A]">{ch.contactPerson}</strong>
                        </p>
                      )}
                      {ch.cardForDonation && (
                        <div className="mt-2 bg-[#F8F3F0] p-2.5 rounded-xl text-xs font-mono flex items-center justify-between text-[#84320F]">
                          <span>شماره کارت کمک‌های مردمی:</span>
                          <span className="font-bold tracking-wider">{ch.cardForDonation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EVENTS IN THIS VENUE */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#84320F]">مراسمات مناسبتی و رویدادهای پیش‌رو</h4>
                <span className="text-xs text-[#89726B]">{venueEvents.length} مراسم ثبت شده</span>
              </div>

              {venueEvents.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-[#E6E2DF] text-center text-[#89726B]">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>در حال حاضر مراسم مناسبتی خاصی برای روزهای آتی ثبت نشده است.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {venueEvents.map((ev) => (
                    <div 
                      key={ev.id}
                      onClick={() => onOpenEventDetail?.(ev)}
                      className="bg-white p-4 rounded-2xl border border-[#E6E2DF] hover:border-[#84320F]/40 shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#A34925] bg-[#A34925]/10 px-2 py-0.5 rounded-md">
                            {ev.date} - ساعت {ev.time}
                          </span>
                          {ev.occasionTitle && (
                            <span className="text-xs bg-[#FFDEA5] text-[#380D00] px-2 py-0.5 rounded-md font-bold">
                              {ev.occasionTitle}
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-sm sm:text-base text-[#1C1B1A]">{ev.title}</h5>
                        <p className="text-xs text-[#56423C] mt-1">
                          سخنران: <strong>{ev.speaker || 'خطبای اهل‌بیت'}</strong> | مداح: <strong>{ev.eulogist || 'ذاکرین دزفول'}</strong>
                        </p>
                      </div>
                      <button className="bg-[#84320F] text-white text-xs px-3.5 py-2 rounded-xl font-bold hover:bg-[#A34925] transition-colors shrink-0">
                        مشاهده جزئیات
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FEATURES & LOCATION */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {/* Features Checklist */}
              <div>
                <h4 className="font-bold text-sm text-[#84320F] mb-3">امکانات رفاهی، فرهنگی و دسترسی</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasParking ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>پارکینگ اختصاصی</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasWheelchairAccess ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>دسترسی آسان معلولین و سالمندان</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasElevator ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>آسانسور / بالابر</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasLibrary ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>کتابخانه و سالن مطالعه</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasBasijBase ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>پایگاه مقاومت بسیج برادران/خواهران</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasSoundSystem ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>سیستم صوتی و آکوستیک حرفه‌ای</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasDiningHall ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>آشپزخانه و سالن پذیرایی نذورات</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    venue.features.hasQuranicSchool ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>دارالقرآن و مهدکودک قرآنی</span>
                  </div>
                </div>
              </div>

              {/* Interactive Direction Box */}
              <div className="bg-white p-4 rounded-2xl border border-[#E6E2DF]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#1C1B1A]">موقعیت جغرافیایی و مسیریابی آنلاین</h4>
                    <p className="text-xs text-[#89726B]">مختصات: {venue.coordinates.lat.toFixed(4)}, {venue.coordinates.lng.toFixed(4)}</p>
                  </div>
                  <button
                    onClick={handleDirections}
                    className="bg-[#006972] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#004F56] transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>مسیریابی با گوگل مپ / نشان</span>
                  </button>
                </div>
                <div className="h-40 rounded-xl overflow-hidden bg-[#F2EDEA] flex items-center justify-center text-center p-4 border border-[#E6E2DF]">
                  <div>
                    <MapPin className="w-8 h-8 text-[#84320F] mx-auto mb-1 animate-bounce" />
                    <p className="font-bold text-xs text-[#1C1B1A]">{venue.name}</p>
                    <p className="text-[11px] text-[#89726B]">{venue.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-[#E6E2DF] bg-[#F8F3F0] p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="border border-[#E6E2DF] bg-white text-[#56423C] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#F2EDEA] transition-colors"
          >
            بستن پنجره
          </button>

          <button
            onClick={handleDirections}
            className="bg-[#84320F] hover:bg-[#A34925] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 transition-all active:scale-98"
          >
            <Navigation className="w-4 h-4" />
            <span>مسیریابی به {venue.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
