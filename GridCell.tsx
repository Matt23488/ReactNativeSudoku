import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export default function GridCell(props: GridCellProperties) {
    return (
        <View style={props.styles.gridCellContainer}>
            <TouchableOpacity onPress={props.onPress} style={props.styles.gridCell}>
                <Text style={props.styles.gridText}>{props.value || undefined}</Text>
            </TouchableOpacity>
        </View>
    );
}

interface GridCellProperties {
    value: number;
    onPress: () => void;

    
    styles: {
        gridCellContainer: StyleProp<ViewStyle>;
        gridCell: StyleProp<ViewStyle>;
        gridText: StyleProp<TextStyle>;
    };
}