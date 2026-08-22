import React, { useState } from 'react';
import { MapPin, Building2, Compass, Layers, Info, Navigation, ArrowLeft } from 'lucide-react';
import { NeighborhoodInfo, Venue } from '../types';

interface NeighborhoodsMapSectionProps {
  neighborhoods: NeighborhoodInfo[];
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
}

export const NeighborhoodsMapSection: React.FC<NeighborhoodsMapSectionProps> = ({
  neighborhoods,
  venues,
  onSelectVenue
}) => {
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>(neighborhoods[0]?.id || 'siahposhan');
  const [selectedFilterType, setSelectedFilterType] = useState<'all' | 'mosque' | 'husseiniya'>('all');

  const currentNeighborhood = neighborhoods.find(n => n.id === selectedNeighborhoodId) || neighborhoods[0];
  const venuesInNeighborhood = venues.filter(v => {
    const matchesNeighborhood = v.neighborhood === currentNeighborhood.name;
    const matchesType = selectedFilterType === 'all' || 
      (selectedFilterType === 'mosque' ? v.type === 'mosque' : v.type !== 'mosque');
    return matchesNeighborhood && matchesType;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#7E5F1F] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#FFDEA5]/20 border border-[#FFDEA5]/30 text-[#FFDEA5] px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>بافت کهن و محله‌های تاریخی دزفول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">راهنمای جغرافیایی محله‌ها و ساباط‌های دزفول</h2>
          <p className="text-xs sm:text-sm text-[#FFD9CD] mt-1">
            دزفول با بیش از ۲۸ محله تاریخی و صدها ساباط و مسجد خشتی، نگین معماری سنتی ایران است. در این بخش می‌توانید مساجد و تکایای هر محله را به تفکیک قدمت و هویت کاوش کنید.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Sidebar: Neighborhoods Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-base text-[#84320F] flex items-center gap-2 px-1">
            <Layers className="w-4 h-4" />
            <span>انتخاب محله مورد نظر:</span>
          </h3>

          <div className="space-y-2.5">
            {neighborhoods.map((n) => {
              const isSelected = selectedNeighborhoodId === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNeighborhoodId(n.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#84320F] shadow-md ring-2 ring-[#84320F]/20'
                      : 'bg-white hover:bg-[#FDF8F5] border-[#E6E2DF]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1C1B1A]">{n.name}</h4>
                      <span className="text-[11px] text-[#89726B] font-medium">{n.era}</span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      isSelected ? 'bg-[#84320F] text-white' : 'bg-[#F2EDEA] text-[#56423C]'
                    }`}>
                      {n.mosquesCount + n.husseiniyasCount} مکان مذهبی
                    </span>
                  </div>

                  <p className="text-xs text-[#56423C] line-clamp-2 mt-2 leading-relaxed">
                    {n.description}
                  </p>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#E6E2DF]/60 text-[11px] text-[#7E5F1F]">
                    <span>{n.mosquesCount} مسجد</span>
                    <span>•</span>
                    <span>{n.husseiniyasCount} حسینیه</span>
                    <span>•</span>
                    <span>{n.heritageSitesCount} اثر ثبت شده</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Selected Neighborhood Details & Venues */}
        <div className="lg:col-span-8 space-y-6">
          {/* Neighborhood Card Hero */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E6E2DF] shadow-sm">
            <div className="relative h-48 sm:h-64 w-full bg-[#1C1B1A]">
              <img
                src={currentNeighborhood.image}
                alt={currentNeighborhood.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="bg-[#FFDEA5] text-[#380D00] px-2.5 py-1 rounded-md text-xs font-bold mb-1.5 inline-block">
                  {currentNeighborhood.era}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{currentNeighborhood.name}</h3>
                <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl">{currentNeighborhood.description}</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#FDF8F5] border-b border-[#E6E2DF]">
              <h4 className="font-bold text-xs text-[#89726B] mb-2">شاخصه‌های معماری و سنتی این محله:</h4>
              <div className="flex flex-wrap gap-2">
                {currentNeighborhood.prominentFeatures.map((feat, idx) => (
                  <span key={idx} className="bg-white border border-[#E6E2DF] text-[#84320F] px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Vector Map Simulator for Dezful */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-base text-[#1C1B1A] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#84320F]" />
                    <span>مساجد و حسینیه‌های ثبت‌شده در {currentNeighborhood.name}</span>
                  </h4>
                  <span className="text-xs text-[#89726B]">روی هر مکان کلیک کنید تا جدول کامل زمان‌بندی و امکانات باز شود</span>
                </div>

                {/* Filter pills */}
                <div className="flex items-center gap-1.5 bg-[#F2EDEA] p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setSelectedFilterType('all')}
                    className={`px-3 py-1 rounded-lg transition-all ${selectedFilterType === 'all' ? 'bg-white text-[#84320F] shadow-xs' : 'text-[#56423C]'}`}
                  >
                    همه ({venuesInNeighborhood.length})
                  </button>
                  <button
                    onClick={() => setSelectedFilterType('mosque')}
                    className={`px-3 py-1 rounded-lg transition-all ${selectedFilterType === 'mosque' ? 'bg-white text-[#84320F] shadow-xs' : 'text-[#56423C]'}`}
                  >
                    فقط مساجد
                  </button>
                  <button
                    onClick={() => setSelectedFilterType('husseiniya')}
                    className={`px-3 py-1 rounded-lg transition-all ${selectedFilterType === 'husseiniya' ? 'bg-white text-[#006972] shadow-xs' : 'text-[#56423C]'}`}
                  >
                    حسینیه‌ها
                  </button>
                </div>
              </div>

              {/* Venues in Neighborhood Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {venuesInNeighborhood.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onSelectVenue(v)}
                    className="bg-white rounded-2xl p-4 border border-[#E6E2DF] hover:border-[#84320F]/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          v.type === 'mosque' ? 'bg-[#84320F]/10 text-[#84320F]' : 'bg-[#006972]/10 text-[#006972]'
                        }`}>
                          {v.type === 'mosque' ? 'مسجد' : 'حسینیه / تکیه'}
                        </span>
                        <span className="text-[11px] text-[#89726B] font-mono">ظرفیت: {v.approxCapacity} نفر</span>
                      </div>

                      <h5 className="font-extrabold text-base text-[#1C1B1A] group-hover:text-[#84320F] transition-colors mb-1">
                        {v.name}
                      </h5>
                      <p className="text-xs text-[#56423C] line-clamp-2 leading-relaxed mb-3">
                        {v.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E6E2DF]/60 flex items-center justify-between text-xs">
                      <span className="text-[#89726B] truncate max-w-[180px]">امام: {v.imamJamaat}</span>
                      <span className="font-bold text-[#84320F] flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                        <span>مشاهده</span>
                        <span>←</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
