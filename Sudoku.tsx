import React from 'react';
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Grid from './Grid';
import { createRange, replaceCopy } from './Utilities';
import ValueSelect from './ValueSelect';

export default class Sudoku extends React.Component<SudokuProperties, SudokuState> {
    public constructor(props: SudokuProperties) {
        super(props);

        this.state = {
            gridValues: Array(9).fill(Array(9).fill(0)),
            valueSelectValue: 0,
        };
    }

    private onCellPressed(block: number, index: number) {
        this.setState({ gridValues: replaceCopy(this.state.gridValues, block, index, this.state.valueSelectValue) });
    }

    private onValueSelected(value: number) {
        this.setState({ valueSelectValue: value === this.state.valueSelectValue ? 0 : value });
    }

    public render() {
        const valueSelect = <ValueSelect selectedValue={this.state.valueSelectValue} styles={styles} onPress={this.onValueSelected.bind(this)} />;
        return (
            <View style={styles.container}>
                {(height > width) && valueSelect}
                <Grid styles={styles} values={createRange(9).map(i => createRange(9).map(j => this.state.gridValues[i][j]))} onCellPressed={this.onCellPressed.bind(this)} />
                {(width > height) && valueSelect}
            </View>
        );
    }
}

interface SudokuProperties {}
interface SudokuState {
    gridValues: number[][];
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
        paddingLeft: width > height ? (cellSize * 0.75) : 0,
        paddingBottom: width > height ? 0 : (cellSize * 0.75),
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
    }
});