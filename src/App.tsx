import { useEffect, useState } from 'react';
import Chooser from './Chooser';
import Footer from './Footer';
import { GameData, GameState, Player, Token } from './types';
import { generateNewBoard, availableMoves, getUpdatedGameData } from './utils';

const App = () => {
    const [humanToken, setHumanToken] = useState<Token>(Token.X);
    const [gameData, setGameData] = useState<GameData>({
        board: generateNewBoard(),
        gameStatus: GameState.CHOOSING_PLAYER,
    });

    const { board, gameStatus } = gameData;
    const aiToken = humanToken === Token.X ? Token.O : Token.X;

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
            // perform player move
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
