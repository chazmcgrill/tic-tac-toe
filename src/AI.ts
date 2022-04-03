import { Board, Token } from './types';
import { availableMoves, winCheck } from './utils';

interface MoveObject {
    index: number;
    value: any;
}

export class AI {
    private board;
    private aiToken;
    private humanToken;

    constructor(board: Board, aiToken: Token) {
        this.board = board.slice();
        this.aiToken = aiToken;
        this.humanToken = aiToken === Token.X ? Token.O : Token.X;
    }

    getMove() {
        const { board, aiToken } = this;
        const { index } = this.minimax(board, aiToken, 0);
        return index;
    }

    /* Minimax algorithm function for unbeatable ai */
    private minimax(tempBoard: Board, turn: Token, depth: number): MoveObject {
        const availableSquareIndexes = availableMoves(tempBoard);
        const movesArray: MoveObject[] = [];
        let maxValue = -Infinity;
        let minValue = Infinity;
        let bestIndex = -1;

        if (winCheck(tempBoard, this.humanToken)) {
            return { index: bestIndex, value: depth - 10 };
        } else if (winCheck(tempBoard, this.aiToken)) {
            return { index: bestIndex, value: 10 - depth };
        } else if (!availableSquareIndexes.length) {
            return { index: bestIndex, value: 0 };
        }

        availableSquareIndexes.forEach((availableSquareIndex) => {
            const moveObj = { index: availableSquareIndex, value: 0 };
            let returnResult;

            tempBoard[availableSquareIndex] = turn;

            if (turn === this.aiToken) {
                returnResult = this.minimax(tempBoard, this.humanToken, depth + 1);
                moveObj.value = returnResult.value;
            } else {
                returnResult = this.minimax(tempBoard, this.aiToken, depth + 1);
                moveObj.value = returnResult.value;
            }

            tempBoard[availableSquareIndex] = moveObj.index;
            movesArray.push(moveObj);
        });

        if (turn === this.aiToken) {
            movesArray.forEach((move, index) => {
                if (move.value > maxValue) {
                    maxValue = move.value;
                    bestIndex = index;
                }
            });
        } else {
            movesArray.forEach((move, index) => {
                if (move.value < minValue) {
                    minValue = move.value;
                    bestIndex = index;
                }
            });
        }

        return movesArray[bestIndex];
    }
}
