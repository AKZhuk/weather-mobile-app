import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MyTheme } from '../theme';

const animationConfig: {
  inputRange: [number, number];
  extrapolate: Animated.ExtrapolateType;
} = {
  inputRange: [0, 300],
  extrapolate: 'clamp',
};
export default function Widget({
  city,
  icon,
  temp,
  description,
  scrollY,
}: {
  city: string;
  icon: string;
  temp: string;
  description: string;
  isHorizontal: boolean;
  scrollY: Animated.Value;
}) {
  const cityFontSize = scrollY.interpolate({
    ...animationConfig,
    outputRange: [32, 22],
  });

  const tempFontSize = scrollY.interpolate({
    ...animationConfig,
    outputRange: [64, 32],
  });

  const imageWidth = scrollY.interpolate({
    ...animationConfig,
    outputRange: [250, 80],
  });

  const imageHeight = scrollY.interpolate({
    ...animationConfig,
    outputRange: [180, 80],
  });

  const isHorizontal = Number(JSON.stringify(imageWidth)) < 120;

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: isHorizontal ? 'row' : 'column',
      }}
    >
      <View>
        <Animated.Text
          style={{
            ...styles.city,
            textAlign: isHorizontal ? 'left' : 'center',
            fontSize: cityFontSize,
          }}
        >
          {city}
        </Animated.Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Animated.Image
        source={{ uri: icon }}
        style={{ height: imageHeight, width: imageWidth }}
      />
      <Animated.Text style={{ ...styles.temperature, fontSize: tempFontSize }}>
        {temp}°
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    backgroundColor: MyTheme.colors.background,
  },
  city: {
    fontWeight: '500',
    color: MyTheme.colors.text,
  },
  temperature: {
    fontSize: 46,
    fontWeight: '200',
    textAlign: 'center',
    color: MyTheme.colors.text,
  },
  description: {
    color: MyTheme.colors.text,
    textAlign: 'center',
  },
});
