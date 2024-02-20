import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MyTheme } from '../theme';

export default function ErrorView() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/notAvailable.png')}
        style={styles.icon}
      ></Image>
      <Text style={styles.text}>
        Something went wrong,please try again later
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: { height: 150, width: 200 },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    maxWidth: '70%',
    fontSize: 24,
    color: MyTheme.colors.textSecondary,
  },
});
