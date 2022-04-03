import { Token } from '../types';
import { availableMoves, drawCheck, generateNewBoard, winCheck } from './utils';

const DUMMY_BOARD = [Token.X, Token.X, Token.O, Token.O, 4, Token.O, 6, 7, 8];
const DUMMY_WIN_BOARD = [Token.X, Token.X, Token.X, Token.O, 4, Token.O, 6, 7, 8];
const DUMMY_DRAW_BOARD = [Token.X, Token.X, Token.O, Token.O, Token.O, Token.O, Token.X, Token.X, Token.X];

describe('winCheck util', () => {
    it('should return true if a win is found', () => {
        expect(winCheck(DUMMY_WIN_BOARD, Token.X)).toBe(true);
    });

    it('should return false if no win is found', () => {
        expect(winCheck(DUMMY_BOARD, Token.X)).toBe(false);
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

describe('generateNewBoard util', () => {
    it('should return a new board', () => {
        expect(generateNewBoard()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });
});
