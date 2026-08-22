import { Venue, CeremonyEvent, Occasion, NeighborhoodInfo, AIPromptTemplate } from '../types';

export const INITIAL_NEIGHBORHOODS: NeighborhoodInfo[] = [
  {
    id: 'siahposhan',
    name: 'محله سیاه‌پوشان',
    era: 'دوره صفویه و قاجار',
    description: 'یکی از قدیمی‌ترین و اصیل‌ترین محله‌های بافت تاریخی دزفول با معماری آجری بی‌نظیر (خوون‌چینی) و گذرگاه‌های سرپوشیده (ساباط).',
    mosquesCount: 4,
    husseiniyasCount: 3,
    heritageSitesCount: 12,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 32.3855, lng: 48.4042 },
    prominentFeatures: ['ساباط‌های تاریخی', 'آجرکاری خوون‌چینی', 'حسینیه‌های کهن عزاداری'],
  },
  {
    id: 'qaleh',
    name: 'محله قلعه',
    era: 'دوره ساسانی و اوایل اسلام',
    description: 'مرکز تاریخی و قلب تپنده قدیم دزفول، سرشار از خانه‌های تاریخی مجلل، ساباط‌های دیدنی و چشم‌انداز به رودخانه دز و پل باستانی.',
    mosquesCount: 3,
    husseiniyasCount: 4,
    heritageSitesCount: 15,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 32.3802, lng: 48.3995 },
    prominentFeatures: ['مسجد جامع دزفول', 'تکیه و حسینیه کهن قلعه', 'دسترسی به رودخانه دز'],
  },
  {
    id: 'karnasseean',
    name: 'محله کرناسیان',
    era: 'دوره قاجاریه و زندیه',
    description: 'محله‌ای اصیل با کوچه‌های باریک و پیوندهای عمیق سنتی، حمام تاریخی کرناسیان (موزه مردم‌شناسی) و کانون‌های پرشور قرآن و صالحین.',
    mosquesCount: 3,
    husseiniyasCount: 2,
    heritageSitesCount: 10,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 32.3905, lng: 48.4065 },
    prominentFeatures: ['حمام کرناسیان', 'مسجد کرناسیان', 'جلسات سنتی قرائت قرآن'],
  },
  {
    id: 'labe_khandaq',
    name: 'محله لُب خندق',
    era: 'دوره صفویه',
    description: 'بافتی صمیمی و آرام با شبستان‌های عمیق و طاق‌های ضربی خنک که در گذشته در مجاورت خندق دفاعی شهر قرار داشته است.',
    mosquesCount: 3,
    husseiniyasCount: 2,
    heritageSitesCount: 9,
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 32.3828, lng: 48.4091 },
    prominentFeatures: ['مسجد تاریخی لب خندق', 'شبستان‌های زمستانه و تابستانه', 'صندوق‌های خیریه مردمی'],
  },
  {
    id: 'sahrabadr',
    name: 'محله صحرابدر',
    era: 'دوره قاجار و پهلوی اول',
    description: 'یکی از محله‌های پرجمعیت بافت قدیم با تعداد زیادی هیئت‌های مذهبی فعال، مراکز نیکوکاری و حسینیه‌های بزرگ.',
    mosquesCount: 4,
    husseiniyasCount: 3,
    heritageSitesCount: 14,
    image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 32.3768, lng: 48.4055 },
    prominentFeatures: ['حسینیه ثارالله', 'پایگاه‌های فعال جوانان', 'برنامه‌های خیریه و تهیه جهیزیه'],
  },
  {
    id: 'roodband',
    name: 'محله رودبند و ساحلی',
    era: 'دوره ایلخانی و تیموری',
    description: 'محله مجاور بقعه متبرکه شاه رکن‌الدین و رودبند در حاشیه زیبای رودخانه دز، با شور و حال خاص مذهبی و گردشگری.',
    mosquesCount: 3,
    husseiniyasCount: 2,
    heritageSitesCount: 11,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 32.3951, lng: 48.4012 },
    prominentFeatures: ['بقعه متبرکه رودبند', 'تکیه‌های ساحلی', 'محافل سنتی مرثیه‌سرایی دزفولی'],
  }
];

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'مسجد جامع دزفول',
    type: 'mosque',
    neighborhood: 'محله قلعه',
    address: 'خیابان امام خمینی جنوبی، راسته بازار کهن، کوچه مسجد جامع',
    establishedEra: 'قرن سوم هجری (بنیان ساسانی-اسلامی)',
    approxCapacity: 2500,
    imamJamaat: 'حجت‌الاسلام والمسلمین خسروپناه / حجت‌الاسلام سید کمال موسوی',
    trustee: 'شورای متولیان موقوفات مسجد جامع',
    contactPhone: '061-42221430',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'از کهن‌ترین و با شکوه‌ترین مساجد ایران، دارای ایوان‌ها و ستون‌های قطور سنگی و شبستان‌های آجرکاری شده کم‌نظیر. این مسجد در طول تاریخ کانون اصلی اقامه نماز جماعت، جلسات تفسیر قرآن و تجمعات مذهبی دزفول بوده است.',
    isHistoric: true,
    registrationNumber: '۲۸۷ (ثبت ملی ۱۳۱۰)',
    audioGuideAvailable: true,
    likesCount: 342,
    coordinates: { lat: 32.3812, lng: 48.3989 },
    features: {
      hasParking: false,
      hasElevator: false,
      hasWheelchairAccess: true,
      hasLibrary: true,
      hasBasijBase: true,
      hasCulturalCenter: true,
      hasCharityBox: true,
      hasSoundSystem: true,
      hasDiningHall: true,
      hasQuranicSchool: true,
      hasVirtualTour: true,
    },
    prayerSchedule: {
      morning: { time: '۰۵:۲۵', imam: 'حجت‌الاسلام رضوانی', isCongregational: true },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام موسوی', isCongregational: true },
      evening: { time: '۱۸:۴۰', imam: 'حجت‌الاسلام خسروپناه', isCongregational: true },
      fridayPrayer: { imam: 'امام جمعه محترم دزفول', time: '۱۲:۰۰ هر جمعه' },
      notes: 'بین‌الصلاتین ظهر و مغرب بیان احکام و ترجمه آیات کاربردی قرآن انجام می‌شود.',
    },
    weeklyPrograms: [
      {
        id: 'wp1',
        title: 'محفل انس با قرآن کریم و تجوید تخصصی',
        dayOfWeek: 'دوشنبه‌ها',
        time: '۱۹:۳۰ (بعد از نماز عشاء)',
        instructorOrHost: 'استاد سید عباس هاشمی (قاری بین‌المللی)',
        category: 'quran',
        targetAudience: 'عموم'
      },
      {
        id: 'wp2',
        title: 'حلقه معرفتی صالحین شهید رجایی',
        dayOfWeek: 'پنج‌شنبه‌ها',
        time: '۱۷:۰۰',
        instructorOrHost: 'حجت‌الاسلام نوری',
        category: 'salihin',
        targetAudience: 'نوجوانان و جوانان'
      },
      {
        id: 'wp3',
        title: 'قرائت دعای پرفیض کمیل و مرثیه‌سرایی',
        dayOfWeek: 'پنج‌شنبه‌ها',
        time: '۲۱:۰۰',
        instructorOrHost: 'مداحان اهل‌بیت(ع)',
        category: 'dua',
        targetAudience: 'عموم'
      },
      {
        id: 'wp4',
        title: 'سلسله مباحث مهدویت و انتظار پویا',
        dayOfWeek: 'سه‌شنبه‌ها',
        time: '۱۹:۴۵',
        instructorOrHost: 'دکتر ترابی‌فر',
        category: 'mahdaviat',
        targetAudience: 'عموم'
      }
    ],
    charityServices: [
      {
        id: 'cs1',
        title: 'صندوق خیریه امام حسن مجتبی (ع)',
        description: 'توزیع ماهانه بسته‌های معیشتی و پروتئینی میان ۱۲۰ خانواده کم‌برخوردار در بافت قدیم دزفول.',
        status: 'active',
        contactPerson: 'حاج مصطفی امین‌پور'
      },
      {
        id: 'cs2',
        title: 'صندوق قرض‌الحسنه کارگشایی مسجد جامع',
        description: 'اعطای وام‌های بدون کارمزد جهت درمان، تحصیل و نیازهای ضروری خانواده‌ها.',
        status: 'active',
        contactPerson: 'دفتر موقوفات مسجد'
      }
    ]
  },
  {
    id: 'v2',
    name: 'مسجد لُب خندق',
    type: 'mosque',
    neighborhood: 'محله لُب خندق',
    address: 'خیابان طالقانی، کوچه لُب خندق، میدانچه شهیدان افروغ',
    establishedEra: 'دوره صفویه',
    approxCapacity: 1200,
    imamJamaat: 'حجت‌الاسلام حاج سید مهدی پوررکنی',
    trustee: 'هیئت امنای مسجد و کانون فرهنگی بصیرت',
    contactPhone: '061-42238712',
    images: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'مسجدی بسیار خوش‌ساخت با شبستان‌های عمیق خنک، حیاط مرکزی دل‌باز با حوض فیروزه‌ای و کاشی‌کاری‌های قاجاری. کانون فعالیت‌های نوجوانان و طرح جوانه‌های صالحین.',
    isHistoric: true,
    registrationNumber: '۷۸۲۵',
    audioGuideAvailable: true,
    likesCount: 218,
    coordinates: { lat: 32.3831, lng: 48.4093 },
    features: {
      hasParking: true,
      hasElevator: false,
      hasWheelchairAccess: true,
      hasLibrary: true,
      hasBasijBase: true,
      hasCulturalCenter: true,
      hasCharityBox: true,
      hasSoundSystem: true,
      hasDiningHall: false,
      hasQuranicSchool: true,
      hasVirtualTour: true,
    },
    prayerSchedule: {
      morning: { time: '۰۵:۲۵', imam: 'حجت‌الاسلام پوررکنی', isCongregational: true },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام پوررکنی', isCongregational: true },
      evening: { time: '۱۸:۴۰', imam: 'حجت‌الاسلام پوررکنی', isCongregational: true },
      notes: 'برگزاری کلاس تصحیح قرائت نماز هر شب قبل از اذان مغرب.'
    },
    weeklyPrograms: [
      {
        id: 'wp2_1',
        title: 'حلقات تربیت و تعالی صالحین نوجوانان',
        dayOfWeek: 'چهارشنبه‌ها',
        time: '۱۷:۳۰',
        instructorOrHost: 'مهندس صفارپور',
        category: 'salihin',
        targetAudience: 'نوجوانان و جوانان'
      },
      {
        id: 'wp2_2',
        title: 'دعای پرفیض ندبه و صبحانه وحدت',
        dayOfWeek: 'جمعه‌ها',
        time: '۰۶:۳۰ صبح',
        instructorOrHost: 'کربلایی رضا شاهرخی',
        category: 'dua',
        targetAudience: 'عموم'
      },
      {
        id: 'wp2_3',
        title: 'کلاس‌های تقویتی درسی و رباتیک کانون فرهنگی',
        dayOfWeek: 'دوشنبه‌ها و پنج‌شنبه‌ها',
        time: '۱۶:۰۰',
        instructorOrHost: 'اساتید دانشگاه جندی‌شاپور',
        category: 'youth',
        targetAudience: 'نوجوانان و جوانان'
      }
    ],
    charityServices: [
      {
        id: 'cs2_1',
        title: 'مرکز نیکوکاری محله لب خندق',
        description: 'تهیه جهیزیه برای نوعروسان نیازمند و توزیع لوازم‌التحریر در ابتدای مهرماه.',
        status: 'active'
      }
    ]
  },
  {
    id: 'v3',
    name: 'حسینیه اعظم ثارالله دزفول',
    type: 'husseiniya',
    neighborhood: 'محله صحرابدر',
    address: 'بلوار شریعتی، مجتمع مذهبی فرهنگی ثارالله دزفول',
    establishedEra: 'معاصر (۱۳۷۲ شمسی)',
    approxCapacity: 6000,
    imamJamaat: 'آیت‌الله حیدری / حجت‌الاسلام قاضی دزفولی',
    trustee: 'هیئت رزمندگان اسلام دزفول',
    contactPhone: '061-42421000',
    images: [
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'بزرگ‌ترین مجموعه فرهنگی و مذهبی شمال خوزستان. میزبان مراسمات میلیونی ایام محرم و صفر، شب‌های قدر، جشن‌های نیمه شعبان و غدیر، دارای مجهزترین سیستم‌های صوتی و تصویری و پارکینگ اختصاصی.',
    isHistoric: false,
    audioGuideAvailable: false,
    likesCount: 512,
    coordinates: { lat: 32.3789, lng: 48.4061 },
    features: {
      hasParking: true,
      hasElevator: true,
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
      morning: { time: '۰۵:۲۰', imam: 'حجت‌الاسلام کاظمی', isCongregational: true },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام دکتر موسوی', isCongregational: true },
      evening: { time: '۱۸:۳۵', imam: 'حجت‌الاسلام دکتر موسوی', isCongregational: true },
      notes: 'پخش زنده اینترنتی کلیه مراسمات بزرگ در بستر آپارات و ایتا.'
    },
    weeklyPrograms: [
      {
        id: 'wp3_1',
        title: 'هیئت هفتگی انصارالحسین (ع) و زیارت عاشورا',
        dayOfWeek: 'سه‌شنبه‌ها',
        time: '۲۰:۳۰',
        instructorOrHost: 'حاج صادق آهنگران / حاج مهدی تدینی',
        category: 'dua',
        targetAudience: 'عموم'
      },
      {
        id: 'wp3_2',
        title: 'محفل قرآنی یاوران ولایت و حفظ جزء ۳۰',
        dayOfWeek: 'یکشنبه‌ها',
        time: '۱۷:۰۰',
        instructorOrHost: 'استاد نیکنام',
        category: 'quran',
        targetAudience: 'کودکان'
      },
      {
        id: 'wp3_3',
        title: 'جلسات تبیین نهج‌البلاغه و معارف علوی',
        dayOfWeek: 'شنبه‌ها',
        time: '۱۹:۴۵',
        instructorOrHost: 'حجت‌الاسلام دکتر صادقی',
        category: 'nahj',
        targetAudience: 'عموم'
      }
    ],
    charityServices: [
      {
        id: 'cs3_1',
        title: 'بنیاد خیریه حضرت رقیه (س)',
        description: 'اطعام غدیر (۱۰ هزار پرس غذای گرم)، تامین داروی بیماران صعب‌العلاج و جهیزیه نوعروسان.',
        status: 'active',
        cardForDonation: '۶۰۳۷-۹۹۷۵-۹۹۹۹-۸۸۸۸'
      }
    ]
  },
  {
    id: 'v4',
    name: 'حسینیه قنادان (تاریخی)',
    type: 'husseiniya',
    neighborhood: 'محله سیاه‌پوشان',
    address: 'خیابان شهید بهشتی، کوچه قنادان، ساباط قنادان',
    establishedEra: 'دوره قاجار (بیش از ۱۵۰ سال قدمت)',
    approxCapacity: 1500,
    imamJamaat: 'حجت‌الاسلام فقیهی',
    trustee: 'خاندان قنادان و هیئت پیرغلامان حسینی',
    contactPhone: '061-42225670',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'معروف‌ترین حسینیه سنتی دزفول با اجرای آیین شیدونه‌گردانی، علم‌گردانی و نوحه‌خوانی اصیل به گویش دزفولی. دارای کتیبه‌های قدیمی و پرچم‌های تاریخی دوره صفویه و قاجار.',
    isHistoric: true,
    registrationNumber: '۱۴۲۳۰',
    audioGuideAvailable: true,
    likesCount: 290,
    coordinates: { lat: 32.3862, lng: 48.4038 },
    features: {
      hasParking: false,
      hasElevator: false,
      hasWheelchairAccess: false,
      hasLibrary: false,
      hasBasijBase: true,
      hasCulturalCenter: false,
      hasCharityBox: true,
      hasSoundSystem: true,
      hasDiningHall: true,
      hasQuranicSchool: false,
      hasVirtualTour: true,
    },
    prayerSchedule: {
      morning: { time: 'ـ', imam: 'ـ', isCongregational: false },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام فقیهی (در ایام مناسبتی)', isCongregational: true },
      evening: { time: '۱۸:۴۵', imam: 'حجت‌الاسلام فقیهی', isCongregational: true },
      notes: 'در تمام دهه اول محرم و دهه آخر صفر سه وعده نماز و اطعام برقرار است.'
    },
    weeklyPrograms: [
      {
        id: 'wp4_1',
        title: 'روضه سنتی و چهارشنبه‌های امام رضایی',
        dayOfWeek: 'چهارشنبه‌ها',
        time: '۲۰:۰۰',
        instructorOrHost: 'ذاکرین اهل‌بیت دزفول',
        category: 'dua',
        targetAudience: 'عموم'
      },
      {
        id: 'wp4_2',
        title: 'آموزش نوحه‌خوانی و مقتل‌خوانی سنتی دزفول',
        dayOfWeek: 'جمعه‌ها',
        time: '۱۶:۰۰',
        instructorOrHost: 'استاد حاج رجب لطفی‌خلف',
        category: 'salihin',
        targetAudience: 'نوجوانان و جوانان'
      }
    ],
    charityServices: [
      {
        id: 'cs4_1',
        title: 'آشپزخانه نذری حضرت زهرا (س)',
        description: 'طبخ نذری‌های سنتی دزفول (قیمه دزفولی و شله‌زرد) در مناسبت‌ها و توزیع میان نیازمندان محله.',
        status: 'active'
      }
    ]
  },
  {
    id: 'v5',
    name: 'مسجد کرناسیان',
    type: 'mosque',
    neighborhood: 'محله کرناسیان',
    address: 'محله کرناسیان، جنب حمام تاریخی کرناسیان',
    establishedEra: 'دوره زندیه و قاجار',
    approxCapacity: 900,
    imamJamaat: 'حجت‌الاسلام علی صفارپور',
    trustee: 'هیئت امنای محله کرناسیان',
    contactPhone: '061-42241190',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'مسجدی با هویت عمیق محلی، سردر آجری با کتیبه تاریخی و شبستان ستون‌دار. کانون فعال جلسات قرائت قرآن نوجوانان با بیش از ۴۰ سال سابقه مستمر.',
    isHistoric: true,
    registrationNumber: '۸۹۱۱',
    audioGuideAvailable: true,
    likesCount: 175,
    coordinates: { lat: 32.3911, lng: 48.4069 },
    features: {
      hasParking: false,
      hasElevator: false,
      hasWheelchairAccess: true,
      hasLibrary: true,
      hasBasijBase: true,
      hasCulturalCenter: true,
      hasCharityBox: true,
      hasSoundSystem: true,
      hasDiningHall: false,
      hasQuranicSchool: true,
      hasVirtualTour: true,
    },
    prayerSchedule: {
      morning: { time: '۰۵:۲۵', imam: 'حجت‌الاسلام صفارپور', isCongregational: true },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام صفارپور', isCongregational: true },
      evening: { time: '۱۸:۴۰', imam: 'حجت‌الاسلام صفارپور', isCongregational: true },
    },
    weeklyPrograms: [
      {
        id: 'wp5_1',
        title: 'جلسه قرآن نونهالان و نوجوانان شهید دانش',
        dayOfWeek: 'هر شب',
        time: '۱۹:۱۵',
        instructorOrHost: 'استاد مهدی کلاهدوز',
        category: 'quran',
        targetAudience: 'کودکان'
      },
      {
        id: 'wp5_2',
        title: 'ورزش هفتگی فوتسال و استخر اعضای حلقه صالحین',
        dayOfWeek: 'پنج‌شنبه‌ها',
        time: '۱۵:۰۰',
        instructorOrHost: 'مربی براتی',
        category: 'sports',
        targetAudience: 'نوجوانان و جوانان'
      }
    ],
    charityServices: [
      {
        id: 'cs5_1',
        title: 'صندوق همیاری درمانی اهالی کرناسیان',
        description: 'کمک به ویزیت رایگان پزشکان خیر و خرید دارو برای خانواده‌های سالمند محله.',
        status: 'active'
      }
    ]
  },
  {
    id: 'v6',
    name: 'مسجد دروازه (حضرت ابوالفضل)',
    type: 'mosque',
    neighborhood: 'محله قلعه',
    address: 'خیابان ساحلی، راسته دروازه کهن دزفول',
    establishedEra: 'دوره صفویه',
    approxCapacity: 1100,
    imamJamaat: 'حجت‌الاسلام انصاری دزفولی',
    trustee: 'هیئت امنای مسجد دروازه',
    contactPhone: '061-42217733',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'واقع در نقطه اتکای تاریخی محله و مشرف به کوچه ساباط‌های دیدنی. پایگاه مهم فعالیت‌های جهادی و کانون پرورش استعدادهای مذهبی جوانان.',
    isHistoric: true,
    audioGuideAvailable: false,
    likesCount: 160,
    coordinates: { lat: 32.3819, lng: 48.3975 },
    features: {
      hasParking: true,
      hasElevator: false,
      hasWheelchairAccess: true,
      hasLibrary: true,
      hasBasijBase: true,
      hasCulturalCenter: true,
      hasCharityBox: true,
      hasSoundSystem: true,
      hasDiningHall: false,
      hasQuranicSchool: true,
      hasVirtualTour: false,
    },
    prayerSchedule: {
      morning: { time: '۰۵:۲۵', imam: 'حجت‌الاسلام انصاری', isCongregational: true },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام انصاری', isCongregational: true },
      evening: { time: '۱۸:۴۰', imam: 'حجت‌الاسلام انصاری', isCongregational: true },
    },
    weeklyPrograms: [
      {
        id: 'wp6_1',
        title: 'شرح احادیث اهل‌بیت و اخلاق اسلامی',
        dayOfWeek: 'یکشنبه‌ها',
        time: '۱۹:۳۰',
        instructorOrHost: 'حجت‌الاسلام انصاری',
        category: 'salihin',
        targetAudience: 'عموم'
      }
    ],
    charityServices: [
      {
        id: 'cs6_1',
        title: 'گروه جهادی شهید علیرضا حاجی‌وند',
        description: 'تعمیر و بازسازی منازل آسیب‌دیده نیازمندان در حاشیه شهر دزفول.',
        status: 'active'
      }
    ]
  },
  {
    id: 'v7',
    name: 'تکیه و حسینیه محله قلعه (پیرنظر)',
    type: 'tekyeh',
    neighborhood: 'محله قلعه',
    address: 'محله قلعه، میدانچه تاریخی پیرنظر',
    establishedEra: 'دوره صفویه و افشاریه',
    approxCapacity: 1300,
    imamJamaat: 'حجت‌الاسلام سید هادی سجادی',
    trustee: 'بزرگان و سادات خاندان سجادی',
    contactPhone: '061-42239011',
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'تکیه‌ای سنتی و رو باز با داربست‌های چوبی چادرپوش در ایام محرم و طاق‌های آجرکاری اصیل پیرامونی. مرکز سوگواری سنتی سینه‌زنی چلاب دزفولی.',
    isHistoric: true,
    registrationNumber: '۱۱۸۹۰',
    audioGuideAvailable: true,
    likesCount: 220,
    coordinates: { lat: 32.3808, lng: 48.3982 },
    features: {
      hasParking: false,
      hasElevator: false,
      hasWheelchairAccess: true,
      hasLibrary: false,
      hasBasijBase: false,
      hasCulturalCenter: false,
      hasCharityBox: true,
      hasSoundSystem: true,
      hasDiningHall: true,
      hasQuranicSchool: false,
      hasVirtualTour: true,
    },
    prayerSchedule: {
      morning: { time: 'ـ', imam: 'ـ', isCongregational: false },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام سجادی (مناسبتی)', isCongregational: true },
      evening: { time: '۱۸:۴۵', imam: 'حجت‌الاسلام سجادی', isCongregational: true },
    },
    weeklyPrograms: [
      {
        id: 'wp7_1',
        title: 'محفل توسل به امام زمان (عج) و حدیث کساء',
        dayOfWeek: 'جمعه‌ها',
        time: '۱۹:۰۰',
        instructorOrHost: 'سید علی موسوی‌پور',
        category: 'dua',
        targetAudience: 'عموم'
      }
    ],
    charityServices: [
      {
        id: 'cs7_1',
        title: 'طرح نذر نان صلواتی',
        description: 'توزیع بن نان صلواتی در نانوایی‌های اطراف محله قلعه برای خانواده‌های نیازمند.',
        status: 'active'
      }
    ]
  },
  {
    id: 'v8',
    name: 'مهدیه بزرگ دزفول',
    type: 'mahdieh',
    neighborhood: 'محله رودبند و ساحلی',
    address: 'خیابان ساحلی شرقی، جنب پل قدیم',
    establishedEra: 'معاصر (۱۳۶۸ شمسی)',
    approxCapacity: 3000,
    imamJamaat: 'حجت‌الاسلام تقوی',
    trustee: 'بنیاد فرهنگی مهدیه دزفول',
    contactPhone: '061-42245000',
    images: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'مرکز اصلی ترویج فرهنگ مهدویت در شهرستان دزفول، برگزاری هفتگی دعای ندبه صبح‌های جمعه با پخش صبحانه و سخنرانی خطبای برجسته کشوری.',
    isHistoric: false,
    audioGuideAvailable: false,
    likesCount: 310,
    coordinates: { lat: 32.3922, lng: 48.4035 },
    features: {
      hasParking: true,
      hasElevator: true,
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
      morning: { time: '۰۵:۲۰', imam: 'حجت‌الاسلام تقوی', isCongregational: true },
      noon: { time: '۱۲:۱۵', imam: 'حجت‌الاسلام تقوی', isCongregational: true },
      evening: { time: '۱۸:۳۵', imam: 'حجت‌الاسلام تقوی', isCongregational: true },
    },
    weeklyPrograms: [
      {
        id: 'wp8_1',
        title: 'دعای ندبه سراسری و سخنرانی اخلاقی',
        dayOfWeek: 'جمعه‌ها',
        time: '۰۶:۰۰ صبح',
        instructorOrHost: 'سخنرانان برجسته حوزه علمیه قم و دزفول',
        category: 'mahdaviat',
        targetAudience: 'عموم'
      },
      {
        id: 'wp8_2',
        title: 'کلاس‌های مهدویت کودک و نوجوان «یاوران کوچک مهدی»',
        dayOfWeek: 'پنج‌شنبه‌ها',
        time: '۱۰:۰۰ صبح',
        instructorOrHost: 'سرکار خانم دکتر رحیمی',
        category: 'mahdaviat',
        targetAudience: 'کودکان'
      }
    ],
    charityServices: [
      {
        id: 'cs8_1',
        title: 'صندوق نذر مهدوی',
        description: 'کمک به آزادی زندانیان جرایم غیرعمد و درمان بیماران به نام امام عصر(عج).',
        status: 'active'
      }
    ]
  }
];

export const INITIAL_OCCASIONS: Occasion[] = [
  {
    id: 'occ1',
    title: 'ولادت با سعادت حضرت امام حسن عسکری (ع)',
    solarDate: '1403/08/20',
    hijriDate: '۸ ربیع‌الثانی',
    type: 'celebration',
    description: 'سالروز ولادت باسعادت یازدهمین پیشوای شیعیان، امام حسن عسکری علیه‌السلام.',
    isHoliday: false
  },
  {
    id: 'occ2',
    title: 'وفات حضرت فاطمه معصومه (س)',
    solarDate: '1403/08/22',
    hijriDate: '۱۰ ربیع‌الثانی',
    type: 'mourning',
    description: 'سالروز وفات جانسوز کریمه اهل‌بیت حضرت فاطمه معصومه سلام‌الله‌علیها.',
    isHoliday: false
  },
  {
    id: 'occ3',
    title: 'ایام فاطمیه اول (روایت ۷۵ روز)',
    solarDate: '1403/08/24',
    hijriDate: '۱۳ جمادی‌الاول',
    type: 'mourning',
    description: 'آغاز ایام سوگواری شهادت مظلومانه صدیقه طاهره حضرت زهرا (سلام‌الله‌علیها).',
    isHoliday: false
  },
  {
    id: 'occ4',
    title: 'شهادت حضرت فاطمه زهرا (س) - فاطمیه دوم',
    solarDate: '1403/09/15',
    hijriDate: '۳ جمادی‌الثانی',
    type: 'mourning',
    description: 'سالروز شهادت دخت گرامی پیامبر اعظم(ص)، ام‌ابیها حضرت فاطمه زهرا (س).',
    isHoliday: true
  },
  {
    id: 'occ5',
    title: 'ولادت با سعادت حضرت زینب کبری (س) و روز پرستار',
    solarDate: '1403/08/17',
    hijriDate: '۵ جمادی‌الاول',
    type: 'celebration',
    description: 'سالروز ولادت اسوه صبر و استقامت حضرت زینب کبری(س) و گرامیداشت مقام پرستار.',
    isHoliday: false
  },
  {
    id: 'occ6',
    title: 'شب پرفیض لیلةالرغائب و ولادت امام محمد باقر (ع)',
    solarDate: '1403/10/13',
    hijriDate: '۱ رجب',
    type: 'worship',
    description: 'آغاز ماه مبارک رجب، ماه استغفار و عبادت و شب آرزوها.',
    isHoliday: false
  }
];

export const INITIAL_CEREMONY_EVENTS: CeremonyEvent[] = [
  {
    id: 'ev1',
    title: 'مراسم عزاداری سنتی شب شهادت حضرت فاطمه زهرا (س)',
    venueId: 'v3',
    venueName: 'حسینیه اعظم ثارالله دزفول',
    venueType: 'husseiniya',
    neighborhood: 'محله صحرابدر',
    date: '1403/08/24',
    time: '۲۰:۰۰',
    type: 'mourning',
    speaker: 'آیت‌الله دکتر سید ابوالحسن حسن‌زاده',
    eulogist: 'حاج صادق آهنگران و کربلایی مهدی تدینی',
    description: 'مراسم باشکوه عزاداری فاطمیه به همراه قرائت حدیث کساء، سخنرانی و نوحه‌خوانی سنتی دزفول به همراه اطعام عزاداران.',
    image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    occasionId: 'occ3',
    occasionTitle: 'ایام فاطمیه اول',
    registrationRequired: false,
    status: 'upcoming'
  },
  {
    id: 'ev2',
    title: 'جشن بزرگ میلاد امام حسن عسکری (ع) و تجلیل از قاریان جوان',
    venueId: 'v1',
    venueName: 'مسجد جامع دزفول',
    venueType: 'mosque',
    neighborhood: 'محله قلعه',
    date: '1403/08/20',
    time: '۱۹:۳۰',
    type: 'celebration',
    speaker: 'حجت‌الاسلام والمسلمین خسروپناه',
    eulogist: 'حاج ناصر پوربختیار و گروه تواشیح نورالمهدی',
    description: 'محفل شادی و سرور همراه با مولودی‌خوانی، شعرخوانی شاعران آیینی دزفول، اهدای جوایز به ۴۰ نفر از برگزیدگان مسابقات حفظ قرآن.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    occasionId: 'occ1',
    occasionTitle: 'ولادت امام حسن عسکری (ع)',
    registrationRequired: false,
    status: 'upcoming'
  },
  {
    id: 'ev3',
    title: 'محفل نورانی انس با قرآن کریم با حضور قاریان بین‌المللی',
    venueId: 'v5',
    venueName: 'مسجد کرناسیان',
    venueType: 'mosque',
    neighborhood: 'محله کرناسیان',
    date: '1403/08/18',
    time: '۱۸:۳۰',
    type: 'quran',
    speaker: 'استاد سید مهدی کاظمی',
    eulogist: 'قاری ممتاز کشور استاد علیرضا حاجی‌زاده',
    description: 'تلاوت مجلسی آیات نورانی کلام‌الله مجید و تقدیر از پیشکسوتان قرآنی محله کرناسیان.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    status: 'upcoming'
  },
  {
    id: 'ev4',
    title: 'دعای پرفیض ندبه سراسری و صبحانه سلامت',
    venueId: 'v8',
    venueName: 'مهدیه بزرگ دزفول',
    venueType: 'mahdieh',
    neighborhood: 'محله رودبند و ساحلی',
    date: '1403/08/25',
    time: '۰۶:۱۵ صبح',
    type: 'prayer_dua',
    speaker: 'حجت‌الاسلام دکتر موسوی‌فرد',
    eulogist: 'حاج عباس ترابی',
    description: 'زمزمه دعای ندبه با حضور منتظران ظهور، سخنرانی پیرامون شاخصه‌های سبک زندگی مهدوی و پذیرایی صبحانه وحدت.',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    status: 'upcoming'
  },
  {
    id: 'ev5',
    title: 'نشست تخصصی تاریخچه مساجد و ساباط‌های دزفول',
    venueId: 'v2',
    venueName: 'مسجد لُب خندق',
    venueType: 'mosque',
    neighborhood: 'محله لُب خندق',
    date: '1403/08/22',
    time: '۱۶:۳۰',
    type: 'workshop',
    speaker: 'دکتر غلامعلی باغبان‌زاده (پژوهشگر میراث فرهنگی)',
    description: 'بررسی مستندات معماری مساجد صفوی و قاجاری دزفول، کارکرد شوادان‌ها و ساباط‌ها در زیست مذهبی شهروندان.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    registrationRequired: true,
    capacity: 80,
    registeredCount: 54,
    status: 'upcoming'
  },
  {
    id: 'ev6',
    title: 'سوگواری سنتی شیدونه و چلاب در شب شهادت حضرت معصومه (س)',
    venueId: 'v4',
    venueName: 'حسینیه قنادان (تاریخی)',
    venueType: 'husseiniya',
    neighborhood: 'محله سیاه‌پوشان',
    date: '1403/08/22',
    time: '۲۱:۰۰',
    type: 'mourning',
    speaker: 'حجت‌الاسلام سید علی سجادی',
    eulogist: 'پیرغلام اهل‌بیت حاج عبدالحسین مطیعی',
    description: 'اجرای مرثیه‌سرایی سنتی دزفولی و آیین عزاداری کهن در صحن قاجاری حسینیه قنادان با حضور هیئات بافت قدیم.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    occasionId: 'occ2',
    occasionTitle: 'وفات حضرت معصومه (س)',
    status: 'upcoming'
  },
  {
    id: 'ev7',
    title: 'آیین هفتگی دعای کمیل و مناجات عارفانه',
    venueId: 'v1',
    venueName: 'مسجد جامع دزفول',
    venueType: 'mosque',
    neighborhood: 'محله قلعه',
    date: '1403/08/17',
    time: '۲۰:۳۰',
    type: 'prayer_dua',
    speaker: 'حجت‌الاسلام موسوی',
    eulogist: 'حاج کاظم صراف‌زاده',
    description: 'قرائت فرازهای نورانی دعای کمیل در شبستان تاریخی مسجد جامع.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    isLiveNow: false,
    status: 'upcoming'
  }
];

export const AI_PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 'p1',
    title: 'پرامپت جامع معماری دیتابیس و مدل داده (Database Schema)',
    category: 'database',
    description: 'پرامپت استاندارد برای ایجاد جداول پایگاه داده رابطه‌ای (PostgreSQL / MySQL) یا سندمحور (Firestore / MongoDB) برای مساجد، حسینیه‌ها و رویدادها.',
    inputVariables: ['نام شهر', 'انواع اماکن مذهبی', 'ساختار فعالیت‌ها'],
    promptText: `به عنوان یک معمار ارشد سیستم‌های نرم‌افزاری، یک طرح پایگاه داده کامل (ERD و DDL) به زبان TypeScript / SQL برای «سامانه جامع مساجد و حسینیه‌های شهر [نام شهر]» طراحی کن.

الزامات موجودیت‌ها:
۱. جدول/کالکشن Venues (مساجد، حسینیه‌ها، تکیه‌ها، مهدیه‌ها):
   - اطلاعات پایه: id, name, type, neighborhood_id, address, coordinates, established_era, capacity, is_historic
   - هیئت امنا و ائمه جماعات: imam_jamaat, trustee_name, contact_phone
   - امکانات و دسترسی: has_parking, has_elevator, has_library, has_basij, has_charity_box, has_virtual_tour
   - جدول زمانی نمازها: صبح، ظهر، مغرب با مشخصات پیش‌نماز

۲. جدول/کالکشن WeeklyPrograms (برنامه‌های مستمر):
   - day_of_week, time, title, category (salihin, quran, dua, sports, mahdaviat), target_audience, instructor

۳. جدول/کالکشن Occasions (مناسبت‌های رسمی):
   - solar_date, hijri_date, title, type (celebration, mourning, worship), is_holiday

۴. جدول/کالکشن Events (رویدادها و مراسمات مناسبتی):
   - venue_id, occasion_id, date, time, title, speaker, eulogist, description, capacity, registration_required

خروجی باید شامل کد Drizzle ORM یا Prisma Schema به همراه ایندکس‌های بهینه برای جستجوی مکانی (GIS) و فیلترهای تاریخی باشد.`,
    expectedOutput: 'طرح اسکیمای کامل دیتابیس با روابط، کلیدهای خارجی و انواع تایپ‌ها',
    tags: ['Database', 'PostgreSQL', 'TypeScript', 'Prisma']
  },
  {
    id: 'p2',
    title: 'پرامپت موتور همگام‌سازی تقویم مناسبتی با رویدادها (Calendar Sync Engine)',
    category: 'calendar_sync',
    description: 'پرامپتی برای ساخت لاجیک و الگوریتم تطبیق مناسبت‌های مذهبی شمسی/قمری با رویدادهای ثبت‌شده در مساجد و اعلان‌ها.',
    inputVariables: ['محدوده تاریخ', 'الگوریتم تطبیق تقویم جلالی/هجری قمری'],
    promptText: `یک ماژول جاوااسکریپت/تایپ‌اسکریپت پیاده‌سازی کن که وظیفه «همگام‌سازی تقویم مناسبتی و مراسمات مساجد» را بر عهده دارد:

وظایف ماژول:
۱. دریافت تقویم روزانه (تاریخ شمسی و معادل قمری و میلادی)
۲. استخراج تمام مناسبت‌های مذهبی و ملی برای هر روز
۳. کوئری زدن و تجمیع خودکار تمام برنامه‌ها و مراسمات مساجد و حسینیه‌ها که در آن تاریخ مشخص برگزار می‌شوند.
۴. دسته‌بندی بر اساس نوع برنامه (عزاداری، جشن ولادت، دعای ندبه/کمیل، محفل قرآنی، کارگاه)
۵. تولید خروجی ساختاریافته (JSON) با تفکیک محله، نام مسجد، سخنران، مداح و ساعت شروع برای نمایش در ویجت تقویم روزانه، هفتگی و ماهانه.
۶. تابع تبدیل به فرمت تقویم استاندارد iCalendar (.ics) برای افزودن به تقویم گوگل و تلفن همراه کاربر با تنظیم یادآور خودکار.`,
    expectedOutput: 'کد ماژول همگام‌ساز به همراه توابع تست و تبدیل ics',
    tags: ['Calendar', 'Event Sync', 'iCal', 'Jalali']
  },
  {
    id: 'p3',
    title: 'پرامپت دستیار هوشمند پاسخگویی به زائران و اهالی محله (AI Mosque Assistant)',
    category: 'chatbot',
    description: 'سیستم پرامپت دقیق برای یک ربات هوش مصنوعی جهت راهنمایی مردم درباره نزدیک‌ترین مسجد، ساعت نماز، مراسمات امشب و فعالیت‌های خیریه.',
    inputVariables: ['بانک اطلاعاتی مساجد دزفول', 'لحن مکالمه'],
    promptText: `تو دستیار هوشمند و راهنمای معنوی «سامانه مساجد و حسینیه‌های شهر دزفول» هستی. 
لحن تو: بسیار با احترام، صمیمی، دقیق و آشنا به لهجه و فرهنگ اصیل دزفول و تاریخچه معماری خشتی شهر.

وظایف تو:
۱. اگر کاربر پرسید «امشب کدوم مسجد مراسم فاطمیه داره؟»، تقویم مراسمات امروز را بررسی کن و نام مساجد، حسینیه‌ها، ساعت، سخنران و مداح را تفکیک‌شده بگو.
۲. اگر پرسید «نزدیک‌ترین مسجد به محله سیاه‌پوشان کجاست؟»، مساجد آن محله، امکانات و زمان اذان و نماز جماعت را توضیح بده.
۳. اگر درباره فعالیت‌های خیریه، صندوق‌های قرض‌الحسنه، یا برنامه‌های صالحین نوجوانان پرسید، شرایط و فرد رابط را معرفی کن.
۴. اوقات شرعی دقیق امروز دزفول را در صورت درخواست ارائه کن.
۵. در صورت عدم وجود اطلاعات، با احترام اعلام کن و امکان ثبت رویداد توسط خادمان را یادآوری نما.`,
    expectedOutput: 'پرامپت سیستمی آماده برای اتصال به مدل‌های Gemini / OpenAI',
    tags: ['Chatbot', 'LLM Prompt', 'Agent', 'Gemini']
  },
  {
    id: 'p4',
    title: 'پرامپت تولید خودکار بنر و اطلاعیه مراسم (Event Banner & Poster Copy)',
    category: 'event_generator',
    description: 'پرامپت برای تولید متن پوستر، اطلاعیه شبکه‌های اجتماعی و پیامک‌های اطلاع‌رسانی مراسمات مذهبی مساجد.',
    inputVariables: ['مناسبت', 'نام مسجد یا حسینیه', 'سخنران', 'مداح', 'زمان و مکان'],
    promptText: `با استفاده از اطلاعات زیر، یک پکیج متنی کامل و جذاب برای اطلاع‌رسانی مراسم مذهبی تولید کن:

اطلاعات ورودی:
- مناسبت: [نام مناسبت]
- مکان: [نام مسجد یا حسینیه و محله]
- سخنران: [نام سخنران]
- مداح / قاری: [نام مداح]
- زمان: [تاریخ و ساعت دقیق]
- ویژگی‌های خاص: [مثلاً اطعام، مهدکودک کودک، سرویس رفت‌وآمد]

خروجی‌های مورد نیاز:
۱. متن رسمی و سنتی مناسب برای پوستر و بنر چاپی
۲. متن کوتاه و گیرا برای پیامک اطلاع‌رسانی (زیر ۷۰ کاراکتر و زیر ۱۶۰ کاراکتر)
۳. کپشن شکیل برای کانال‌های ایتا، بله و تلگرام همراه با ایموجی‌های مناسب مذهبی و هشتگ‌ها
۴. متن استوری اینستاگرام و وضعیت واتساپ`,
    expectedOutput: 'پکیج متنی ۵ بخشی آماده کپی و ارسال',
    tags: ['Marketing', 'Poster', 'Social Media', 'Eitaa']
  },
  {
    id: 'p5',
    title: 'پرامپت استخراج خودکار و دسته‌بندی برنامه‌ها از پوستر (Vision & Text OCR Parser)',
    category: 'activity_parser',
    description: 'پرامپت برای ورودی دادن تصاویر بنر و پوسترهای مساجد به هوش مصنوعی بینایی (Multimodal) جهت استخراج خودکار داده‌ها و ثبت در دیتابیس.',
    inputVariables: ['تصویر پوستر مراسم'],
    promptText: `تصویر ارائه‌شده مربوط به پوستر یا اطلاعیه یک مراسم در مسجد یا حسینیه است. 
لطفاً با دقت بالا تمام داده‌های کلیدی را استخراج کرده و در قالب فرمت JSON معتبر زیر برگردان:

{
  "eventName": "عنوان دقیق مراسم",
  "venueName": "نام مسجد یا حسینیه",
  "occasion": "مناسبت (شهادت، ولادت، یادواره، دعا، جشن)",
  "dateSolar": "تاریخ به فرمت YYYY/MM/DD",
  "dayOfWeek": "روز هفته",
  "startTime": "ساعت شروع به فرمت HH:MM",
  "speakers": ["نام سخنران ۱", "..."],
  "eulogists": ["نام مداح یا قاری ۱", "..."],
  "address": "آدرس ذکر شده در بنر",
  "specialNotes": "نکات خاص مثل اطعام، مهد کودک، پخش زنده",
  "contactNumber": "شماره تماس در صورت وجود"
}

در صورتی که هر فیلد در تصویر وجود نداشت، مقدار آن را null قرار بده.`,
    expectedOutput: 'یک آبجکت تمیز JSON جهت ثبت مستقیم در پایگاه داده سامانه',
    tags: ['OCR', 'Gemini Vision', 'JSON Parser', 'Automation']
  }
];

export const PRAYER_TIMES_DEZFUL = {
  city: 'دزفول',
  province: 'خوزستان',
  fajr: '۰۵:۲۲',
  sunrise: '۰۶:۴۲',
  dhuhr: '۱۲:۱۵',
  asr: '۱۵:۲۵',
  maghrib: '۱۸:۴۲',
  isha: '۱۹:۳۰',
  midnight: '۲۳:۴۵'
};
