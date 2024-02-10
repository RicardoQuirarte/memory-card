import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Board } from "./Board.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
      alt="pokemon"
      style={{ width: "300px" }}
    />
    <h3>
      Get points by clicking on an image but don't click on any more than once!
    </h3>
    <Board />
  </React.StrictMode>
);
