import React from "react";
import "../styles/Game.css";

const Board = ({ board, isPlayer, onCellClick }) => {
    return (
        <div className="board-container">
            <h3 className="board-title">{isPlayer ? "Your Board" : "Enemy Board"}</h3>
            <div className="board">
                <table>
                    <tbody>
                        {board.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td
                                    key={colIndex}
                                    onClick={() => !isPlayer && onCellClick(rowIndex, colIndex)}
                                    className={`
                                        cell 
                                        ${cell.hit ? (cell.ship ? "hit" : "misses") : ""}
                                        ${isPlayer && cell.ship && !cell.hit ? "ship" : ""}
                                    `}
                                >
                                    {/* Show "H" when hit, "X" when missed */}
                                    {cell.hit ? (cell.ship ? "H" : "X") : isPlayer && cell.ship ? <div className="ship-dot"></div> : ""}
                                </td>

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Board;
