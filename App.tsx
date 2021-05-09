import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Sudoku from './Sudoku';

export default function App() {
  const { width, height } = Dimensions.get('window');
  const flexDirection = width > height ? 'row' : 'column';
  const paddingTop = width > height ? 0 : 50;
  const paddingLeft = width > height ? 50 : 0;
  return (
    <View style={[styles.container, { flexDirection, paddingTop, paddingLeft }]}>
      <Sudoku />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
});
