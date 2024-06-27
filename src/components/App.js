import React, { useEffect, useState } from "react";
import TimeAndLocation from "./TimeAndLocation";
import Topbuttons from "./Topbuttons";
import SearchInput from "./SearchInput";
import TempAndDetails from "./TempAndDetails";
import Forecast from "./Forecast";
import getFormattedWeatherData, { getFormattedForecastWeatherData } from "../services/weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query,setQuery] = useState('Delhi');
  const [units, setUnits] = useState('metric');

  const getWeather = async () => {
    try {
      const currentWeatherData = await getFormattedWeatherData({ q: query, units });
      const forecastWeatherData = await getFormattedForecastWeatherData({ q: query, units });
  
      setWeather({ current: currentWeatherData, forecast: forecastWeatherData });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };  

  useEffect(() => {
    getWeather();
  }, [query, units]);


  const formatBackground = () =>
    {
      if(!weather) return "from-cyan-200 to-blue-800";
      const threshold = units==="metric" ? 25 : 77;
      if(weather.current.temp<=threshold) {return "from-cyan-200 to-blue-800"}
      else {return "from-yellow-600 to-orange-600"};
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Topbuttons setQuery={setQuery} />
      <SearchInput setQuery={setQuery}/>
      {weather && weather.current && weather.forecast &&
        (<>
          <TimeAndLocation weather={weather.current} />
          <TempAndDetails weather={weather.current} />
          <Forecast title={'3 hour step forecast'} data={weather.forecast.hourly} />
          <Forecast title={'Daily'} data={weather.forecast.daily} />
        </>)}
    </div>
  );
}

export default App;