import React from "react";
import "../styles/Home.css";

const Home = () => (
  <main>
    <section className="hero">
      <h2>Welcome to Battleship!</h2>
      <img src="src/images/Battleship.png" alt="Battleship Game" />
      {/* <button className="start-btn" onClick={() => window.location.href = "/game"}>Start</button> */}
    </section>
  </main>
);

export default Home;






