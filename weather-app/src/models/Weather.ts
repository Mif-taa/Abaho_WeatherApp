export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface AppState {
  currentWeather: WeatherData | null;
  language: 'en' | 'bn';
  lastCity: string;
  isDarkMode: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AlertLevel {
  level: 'none' | 'warning' | 'danger';
  threshold: number;
}

export type Language = 'en' | 'bn';

export interface Translations {
  searchPlaceholder: string;
  searchBtn: string;
  temperature: string;
  feelsLike: string;
  humidity: string;
  windSpeed: string;
  visibility: string;
  pressure: string;
  sunrise: string;
  sunset: string;
  loading: string;
  errorNotFound: string;
  errorNetwork: string;
  errorGeneric: string;
  heatWarningTitle: string;
  heatWarningMsg: string;
  heatDangerTitle: string;
  heatDangerMsg: string;
  langToggle: string;
  darkMode: string;
  lightMode: string;
  locationBtn: string;
  lastSearched: string;
  weatherIn: string;
  feelsLikeLabel: string;
  kmh: string;
  km: string;
  hPa: string;
  percent: string;
}
