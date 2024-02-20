import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import MainLayout from './components/mainLayout';
import { MyTheme } from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <MainLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.colors.background,
    paddingTop: 45,
    flex: 1,
  },
});
