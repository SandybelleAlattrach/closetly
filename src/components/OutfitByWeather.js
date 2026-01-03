import { useEffect, useState } from "react";
import "./OutfitByWeather.css";

import jacket from "../assets/jacket.png";
import sweater from "../assets/sweater.png";
import tshirt from "../assets/tshirt.png";
import raincoat from "../assets/raincoat.png";
import summer from "../assets/summer.png";

export default function OutfitByWeather() {
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          const data = await res.json();
          setWeather(data.current_weather);
        } catch {
          setError("Failed to load weather data.");
        }
      },
      () => setError("Location permission denied.")
    );
  }, []);

  function getWeatherIcon(code) {
    if (code < 3) return "☀️";
    if (code < 50) return "⛅";
    if (code < 70) return "🌧️";
    if (code < 90) return "❄️";
    return "🌩️";
  }

  function getOutfit(temp, wind, code) {
    if (code >= 50 && code < 70)
      return { name: "Raincoat", image: raincoat };

    if (wind > 30)
      return { name: "Windproof Jacket", image: jacket };

    if (temp < 10)
      return { name: "Heavy Jacket", image: jacket };

    if (temp < 20)
      return { name: "Light Sweater", image: sweater };

    if (temp < 30)
      return { name: "T-Shirt", image: tshirt };

    return { name: "Summer Outfit", image: summer };
  }

  if (error) return <p className="error">{error}</p>;
  if (!weather) return <p className="loading">Loading...</p>;

  const outfit = getOutfit(
    weather.temperature,
    weather.windspeed,
    weather.weathercode
  );

  return (
    <div className={darkMode ? "card dark" : "card"}>
      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h2>Weather Based Outfit</h2>

      <div className="weather-icon">
        {getWeatherIcon(weather.weathercode)}
      </div>

      <p>🌡️ Temperature: {weather.temperature}°C</p>
      <p>💨 Wind Speed: {weather.windspeed} km/h</p>

      <p className="outfit">
        👕 Recommended Outfit: <strong>{outfit.name}</strong>
      </p>

      {outfit.image && (
        <img src={outfit.image} alt={outfit.name} />
      )}
    </div>
  );
}
