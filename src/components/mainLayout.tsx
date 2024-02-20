import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { parseData } from '../helpers';
import SearchBar from './search/searchBar';
import { getLocation } from '../geoLocation';
import { City, Coordinates, Units } from '../types';
import { fetchForecast } from '../api/weather';
import ErrorView from './errorView';
import Widget from './Widget';
import WeekForecast from './weekForecast';
import CurrentConditions from './currentConditions';

export default function MainLayout() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState<City>({
    name: 'My Location',
    coordinates: { lat: null, lon: null },
  });
  const [units, setUnits] = useState<Units>('metric');
  const [refreshing, setRefreshing] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const onRefresh = React.useCallback(async (coordinate: Coordinates) => {
    setRefreshing(true);
    await fetchData(coordinate);
    setRefreshing(false);
  }, []);

  const fetchData = async (coordinates: Coordinates) => {
    try {
      setIsLoading(true);
      const response = await fetchForecast(coordinates, units);
      const parsedData = parseData(response);
      setWeatherData(parsedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setWeatherData(null);
      Alert.alert('Error', error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (city.coordinates.lat && city.coordinates.lon) {
      fetchData(city.coordinates);
    }
  }, [city.coordinates, units]);

  useEffect(() => {
    setIsLoading(true);
    const getUserLocation = async () => {
      const coordinates = await getLocation();
      if (coordinates) {
        setCity({
          name: 'My location',
          coordinates,
        });
      }
    };

    getUserLocation();
  }, []);

  return (
    <>
      <SearchBar onSearch={setCity} units={units} setUnits={setUnits} />
      {isLoading || !weatherData ? (
        <ActivityIndicator size="large" color="#FFF" style={{ flex: 1 }} />
      ) : (
        <>
          <ScrollView
            style={{ ...styles.scrollView }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh(city.coordinates)}
              />
            }
            stickyHeaderIndices={[0]}
            indicatorStyle="white"
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollY } } },
            ])}
          >
            <Widget
              city={city?.name}
              {...weatherData.widget}
              scrollY={scrollY}
            />
            <WeekForecast data={weatherData.forecast} />
            <CurrentConditions data={weatherData.daily} />
          </ScrollView>
        </>
      )}
      {!weatherData && !isLoading && <ErrorView />}
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
});
