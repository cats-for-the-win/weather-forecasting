import React, { useEffect, useState } from "react";
import TimeAndLocation from "./TimeAndLocation";
import Topbuttons from "./Topbuttons";
import SearchInput from "./SearchInput";
import TempAndDetails from "./TempAndDetails";
import Forecast from "./Forecast";
import getFormattedWeatherData from "../services/weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ q: 'London', units: 'metric' });
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-200 to-blue-800">
      <Topbuttons />
      <SearchInput />
      <TimeAndLocation weather={weather} />
      <TempAndDetails weather={weather} />
      <Forecast weather={weather} />
    </div>
  );
}

export default App;
