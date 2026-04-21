export class AlertService {
    constructor(langService) {
        this.langService = langService;
        this.WARNING_THRESHOLD = 35;
        this.DANGER_THRESHOLD = 40;
    }
    evaluate(tempCelsius) {
        if (tempCelsius >= this.DANGER_THRESHOLD) {
            return {
                level: 'danger',
                title: this.langService.get('heatDangerTitle'),
                message: this.langService.get('heatDangerMsg'),
            };
        }
        else if (tempCelsius >= this.WARNING_THRESHOLD) {
            return {
                level: 'warning',
                title: this.langService.get('heatWarningTitle'),
                message: this.langService.get('heatWarningMsg'),
            };
        }
        return { level: 'none', title: '', message: '' };
    }
    getAlertLevel(tempCelsius) {
        if (tempCelsius >= this.DANGER_THRESHOLD) {
            return { level: 'danger', threshold: this.DANGER_THRESHOLD };
        }
        else if (tempCelsius >= this.WARNING_THRESHOLD) {
            return { level: 'warning', threshold: this.WARNING_THRESHOLD };
        }
        return { level: 'none', threshold: 0 };
    }
}
//# sourceMappingURL=AlertService.js.map