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

export function winCheck(currentBoard: Board, token: 'X' | 'O') {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 3; j++) {
            if (currentBoard[TERMINAL_STATES[i][j]].currentPlayer === token) {
                if (j === 2) return true;
            } else {
                break;
            }
        }
    }
    return false;
}

export function availableMoves(currentBoard: Board) {
    return currentBoard.reduce<number[]>((acc, boardItem) => {
        if (!boardItem.currentPlayer) return [...acc, boardItem.id];
        return acc;
    }, []);
}

export function drawCheck(currentBoard: Board) {
    return availableMoves(currentBoard).length === 0;
}

export class AI {
    private board;
    private token;

    constructor(board: Board, token: 'X' | 'O') {
        this.board = board.slice();
        this.token = token;
    }

    getMove() {
        const { board, token } = this;
        const { index } = minimax(board, token, 0)!;
        return index;
    }
}

interface MoveObject {
    index?: number;
    value?: any;
}

/* Minimax algorithm function for unbeatable ai */
export function minimax(tempBoard: Board, turn: 'X' | 'O', depth: number): MoveObject {
    let availableSquareIndexes = availableMoves(tempBoard),
        maxValue = -Infinity,
        minValue = Infinity,
        movesArray: MoveObject[] = [],
        bestSpot;

    const aiToken = turn;
    const humanToken = turn === 'X' ? 'O' : 'X';

    if (winCheck(tempBoard, humanToken)) {
        return { value: depth - 10 };
    } else if (winCheck(tempBoard, aiToken)) {
        return { value: 10 - depth };
    } else if (!availableSquareIndexes.length) {
        return { value: 0 };
    }

    availableSquareIndexes.forEach((index) => {
        const newBoard = tempBoard.slice();
        newBoard[index].currentPlayer = aiToken;
        const move = minimax(newBoard, humanToken, depth + 1);
        const { value } = move;

        if (value > maxValue) {
            maxValue = value;
            bestSpot = index;
        }

        if (value < minValue) {
            minValue = value;
        }

        movesArray.push(move);
    });

    return {
        index: bestSpot,
        value: turn === aiToken ? maxValue : minValue,
    };
}

export function generateNewBoard(): Board {
    return Array.from({ length: 9 }, (_, index) => ({ id: index, currentPlayer: null }));
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
    const board = currentBoard.map((square, index) =>
        squareIndex === index ? { ...square, currentPlayer: currentToken } : square,
    );
    const gameStatus = getNewGameStatus(board, currentToken, currentPlayer);
    return { board, gameStatus };
};
