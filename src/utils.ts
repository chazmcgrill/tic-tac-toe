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
