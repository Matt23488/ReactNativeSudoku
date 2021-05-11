import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export default function GridCell(props: GridCellProperties) {
    return (
        <View style={props.styles.gridCellContainer}>
            <TouchableOpacity onPress={props.onPress} style={props.styles.gridCell}>
                {/* <Text style={props.styles.gridText}>{props.value.toString().padStart(2, '0')}</Text> */}
                <Text style={[props.styles.gridText, (props.error ? props.styles.gridTextError : {})]}>{props.value || undefined}</Text>
            </TouchableOpacity>
        </View>
    );
}

interface GridCellProperties {
    value: number;
    error: boolean;
    onPress: () => void;

    
    styles: {
        gridCellContainer: StyleProp<ViewStyle>;
        gridCell: StyleProp<ViewStyle>;
        gridText: StyleProp<TextStyle>;
        gridTextError: StyleProp<TextStyle>;
    };
}