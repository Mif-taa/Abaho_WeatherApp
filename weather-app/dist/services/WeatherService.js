export class WeatherService {
    constructor() {
        this.API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    }
    async fetchByCity(city) {
        const url = `${this.BASE_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
        return this.fetchWeather(url);
    }
    async fetchByCoords(lat, lon) {
        const url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;
        return this.fetchWeather(url);
    }
    async fetchWeather(url) {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok || data.cod === '404' || data.cod === 404) {
            throw new Error(data.cod === '404' || data.cod === 404 ? 'NOT_FOUND' : 'NETWORK_ERROR');
        }
        return this.mapToWeatherData(data);
    }
    mapToWeatherData(data) {
        return {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition: data.weather[0].description,
            conditionCode: data.weather[0].id,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            visibility: Math.round((data.visibility || 0) / 1000),
            pressure: data.main.pressure,
            icon: data.weather[0].icon,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            timezone: data.timezone,
        };
    }
}
//# sourceMappingURL=WeatherService.js.map