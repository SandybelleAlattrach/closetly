import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="navbar">
      <h2 className="logo">Closetly</h2>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/wardrobe">Wardrobe</Link>
      </nav>
    </header>
  );
}

export default Header;
