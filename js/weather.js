/**
 * weather.js
 * Fetches current weather via browser geolocation → Open-Meteo (free, no key)
 * Reverse geocoding via Nominatim (OpenStreetMap, free)
 */

const WMO_CODES = {
  0:  { label: 'Sereno',           icon: '☀️' },
  1:  { label: 'Quasi sereno',     icon: '🌤️' },
  2:  { label: 'Parzialmente nuvoloso', icon: '⛅' },
  3:  { label: 'Nuvoloso',         icon: '☁️' },
  45: { label: 'Nebbia',           icon: '🌫️' },
  48: { label: 'Nebbia ghiacciata',icon: '🌫️' },
  51: { label: 'Pioggerella',      icon: '🌦️' },
  53: { label: 'Pioggerella',      icon: '🌦️' },
  55: { label: 'Pioggerella intensa', icon: '🌧️' },
  61: { label: 'Pioggia',          icon: '🌧️' },
  63: { label: 'Pioggia moderata', icon: '🌧️' },
  65: { label: 'Pioggia intensa',  icon: '🌧️' },
  71: { label: 'Neve',             icon: '🌨️' },
  73: { label: 'Neve moderata',    icon: '❄️' },
  75: { label: 'Neve intensa',     icon: '❄️' },
  80: { label: 'Rovesci',          icon: '🌦️' },
  81: { label: 'Rovesci moderati', icon: '🌧️' },
  82: { label: 'Rovesci violenti', icon: '⛈️' },
  95: { label: 'Temporale',        icon: '⛈️' },
  99: { label: 'Temporale con grandine', icon: '⛈️' },
};

function getWeatherInfo(code) {
  return WMO_CODES[code] || { label: 'Variabile', icon: '🌡️' };
}

async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=it`,
      { headers: { 'Accept-Language': 'it' } }
    );
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      'La tua posizione'
    );
  } catch {
    return 'La tua posizione';
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

  widget.innerHTML = `
    <span class="weather-icon">${icon}</span>
    <div class="weather-body">
      <span class="weather-temp">${Math.round(temp)}°C</span>
      <span class="weather-desc">${label}</span>
      <span class="weather-loc">${city}</span>
    </div>
  `;
  widget.classList.add('loaded');
}

function renderError() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;
  widget.innerHTML = `<span class="weather-error">Meteo non disponibile</span>`;
  widget.classList.add('loaded');
}

function initWeather() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;

  // Loading state
  widget.innerHTML = `<span class="weather-icon">🌡️</span><div class="weather-body"><span class="weather-desc">Rilevamento...</span></div>`;

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
