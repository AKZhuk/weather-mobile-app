import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { parseData } from '../helpers';
import SearchBar from './search/searchBar';
import { getLocation } from '../geoLocation';
import WeekForecast from './weekForecast';
import CurrentConditions from './currentConditions';
import { City, Coordinates, Units } from '../types';
import { fetchForecast } from '../api/weather';
import Widget from './Widget';

// const HEADER_MAX_HEIGHT = 250;
// const HEADER_MIN_HEIGHT = 100;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function MainLayout() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState<City>({
    name: 'My Location',
    coordinates: { lat: null, lon: null },
  });
  const [units, setUnits] = useState<Units>('metric');
  const [refreshing, setRefreshing] = useState(false);
  // const [scrollY] = useState(new Animated.Value(0));
  const [isHorizontal, setIsHorizontal] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > 100) {
      setIsHorizontal(true);
    } else {
      setIsHorizontal(false);
    }
  };

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

      setIsLoading(false);
    };

    getUserLocation();
  }, []);

  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp',
  // });

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
            onScroll={handleScroll}
          >
            <Widget
              city={city?.name}
              {...weatherData.widget}
              isHorizontal={isHorizontal}
            />
            <WeekForecast data={weatherData.forecast} />
            <CurrentConditions data={weatherData.daily} />
          </ScrollView>
        </>
      )}
      {/* {!weatherData && !isLoading && (
        <Image source={notAvailable} style={styles.icon}></Image>
      )} */}
    </>
  );
}

const styles = StyleSheet.create({
  icon: { height: 150, width: 200 },
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
