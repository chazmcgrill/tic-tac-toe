import { useEffect, useState } from 'react';
import { GameData, GameState, Player, Token } from '../types';
import { generateNewBoard, getUpdatedGameData } from '../utils/utils';
import { AI } from '../utils/AI';
import Chooser from './Chooser';
import Footer from './Footer';
import GameStatusText from './GameStatusText';

const AI_PLAYER_THINKING_TIME = 500;

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
        if (gameData.gameStatus === GameState.HUMAN_TURN && typeof gameData.board[squareIndex] === 'number') {
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

    useEffect(() => {
        const { board, gameStatus } = gameData;
        if (gameStatus === GameState.AI_TURN) {
            // perform AI move
            setTimeout(() => {
                const aiInstance = new AI(board, aiToken);
                setGameData((currentGameData) => {
                    return getUpdatedGameData({
                        currentBoard: currentGameData.board,
                        currentToken: aiToken,
                        currentPlayer: Player.AI,
                        squareIndex: aiInstance.getMoveIndex(),
                    });
                });
            }, AI_PLAYER_THINKING_TIME);
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
                            {board.map((currentToken, index) => (
                                <div className="square" key={`${index}`} id={`${index}`} onClick={handleSquarePress}>
                                    {typeof currentToken !== 'number' ? currentToken : ''}
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <GameStatusText gameState={gameStatus} />
                <button className="reset" onClick={gameInit}>
                    play again
                </button>
            </div>

            <Footer />
        </>
    );
};

export default App;
