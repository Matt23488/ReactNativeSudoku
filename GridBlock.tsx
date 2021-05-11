import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import GridCell from './GridCell';
import { SudokuGraphNode } from './Sudoku';
import { createRange } from './Utilities';

export default function GridBlock(props: GridBlockProperties) {
    const gridCellProps = {
        gridCellContainer: props.styles.gridCellContainer,
        gridCell: props.styles.gridCell,
        gridText: props.styles.gridText,
        gridTextError: props.styles.gridTextError,
    };
    return (
        <View style={props.styles.gridBlockContainer}>
            <View style={props.styles.gridBlock}>
                {createRange(9).map(i => (
                    <GridCell
                        key={i}
                        value={props.values[i]}
                        error={!!props.errors.filter(e => e.j === i)[0]}
                        styles={gridCellProps}
                        onPress={() => props.onCellPressed(i)} 
                    />
                ))}
            </View>
        </View>
    );
}

interface GridBlockProperties {
    values: number[];
    errors: SudokuGraphNode[];
    onCellPressed: (index: number) => void;


    styles: {
        gridCellContainer: StyleProp<ViewStyle>;
        gridCell: StyleProp<ViewStyle>;
        gridBlockContainer: StyleProp<ViewStyle>;
        gridBlock: StyleProp<ViewStyle>;
        gridText: StyleProp<TextStyle>;
        gridTextError: StyleProp<TextStyle>;
    };
}