import React, { useState } from 'react';
import { X, MessageSquareText, Send, Sparkles, Bot, User, Building2, Calendar, Clock, MapPin } from 'lucide-react';
import { Venue, CeremonyEvent } from '../types';

interface AIAskAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
  events: CeremonyEvent[];
  onSelectVenue?: (venue: Venue) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  suggestedVenues?: Venue[];
  suggestedEvents?: CeremonyEvent[];
}

export const AIAskAssistantModal: React.FC<AIAskAssistantModalProps> = ({
  isOpen,
  onClose,
  venues,
  events,
  onSelectVenue
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'سلام و احترام! من دستیار هوشمند سامانه مساجد و حسینیه‌های دزفول هستم. می‌توانید درباره برنامه‌های امروز، اوقات نماز، جلسات قرآن و صالحین، مراسمات عزاداری و جشن، یا نزدیک‌ترین مسجد محله از من بپرسید.'
    }
  ]);

  const quickQuestions = [
    'امشب چه مراسماتی در حسینیه‌ها برگزار می‌شود؟',
    'کدام مساجد دارای کتابخانه و کانون فرهنگی فعال هستند؟',
    'برنامه‌های قرآنی و صالحین نوجوانان کجاست؟',
    'مراکز نیکوکاری و خیریه مساجد را معرفی کن.'
  ];

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let botResponseText = '';
      let matchedVenues: Venue[] = [];
      let matchedEvents: CeremonyEvent[] = [];

      const q = query.toLowerCase();

      if (q.includes('مراسم') || q.includes('امشب') || q.includes('عزاداری') || q.includes('فاطمیه') || q.includes('جشن') || q.includes('رویداد')) {
        matchedEvents = events.slice(0, 3);
        botResponseText = `با بررسی تقویم مناسبتی دزفول، رویدادها و مراسمات شاخص زیر در حال حاضر فعال و پیش‌رو هستند:\n• ${matchedEvents.map(e => `${e.title} در ${e.venueName} (ساعت ${e.time})`).join('\n• ')}`;
      } else if (q.includes('کتابخانه') || q.includes('کانون') || q.includes('امکانات')) {
        matchedVenues = venues.filter(v => v.features.hasLibrary || v.features.hasCulturalCenter).slice(0, 3);
        botResponseText = `مساجد زیر دارای کتابخانه، سالن مطالعه مجهز و کانون‌های فعال فرهنگی و قرآنی هستند:\n• ${matchedVenues.map(v => `${v.name} در ${v.neighborhood} (پیش‌نماز: ${v.imamJamaat})`).join('\n• ')}`;
      } else if (q.includes('قرآن') || q.includes('صالحین') || q.includes('نوجوان')) {
        matchedVenues = venues.filter(v => v.weeklyPrograms.some(p => p.category === 'quran' || p.category === 'salihin')).slice(0, 3);
        botResponseText = `جلسات پرشور قرائت قرآن و حلقه‌های صالحین نوجوانان در این مساجد به طور مستمر دایر است:\n• ${matchedVenues.map(v => `${v.name}: ${v.weeklyPrograms.map(p => p.title).join('، ')}`).join('\n• ')}`;
      } else if (q.includes('خیریه') || q.includes('کمک') || q.includes('نیکوکاری') || q.includes('وام') || q.includes('قرض')) {
        matchedVenues = venues.filter(v => v.charityServices.length > 0).slice(0, 3);
        botResponseText = `صندوق‌های فعال نیکوکاری، قرض‌الحسنه و اهدای بسته‌های معیشتی در مساجد زیر آماده خدمت‌رسانی و دریافت نذورات مردمی هستند:\n• ${matchedVenues.map(v => `${v.name} (${v.charityServices.map(c => c.title).join(' | ')})`).join('\n• ')}`;
      } else {
        matchedVenues = venues.slice(0, 2);
        botResponseText = `سامانه جامع دزفول در حال حاضر اطلاعات کامل ${venues.length} مسجد و حسینیه شاخص و ${events.length} رویداد همگام با تقویم را ثبت دارد. برای راهنمایی دقیق‌تر، می‌توانید نام محله یا نوع برنامه مورد نظرتان را بفرمایید.`;
      }

      const botMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'bot',
        text: botResponseText,
        suggestedVenues: matchedVenues.length > 0 ? matchedVenues : undefined,
        suggestedEvents: matchedEvents.length > 0 ? matchedEvents : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-[#FDF8F5] rounded-3xl w-full max-w-2xl h-[600px] max-h-[90vh] shadow-2xl flex flex-col border border-[#E6E2DF] text-[#1C1B1A]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-l from-[#006972] to-[#004F56] text-white flex items-center justify-between rounded-t-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-[#FFDEA5]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">دستیار هوشمند مساجد و مراسمات</h3>
              <p className="text-xs text-white/80">پاسخگویی سریع و راهنمایی درباره برنامه‌ها، نمازها و آیین‌ها</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3.5 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-[#006972] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-2xs ${
                m.sender === 'user'
                  ? 'bg-[#84320F] text-white font-medium rounded-tl-none'
                  : 'bg-white border border-[#E6E2DF] text-[#1C1B1A] rounded-tr-none'
              }`}>
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* Suggested Venues Cards */}
                {m.suggestedVenues && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-[#E6E2DF]">
                    <span className="text-[11px] font-bold text-[#84320F] block">مکان‌های مرتبط:</span>
                    {m.suggestedVenues.map(v => (
                      <div
                        key={v.id}
                        onClick={() => {
                          onSelectVenue?.(v);
                          onClose();
                        }}
                        className="bg-[#F8F3F0] hover:bg-[#F2EDEA] p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors border border-[#E6E2DF]"
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#84320F]" />
                          <span className="font-bold text-xs">{v.name}</span>
                          <span className="text-[10px] text-[#89726B]">({v.neighborhood})</span>
                        </div>
                        <span className="text-xs text-[#84320F] font-bold">مشاهده جزئیات ←</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#84320F]/20 text-[#84320F] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#F8F3F0] border-t border-[#E6E2DF] overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="bg-white border border-[#E6E2DF] hover:border-[#006972] text-[#56423C] px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E6E2DF] flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="سوال خود را بپرسید (مثلاً: مراسمات امشب کجاست؟)..."
            className="flex-1 bg-[#F8F3F0] border border-[#E6E2DF] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#006972]"
          />
          <button
            onClick={() => handleSend()}
            className="bg-[#006972] hover:bg-[#004F56] text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            aria-label="ارسال"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
