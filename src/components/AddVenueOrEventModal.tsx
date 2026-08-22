import React, { useState } from 'react';
import { X, Building2, Calendar, Plus, CheckCircle2, Sparkles } from 'lucide-react';
import { Venue, CeremonyEvent, VenueType } from '../types';

interface AddVenueOrEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVenue: (venue: Venue) => void;
  onAddEvent: (event: CeremonyEvent) => void;
  venuesList: Venue[];
}

export const AddVenueOrEventModal: React.FC<AddVenueOrEventModalProps> = ({
  isOpen,
  onClose,
  onAddVenue,
  onAddEvent,
  venuesList
}) => {
  const [activeMode, setActiveMode] = useState<'event' | 'venue'>('event');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState(venuesList[0]?.id || '');
  const [eventDate, setEventDate] = useState('1403/08/25');
  const [eventTime, setEventTime] = useState('19:30');
  const [eventType, setEventType] = useState<'mourning' | 'celebration' | 'prayer_dua' | 'quran' | 'workshop'>('celebration');
  const [speaker, setSpeaker] = useState('');
  const [eulogist, setEulogist] = useState('');
  const [description, setDescription] = useState('');

  // New Venue Form State
  const [venueName, setVenueName] = useState('');
  const [venueType, setVenueType] = useState<VenueType>('mosque');
  const [neighborhood, setNeighborhood] = useState('محله قلعه');
  const [address, setAddress] = useState('');
  const [imamJamaat, setImamJamaat] = useState('');
  const [trustee, setTrustee] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [capacity, setCapacity] = useState('1000');
  const [venueDescription, setVenueDescription] = useState('');

  if (!isOpen) return null;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const chosenVenue = venuesList.find(v => v.id === selectedVenueId) || venuesList[0];

    const newEv: CeremonyEvent = {
      id: 'ev_' + Date.now(),
      title: eventTitle,
      venueId: chosenVenue.id,
      venueName: chosenVenue.name,
      venueType: chosenVenue.type,
      neighborhood: chosenVenue.neighborhood,
      date: eventDate,
      time: eventTime,
      type: eventType,
      speaker: speaker || undefined,
      eulogist: eulogist || undefined,
      description: description || 'مراسم مذهبی به همراه اقامه نماز جماعت و پذیرایی.',
      status: 'upcoming'
    };

    onAddEvent(newEv);
    setSuccessMessage('مراسم با موفقیت ثبت و با تقویم مناسبتی سینک شد!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  const handleCreateVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venueName.trim()) return;

    const newVen: Venue = {
      id: 'v_' + Date.now(),
      name: venueName,
      type: venueType,
      neighborhood,
      address: address || `دزفول، ${neighborhood}`,
      establishedEra: 'معاصر',
      approxCapacity: parseInt(capacity) || 500,
      imamJamaat: imamJamaat || 'حجت‌الاسلام والمسلمین',
      trustee: trustee || 'هیئت امنای مسجد',
      contactPhone: contactPhone || '061-42000000',
      images: [
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
      ],
      description: venueDescription || `مکان مذهبی واقع در ${neighborhood} دزفول با اقامه منظم نماز جماعت و برنامه‌های قرآنی.`,
      features: {
        hasParking: true,
        hasElevator: false,
        hasWheelchairAccess: true,
        hasLibrary: true,
        hasBasijBase: true,
        hasCulturalCenter: true,
        hasCharityBox: true,
        hasSoundSystem: true,
        hasDiningHall: true,
        hasQuranicSchool: true,
        hasVirtualTour: false,
      },
      prayerSchedule: {
        morning: { time: '۰۵:۲۵', imam: imamJamaat, isCongregational: true },
        noon: { time: '۱۲:۱۵', imam: imamJamaat, isCongregational: true },
        evening: { time: '۱۸:۴۰', imam: imamJamaat, isCongregational: true },
      },
      weeklyPrograms: [
        {
          id: 'wp_' + Date.now(),
          title: 'محفل هفتگی انس با قرآن کریم',
          dayOfWeek: 'دوشنبه‌ها',
          time: '۱۹:۳۰',
          instructorOrHost: 'اساتید قرآنی محله',
          category: 'quran',
          targetAudience: 'عموم'
        }
      ],
      charityServices: [
        {
          id: 'cs_' + Date.now(),
          title: 'صندوق همیاری و نیکوکاری محله',
          description: 'توزیع کمک‌های مومنانه و بسته‌های معیشتی.',
          status: 'active'
        }
      ],
      audioGuideAvailable: false,
      coordinates: { lat: 32.3830, lng: 48.4040 },
      likesCount: 1,
      isHistoric: false
    };

    onAddVenue(newVen);
    setSuccessMessage('مکان مذهبی جدید با موفقیت ثبت گردید!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-[#FDF8F5] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[#E6E2DF] text-[#1C1B1A]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E6E2DF] bg-white flex items-center justify-between">
          <div>
            <h3 className="font-black text-xl text-[#84320F] flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>ثبت در سامانه جامع مساجد و حسینیه‌ها</span>
            </h3>
            <p className="text-xs text-[#56423C] mt-0.5">افزودن رویداد جدید به تقویم یا ثبت مشخصات یک مسجد/حسینیه</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F2EDEA] hover:bg-[#E6E2DF] flex items-center justify-center text-[#56423C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-[#E6E2DF] bg-[#F8F3F0] p-1.5 gap-2">
          <button
            type="button"
            onClick={() => setActiveMode('event')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeMode === 'event'
                ? 'bg-white text-[#84320F] shadow-sm'
                : 'text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>ثبت مراسم و رویداد مناسبتی</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('venue')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeMode === 'venue'
                ? 'bg-white text-[#84320F] shadow-sm'
                : 'text-[#56423C] hover:text-[#1C1B1A]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>ثبت مسجد / حسینیه جدید</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="m-4 p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-2 text-sm font-bold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Modal Form Scroll Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {activeMode === 'event' ? (
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block font-bold text-[#84320F] mb-1">عنوان مراسم یا رویداد *</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="مثال: مراسم سوگواری شهادت حضرت زهرا (س) و دعای کمیل"
                  className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#84320F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#84320F] mb-1">محل برگزاری (مسجد یا حسینیه) *</label>
                  <select
                    value={selectedVenueId}
                    onChange={(e) => setSelectedVenueId(e.target.value)}
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  >
                    {venuesList.map(v => (
                      <option key={v.id} value={v.id}>{v.name} ({v.neighborhood})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#84320F] mb-1">نوع برنامه *</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="mourning">عزاداری و سوگواری</option>
                    <option value="celebration">جشن و مولودی‌خوانی</option>
                    <option value="prayer_dua">دعا و مناجات (ندبه، کمیل، توسل)</option>
                    <option value="quran">محفل قرآنی و کرسی تلاوت</option>
                    <option value="workshop">کارگاه، نشست بصیرتی، صالحین</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#84320F] mb-1">تاریخ برگزاری (شمسی) *</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="1403/08/25"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#84320F] mb-1">ساعت شروع *</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="19:30"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#84320F] mb-1">سخنران</label>
                  <input
                    type="text"
                    value={speaker}
                    onChange={(e) => setSpeaker(e.target.value)}
                    placeholder="نام سخنران یا خطیب محترم"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#84320F] mb-1">مداح / قاری</label>
                  <input
                    type="text"
                    value={eulogist}
                    onChange={(e) => setEulogist(e.target.value)}
                    placeholder="نام مداح یا قاری مراسم"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#84320F] mb-1">توضیحات و جزئیات برگزاری</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اطلاعاتی مانند اطعام، مهدکودک کودکان، پخش زنده یا نکات مهم..."
                  className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2 rounded-xl font-medium focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E6E2DF] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-[#E6E2DF] font-bold text-[#56423C] hover:bg-[#F2EDEA]"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#84320F] hover:bg-[#A34925] text-white px-6 py-2 rounded-xl font-bold shadow-md transition-all active:scale-95"
                >
                  ثبت مراسم در تقویم
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCreateVenue} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#84320F] mb-1">نام مکان مذهبی *</label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="مثال: مسجد امام حسن مجتبی (ع)"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#84320F]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#84320F] mb-1">نوع مجموعه *</label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value as any)}
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="mosque">مسجد</option>
                    <option value="husseiniya">حسینیه</option>
                    <option value="tekyeh">تکیه سنتی</option>
                    <option value="mahdieh">مهدیه</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#84320F] mb-1">محله واقع شده *</label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="محله قلعه">محله قلعه</option>
                    <option value="محله سیاه‌پوشان">محله سیاه‌پوشان</option>
                    <option value="محله کرناسیان">محله کرناسیان</option>
                    <option value="محله لُب خندق">محله لُب خندق</option>
                    <option value="محله صحرابدر">محله صحرابدر</option>
                    <option value="محله رودبند و ساحلی">محله رودبند و ساحلی</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#84320F] mb-1">ظرفیت تقریبی (نفر)</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="1000"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#84320F] mb-1">آدرس دقیق و دسترسی</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="مثال: خیابان طالقانی، کوچه توحید، جنب میدانچه"
                  className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#84320F] mb-1">امام جماعت و پیش‌نماز</label>
                  <input
                    type="text"
                    value={imamJamaat}
                    onChange={(e) => setImamJamaat(e.target.value)}
                    placeholder="حجت‌الاسلام ..."
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#84320F] mb-1">شماره تماس هماهنگی</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="061-42200000"
                    className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#84320F] mb-1">توضیحات و معرفی مسجد/حسینیه</label>
                <textarea
                  rows={3}
                  value={venueDescription}
                  onChange={(e) => setVenueDescription(e.target.value)}
                  placeholder="تاریخچه، جلسات هفتگی، پایگاه بسیج، صندوق خیریه و..."
                  className="w-full bg-white border border-[#E6E2DF] px-3.5 py-2 rounded-xl font-medium focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E6E2DF] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-[#E6E2DF] font-bold text-[#56423C] hover:bg-[#F2EDEA]"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#84320F] hover:bg-[#A34925] text-white px-6 py-2 rounded-xl font-bold shadow-md transition-all active:scale-95"
                >
                  ثبت مشخصات مکان
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
