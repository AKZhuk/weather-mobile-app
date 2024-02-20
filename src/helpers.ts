import { Condition } from './components/currentConditions';
import { CurrentConditions, DailyData, WeatherResponse } from './types';

export const formatDate = (timestamp: number, timezone: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'short',
    timeZone: timezone,
  }).format(new Date(timestamp * 1000));
};

const mapper: {
  [key: string]: {
    title: string;
    param: string;
    formatter?: (p1: any, p2: any) => string | number;
  };
} = {
  clouds: {
    title: 'Cloudiness',
    param: '%',
  },
  humidity: {
    title: 'Humidity',
    param: '%',
  },
  pressure: {
    title: 'Atmospheric pressure',
    param: 'hPa',
  },
  sunrise: {
    title: 'Sunrise time',
    param: '',
    formatter: formatDate,
  },
  sunset: {
    title: 'Sunset time',
    param: '',
    formatter: formatDate,
  },
  uvi: {
    title: 'Current UV index',
    param: '',
  },
  visibility: {
    title: ' Visibility',
    param: ' km',
    formatter: (data: number) => data / 1000,
  },
  wind_speed: {
    title: 'Wind',
    param: ' m/s',
  },
};

export const parseDailyData = (data: WeatherResponse) => {
  const dataForRender: Condition[] = [];
  Object.entries(data.current).forEach(([key, value]) => {
    if (mapper[key]) {
      const { title, formatter, param } = mapper[key];
      dataForRender.push({
        title,
        value: `${formatter ? formatter(value, data.timezone) : value}${param}`,
      });
    }
  });
  return dataForRender;
};

export const parseWidgetData = (data: CurrentConditions) => {
  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;
  return {
    icon: `https://openweathermap.org/img/wn/${iconCode}@4x.png`,
    temp: Math.round(data.temp),
    description: `Feels like ${data.feels_like}°, ${description}.`,
  };
};

export const parseForecastData = (data: WeatherResponse) => {
  const dataForRender: DailyData[] = [];
  for (const day in data.daily) {
    const { dt, temp, weather } = data.daily[day];
    dataForRender.push({
      day:
        dataForRender.length === 0
          ? 'Today'
          : new Intl.DateTimeFormat('en-GB', {
              weekday: 'short',
              timeZone: data.timezone,
            }).format(new Date(dt * 1000)),
      temp: {
        min: Math.round(temp.min),
        max: Math.round(temp.max),
      },
      icon: `https://openweathermap.org/img/wn/${weather[0].icon}.png`,
    });
  }

  return dataForRender;
};

export const parseData = (data: WeatherResponse) => {
  const dataForRender = {
    forecast: parseForecastData(data),
    widget: parseWidgetData(data.current),
    daily: parseDailyData(data),
  };

  return dataForRender;
};
