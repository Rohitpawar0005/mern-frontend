import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar-horizontal">
      <div className="navbar-horizontal-title">MERN Frontend</div>
      <button
        className={`navbar-hamburger${menuOpen ? " open" : ""}`}
        onClick={handleMenuToggle}
        aria-label="Toggle navigation menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`navbar-horizontal-links${menuOpen ? " show" : ""}`}>
        <Link className="navbar-horizontal-link" to="/" onClick={handleLinkClick}>Home</Link>
        <Link className="navbar-horizontal-link" to="/order" onClick={handleLinkClick}>MyOrder</Link>
        <Link className="navbar-horizontal-link" to="/cart" onClick={handleLinkClick}>MyCart</Link>
        {/* <Link className="navbar-horizontal-link" to="/admin">Admin</Link> */}
        {user?.role === "admin" && <Link className="navbar-horizontal-link" to="/admin" onClick={handleLinkClick}>Admin</Link>}
        {user?.token ? (
          <Link className="navbar-horizontal-link" to="/profile" onClick={handleLinkClick}>Profile</Link>
        ) : (
          <Link className="navbar-horizontal-link" to="/login" onClick={handleLinkClick}>Login</Link>
        )}
      </div>
    </nav>
  );
}