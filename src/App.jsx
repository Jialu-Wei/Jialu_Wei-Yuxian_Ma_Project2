import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Game from "./Pages/Game";
import FreePlay from "./Pages/FreePlay";
import Rules from "./Pages/Rules";
import Scores from "./Pages/Scores";
import { GameProvider } from "./Context/GameContext";  
import { TimerProvider } from "./Context/TimerContext"; 
import "./styles/App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GameProvider>
      <TimerProvider>
        <>
          <header id="navbar">
            <nav>
              <div className="nav-header">
                <h1>Battleship</h1>
              </div>
              <div className="nav-links">
                <ul>
                  <li className="nav-item"><Link to="/">Home</Link></li>
                  <li className="nav-item dropdown"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}>
                    <Link to="#" className="game">Game</Link>
                    <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                      <li><Link to="/game" onClick={() => setIsOpen(false)}>Normal Game</Link></li>
                      <li><Link to="/FreePlay" onClick={() => setIsOpen(false)}>Free Play Game</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item"><Link to="/rules">Rules</Link></li>
                  <li className="nav-item"><Link to="/scores">Scores</Link></li>
                </ul>
              </div>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/FreePlay" element={<FreePlay />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/scores" element={<Scores />} />
          </Routes>
        </>
      </TimerProvider>
    </GameProvider>
  );
}

export default App;
