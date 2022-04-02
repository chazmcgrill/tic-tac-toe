import { useEffect, useState } from 'react';
import Chooser from './Chooser';
import Footer from './Footer';
import { Board, GameState } from './types';
import { generateNewBoard, availableMoves, winCheck, drawCheck } from './utils';

interface GameData {
    board: Board;
    gameStatus: GameState;
}

const getNewGameStatus = (board: Board, currentToken: 'X' | 'O', currentPlayer: 'ai' | 'human') => {
    const isDraw = drawCheck(board);
    if (isDraw) return GameState.DRAW;

    const isWin = winCheck(board, currentToken);
    if (isWin) return currentPlayer === 'human' ? GameState.WIN : GameState.LOSE;

    return currentPlayer === 'human' ? GameState.AI_TURN : GameState.HUMAN_TURN;
};

const App = () => {
    const [humanToken, setHumanToken] = useState<'X' | 'O'>('X');
    const [gameData, setGameData] = useState<GameData>({
        board: generateNewBoard(),
        gameStatus: GameState.CHOOSING_PLAYER,
    });

    const { board, gameStatus } = gameData;
    const aiToken = humanToken === 'X' ? 'O' : 'X';

    const gameInit = () => {
        setGameData((currentGameData) => ({
            ...currentGameData,
            board: generateNewBoard(),
            gameStatus: GameState.HUMAN_TURN,
        }));
    };

    const handleChooserClick = (event: any) => {
        setHumanToken(event.target.id);
        gameInit();
    };

    const handleSquarePress = (event: any) => {
        const squareIndex = parseInt(event.target.id, 10);
        if (gameData.gameStatus === GameState.HUMAN_TURN && gameData.board[squareIndex].currentPlayer === null) {
            setGameData((currentGameData) => {
                const newBoard = currentGameData.board.map((square, index) =>
                    squareIndex === index ? { ...square, currentPlayer: humanToken } : square,
                );

                return {
                    board: newBoard,
                    gameStatus: getNewGameStatus(newBoard, humanToken, 'human'),
                };
            });
        }
    };

    useEffect(() => {
        const { board, gameStatus } = gameData;
        if (gameStatus === GameState.AI_TURN) {
            const moves = availableMoves(board);
            const aiMove = moves[Math.floor(Math.random() * moves.length)];
            setGameData((currentGameData) => {
                const newBoard = currentGameData.board.map((square, index) =>
                    aiMove === index ? { ...square, currentPlayer: aiToken } : square,
                );

                return {
                    board: newBoard,
                    gameStatus: getNewGameStatus(newBoard, aiToken, 'ai'),
                };
            });
        }
    }, [aiToken, gameData]);

    return (
        <>
            <div className="container">
                <h1>Tic-Tac-Toe</h1>
                <div className="board-container">
                    {gameStatus === GameState.CHOOSING_PLAYER ? (
                        <Chooser onChooserClick={handleChooserClick} />
                    ) : (
                        <>
                            {board.map(({ id, currentPlayer }, index) => (
                                <div className="square" key={id} id={index.toString()} onClick={handleSquarePress}>
                                    {currentPlayer || ''}
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="status">{gameStatus}</div>
                <button className="reset" onClick={gameInit}>
                    play again
                </button>
            </div>

            <Footer />
        </>
    );
};

export default App;
