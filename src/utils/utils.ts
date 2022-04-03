import { Board, GameState, Player, Token, UpdatedGameDataOptions } from '../types';

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

/** Check if the given player has won the game */
export function winCheck(currentBoard: Board, token: Token): boolean {
    let winStatus = false;
    TERMINAL_STATES.forEach((terminalState) => {
        const isWin = terminalState.every((index) => currentBoard[index] === token);
        if (isWin) winStatus = true;
    });
    return winStatus;
}

/** Get the available square indexes on the current board */
export function availableMoves(currentBoard: Board) {
    return currentBoard.filter((boardItem) => typeof boardItem === 'number') as number[];
}

/** Check if game is a draw */
export function drawCheck(currentBoard: Board) {
    return availableMoves(currentBoard).length === 0;
}

/** Creates a new game board */
export function generateNewBoard(): Board {
    return Array.from({ length: 9 }, (_, index) => index);
}

/** Gets the new game status at the end of a turn */
const getNewGameStatus = (board: Board, currentToken: Token, currentPlayer: Player) => {
    if (winCheck(board, currentToken)) return currentPlayer === Player.HUMAN ? GameState.WIN : GameState.LOSE;
    if (drawCheck(board)) return GameState.DRAW;
    return currentPlayer === Player.HUMAN ? GameState.AI_TURN : GameState.HUMAN_TURN;
};

/** Formats the game data following a turn */
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
