import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../Context/GameContext";
import "../styles/Scores.css";

const Scores = () => {
  const navigate = useNavigate();
  const { restartGame } = useGame(); 

  const handlePlayAgain = () => {
    restartGame();       
    navigate("/game");   
  };

  return (
    <main>
      <div className="scores-table">
        <div className="header">Username</div>
        <div className="header">Wins</div>
        <div className="header">Losses</div>
        {[...Array(7)].map((_, i) => (
          <React.Fragment key={i}>
            <div>Player_{i + 1}</div>
            <div>{Math.floor(Math.random() * 20)}</div>
            <div>{Math.floor(Math.random() * 10)}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="button-group">
        <button className="btn" onClick={handlePlayAgain}>Play Again</button>
        <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </main>
  );
};

export default Scores;
