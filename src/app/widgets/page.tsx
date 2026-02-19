'use client';

import { useState, useEffect } from 'react';
import { useClock } from '@/hooks/useClock';
import Nav from '@/components/Nav';
import styles from './page.module.css';

interface Weather {
  temp: number;
  description: string;
  icon: string;
  city: string;
  humidity: number;
  wind: number;
  feelsLike: number;
}

export default function WidgetsPage() {
  const now = useClock();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`
          );
          const data = await res.json();
          const current = data.current;
          const wmoCode = current.weather_code;

          const descriptions: Record<number, string> = {
            0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
            45: 'foggy', 48: 'rime fog', 51: 'light drizzle', 53: 'drizzle', 55: 'heavy drizzle',
            61: 'light rain', 63: 'rain', 65: 'heavy rain', 71: 'light snow', 73: 'snow', 75: 'heavy snow',
            80: 'rain showers', 81: 'moderate showers', 82: 'violent showers',
            95: 'thunderstorm', 96: 'thunderstorm w/ hail', 99: 'severe thunderstorm',
          };

          const icons: Record<number, string> = {
            0: '☀', 1: '🌤', 2: '⛅', 3: '☁',
            45: '🌫', 48: '🌫', 51: '🌦', 53: '🌧', 55: '🌧',
            61: '🌧', 63: '🌧', 65: '🌧', 71: '❄', 73: '❄', 75: '❄',
            80: '🌦', 81: '🌧', 82: '⛈',
            95: '⛈', 96: '⛈', 99: '⛈',
          };

          // Reverse geocode for city name
          let city = 'your location';
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const geoData = await geoRes.json();
            city = geoData.city || geoData.locality || 'your location';
          } catch { /* use default */ }

          setWeather({
            temp: Math.round(current.temperature_2m),
            description: descriptions[wmoCode] ?? 'unknown',
            icon: icons[wmoCode] ?? '🌡',
            city,
            humidity: current.relative_humidity_2m,
            wind: Math.round(current.wind_speed_10m),
            feelsLike: Math.round(current.apparent_temperature),
          });
        } catch {
          setWeatherError('failed to fetch weather');
        }
      },
      () => setWeatherError('location access denied'),
    );
  }, []);

  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const clock = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.title}>chase&apos;s dashboard</span>
      </header>
      <Nav />

      <div className={styles.pageTitle}>
        <span className={styles.pageName}>widgets</span>
        <span className={styles.line} />
      </div>

      <div className={styles.widgetGrid}>
        {/* Clock Widget */}
        <div className={styles.widget}>
          <div className={styles.widgetLabel}>clock</div>
          <div className={styles.clockDisplay}>{clock}</div>
          <div className={styles.dateDisplay}>{date}</div>
        </div>

        {/* Weather Widget */}
        <div className={styles.widget}>
          <div className={styles.widgetLabel}>weather</div>
          {weatherError ? (
            <div className={styles.weatherError}>{weatherError}</div>
          ) : !weather ? (
            <div className={styles.weatherLoading}>loading...</div>
          ) : (
            <>
              <div className={styles.weatherMain}>
                <span className={styles.weatherIcon}>{weather.icon}</span>
                <span className={styles.weatherTemp}>{weather.temp}°F</span>
              </div>
              <div className={styles.weatherDesc}>{weather.description}</div>
              <div className={styles.weatherCity}>{weather.city}</div>
              <div className={styles.weatherDetails}>
                <span>feels like {weather.feelsLike}°</span>
                <span>humidity {weather.humidity}%</span>
                <span>wind {weather.wind} mph</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
