


import React from "react";
import { useGameLogic } from "../utils/GameLogic";
import Board from "../utils/Board";

const FreePlay = () => {
    const {
        aiBoard,
        gameStarted,
        message,
        time,
        startGame,
        restartGame,
        handlePlayerAttack,
    } = useGameLogic(false); 

    return (
        <main>
            {/* <p><button class = 'start-btn' onClick={startGame}>Start Game</button></p> */}
            <div className="time">
                <p><button class = 'restart-btn' onClick={restartGame}>Restart</button></p>
            </div>

            <section className="game-container">
                <Board board={aiBoard} isPlayer={false} onCellClick={handlePlayerAttack} />
            </section>



            {message && <p className="message">{message}</p>}
        </main>
    );
};

export default FreePlay;
