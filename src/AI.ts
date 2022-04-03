import { Board, Token } from './types';
import { availableMoves, winCheck } from './utils';

interface MoveObject {
    index: number;
    value: any;
}

export class AI {
    private board;
    private token;

    constructor(board: Board, token: Token) {
        this.board = board.slice();
        this.token = token;
    }

    getMove() {
        const { board, token } = this;
        const aiMove = this.minimax(board, token, 0, token);
        return aiMove?.index;
    }

    /* Minimax algorithm function for unbeatable ai */
    private minimax(tempBoard: Board, turn: Token, depth: number, aiToken: Token): MoveObject {
        const humanToken = aiToken === Token.X ? Token.O : Token.X;
        const availableSquareIndexes = availableMoves(tempBoard);
        const movesArray: MoveObject[] = [];
        let maxValue = -Infinity;
        let minValue = Infinity;
        let bestSpot = -1;

        if (winCheck(tempBoard, humanToken)) {
            return { index: -1, value: depth - 10 };
        } else if (winCheck(tempBoard, aiToken)) {
            return { index: -1, value: 10 - depth };
        } else if (!availableSquareIndexes.length) {
            return { index: -1, value: 0 };
        }

        for (let i = 0; i < availableSquareIndexes.length; i++) {
            const moveObj = { index: availableSquareIndexes[i], value: 0 };
            let returnResult;

            tempBoard[availableSquareIndexes[i]] = turn;

            if (turn === aiToken) {
                returnResult = this.minimax(tempBoard, humanToken, depth + 1, aiToken);
                moveObj.value = returnResult.value;
            } else {
                returnResult = this.minimax(tempBoard, aiToken, depth + 1, aiToken);
                moveObj.value = returnResult.value;
            }

            tempBoard[availableSquareIndexes[i]] = moveObj.index;
            movesArray.push(moveObj);
        }

        if (turn === aiToken) {
            for (let j = 0; j < movesArray.length; j++) {
                if (movesArray[j].value > maxValue) {
                    maxValue = movesArray[j].value;
                    bestSpot = j;
                }
            }
        } else {
            for (let k = 0; k < movesArray.length; k++) {
                if (movesArray[k].value < minValue) {
                    minValue = movesArray[k].value;
                    bestSpot = k;
                }
            }
        }

        return movesArray[bestSpot];
    }
}
