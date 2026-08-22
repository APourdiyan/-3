import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Code, 
  Database, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Download, 
  Terminal, 
  Settings, 
  Layers, 
  Bot, 
  SlidersHorizontal,
  Lightbulb
} from 'lucide-react';
import { AIPromptTemplate } from '../types';

interface AIPromptSuiteProps {
  promptTemplates: AIPromptTemplate[];
}

export const AIPromptSuite: React.FC<AIPromptSuiteProps> = ({ promptTemplates }) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(promptTemplates[0]?.id || 'p1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Interactive Prompt Generator State
  const [customCity, setCustomCity] = useState<string>('دزفول');
  const [customFramework, setCustomFramework] = useState<string>('React 19 + Tailwind CSS + Express');
  const [customFeatures, setCustomFeatures] = useState<{
    includeSalihin: boolean;
    includeCharity: boolean;
    includeLivePrayer: boolean;
    includeCalendarSync: boolean;
    includeHistoricTour: boolean;
  }>({
    includeSalihin: true,
    includeCharity: true,
    includeLivePrayer: true,
    includeCalendarSync: true,
    includeHistoricTour: true,
  });

  const selectedTemplate = promptTemplates.find(p => p.id === selectedPromptId) || promptTemplates[0];

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'database':
        return Database;
      case 'calendar_sync':
        return Calendar;
      case 'chatbot':
        return MessageSquare;
      case 'event_generator':
        return FileText;
      case 'activity_parser':
        return Code;
      default:
        return Sparkles;
    }
  };

  // Generate dynamic full application blueprint prompt
  const generatedMasterPrompt = `شما یک مهندس ارشد فول‌استک و متخصص طراحی سامانه‌های بومی و شهری هستید.
وظیفه شما پیاده‌سازی کامل و حرفه‌ای «سامانه جامع مساجد، حسینیه‌ها و تقویم مراسمات شهر ${customCity}» با استک ${customFramework} است.

🎯 اهداف شفاف و اساسی پروژه:
۱. شناسنامه و آمار مساجد و حسینیه‌ها:
   - نمایش آمار دقیق تعداد مساجد، حسینیه‌ها، تکایا و مهدیه‌های شهر ${customCity}
   - تفکیک بافت کهن و محله‌های تاریخی (ساباط‌ها و معماری بومی)
   - ثبت ظرفیت، متولیان، امام جماعت، شماره تماس و لوکیشن دقیق

۲. جدول برنامه‌ها و فعالیت‌های مستمر هر مکان:
   - جدول زمانی ۳ وعده نماز جماعت (صبح، ظهر، مغرب) با نام پیش‌نماز
   ${customFeatures.includeSalihin ? '- ثبت و دسته‌بندی جلسات حلقه‌های صالحین، محافل انس با قرآن کریم، آموزش تجوید، مهدویت و نهج‌البلاغه همراه با رده سنی مخاطب (نوجوانان، خواهران، برادران)' : ''}
   ${customFeatures.includeCharity ? '- معرفی صندوق‌های قرض‌الحسنه کارگشایی، مراکز نیکوکاری، اطعام و توزیع بسته‌های معیشتی هر مسجد' : ''}
   ${customFeatures.includeLivePrayer ? '- ویجت زنده محاسبه اوقات شرعی و شمارش معکوس تا اذان بعدی' : ''}
   ${customFeatures.includeHistoricTour ? '- نشان‌گذاری آثار تاریخی ثبت ملی، معرفی سبک معماری بومی و راهنمای صوتی و تور ۳۶۰ درجه' : ''}

۳. تقویم مناسبتی یکپارچه و همگام‌ساز مراسمات (Synced Calendar):
   ${customFeatures.includeCalendarSync ? `- تقویم شمسی/قمری هوشمند که با مناسبت‌های مذهبی (شهادت‌ها، موالید، شب‌های قدر، دعای ندبه/کمیل) سینک شده باشد.
   - با کلیک روی هر روز تقویم، لیست تمام مساجد و حسینیه‌هایی که در آن تاریخ مراسم دارند همراه با سخنران، مداح و ساعت شروع باز شود.
   - امکان فیلتر بر اساس نوع مراسم (عزاداری، جشن، دعا، کارگاه، قرآن) و محله.
   - قابلیت دانلود خروجی تقویم استاندارد (.ics) جهت افزودن به گوگل کلندر و موبایل.` : ''}

۴. الزامات رابط کاربری (UI/UX):
   - طراحی بر پایه دیزاین سیستم گرم و فاخر Heritage-Modern (رنگ‌های خشتی #84320F، فیروزه‌ای #006972، شنی #FDF8F5)
   - پشتیبانی بی‌نقص از تایپوگرافی فارسی (فونت وزیرمتن یا شبنم)، راست‌چین کامل (RTL)
   - فرم ساده و استاندارد برای خادمان و ائمه جماعات جهت ثبت مسجد یا مراسم جدید با ذخیره‌سازی ابری یا محلی (localStorage).`;

  const handleDownloadAllPrompts = () => {
    let md = `# مجموعه پرامپت‌های مهندسی‌شده ساخت سامانه مساجد و حسینیه‌ها\n\n`;
    md += `## ۱. پرامپت جامع مستر (Master Blueprint Prompt)\n\`\`\`text\n${generatedMasterPrompt}\n\`\`\`\n\n`;
    
    promptTemplates.forEach((pt, index) => {
      md += `## ${index + 2}. ${pt.title} (${pt.category})\n`;
      md += `**توضیح:** ${pt.description}\n\n`;
      md += `\`\`\`text\n${pt.promptText}\n\`\`\`\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prompts-mosque-platform-${customCity}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-[#004F56] via-[#006972] to-[#086D77] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#A0EFFA]/20 border border-[#A0EFFA]/30 text-[#A0EFFA] px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مهندسی پرامپت و جعبه‌ابزار هوش مصنوعی (AI Prompt Engineering Suite)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">پرامپت‌های استاندارد و مهندسی‌شده برای هوش مصنوعی</h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-3xl">
              اگر می‌خواهید این سامانه را با هوش مصنوعی (مانند Gemini, Claude, ChatGPT یا Cursor) از نو بسازید یا ماژول‌های دیتابیس، همگام‌ساز تقویم و بات دستیار را توسعه دهید، پرامپت‌های زیر بهترین الگوهای ساختاریافته هستند.
            </p>
          </div>

          <button
            onClick={handleDownloadAllPrompts}
            className="bg-[#FFDEA5] hover:bg-[#FFE8C2] text-[#380D00] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>دانلود تمام پرامپت‌ها (.md)</span>
          </button>
        </div>
      </div>

      {/* Interactive Custom Prompt Builder */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2DF] shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E6E2DF] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#006972]/10 text-[#006972] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-[#1C1B1A]">تولیدکننده تعاملی پرامپت مستر (Master Blueprint Generator)</h3>
              <p className="text-xs text-[#89726B]">تنظیمات زیر را تغییر دهید تا پرامپت متناسب با شهر و استک فنی شما به صورت لحظه‌ای تولید شود.</p>
            </div>
          </div>
        </div>

        {/* Builder Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* City Input */}
          <div>
            <label className="block text-xs font-bold text-[#84320F] mb-1.5">نام شهر یا منطقه:</label>
            <input
              type="text"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              className="w-full bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#006972]"
              placeholder="مثال: دزفول، کاشان، یزد..."
            />
          </div>

          {/* Tech Stack Selection */}
          <div>
            <label className="block text-xs font-bold text-[#84320F] mb-1.5">استک فنی مورد نظر:</label>
            <select
              value={customFramework}
              onChange={(e) => setCustomFramework(e.target.value)}
              className="w-full bg-[#F8F3F0] border border-[#E6E2DF] text-[#1C1B1A] px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#006972]"
            >
              <option value="React 19 + TypeScript + Tailwind CSS + Express">React 19 + Tailwind CSS + Express</option>
              <option value="Next.js 15 (App Router) + Tailwind CSS + Prisma">Next.js 15 + Tailwind CSS + Prisma</option>
              <option value="Vue 3 + Vite + Pinia + Tailwind CSS">Vue 3 + Vite + Tailwind CSS</option>
              <option value="Flutter + Dart (Mobile App iOS & Android)">Flutter (اپلیکیشن موبایل)</option>
            </select>
          </div>

          {/* Feature toggles */}
          <div className="flex flex-col justify-end">
            <span className="block text-xs font-bold text-[#84320F] mb-1.5">ماژول‌های فعال در پرامپت:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer bg-[#F8F3F0] px-2.5 py-1.5 rounded-lg border border-[#E6E2DF]">
                <input
                  type="checkbox"
                  checked={customFeatures.includeSalihin}
                  onChange={(e) => setCustomFeatures({ ...customFeatures, includeSalihin: e.target.checked })}
                  className="rounded text-[#006972]"
                />
                <span>صالحین و قرآن</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-[#F8F3F0] px-2.5 py-1.5 rounded-lg border border-[#E6E2DF]">
                <input
                  type="checkbox"
                  checked={customFeatures.includeCharity}
                  onChange={(e) => setCustomFeatures({ ...customFeatures, includeCharity: e.target.checked })}
                  className="rounded text-[#006972]"
                />
                <span>خیریه و نیکوکاری</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-[#F8F3F0] px-2.5 py-1.5 rounded-lg border border-[#E6E2DF]">
                <input
                  type="checkbox"
                  checked={customFeatures.includeCalendarSync}
                  onChange={(e) => setCustomFeatures({ ...customFeatures, includeCalendarSync: e.target.checked })}
                  className="rounded text-[#006972]"
                />
                <span>تقویم همگام</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Generated Master Prompt Box */}
        <div className="relative rounded-2xl bg-[#1C1B1A] text-[#FDF8F5] p-5 font-mono text-xs sm:text-sm border border-black/20 shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <span className="text-[#A0EFFA] flex items-center gap-2 font-sans font-bold">
              <Terminal className="w-4 h-4" />
              <span>پرامپت اصلی آماده ارائه به هوش مصنوعی (Master Prompt)</span>
            </span>

            <button
              onClick={() => handleCopyPrompt(generatedMasterPrompt, 'master')}
              className="bg-[#006972] hover:bg-[#004F56] text-white px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              {copiedId === 'master' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'master' ? 'کپی شد!' : 'کپی پرامپت'}</span>
            </button>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed font-['Vazirmatn',sans-serif] text-[#E6E2DF] text-xs sm:text-sm max-h-80 overflow-y-auto">
            {generatedMasterPrompt}
          </pre>
        </div>
      </div>

      {/* Categorized Specialized Prompts */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xl text-[#84320F] flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-[#A34925]" />
          <span>پرامپت‌های تخصصی تفکیک‌شده (ماژول به ماژول)</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Navigation list */}
          <div className="lg:col-span-4 space-y-2.5">
            {promptTemplates.map((pt) => {
              const Icon = getCategoryIcon(pt.category);
              const isSelected = selectedPromptId === pt.id;
              return (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPromptId(pt.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#84320F] shadow-md ring-2 ring-[#84320F]/20'
                      : 'bg-white hover:bg-[#FDF8F5] border-[#E6E2DF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#84320F] text-white' : 'bg-[#F2EDEA] text-[#56423C]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1C1B1A] leading-snug">{pt.title}</h4>
                      <p className="text-[11px] text-[#89726B] line-clamp-1 mt-0.5">{pt.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Prompt Detail Box */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E2DF] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E6E2DF]">
                <div>
                  <h4 className="font-black text-lg text-[#1C1B1A]">{selectedTemplate.title}</h4>
                  <p className="text-xs text-[#89726B] mt-0.5">{selectedTemplate.description}</p>
                </div>

                <button
                  onClick={() => handleCopyPrompt(selectedTemplate.promptText, selectedTemplate.id)}
                  className="bg-[#84320F] hover:bg-[#A34925] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  {copiedId === selectedTemplate.id ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === selectedTemplate.id ? 'کپی شد!' : 'کپی متن پرامپت'}</span>
                </button>
              </div>

              {/* Tags & Variables */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-bold text-[#89726B]">متغیرهای کلیدی:</span>
                {selectedTemplate.inputVariables.map((v, i) => (
                  <span key={i} className="bg-[#F2EDEA] text-[#84320F] text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                    [{v}]
                  </span>
                ))}
              </div>

              {/* Text content */}
              <div className="bg-[#1C1B1A] text-[#FDF8F5] rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm border border-black/10 overflow-y-auto max-h-96">
                <pre className="whitespace-pre-wrap leading-relaxed font-['Vazirmatn',sans-serif] text-[#E6E2DF]">
                  {selectedTemplate.promptText}
                </pre>
              </div>
            </div>

            {/* Expected Output Card */}
            <div className="mt-4 pt-4 border-t border-[#E6E2DF] flex items-center justify-between text-xs text-[#56423C]">
              <span><strong>خروجی مورد انتظار:</strong> {selectedTemplate.expectedOutput}</span>
              <div className="flex gap-1">
                {selectedTemplate.tags.map((t, idx) => (
                  <span key={idx} className="bg-[#006972]/10 text-[#006972] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
