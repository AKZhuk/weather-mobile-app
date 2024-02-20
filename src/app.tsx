import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MainLayout from './components/mainLayout';
import { MyTheme } from './theme';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <MainLayout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.colors.background,
    paddingTop: 45,
    flex: 1,
  },
});
