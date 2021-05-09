import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createRange } from './Utilities';

export default function ValueSelect(props: ValueSelectProperties) {
    return (
        <View style={[styles.container, props.styles.valueSelectContainer]}>
            {createRange(9, 1).map(i => (
                <TouchableOpacity key={i} onPress={() => props.onPress(i)} style={[props.styles.valueSelectBtn, i === props.selectedValue ? props.styles.valueSelectBtnSelected : undefined]}>
                    <Text style={[props.styles.valueSelectTxt, (i === props.selectedValue ? props.styles.valueSelectTxtSelected : undefined)]}>{i}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

interface ValueSelectProperties {
    selectedValue: number;
    onPress: (value: number) => void;

    styles: {
        valueSelectContainer: StyleProp<ViewStyle>;
        valueSelectBtn: StyleProp<ViewStyle>;
        valueSelectBtnSelected: StyleProp<ViewStyle>;
        valueSelectTxt: StyleProp<TextStyle>;
        valueSelectTxtSelected: StyleProp<TextStyle>;
    };
}

const styles = StyleSheet.create({
    container: {
    },
    btn: {

    },
});