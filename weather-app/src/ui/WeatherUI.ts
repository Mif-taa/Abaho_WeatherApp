import { WeatherData } from '../models/Weather';
import { LanguageService } from '../services/LanguageService';
import { Alert } from '../services/AlertService';

export class WeatherUI {
  private elements: Record<string, HTMLElement | null> = {};

  constructor(private langService: LanguageService) {
    this.cacheElements();
  }

  private cacheElements(): void {
    const ids = [
      'search-input', 'search-btn', 'lang-toggle', 'dark-toggle',
      'location-btn', 'weather-card', 'loading', 'error-msg',
      'alert-banner', 'alert-title', 'alert-msg',
      'city-name', 'country-flag', 'temp-value', 'feels-like',
      'condition-text', 'weather-icon', 'humidity-val', 'wind-val',
      'visibility-val', 'pressure-val', 'sunrise-val', 'sunset-val',
      'label-temp', 'label-feels', 'label-humidity', 'label-wind',
      'label-visibility', 'label-pressure', 'label-sunrise', 'label-sunset',
      'temp-bar', 'last-searched'
    ];
    ids.forEach(id => {
      this.elements[id] = document.getElementById(id);
    });
  }

  updateLabels(): void {
    const set = (id: string, key: Parameters<LanguageService['get']>[0]) => {
      const el = this.elements[id];
      if (el) el.textContent = this.langService.get(key);
    };

    set('label-temp', 'temperature');
    set('label-feels', 'feelsLike');
    set('label-humidity', 'humidity');
    set('label-wind', 'windSpeed');
    set('label-visibility', 'visibility');
    set('label-pressure', 'pressure');
    set('label-sunrise', 'sunrise');
    set('label-sunset', 'sunset');
    set('lang-toggle', 'langToggle');
    set('search-btn', 'searchBtn');
    set('location-btn', 'locationBtn');

    const input = this.elements['search-input'] as HTMLInputElement | null;
    if (input) input.placeholder = this.langService.get('searchPlaceholder');

    const darkBtn = this.elements['dark-toggle'];
    if (darkBtn) {
      const isDark = document.body.classList.contains('dark');
      darkBtn.textContent = isDark ? this.langService.get('lightMode') : this.langService.get('darkMode');
    }
  }

  showLoading(): void {
    this.hideAll();
    const el = this.elements['loading'];
    if (el) {
      el.style.display = 'flex';
      el.querySelector('span')!.textContent = this.langService.get('loading');
    }
  }

  showError(type: 'NOT_FOUND' | 'NETWORK_ERROR' | 'GENERIC'): void {
    this.hideAll();
    const el = this.elements['error-msg'];
    if (el) {
      el.style.display = 'flex';
      const msgEl = el.querySelector('p');
      if (msgEl) {
        if (type === 'NOT_FOUND') msgEl.textContent = this.langService.get('errorNotFound');
        else if (type === 'NETWORK_ERROR') msgEl.textContent = this.langService.get('errorNetwork');
        else msgEl.textContent = this.langService.get('errorGeneric');
      }
    }
  }

  showWeather(data: WeatherData, alert: Alert): void {
    this.hideAll();
    const card = this.elements['weather-card'];
    if (card) card.style.display = 'block';

    this.renderWeather(data);
    this.renderAlert(alert);
    this.updateLabels();
  }

  private renderWeather(data: WeatherData): void {
    const setText = (id: string, val: string) => {
      const el = this.elements[id];
      if (el) el.textContent = val;
    };

    setText('city-name', data.city);
    setText('temp-value', `${data.temperature}°C`);
    setText('feels-like', `${this.langService.get('feelsLikeLabel')} ${data.feelsLike}°C`);
    setText('condition-text', this.capitalise(data.condition));
    setText('humidity-val', `${data.humidity}${this.langService.get('percent')}`);
    setText('wind-val', `${data.windSpeed} ${this.langService.get('kmh')}`);
    setText('visibility-val', `${data.visibility} ${this.langService.get('km')}`);
    setText('pressure-val', `${data.pressure} ${this.langService.get('hPa')}`);
    setText('country-flag', this.countryToFlag(data.country));
    setText('sunrise-val', this.formatTime(data.sunrise, data.timezone));
    setText('sunset-val', this.formatTime(data.sunset, data.timezone));

    const icon = this.elements['weather-icon'] as HTMLImageElement | null;
    if (icon) {
      icon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
      icon.alt = data.condition;
    }

    // Animate temp bar
    const bar = this.elements['temp-bar'];
    if (bar) {
      const pct = Math.min(100, Math.max(0, ((data.temperature + 10) / 60) * 100));
      (bar as HTMLElement).style.width = `${pct}%`;
      (bar as HTMLElement).style.background = data.temperature >= 40
        ? 'var(--danger)' : data.temperature >= 35
        ? 'var(--warning)' : data.temperature >= 25
        ? 'var(--warm)' : 'var(--cool)';
    }
  }

  private renderAlert(alert: Alert): void {
    const banner = this.elements['alert-banner'];
    if (!banner) return;

    if (alert.level === 'none') {
      banner.style.display = 'none';
      document.body.classList.remove('heat-warning', 'heat-danger');
      return;
    }

    banner.style.display = 'flex';
    banner.className = `alert-banner alert-${alert.level}`;
    document.body.classList.remove('heat-warning', 'heat-danger');
    document.body.classList.add(alert.level === 'danger' ? 'heat-danger' : 'heat-warning');

    const titleEl = this.elements['alert-title'];
    const msgEl = this.elements['alert-msg'];
    if (titleEl) titleEl.textContent = alert.title;
    if (msgEl) msgEl.textContent = alert.message;
  }

  setLastSearched(city: string): void {
    const el = this.elements['last-searched'];
    if (el && city) {
      el.style.display = 'block';
      el.textContent = `${this.langService.get('lastSearched')}: ${city}`;
    }
  }

  toggleDarkMode(): boolean {
    const isDark = document.body.classList.toggle('dark');
    const btn = this.elements['dark-toggle'];
    if (btn) btn.textContent = isDark ? this.langService.get('lightMode') : this.langService.get('darkMode');
    localStorage.setItem('weather_dark', isDark ? '1' : '0');
    return isDark;
  }

  restoreDarkMode(): void {
    if (localStorage.getItem('weather_dark') === '1') {
      document.body.classList.add('dark');
      const btn = this.elements['dark-toggle'];
      if (btn) btn.textContent = this.langService.get('lightMode');
    }
  }

  private hideAll(): void {
    ['weather-card', 'loading', 'error-msg'].forEach(id => {
      const el = this.elements[id];
      if (el) el.style.display = 'none';
    });
  }

  private formatTime(unix: number, tzOffset: number): string {
    const d = new Date((unix + tzOffset) * 1000);
    const h = d.getUTCHours().toString().padStart(2, '0');
    const m = d.getUTCMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  private countryToFlag(code: string): string {
    return code.toUpperCase().replace(/./g, c =>
      String.fromCodePoint(127397 + c.charCodeAt(0))
    );
  }

  private capitalise(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
