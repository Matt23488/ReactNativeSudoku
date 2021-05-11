import React from 'react';
import { Dimensions, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import GridBlock from './GridBlock';
import { SudokuGraphNode } from './Sudoku';
import { createRange } from './Utilities';

export default function Grid(props: GridProperties) {
    return (
        <View style={props.styles.grid}>
            {createRange(9).map(i => (
                <GridBlock
                    key={i}
                    values={props.values[i]}
                    errors={props.errors.filter(e => e.i === i)}
                    styles={props.styles}
                    onCellPressed={j => props.onCellPressed(i, j)}
                />
            ))}
        </View>
    );
}

interface GridProperties {
    values: number[][];
    errors: SudokuGraphNode[];
    onCellPressed: (block: number, index: number) => void;

    styles: {
        grid: StyleProp<ViewStyle>,
        gridBlockContainer: StyleProp<ViewStyle>,
        gridBlock: StyleProp<ViewStyle>,
        gridCellContainer: StyleProp<ViewStyle>,
        gridCell: StyleProp<ViewStyle>,
        gridText: StyleProp<TextStyle>,
        gridTextError: StyleProp<TextStyle>,
    };
}

