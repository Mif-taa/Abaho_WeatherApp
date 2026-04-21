import { Language, Translations } from '../models/Weather';

const translationMap: Record<Language, Translations> = {
  en: {
    searchPlaceholder: 'Search for a city...',
    searchBtn: 'Search',
    temperature: 'Temperature',
    feelsLike: 'Feels Like',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    visibility: 'Visibility',
    pressure: 'Pressure',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    loading: 'Fetching weather data...',
    errorNotFound: 'City not found. Please check the spelling.',
    errorNetwork: 'Network error. Please check your connection.',
    errorGeneric: 'Something went wrong. Please try again.',
    heatWarningTitle: '⚠️ Heat Warning',
    heatWarningMsg: 'Heat Alert: Stay hydrated and avoid direct sunlight!',
    heatDangerTitle: '🔥 Extreme Heat Danger',
    heatDangerMsg: 'Extreme Heat! Stay indoors, drink plenty of water, and seek medical help if needed.',
    langToggle: 'বাংলা',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    locationBtn: 'Use My Location',
    lastSearched: 'Last searched',
    weatherIn: 'Weather in',
    feelsLikeLabel: 'Feels like',
    kmh: 'km/h',
    km: 'km',
    hPa: 'hPa',
    percent: '%',
  },
  bn: {
    searchPlaceholder: 'শহরের নাম খুঁজুন...',
    searchBtn: 'খুঁজুন',
    temperature: 'তাপমাত্রা',
    feelsLike: 'অনুভূত তাপমাত্রা',
    humidity: 'আর্দ্রতা',
    windSpeed: 'বায়ুর গতি',
    visibility: 'দৃশ্যমানতা',
    pressure: 'বায়ুচাপ',
    sunrise: 'সূর্যোদয়',
    sunset: 'সূর্যাস্ত',
    loading: 'আবহাওয়ার তথ্য লোড হচ্ছে...',
    errorNotFound: 'শহর পাওয়া যায়নি। বানান পরীক্ষা করুন।',
    errorNetwork: 'নেটওয়ার্ক সমস্যা। সংযোগ পরীক্ষা করুন।',
    errorGeneric: 'কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।',
    heatWarningTitle: '⚠️ তাপ সতর্কতা',
    heatWarningMsg: 'তাপ সতর্কতা: পানি পান করুন এবং রোদ এড়িয়ে চলুন!',
    heatDangerTitle: '🔥 অত্যধিক তাপপ্রবাহ',
    heatDangerMsg: 'অতিরিক্ত গরম! ঘরে থাকুন, প্রচুর পানি পান করুন এবং প্রয়োজনে চিকিৎসকের পরামর্শ নিন।',
    langToggle: 'English',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    locationBtn: 'আমার অবস্থান ব্যবহার করুন',
    lastSearched: 'সর্বশেষ খোঁজা',
    weatherIn: 'আবহাওয়া',
    feelsLikeLabel: 'অনুভূতি',
    kmh: 'কিমি/ঘন্টা',
    km: 'কিমি',
    hPa: 'হেক্টোপাস্কেল',
    percent: '%',
  },
};

export class LanguageService {
  private currentLang: Language;

  constructor() {
    const saved = localStorage.getItem('weather_lang') as Language | null;
    this.currentLang = saved || 'bn';
  }

  get(key: keyof Translations): string {
    return translationMap[this.currentLang][key];
  }

  toggle(): Language {
    this.currentLang = this.currentLang === 'en' ? 'bn' : 'en';
    localStorage.setItem('weather_lang', this.currentLang);
    return this.currentLang;
  }

  getLanguage(): Language {
    return this.currentLang;
  }

  setLanguage(lang: Language): void {
    this.currentLang = lang;
    localStorage.setItem('weather_lang', lang);
  }
}
