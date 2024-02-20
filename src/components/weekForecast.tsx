import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MyTheme } from '../theme';
import { DailyData } from '../types';

export default function WeekForecast({ data }: { data: DailyData[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7 day Forecast</Text>
      {data.map(({ day, temp, icon }: DailyData, idx: number) => (
        <View
          style={[styles.row, idx !== data.length - 1 ? styles.withBorder : {}]}
          key={day + idx}
        >
          <Text style={styles.day}>{day}</Text>
          <Image source={{ uri: icon }} style={styles.icon} />
          <Text style={{ ...styles.temperature, ...styles.temperatureMin }}>
            {temp.min}°
          </Text>
          <Text style={styles.temperature}>{temp.max}°</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    flex: 1,
    borderRadius: 15,
    flexDirection: 'column',
    backgroundColor: MyTheme.colors.secondaryBackground,
    opacity: 0.6,
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: MyTheme.colors.text,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: MyTheme.colors.border,
  },
  temperature: {
    fontSize: 16,
    color: MyTheme.colors.text,
    opacity: 1,
    width: 28,
    fontWeight: '700',
  },
  temperatureMin: {
    fontWeight: '400',
    color: MyTheme.colors.textSecondary,
  },
  title: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  day: {
    fontSize: 18,
    fontWeight: '700',
    color: MyTheme.colors.text,
    width: 55,
  },
  icon: { height: 30, width: 50 },
});
