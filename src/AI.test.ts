import { AI } from './AI';
import { Token } from './types';

const DUMMY_BOARD = [Token.X, Token.X, Token.O, Token.O, 4, Token.O, 6, 7, 8];
const WIN_NEXT_MOVE_BOARD = [Token.X, Token.X, Token.O, Token.O, Token.X, Token.O, 6, 7, 8];

describe('getMove (minimax)', () => {
    it('should prevent opponent from winning next move', () => {
        const aiInstance = new AI(DUMMY_BOARD, Token.X);
        expect(aiInstance.getMove()).toEqual(4);
    });

    it('should win when possible', () => {
        const aiInstance = new AI(WIN_NEXT_MOVE_BOARD, Token.X);
        expect(aiInstance.getMove()).toEqual(7);
    });

    it('should not mutate the original board', () => {
        const boardCopy = Array.from(DUMMY_BOARD);
        const aiInstance = new AI(DUMMY_BOARD, Token.X);
        aiInstance.getMove();
        expect(DUMMY_BOARD).toEqual(boardCopy);
    });
});
