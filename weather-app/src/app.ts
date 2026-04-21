import { WeatherService } from './services/WeatherService';
import { LanguageService } from './services/LanguageService';
import { AlertService } from './services/AlertService';
import { WeatherUI } from './ui/WeatherUI';
import { AppState } from './models/Weather';

export class App {
  private weatherService: WeatherService;
  private langService: LanguageService;
  private alertService: AlertService;
  private ui: WeatherUI;
  private state: AppState;
  private debounceTimer: number | null = null;

  constructor() {
    this.langService = new LanguageService();
    this.alertService = new AlertService(this.langService);
    this.weatherService = new WeatherService();
    this.ui = new WeatherUI(this.langService);
    this.state = {
      currentWeather: null,
      language: this.langService.getLanguage(),
      lastCity: localStorage.getItem('weather_last_city') || '',
      isDarkMode: false,
      isLoading: false,
      error: null,
    };
  }

  init(): void {
    this.ui.restoreDarkMode();
    this.ui.updateLabels();
    this.bindEvents();

    const lastCity = this.state.lastCity;
    if (lastCity) {
      this.ui.setLastSearched(lastCity);
      this.search(lastCity);
    }
  }

  private bindEvents(): void {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const langToggle = document.getElementById('lang-toggle');
    const darkToggle = document.getElementById('dark-toggle');
    const locationBtn = document.getElementById('location-btn');

    searchBtn?.addEventListener('click', () => this.onSearch());

    searchInput?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') this.onSearch();
    });

    searchInput?.addEventListener('input', () => {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(() => {
        const val = searchInput.value.trim();
        if (val.length >= 3) this.search(val);
      }, 600);
    });

    langToggle?.addEventListener('click', () => {
      this.langService.toggle();
      this.state.language = this.langService.getLanguage();
      this.ui.updateLabels();
      if (this.state.currentWeather) {
        const alert = this.alertService.evaluate(this.state.currentWeather.temperature);
        this.ui.showWeather(this.state.currentWeather, alert);
      }
      document.documentElement.lang = this.state.language === 'bn' ? 'bn' : 'en';
    });

    darkToggle?.addEventListener('click', () => {
      this.ui.toggleDarkMode();
    });

    locationBtn?.addEventListener('click', () => this.onLocationSearch());
  }

  private onSearch(): void {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const city = input?.value.trim();
    if (city) this.search(city);
  }

  private async search(city: string): Promise<void> {
    if (this.state.isLoading) return;
    this.state.isLoading = true;
    this.ui.showLoading();

    try {
      const data = await this.weatherService.fetchByCity(city);
      this.state.currentWeather = data;
      this.state.lastCity = city;
      localStorage.setItem('weather_last_city', city);
      this.ui.setLastSearched(city);

      const alert = this.alertService.evaluate(data.temperature);
      this.ui.showWeather(data, alert);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'GENERIC';
      if (msg === 'NOT_FOUND') this.ui.showError('NOT_FOUND');
      else if (msg === 'NETWORK_ERROR') this.ui.showError('NETWORK_ERROR');
      else this.ui.showError('GENERIC');
    } finally {
      this.state.isLoading = false;
    }
  }

  private onLocationSearch(): void {
    if (!navigator.geolocation) return;
    this.ui.showLoading();
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await this.weatherService.fetchByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          this.state.currentWeather = data;
          this.state.lastCity = data.city;
          localStorage.setItem('weather_last_city', data.city);
          this.ui.setLastSearched(data.city);
          const alert = this.alertService.evaluate(data.temperature);
          this.ui.showWeather(data, alert);
        } catch {
          this.ui.showError('NETWORK_ERROR');
        }
      },
      () => this.ui.showError('GENERIC')
    );
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());
