import { AlertLevel } from '../models/Weather';
import { LanguageService } from './LanguageService';

export interface Alert {
  level: 'none' | 'warning' | 'danger';
  title: string;
  message: string;
}

export class AlertService {
  private readonly WARNING_THRESHOLD = 35;
  private readonly DANGER_THRESHOLD = 40;

  constructor(private langService: LanguageService) {}

  evaluate(tempCelsius: number): Alert {
    if (tempCelsius >= this.DANGER_THRESHOLD) {
      return {
        level: 'danger',
        title: this.langService.get('heatDangerTitle'),
        message: this.langService.get('heatDangerMsg'),
      };
    } else if (tempCelsius >= this.WARNING_THRESHOLD) {
      return {
        level: 'warning',
        title: this.langService.get('heatWarningTitle'),
        message: this.langService.get('heatWarningMsg'),
      };
    }
    return { level: 'none', title: '', message: '' };
  }

  getAlertLevel(tempCelsius: number): AlertLevel {
    if (tempCelsius >= this.DANGER_THRESHOLD) {
      return { level: 'danger', threshold: this.DANGER_THRESHOLD };
    } else if (tempCelsius >= this.WARNING_THRESHOLD) {
      return { level: 'warning', threshold: this.WARNING_THRESHOLD };
    }
    return { level: 'none', threshold: 0 };
  }
}
