import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';
import { createRange } from './Utilities';

export default function Board() {
    const minDim = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    const cellSize = minDim / 10;
    const nineSquaresSize = cellSize * 3 + 6;
    const boardSize = nineSquaresSize * 3 + 2;
    return (
        <View style={[styles.board, { width: boardSize }]}>
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
        </View>
    );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  nineSquares: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#555',
    borderWidth: 3,
    padding: 0,
  },
});
