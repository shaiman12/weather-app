import React from 'react'
import dayjs from 'dayjs'

const Forecast = ({ data }) => {
  if (!data || !data.list) {
    return <p className="text-white">No forecast data available.</p>
  }

  // Filter data to get the forecast for noon each day
  const dailyData = data.list.filter((reading) => reading.dt_txt.includes('12:00:00'))

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-0">
        {dailyData.map((day, index) => (
          <div
            key={day.dt}
            className="text-center mb-0 pb-4 sm:pb-0 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-0">{dayjs(day.dt * 1000).format('ddd')}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-16 h-16 mx-auto"
            />
            <p className="text-xl mt-2">{Math.round(day.main.temp)}°C</p>
            <p className="text-sm">{day.weather[0].description}</p>
            {index < dailyData.length - 1 && <div className="w-1/2 border-b-2 border-gray-600 sm:hidden mt-4"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
