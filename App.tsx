import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Board from './Board';

export default function App() {
  return (
    <View style={styles.container}>
      <Board />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
    paddingTop: 50,
  },
});
