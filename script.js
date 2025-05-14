async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const weather = data.weather[0].main.toLowerCase();
    const icon = document.getElementById('weatherIcon');
    icon.className = 'weather-icon';

    if (weather.includes('cloud')) {
      icon.classList.add('cloudy');
    } else if (weather.includes('clear')) {
      icon.classList.add('sunny');
    } else {
      icon.classList.add('cloudy'); // fallback
    }

    // Set theme for day/night
    const isNight = data.weather[0].icon.includes('n');
    document.body.style.background = isNight
      ? 'linear-gradient(to bottom, #2c3e50, #000000)'
      : 'linear-gradient(to bottom, #87ceeb, #fefefe)';

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('desc').textContent = data.weather[0].description;
  } catch (err) {
    alert('City not found or API error.');
  }
}

