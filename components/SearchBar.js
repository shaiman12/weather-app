import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      // setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center">
        <input
          className="appearance-none bg-transparent border-2 border-white rounded-l-lg w-full text-white py-2 px-4 leading-tight focus:outline-none focus:border-gray-300 placeholder-gray-400"
          type="text"
          placeholder="Enter city name... e.g. San Francisco"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
