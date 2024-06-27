import React, { useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ setQuery }) => {
  const [city, setCity] = useState('');

  const handleSearchClick = async () => {
    if (city.trim() !== '') {
      setQuery(city.trim());
      setCity('');
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b7e151fd23b4601144abdf24c91c1f1a`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const data = await response.json();
          const cityName = data.name;

          setQuery(cityName);
          console.log(url); 
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='flex justify-center my-6 space-x-4'>
      <input
        type='text'
        placeholder='Search by city...'
        className='text-gray-500 text-xl font-light p-2 capitalize placeholder:lowercase'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <FaSearch
        size={30}
        className='cursor-pointer text-white pt-2 hover:scale-125 transition ease-out'
        onClick={handleSearchClick}
      />
      <BiCurrentLocation
        size={35}
        className='cursor-pointer text-white pt-1 hover:scale-125 transition ease-out'
        onClick={handleLocationClick}
      />
    </div>
  );
};

export default SearchInput;
