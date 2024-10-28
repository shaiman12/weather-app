import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Decimation } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Decimation)

const Historical = ({ data }) => {
  if (!data || !data.length) return <p>No historical data available.</p>

  const dates = data.map((item) => item.date)
  const minTemps = data.map((item) => item.temp.min)
  const maxTemps = data.map((item) => item.temp.max)

  const chartData = {
    labels: dates,
    datasets: [
      { label: 'Min Temperature (°C)', data: minTemps, borderColor: 'rgba(75, 192, 192, 0.8)', backgroundColor: 'rgba(75, 192, 192, 0.2)', fill: true, tension: 0.4 },
      { label: 'Max Temperature (°C)', data: maxTemps, borderColor: 'rgba(255, 99, 132, 0.8)', backgroundColor: 'rgba(255, 99, 132, 0.2)', fill: true, tension: 0.4 },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 50, // Adjust this value as needed
      },
    },
    plugins: {
      decimation: {
        algorithm: 'lttb', // 'lttb' is suitable for line charts
        enabled: true,
      },
      legend: { position: 'top', labels: { color: 'white' } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          maxTicksLimit: 10, // Limit the number of ticks shown on the x-axis
        },
      },
      y: {
        ticks: { color: 'white' },
      },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
  }

  return (
    <div
      className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:h-[300px]"
      style={{ maxHeight: '600px' }}>
      <h2 className="text-2xl font-bold mb-4">Historical Temperature Data (Past Year)</h2>
      <Line
        data={chartData}
        options={chartOptions}
      />
    </div>
  )
}

export default Historical
