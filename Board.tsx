import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';
import { createRange, flatten2DArray } from './Utilities';

// https://web.archive.org/web/20150818220344/http://blogs.msdn.com/b/ericlippert/archive/2010/07/15/graph-colouring-with-simple-backtracking-part-two.aspx
export default class Board extends React.Component<BoardProperties, BoardState> {
    public constructor(props: BoardProperties) {
        super(props);
        this.state = {
            graph: flatten2DArray(createRange(9).map(i => createRange(9).map(j => ({
                index: {
                    x: (j % 3) + (i % 3 * 3),
                    y: Math.floor(j / 3) + (Math.floor(i / 3) * 3),
                    z: i
                },
                notes: []
            }))))
        };
    }

    private handleClick(cellState: CellState) {
        switch (cellState.value) {
            case undefined: cellState.value = 1; break;
            case 9: cellState.value = undefined; break;
            default: cellState.value++; break;
        }
        this.setState({ graph: this.state.graph });
    }

    public render() {
        const sizes = calculateSizes();
        let idx = 0;
        return (
            <View style={[styles.board, { width: sizes.boardSize }]}>
                {createRange(9).map(i => {
                return (
                    <View key={i} style={{ borderColor: '#555', borderWidth: 1 }}>
                        <View style={[styles.nineSquares, { width: sizes.squareSize }]}>
                        {createRange(9).map(j => {
                            const cellState = this.state.graph[idx++];
                            return (
                                <View key={j} style={{ borderColor: '#333', borderWidth: 1 }}>
                                    <Cell index={cellState.index} value={cellState.value} notes={cellState.notes} size={sizes.cellSize} onPress={() => this.handleClick(cellState)} />
                                </View>
                            );
                        })}
                        </View>
                    </View>
                )
                })}
            </View>
        );
    }
}

interface BoardProperties {}
interface BoardState {
    graph: CellState[];
}

interface CellState {
    index: { x: number, y: number, z: number };
    value?: number;
    notes: number[];
}

function calculateSizes() {
    const minDim = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    const tenCells = minDim - minDim % 10;
    const cellSize = tenCells / 10;
    const squareSize = (cellSize + 2) * 3;
    const boardSize = (squareSize + 2) * 3;

    return { cellSize, squareSize, boardSize };
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  nineSquares: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#555',
    // borderWidth: 3,
    padding: 0,
  },
});
