import React from 'react';
import { HeartHandshake, Building2, Phone, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import { Venue } from '../types';

interface CharityServicesSectionProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
}

export const CharityServicesSection: React.FC<CharityServicesSectionProps> = ({
  venues,
  onSelectVenue
}) => {
  // Aggregate all charity services from venues
  const charityVenues = venues.filter(v => v.charityServices && v.charityServices.length > 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>شبکه احسان و مواسات مردمی مساجد دزفول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">مراکز نیکوکاری، صندوق‌های قرض‌الحسنه و خدمات اجتماعی</h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            مساجد و حسینیه‌های دزفول پناهگاه نیازمندان و کانون گره‌گشایی از مشکلات معیشتی، تامین جهیزیه، درمان بیماران و اعطای وام‌های قرض‌الحسنه بدون کارمزد هستند.
          </p>
        </div>
      </div>

      {/* Grid of Charity hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {charityVenues.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-3xl p-6 border border-[#E6E2DF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E2DF]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#1C1B1A]">{v.name}</h4>
                    <span className="text-[11px] text-[#89726B]">{v.neighborhood}</span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">
                  {v.charityServices.length} خدمت فعال
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {v.charityServices.map((cs) => (
                  <div key={cs.id} className="bg-[#FDF8F5] p-3.5 rounded-2xl border border-[#E6E2DF]">
                    <h5 className="font-bold text-xs sm:text-sm text-emerald-950 mb-1">{cs.title}</h5>
                    <p className="text-xs text-[#56423C] leading-relaxed mb-2">{cs.description}</p>
                    {cs.contactPerson && (
                      <span className="text-[11px] text-[#89726B] block">مسئول هماهنگی: {cs.contactPerson}</span>
                    )}
                    {cs.cardForDonation && (
                      <div className="mt-2 bg-white p-2 rounded-xl text-xs font-mono text-[#84320F] flex items-center justify-between border border-[#E6E2DF]">
                        <span className="text-[10px] text-[#89726B]">شماره کارت نذورات:</span>
                        <span className="font-bold">{cs.cardForDonation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectVenue(v)}
              className="w-full bg-[#F2EDEA] hover:bg-[#84320F] text-[#56423C] hover:text-white py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>مشاهده سایر مشخصات مسجد</span>
              <span>←</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
