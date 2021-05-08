import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { adjustRange, createRange } from './Utilities';

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
        <TouchableOpacity onPress={() => props.onPress()} style={[styles.container, { width: props.size, height: props.size, backgroundColor: calculateColor(props.index.x, props.index.y, props.index.z) }]}>
            {display}
        </TouchableOpacity>
    );
}

interface CellProperties {
    value?: number;
    notes: number[];
    onPress: () => void;
    size: number;
    index: { x: number, y: number, z: number };
}

function calculateColor(x: number, y: number, z: number) {
    return `rgb(${adjustRange(0, 8, 0, 255, x)},${adjustRange(0, 8, 0, 255, y)},${adjustRange(0, 8, 0, 255, z)})`;
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgb(0,0,0)',
        borderColor: '#555',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    valueDisplay: {
        color: '#999',
    },
    noteDisplay: {
        color: '#b00b69',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        left: 3,
    },
});