import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { fetchWeather, fetchForecast, fetchHistoricalBatch } from '../utils/api';
import dynamic from 'next/dynamic';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const SearchBar = dynamic(() => import('../components/SearchBar'));
const CurrentWeather = dynamic(() => import('../components/CurrentWeather'));
const Forecast = dynamic(() => import('../components/Forecast'));
const Historical = dynamic(() => import('../components/Historical'));
const StarsCanvas = dynamic(() => import('../components/StarsCanvas'));

// Loading and Error components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="loader"></div>
  </div>
);

const ErrorMessage = () => (
  <div className="flex flex-col items-center text-center text-red-500">
    <AiOutlineExclamationCircle className="text-4xl mb-2" />
    <p>Could not display data. Please try again later.</p>
  </div>
);

function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [hasAttemptedRequest, setHasAttemptedRequest] = useState(false);

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery(
    ['weather', city],
    () => fetchWeather(city),
    { enabled: !!city, onSettled: () => setHasAttemptedRequest(true) }
  );

  const { data: forecastData, isLoading: forecastLoading, error: forecastError } = useQuery(
    ['forecast', city],
    () => fetchForecast(city),
    { enabled: !!city, onSettled: () => setHasAttemptedRequest(true) }
  );

  const { data: historicalData, isLoading: historicalLoading, error: historicalError } = useQuery(
    ['historical', coordinates],
    () => fetchHistoricalBatch(coordinates.lat, coordinates.lon),
    { enabled: !!coordinates, onSettled: () => setHasAttemptedRequest(true) }
  );

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    setHasAttemptedRequest(false); // Reset attempt status for new city search
  };

  useEffect(() => {
    if (weatherData) {
      setCoordinates({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });
    }
  }, [weatherData]);

  const renderTabContent = () => {
    const isLoading = weatherLoading || forecastLoading || historicalLoading;
    const hasError = (weatherError || forecastError || historicalError) && hasAttemptedRequest;

    if (isLoading) return <LoadingSpinner />;
    if (hasError) return <ErrorMessage />;

    switch (activeTab) {
      case 'current':
        return weatherData ? <CurrentWeather data={weatherData} /> : null;
      case 'forecast':
        return forecastData ? <Forecast data={forecastData} /> : null;
      case 'historical':
        return historicalData ? <Historical data={historicalData} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StarsCanvas />
      <Head>
        <title>Weather Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Weather Dashboard</h1>
        <SearchBar onSearch={handleSearch} />

        {city && (
          <div className="mb-4">
            <div className="flex space-x-4 border-b border-gray-700">
              {['current', 'forecast', 'historical'].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 font-medium focus:outline-none ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {renderTabContent()}
      </main>
    </div>
  );
}

export default WeatherDashboard;
