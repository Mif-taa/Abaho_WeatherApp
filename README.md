# 🌤️ আবহাওয়া — Bengali Weather App

A TypeScript weather application with Bangla language support and heat alert system.

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── services/
│   │   ├── WeatherService.ts   — OpenWeatherMap API calls
│   │   ├── LanguageService.ts  — EN/BN translations
│   │   └── AlertService.ts     — Heat alert logic
│   ├── models/
│   │   └── Weather.ts          — TypeScript interfaces & types
│   ├── ui/
│   │   └── WeatherUI.ts        — DOM rendering class
│   └── app.ts                  — App controller (entry point)
├── tsconfig.json
├── index.html
└── README.md
```

## 🚀 Setup & Run

### Prerequisites
- Node.js (v16+)
- TypeScript (`npm install -g typescript`)
- Live Server (VS Code extension or `npm install -g live-server`)

### Steps

```bash
# 1. Install TypeScript globally
npm install -g typescript

# 2. Compile TypeScript to JavaScript
cd weather-app
tsc

# This outputs compiled JS to ./dist/

# 3. Start live server
live-server .
# OR open index.html directly in browser
```

### Watch Mode (auto-recompile)
```bash
tsc --watch
```

## 🌡️ Heat Alert Thresholds

| Temperature | Alert Level | Message |
|-------------|-------------|---------|
| ≥ 40°C      | 🔥 Danger   | Extreme heat warning |
| ≥ 35°C      | ⚠️ Warning  | Heat advisory |
| < 35°C      | ✅ None     | Normal |

## 🌐 Language Support

- **Default**: বাংলা (Bangla)
- **Toggle**: Click the language button to switch EN ↔ BN
- Persisted in `localStorage`

## ⚙️ Features

- ✅ Real-time weather via OpenWeatherMap API
- ✅ Class-based TypeScript architecture
- ✅ Bangla + English localization
- ✅ Heat alert system (35°C warning, 40°C danger)
- ✅ Geolocation support
- ✅ Dark mode toggle
- ✅ Debounced search input
- ✅ Last city persistence (localStorage)
- ✅ Responsive design

## 🔑 API Key

Uses OpenWeatherMap free tier API. Replace the key in `WeatherService.ts` if needed:
```typescript
private readonly API_KEY = 'your_api_key_here';
```
Get a free key at: https://openweathermap.org/api
