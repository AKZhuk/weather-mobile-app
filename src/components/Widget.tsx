import React from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { MyTheme } from '../theme';

export default function Widget({
  city,
  icon,
  temp,
  description,
  isHorizontal,
}: {
  city: string;
  icon: string;
  temp: string;
  description: string;
  isHorizontal: boolean;
}) {
  return (
    <Animated.View
      style={{
        ...styles.container,
        flexDirection: isHorizontal ? 'row' : 'column',
      }}
    >
      <View>
        <Text
          style={{
            ...styles.city,
            textAlign: isHorizontal ? 'left' : 'center',
          }}
        >
          {city}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image
        source={{ uri: icon }}
        style={isHorizontal ? styles.icon_row : styles.icon}
      />
      <Text style={styles.temperature}>{temp}°</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: MyTheme.colors.background,
  },
  city: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: MyTheme.colors.text,
  },
  icon: { height: 150, width: 200 },
  icon_row: { height: 80, width: 80 },
  temperature: {
    fontSize: 46,
    fontWeight: '700',
    textAlign: 'center',
    color: MyTheme.colors.text,
  },
  description: {
    color: MyTheme.colors.text,
    textAlign: 'center',
  },
});
