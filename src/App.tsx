import { useEffect, useState } from 'react';
import Chooser from './Chooser';
import Footer from './Footer';
import { Board, GameState } from './types';
import { generateNewBoard, availableMoves } from './utils';

interface GameData {
    board: Board;
    gameStatus: GameState;
}

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
            setGameData((currentGameData) => ({
                board: currentGameData.board.map((square, index) =>
                    squareIndex === index ? { ...square, currentPlayer: humanToken } : square,
                ),
                gameStatus: GameState.AI_TURN,
            }));
        }
    };

    useEffect(() => {
        const { board, gameStatus } = gameData;
        if (gameStatus === GameState.AI_TURN) {
            const moves = availableMoves(board);
            const aiMove = moves[Math.floor(Math.random() * moves.length)];
            setGameData((currentGameData) => ({
                board: currentGameData.board.map((square, index) =>
                    aiMove === index ? { ...square, currentPlayer: aiToken } : square,
                ),
                gameStatus: GameState.HUMAN_TURN,
            }));
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
