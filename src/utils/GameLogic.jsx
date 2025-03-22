import { useState, useEffect } from "react";
import AiBoard from "./AiBoard";

// Generate an empty 10x10 game board
export const generateEmptyBoard = () => {
    return Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({ ship: false, hit: false }))
    );
};

export const useGameLogic = (
    enableAI,
    initialPlayerBoard = null,
    initialAiBoard = null,
    initialState = {}
) => {
    // Initialize the player's board
    const [playerBoard, setPlayerBoard] = useState(() =>
        initialPlayerBoard || generateEmptyBoard()
    );

    // Initialize the AI's board
    const [aiBoard, setAiBoard] = useState(() =>
        initialAiBoard || AiBoard(generateEmptyBoard())
    );

    // Game state variables
    const [playerTurn, setPlayerTurn] = useState(initialState.playerTurn ?? true);
    const [gameStarted, setGameStarted] = useState(initialState.gameStarted ?? false);
    const [gameOver, setGameOver] = useState(initialState.gameOver ?? false);
    const [message, setMessage] = useState(initialState.message ?? "");
    const [time, setTime] = useState(initialState.time ?? 0);

    // Auto-save game state to localStorage
    useEffect(() => {
        const stateToSave = {
            playerBoard,
            aiBoard,
            playerTurn,
            gameStarted,
            gameOver,
            message,
            time,
        };
        localStorage.setItem("battleshipGameState", JSON.stringify(stateToSave));
    }, [playerBoard, aiBoard, playerTurn, gameStarted, gameOver, message, time]);

    // Re-generate AI board if initialization fails
    useEffect(() => {
        if (!aiBoard || aiBoard.length !== 10) {
            console.error("Error: AI board initialization failed", aiBoard);
            setAiBoard(AiBoard(generateEmptyBoard()));
        }
    }, [aiBoard]);

    // Handle player's attack on AI board
    const handlePlayerAttack = (row, col) => {
        if (!playerTurn || gameOver || aiBoard[row][col].hit) return;

        // Mark the selected cell as hit
        const newAiBoard = aiBoard.map((r, rIndex) =>
            r.map((cell, cIndex) =>
                rIndex === row && cIndex === col ? { ...cell, hit: true } : cell
            )
        );

        setAiBoard(newAiBoard);

        // Check if all AI ships have been destroyed
        const allShipsDestroyed = newAiBoard.every(row =>
            row.every(cell => (cell.ship ? cell.hit : true))
        );

        if (allShipsDestroyed) {
            setGameOver(true);
            setMessage("🎉 You win! All enemy ships destroyed! 🎉");
            return;
        }

        // Switch to AI's turn if enabled
        if (enableAI) {
            setPlayerTurn(false);
            setTimeout(handleAiAttack, 1000); // Delay for better user experience
        }
    };

    // AI attacks the player board
    const handleAiAttack = () => {
        if (gameOver) return;
        let row, col;
        let targetFound = false;

        // Look for smart attack based on previous hits
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (playerBoard[r][c].ship && playerBoard[r][c].hit) {
                    const possibleTargets = [];
                    if (r > 0 && !playerBoard[r - 1][c].hit) possibleTargets.push([r - 1, c]);
                    if (r < 9 && !playerBoard[r + 1][c].hit) possibleTargets.push([r + 1, c]);
                    if (c > 0 && !playerBoard[r][c - 1].hit) possibleTargets.push([r, c - 1]);
                    if (c < 9 && !playerBoard[r][c + 1].hit) possibleTargets.push([r, c + 1]);

                    if (possibleTargets.length > 0) {
                        [row, col] = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
                        targetFound = true;
                        break;
                    }
                }
            }
            if (targetFound) break;
        }

        // If no target found, choose a random unhit cell
        if (!targetFound) {
            do {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            } while (playerBoard[row][col].hit);
        }

        // Apply AI's attack to player board
        const newPlayerBoard = playerBoard.map((r, rIndex) =>
            r.map((cell, cIndex) =>
                rIndex === row && cIndex === col ? { ...cell, hit: true } : cell
            )
        );

        setPlayerBoard(newPlayerBoard);

        // Check if AI has won
        const allPlayerShipsDestroyed = newPlayerBoard.every(row =>
            row.every(cell => (cell.ship ? cell.hit : true))
        );

        if (allPlayerShipsDestroyed) {
            setGameOver(true);
            setMessage("💀 AI wins! All your ships are destroyed! 💀");
            return;
        }

        setPlayerTurn(true); // Switch back to player
    };

    // Update the player board (used during ship placement)
    const updatePlayerBoard = (newBoard) => {
        if (newBoard && newBoard.length === 10) {
            setPlayerBoard(newBoard);
        }
    };

    // Start game with current ships but reset hits
    const startGame = () => {
        setPlayerBoard(current =>
            current.map(row =>
                row.map(cell => ({ ...cell, hit: false }))
            )
        );
        setAiBoard(AiBoard(generateEmptyBoard())); // Reset AI board
        setGameStarted(true);
        setGameOver(false);
        setTime(0);
        setMessage("Game Started! Click to attack.");
        setPlayerTurn(true);
    };

    // Reset the entire game
    const restartGame = () => {
        localStorage.removeItem("battleshipGameState");
        setPlayerBoard(generateEmptyBoard());
        setAiBoard(AiBoard(generateEmptyBoard()));
        setGameStarted(false);
        setGameOver(false);
        setTime(0);
        setMessage("");
        setPlayerTurn(true);
    };

    return {
        playerBoard,
        aiBoard,
        playerTurn,
        gameStarted,
        gameOver,
        message,
        time,
        startGame,
        restartGame,
        handlePlayerAttack,
        updatePlayerBoard,
    };
};
