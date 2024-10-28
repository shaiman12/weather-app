import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_METEO_HISTORICAL_API_URL = "https://archive-api.open-meteo.com/v1/archive";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const fetchWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export const fetchForecast = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

/**
 * Fetch historical weather data for a specific day.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 */
export const fetchHistoricalBatch = async (lat, lon) => {
  const currentDate = dayjs();
  const start_date = currentDate.subtract(1, 'year').format('YYYY-MM-DD');
  const end_date = currentDate.format('YYYY-MM-DD');

  try {
    const response = await axios.get(OPEN_METEO_HISTORICAL_API_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        start_date,
        end_date,
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    });

    const dailyData = response.data.daily.time
    .map((date, index) => ({
      date,
      temp: {
        min: response.data.daily.temperature_2m_min[index],
        max: response.data.daily.temperature_2m_max[index],
      },
    }))
    .filter((_, index) => index % 12 === 0); // Keep only every other day
  
  localStorage.setItem("historicalData", JSON.stringify(dailyData));
  return dailyData;
  
  } catch (error) {
    console.error("Failed to fetch historical data:", error.message);
    throw error;
  }
};