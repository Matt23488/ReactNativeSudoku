import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Cell from './Cell';
import { createRange } from './Utilities';

export default function App() {
  const minDim = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
  const cellSize = minDim / 10;
  const nineSquaresSize = cellSize * 3 + 2;
  const boardSize = nineSquaresSize * 3 + 2;
  return (
    <View style={styles.container}>
      <View style={[styles.board, { width: boardSize }]}>
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
        {[...createRange(9)].map(i => {
          return (
            <View key={i} style={[styles.nineSquares, { width: nineSquaresSize }]}>
              {[...createRange(9)].map(j => {
                const value = i === j ? i : undefined;
                const notes = [...createRange(Math.max(i, j), Math.max(i, j) - Math.min(i, j))];
                return <Cell key={j} value={value} notes={notes} size={cellSize} onPress={() => { alert(value || `Note count: ${notes.length}`); }} />;
              })}
            </View>
          )
        })}
        {/* <Cell onPress={() => {}} notes={[]} /> */}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // width: 468,
  },
  nineSquares: {
    // width: 152,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    padding: 0,
  },
});
