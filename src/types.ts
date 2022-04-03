type BoardItem = Token | number;

export type Board = BoardItem[];

export enum GameState {
    CHOOSING_PLAYER,
    HUMAN_TURN,
    AI_TURN,
    DRAW,
    WIN,
    LOSE,
}

export enum Player {
    HUMAN,
    AI,
}

export enum Token {
    X = 'X',
    O = 'O',
}

export interface GameData {
    board: Board;
    gameStatus: GameState;
}

export interface UpdatedGameDataOptions {
    currentBoard: Board;
    currentToken: Token;
    currentPlayer: Player;
    squareIndex: number;
}
