// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const basename = process.env.REACT_APP_BASENAME || "/closetly"; // ensure build injects REACT_APP_BASENAME or hardcode "/closetly"

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);