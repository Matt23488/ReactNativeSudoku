import React from 'react';
import { Dimensions, Text, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Grid from './Grid';
import { createRange, flatten2DArray, replaceCopy } from './Utilities';
import ValueSelect from './ValueSelect';
import Graph from './Graph';

export interface SudokuGraphNode {
    i: number;
    j: number;
    getValue: () => number;
}

export default class Sudoku extends React.Component<SudokuProperties, SudokuState> {
    private readonly _graph = new Graph<SudokuGraphNode>();
    private readonly _graphNodes: SudokuGraphNode[];

    public constructor(props: SudokuProperties) {
        super(props);

        // const gridValues = createRange(9).map(i => createRange(9).map(j => Number(`${i}${j}`)));
        const gridValues = Array(9).fill(Array(9).fill(0));
        this.state = {
            history: [{ gridValues }],
            valueSelectValue: 0,
        };
        
        this._graphNodes = flatten2DArray(this.currentGridState.gridValues.map((inner, i) => inner.map((_, j) => ({
            i,
            j,
            getValue: () => this.currentGridState.gridValues[i][j]
        }))));

        // columns
        createRange(3).forEach(i => createRange(3).map(j => this._graph.connectMany(...this._graphNodes.filter(node => node.i % 3 === i && node.j % 3 === j))));
        // rows
        createRange(3, 0, 3).forEach(i => createRange(3, 0, 3).map(j => this._graph.connectMany(...this._graphNodes.filter(node => node.i >= i && node.i < i + 3 && node.j >= j && node.j < j + 3))));
        // blocks
        createRange(9).forEach(i => this._graph.connectMany(...this._graphNodes.filter(node => node.i === i)));

        console.log(this._graph);
    }

    private get currentGridState() {
        return this.state.history[this.state.history.length - 1];
    }

    private onUndo() {
        if (this.state.history.length === 1) return;
        this.setState({ history: this.state.history.slice(0, -1) })
    }

    private onCellPressed(block: number, index: number) {
        const gridValues = replaceCopy(this.currentGridState.gridValues, block, index, this.state.valueSelectValue);
        this.setState({ history: this.state.history.concat({ gridValues }) });
    }

    private onValueSelected(value: number) {
        this.setState({ valueSelectValue: value === this.state.valueSelectValue ? 0 : value });
    }

    private checkCollision(a: SudokuGraphNode, b: SudokuGraphNode) {
        const val = a.getValue();
        return val !== 0 && val === b.getValue();
    }

    public render() {
        const collisions = this._graph.connectedNodesWhere(this.checkCollision);
        const valueSelect = <ValueSelect selectedValue={this.state.valueSelectValue} styles={styles} onPress={this.onValueSelected.bind(this)} />;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onUndo.bind(this)} style={styles.undoBtn}><FontAwesome name="undo" size={cellSize * 0.6} color="white" /></TouchableOpacity>
                {(height > width) && valueSelect}
                <Grid
                    styles={styles}
                    errors={[...collisions]}
                    values={createRange(9).map(i => createRange(9).map(j => this.currentGridState.gridValues[i][j]))} onCellPressed={this.onCellPressed.bind(this)}
                />
                {(width > height) && valueSelect}
            </View>
        );
    }
}

interface SudokuProperties {}
interface SudokuState {
    history: { gridValues: number[][]; }[]
    valueSelectValue: number;
}

const cellScaleFactor = 0.75;
const { width, height } = Dimensions.get('window');
const minDim = Math.min(width, height);
const tenCells = minDim - minDim % 10;
const cellSize = tenCells / 10 * cellScaleFactor;

const cellBorderWidth = 1;
const blockBorderWidth = 3;
const gridBorderWidth = 3;

const blockSize = (cellSize + cellBorderWidth * 2) * 3;
const gridSize = (blockSize + blockBorderWidth * 2) * 3 + gridBorderWidth * 2;

const styles = StyleSheet.create({
    container: {
        flexDirection: width > height ? 'row' : 'column',
    },
    valueSelectContainer: {
        flexDirection: width > height ? 'column' : 'row',
        marginLeft: width > height ? (cellSize * 0.75) : 0,
        marginBottom: width > height ? 0 : (cellSize * 0.75),
        height: width > height ? gridSize : undefined,
        width: width > height ? undefined : gridSize,
        justifyContent: 'space-between',
    },
    valueSelectBtn: {
        width: gridSize / 10,
        height: gridSize / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
    },
    valueSelectBtnSelected: {
        backgroundColor: '#000',
    },
    valueSelectTxt: {
        fontSize: cellSize * 0.6,
    },
    valueSelectTxtSelected: {
        color: '#fff',
    },
    undoBtn: {
        width: gridSize / 10,
        height: gridSize / 10,
        backgroundColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        marginRight: width > height ? (cellSize * 0.75) : 0,
        marginBottom: width > height ? 0 : (cellSize * 0.75),
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: gridSize,
        height: gridSize,
        borderColor: '#000',
        borderWidth: 3,
    },
    gridBlockContainer: {
        borderColor: '#000',
        borderWidth: 3,
    },
    gridBlock: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: blockSize,
        height: blockSize,
    },
    gridCellContainer: {
        borderColor: '#000',
        borderWidth: 1,
    },
    gridCell: {
        width: cellSize,
        height: cellSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridText: {
        fontSize: cellSize * 0.75,
    },
    gridTextError: {
        color: 'red',
    },
});