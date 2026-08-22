export type VenueType = 'mosque' | 'husseiniya' | 'tekyeh' | 'mahdieh';

export interface PrayerSchedule {
  morning: { time: string; imam: string; isCongregational: boolean };
  noon: { time: string; imam: string; isCongregational: boolean };
  evening: { time: string; imam: string; isCongregational: boolean };
  fridayPrayer?: { imam: string; time: string };
  notes?: string;
}

export interface WeeklyProgram {
  id: string;
  title: string;
  dayOfWeek: string; // e.g. 'دوشنبه‌ها', 'جمعه‌ها'
  time: string;
  instructorOrHost: string;
  category: 'salihin' | 'quran' | 'dua' | 'mahdaviat' | 'nahj' | 'youth' | 'sports';
  targetAudience: 'عموم' | 'نوجوانان و جوانان' | 'خواهران' | 'برادران' | 'کودکان';
}

export interface CharityService {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'seasonal';
  contactPerson?: string;
  cardForDonation?: string;
}

export interface VenueFeatures {
  hasParking: boolean;
  hasElevator: boolean;
  hasWheelchairAccess: boolean;
  hasLibrary: boolean;
  hasBasijBase: boolean;
  hasCulturalCenter: boolean;
  hasCharityBox: boolean;
  hasSoundSystem: boolean;
  hasDiningHall: boolean;
  hasQuranicSchool: boolean;
  hasVirtualTour: boolean;
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  neighborhood: string;
  address: string;
  establishedEra: string; // e.g. 'قرن سوم هجری', 'دوره قاجار', 'معاصر'
  approxCapacity: number;
  imamJamaat: string;
  trustee: string; // هیئت امنا / متولی
  contactPhone: string;
  images: string[];
  description: string;
  features: VenueFeatures;
  prayerSchedule: PrayerSchedule;
  weeklyPrograms: WeeklyProgram[];
  charityServices: CharityService[];
  audioGuideAvailable: boolean;
  coordinates: { lat: number; lng: number };
  likesCount: number;
  isHistoric: boolean;
  registrationNumber?: string; // شماره ثبت ملی
}

export interface Occasion {
  id: string;
  title: string;
  solarDate: string; // YYYY/MM/DD
  hijriDate: string;
  type: 'celebration' | 'mourning' | 'worship' | 'national';
  description: string;
  isHoliday: boolean;
}

export interface CeremonyEvent {
  id: string;
  title: string;
  venueId: string;
  venueName: string;
  venueType: VenueType;
  neighborhood: string;
  date: string; // 1403/08/15
  time: string; // 18:30
  type: 'mourning' | 'celebration' | 'prayer_dua' | 'quran' | 'workshop' | 'charity' | 'salihin';
  speaker?: string; // سخنران
  eulogist?: string; // مداح / قاری
  description: string;
  image?: string;
  isLiveNow?: boolean;
  occasionId?: string;
  occasionTitle?: string;
  registrationRequired?: boolean;
  capacity?: number;
  registeredCount?: number;
  status: 'ongoing' | 'upcoming' | 'completed';
}

export interface NeighborhoodInfo {
  id: string;
  name: string;
  era: string;
  description: string;
  mosquesCount: number;
  husseiniyasCount: number;
  heritageSitesCount: number;
  image: string;
  coordinates: { lat: number; lng: number };
  prominentFeatures: string[];
}

export interface AIPromptTemplate {
  id: string;
  title: string;
  category: 'database' | 'calendar_sync' | 'activity_parser' | 'event_generator' | 'chatbot' | 'seo_content';
  description: string;
  promptText: string;
  inputVariables: string[];
  expectedOutput: string;
  tags: string[];
}
