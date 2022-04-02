export interface BoardItem {
    id: number;
    currentPlayer: string | null;
}

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
