import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Use an env var so you can change the base path without editing code.
// For CRA use REACT_APP_BASENAME; for Vite use VITE_BASENAME (see note below).
const basename = process.env.REACT_APP_BASENAME || "/";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);