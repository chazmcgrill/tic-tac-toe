import { availableMoves, drawCheck, generateNewBoard, minimax, winCheck } from './utils';

const DUMMY_BOARD = [
    { id: 0, currentPlayer: 'X' },
    { id: 1, currentPlayer: 'X' },
    { id: 2, currentPlayer: 'O' },
    { id: 3, currentPlayer: 'O' },
    { id: 4, currentPlayer: null },
    { id: 5, currentPlayer: 'O' },
    { id: 6, currentPlayer: null },
    { id: 7, currentPlayer: null },
    { id: 8, currentPlayer: null },
];

const DUMMY_WIN_BOARD = [
    { id: 0, currentPlayer: 'X' },
    { id: 1, currentPlayer: 'X' },
    { id: 2, currentPlayer: 'X' },
    { id: 3, currentPlayer: 'O' },
    { id: 4, currentPlayer: null },
    { id: 5, currentPlayer: 'O' },
    { id: 6, currentPlayer: null },
    { id: 7, currentPlayer: null },
    { id: 8, currentPlayer: null },
];

const DUMMY_DRAW_BOARD = [
    { id: 0, currentPlayer: 'X' },
    { id: 1, currentPlayer: 'X' },
    { id: 2, currentPlayer: 'O' },
    { id: 3, currentPlayer: 'O' },
    { id: 4, currentPlayer: 'O' },
    { id: 5, currentPlayer: 'O' },
    { id: 6, currentPlayer: 'X' },
    { id: 7, currentPlayer: 'X' },
    { id: 8, currentPlayer: 'X' },
];

describe('winCheck util', () => {
    it('should return true if a win is found', () => {
        expect(winCheck(DUMMY_WIN_BOARD, 'X')).toBe(true);
    });

    it('should return false if no win is found', () => {
        expect(winCheck(DUMMY_BOARD, 'X')).toBe(false);
    });
});

describe('availableMoves util', () => {
    it('should return an array of available moves', () => {
        expect(availableMoves(DUMMY_BOARD)).toEqual([4, 6, 7, 8]);
    });

    it('should return an empty array if no moves are available', () => {
        expect(availableMoves(DUMMY_DRAW_BOARD)).toEqual([]);
    });

    it('should not mutate the original board', () => {
        const boardCopy = Array.from(DUMMY_BOARD);
        availableMoves(DUMMY_BOARD);
        expect(DUMMY_BOARD).toEqual(boardCopy);
    });
});

describe('drawCheck util', () => {
    it('should return true if a draw is found', () => {
        expect(drawCheck(DUMMY_DRAW_BOARD)).toBe(true);
    });

    it('should return false if no draw is found', () => {
        expect(drawCheck(DUMMY_BOARD)).toBe(false);
    });
});

describe('minimax util', () => {
    it('should return the higest value index', () => {
        expect(minimax(DUMMY_BOARD, 'X', 0)).toEqual({ index: 6, value: 9 });
    });

    it('should not mutate the original board', () => {
        const boardCopy = Array.from(DUMMY_BOARD);
        minimax(DUMMY_BOARD, 'X', 0);
        expect(DUMMY_BOARD).toEqual(boardCopy);
    });
});

describe('generateNewBoard util', () => {
    it('should return a new board', () => {
        expect(generateNewBoard()).toEqual([
            { id: 0, currentPlayer: null },
            { id: 1, currentPlayer: null },
            { id: 2, currentPlayer: null },
            { id: 3, currentPlayer: null },
            { id: 4, currentPlayer: null },
            { id: 5, currentPlayer: null },
            { id: 6, currentPlayer: null },
            { id: 7, currentPlayer: null },
            { id: 8, currentPlayer: null },
        ]);
    });
});
