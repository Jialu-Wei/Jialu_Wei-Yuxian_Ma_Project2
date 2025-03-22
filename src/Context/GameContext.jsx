import { createContext, useContext } from "react";
import { useGameLogic, generateEmptyBoard } from "../utils/GameLogic";

// Create the GameContext
const GameContext = createContext();

// GameProvider component to wrap around the app
export const GameProvider = ({ children }) => {
    // 🧠 Load saved game state from localStorage
    const saved = localStorage.getItem("battleshipGameState");

    let initialState = {};
    let initialPlayerBoard = null;
    let initialAiBoard = null;

    if (saved) {
        try {
            // Parse the saved game state
            const parsed = JSON.parse(saved);
            initialState = {
                playerTurn: parsed.playerTurn,
                gameStarted: parsed.gameStarted,
                gameOver: parsed.gameOver,
                message: parsed.message,
                time: parsed.time,
            };
            initialPlayerBoard = parsed.playerBoard;
            initialAiBoard = parsed.aiBoard;
        } catch (e) {
            console.error("Failed to parse saved state:", e);
        }
    }

    // Initialize game logic with saved or default state
    const gameLogic = useGameLogic(
        true,                 // Enable AI
        initialPlayerBoard,   // Use saved player board if available
        initialAiBoard,       // Use saved AI board if available
        initialState          // Use saved game state
    );

    // Provide game logic to the rest of the app
    return (
        <GameContext.Provider value={gameLogic}>
            {children}
        </GameContext.Provider>
    );
};

// Custom hook to use the game context
export const useGame = () => useContext(GameContext);
