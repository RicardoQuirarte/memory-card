import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Card } from "./card.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h1>Pokemon memory game</h1>
    <h3>
      Get points by clicking on an image but don't click on any more than once!
    </h3>
    <div className="scores">
      <h4>Score: 0</h4>
      <h4>High score: 0</h4>
    </div>
    <Card />
  </React.StrictMode>
);
