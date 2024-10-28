import React from 'react';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';

const weatherConditionToColor = {
  Clear: 'bg-blue-500', // Clear skies
  Clouds: 'bg-gray-500', // Cloudy
  Rain: 'bg-gray-700', // Rainy
  Thunderstorm: 'bg-purple-700', // Thunderstorms
  Drizzle: 'bg-blue-300', // Light rain/drizzle
  Snow: 'bg-white', // Snowy
  Mist: 'bg-gray-300', // Misty
  Smoke: 'bg-gray-400', // Smoky
  Haze: 'bg-yellow-300', // Hazy
  Dust: 'bg-yellow-500', // Dusty
  Fog: 'bg-gray-400', // Foggy
  Sand: 'bg-yellow-600', // Sandy
  Ash: 'bg-gray-600', // Ash
  Squall: 'bg-blue-800', // Squalls
  Tornado: 'bg-red-800', // Tornado
};

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const weatherCondition = data.weather[0].main;
  const colorClass = weatherConditionToColor[weatherCondition] || 'bg-white bg-opacity-10';

  return (
    <div className={`${colorClass} backdrop-filter backdrop-blur-lg rounded-lg p-6`}>
      <h2 className="text-2xl font-bold mb-4 text-white">{data.name}</h2>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <span className="text-5xl ml-4">{Math.round(data.main.temp)}°C</span>
        </div>
        <div className="text-center sm:text-left">
          <p className="flex items-center text-lg">
            <WiThermometer className="text-2xl mr-2" />
            Feels like: {Math.round(data.main.feels_like)}°C
          </p>
          <p className="flex items-center mt-2 text-lg">
            <WiHumidity className="text-2xl mr-2" />
            Humidity: {data.main.humidity}%
          </p>
          <p className="flex items-center mt-2 text-lg">
            <WiStrongWind className="text-2xl mr-2" />
            Wind: {data.wind.speed} m/s
          </p>
        </div>
      </div>
      <p className="mt-4 text-xl text-center sm:text-left">{data.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;