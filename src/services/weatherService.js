import { DateTime } from "luxon";

const API_KEY = 'b7e151fd23b4601144abdf24c91c1f1a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const Forecast_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}';

const getWeatherData = async (infoType, searchParams) => {
  let url;
  if (infoType === "weather") {
    url = new URL(BASE_URL + infoType);
  } else if (infoType === "forecast") {
    url = new URL(Forecast_URL);
  }

  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const iconURLFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL, yyyy ' | Local time:' hh:mm a") => {
  const dateTime = DateTime.fromSeconds(secs, { zone: 'utc' });
  const localTime = dateTime.plus({ hours: offset / 3600 });
  return localTime.toFormat(format);
};

const formatCurrent = (data) => {
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name, dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: weatherMain, description: details, icon } = weather[0];

  return {
    temp, feels_like, humidity, temp_min, temp_max, name, country,
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed, details, icon: iconURLFromCode(icon),
    dt, timezone,
    formattedLocalTime: formatToLocalTime(dt, timezone),
    lat: data.coord.lat, lon: data.coord.lon,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrent);
    return { ...formattedCurrentWeather };
  } catch (error) {
    console.error('Error fetching or formatting weather data:', error);
    throw error;
  }
};

const formatForecastWeather = (secs, offset, data) => {
  const hourly = data.filter(f => f.dt > secs).slice(0, 5).map(f => ({
    temp: f.main.temp,
    title: formatToLocalTime(f.dt, offset, 'ccc'),
    icon: iconURLFromCode(f.weather[0].icon),
  }));

  const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
    temp: f.main.temp,
    title: formatToLocalTime(f.dt, offset, 'ccc'),
    icon: iconURLFromCode(f.weather[0].icon),
  }));

  return { hourly, daily };
};

const getFormattedForecastWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getFormattedWeatherData(searchParams);
  const { lat, lon, dt, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", { lat, lon, units: searchParams.units }).then(d => {
    return formatForecastWeather(dt, timezone, d.list);
  });

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
export { getFormattedForecastWeatherData };
