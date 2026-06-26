/**
 * weather.js
 * Fetches current weather via browser geolocation → Open-Meteo (free, no key)
 * Reverse geocoding via Nominatim (OpenStreetMap, free)
 */

const WMO_CODES = {
  0:  { label: 'Clear',                  icon: '☀️' },
  1:  { label: 'Mostly clear',           icon: '🌤️' },
  2:  { label: 'Partly cloudy',          icon: '⛅' },
  3:  { label: 'Cloudy',                 icon: '☁️' },
  45: { label: 'Fog',                    icon: '🌫️' },
  48: { label: 'Freezing fog',           icon: '🌫️' },
  51: { label: 'Light drizzle',          icon: '🌦️' },
  53: { label: 'Drizzle',                icon: '🌦️' },
  55: { label: 'Heavy drizzle',          icon: '🌧️' },
  61: { label: 'Rain',                   icon: '🌧️' },
  63: { label: 'Moderate rain',          icon: '🌧️' },
  65: { label: 'Heavy rain',             icon: '🌧️' },
  71: { label: 'Snow',                   icon: '🌨️' },
  73: { label: 'Moderate snow',          icon: '❄️' },
  75: { label: 'Heavy snow',             icon: '❄️' },
  80: { label: 'Rain showers',           icon: '🌦️' },
  81: { label: 'Moderate rain showers',  icon: '🌧️' },
  82: { label: 'Violent rain showers',   icon: '⛈️' },
  95: { label: 'Thunderstorm',           icon: '⛈️' },
  99: { label: 'Thunderstorm with hail', icon: '⛈️' },
};

function getWeatherInfo(code) {
  return WMO_CODES[code] || { label: 'Variable weather', icon: '🌡️' };
}

async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      'Your location'
    );
  } catch {
    return 'Your location';
  }
}

async function fetchWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weathercode,windspeed_10m` +
    `&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather API error');
  return res.json();
}

function renderWidget(temp, code, city) {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;

  const { label, icon } = getWeatherInfo(code);
  const roundedTemp = Math.round(temp);

  widget.innerHTML = `
    <span class="weather-icon">${icon}</span>
    <div class="weather-body">
      <span class="weather-temp">${roundedTemp}°C</span>
      <span class="weather-desc">${label}</span>
      <span class="weather-loc">${city}</span>
    </div>
  `;
  widget.classList.add('loaded');
}

function renderError() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;
  widget.innerHTML = `<span class="weather-error">Weather unavailable</span>`;
  widget.classList.add('loaded');
}

function initWeather() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;

  // Loading state
  widget.innerHTML = `<span class="weather-icon">🌡️</span><div class="weather-body"><span class="weather-desc">Detecting location...</span></div>`;

  if (!navigator.geolocation) {
    renderError();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      try {
        const [weatherData, city] = await Promise.all([
          fetchWeather(lat, lon),
          reverseGeocode(lat, lon),
        ]);
        const { temperature_2m: temp, weathercode: code } = weatherData.current;
        renderWidget(temp, code, city);
      } catch {
        renderError();
      }
    },
    () => {
      // Geolocation denied: fallback to Palermo (user's city)
      fetchWeather(38.1157, 13.3615)
        .then(data => {
          const { temperature_2m: temp, weathercode: code } = data.current;
          renderWidget(temp, code, 'Palermo');
        })
        .catch(renderError);
    },
    { timeout: 8000, maximumAge: 300000 }
  );
}

document.addEventListener('DOMContentLoaded', initWeather);
