


import React from "react";
import { Link } from "react-router-dom";
import "../styles/Scores.css";

const Scores = () => (
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
      <Link className="btn" to="/game">Play Again</Link>
      <Link className="btn" to="/">Back to Home</Link>
    </div>
  </main>
);

export default Scores;
