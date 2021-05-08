import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createRange } from './Utilities';

export default function Cell(props: CellProperties) {
    const display = typeof props.value === 'number' ? (
        <Text style={[styles.valueDisplay, { fontSize: Math.round(props.size * 0.75)}]}>{props.value}</Text>
    ) : (
        [...createRange(9, 1)].map(i => (
            <Text key={i} style={[styles.noteDisplay, { width: props.size / 3 - 1, height: props.size / 3 - 1, fontSize: (Math.round(props.size * 0.25)) }]}>
                {props.notes.find(n => n === i)}
            </Text>
        ))
    );
    return (
        <TouchableOpacity onPress={() => props.onPress()} style={[styles.container, { width: props.size, height: props.size }]}>
            {display}
        </TouchableOpacity>
    );
}

interface CellProperties {
    value?: number;
    notes: number[];
    onPress: () => void;
    size: number;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    valueDisplay: {
        color: '#000',
    },
    noteDisplay: {
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        left: 3,
    },
});