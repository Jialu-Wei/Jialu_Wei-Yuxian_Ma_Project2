import React from "react";
import "../styles/Scores.css";

const Scores = () => (
  <main>
    <div className="scores-table">
      <div className="header">Username</div>
      <div className="header">Wins</div>
      <div className="header">Losses</div>
      {[...Array(7)].map((_, i) => (
        <>
          <div>Player_{i + 1}</div> <div>{Math.floor(Math.random() * 20)}</div> <div>{Math.floor(Math.random() * 10)}</div>
        </>
      ))}
    </div>
    <div className="button-group">
      <button className="btn" onClick={() => window.location.href = "/game"}>Play Again</button>
      <button className="btn" onClick={() => window.location.href = "/"}>Back to Home</button>
    </div>
  </main>
);

export default Scores;
