import { Board, GameState, Player, Token, UpdatedGameDataOptions } from './types';

const TERMINAL_STATES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function winCheck(currentBoard: Board, token: Token): boolean {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 3; j++) {
            if (currentBoard[TERMINAL_STATES[i][j]] === token) {
                if (j === 2) return true;
            } else {
                break;
            }
        }
    }
    return false;
}

export function availableMoves(currentBoard: Board) {
    return currentBoard.filter((boardItem) => typeof boardItem === 'number') as number[];
}

export function drawCheck(currentBoard: Board) {
    return availableMoves(currentBoard).length === 0;
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
        const aiMove = minimax(board, token, 0, token);
        return aiMove?.index;
    }
}

interface MoveObject {
    index: number;
    value: any;
}

/* Minimax algorithm function for unbeatable ai */
export function minimax(tempBoard: Board, turn: Token, depth: number, aiToken: Token): MoveObject {
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
            returnResult = minimax(tempBoard, humanToken, depth + 1, aiToken);
            moveObj.value = returnResult.value;
        } else {
            returnResult = minimax(tempBoard, aiToken, depth + 1, aiToken);
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

export function generateNewBoard(): Board {
    return Array.from({ length: 9 }, (_, index) => index);
}

const getNewGameStatus = (board: Board, currentToken: Token, currentPlayer: Player) => {
    if (winCheck(board, currentToken)) return currentPlayer === Player.HUMAN ? GameState.WIN : GameState.LOSE;
    if (drawCheck(board)) return GameState.DRAW;
    return currentPlayer === Player.HUMAN ? GameState.AI_TURN : GameState.HUMAN_TURN;
};

export const getUpdatedGameData = ({
    currentBoard,
    currentToken,
    currentPlayer,
    squareIndex,
}: UpdatedGameDataOptions) => {
    const board = currentBoard.map((square, index) => (squareIndex === index ? currentToken : square));
    const gameStatus = getNewGameStatus(board, currentToken, currentPlayer);
    return { board, gameStatus };
};
