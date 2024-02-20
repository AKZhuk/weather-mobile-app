export interface Coordinates {
  lat: number;
  lon: number;
}

export interface DailyData {
  day: string;
  temp: {
    min: number;
    max: number;
  };
  icon: string;
}

export type Units = 'metric' | 'imperial';

export interface UnitOption {
  name: string;
  value: Units;
}

export interface City {
  name: string;
  coordinates: Coordinates;
}

export interface CurrentConditions {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}
export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentConditions;
  daily: DailyForecast[];
}

export interface Location {
  name: string;
  local_names: {
    ascii?: string;
    feature_name?: string;
    ar?: string;
    en?: string;
    my?: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}
