import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import GridCell from './GridCell';
import { createRange } from './Utilities';

export default function GridBlock(props: GridBlockProperties) {
    const gridCellProps = {
        gridCellContainer: props.styles.gridCellContainer,
        gridCell: props.styles.gridCell,
        gridText: props.styles.gridText,
    };
    return (
        <View style={props.styles.gridBlockContainer}>
            <View style={props.styles.gridBlock}>
                {createRange(9).map(i => (
                    <GridCell key={i} value={props.values[i]} styles={gridCellProps} onPress={() => props.onCellPressed(i)} />
                ))}
            </View>
        </View>
    );
}

interface GridBlockProperties {
    values: number[];
    onCellPressed: (index: number) => void;


    styles: {
        gridCellContainer: StyleProp<ViewStyle>;
        gridCell: StyleProp<ViewStyle>;
        gridBlockContainer: StyleProp<ViewStyle>;
        gridBlock: StyleProp<ViewStyle>;
        gridText: StyleProp<TextStyle>;
    };
}