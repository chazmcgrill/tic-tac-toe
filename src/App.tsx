import { useEffect, useState } from 'react';
import Chooser from './Chooser';
import Footer from './Footer';
import { Board, GameState, Player } from './types';
import { generateNewBoard, availableMoves, winCheck, drawCheck } from './utils';

interface GameData {
    board: Board;
    gameStatus: GameState;
}

const getNewGameStatus = (board: Board, currentToken: 'X' | 'O', currentPlayer: Player) => {
    if (winCheck(board, currentToken)) return currentPlayer === Player.HUMAN ? GameState.WIN : GameState.LOSE;
    if (drawCheck(board)) return GameState.DRAW;
    return currentPlayer === Player.HUMAN ? GameState.AI_TURN : GameState.HUMAN_TURN;
};

interface UpdatedGameDataOptions {
    currentBoard: Board;
    currentToken: 'X' | 'O';
    currentPlayer: Player;
    squareIndex: number;
}

const getUpdatedGameData = ({ currentBoard, currentToken, currentPlayer, squareIndex }: UpdatedGameDataOptions) => {
    const board = currentBoard.map((square, index) =>
        squareIndex === index ? { ...square, currentPlayer: currentToken } : square,
    );
    const gameStatus = getNewGameStatus(board, currentToken, currentPlayer);
    return { board, gameStatus };
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

    // perform player move
    const handleSquarePress = (event: any) => {
        const squareIndex = parseInt(event.target.id, 10);
        if (gameData.gameStatus === GameState.HUMAN_TURN && gameData.board[squareIndex].currentPlayer === null) {
            setGameData((currentGameData) => {
                return getUpdatedGameData({
                    currentBoard: currentGameData.board,
                    currentToken: humanToken,
                    currentPlayer: Player.HUMAN,
                    squareIndex,
                });
            });
        }
    };

    // perform AI move
    useEffect(() => {
        const { board, gameStatus } = gameData;
        if (gameStatus === GameState.AI_TURN) {
            const moves = availableMoves(board);
            const aiMoveIndex = moves[Math.floor(Math.random() * moves.length)];
            setGameData((currentGameData) => {
                return getUpdatedGameData({
                    currentBoard: currentGameData.board,
                    currentToken: aiToken,
                    currentPlayer: Player.AI,
                    squareIndex: aiMoveIndex,
                });
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
