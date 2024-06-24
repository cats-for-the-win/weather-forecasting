import { DateTime } from "luxon";

const API_KEY = 'b7e151fd23b4601144abdf24c91c1f1a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();
    console.log(`Fetching weather data from URL: ${url}`);
    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }
        return res.json();
    });
};

const iconURLFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd, LLL, yyyy ' | Local time:' hh:mm aa") => {
    return DateTime.fromSeconds(secs).plus({ seconds: offset }).toFormat(format);
};

const formatCurrent = (data) => {
    const {
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name, dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }, timezone,
    } = data;

    const { main: weatherMain, description: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);
    console.log(data);
    return {
        temp, feels_like, humidity, temp_min, temp_max, name, country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed, details, icon: iconURLFromCode(icon),
        formattedLocalTime,
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

export default getFormattedWeatherData;
