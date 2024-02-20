import { Coordinates, Location, Units, WeatherResponse } from '../types';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export const fetchLocation = async (inputValue: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${inputValue}&limit=10&appid=${API_KEY}`,
    );
    return (await response.json()) as Promise<Location[]>;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchForecast = async (
  { lat, lon }: Coordinates,
  units: Units,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly&appid=${API_KEY}`,
    );
    return (await response.json()) as Promise<WeatherResponse>;
  } catch (error) {
    console.error(error);
    return null;
  }
};
