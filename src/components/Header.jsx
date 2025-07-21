import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
      <div className="navbar-horizontal-title">MERNstore</div>
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
        <NavLink
          className={({ isActive }) =>
            "navbar-horizontal-link" + (isActive ? " active" : "")
          }
          to="/"
          onClick={handleLinkClick}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "navbar-horizontal-link cart-link" + (isActive ? " active" : "")
          }
          to="/cart"
          onClick={handleLinkClick}
        >
          <span role="img" aria-label="cart">🛒</span> MyCart
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "navbar-horizontal-link" + (isActive ? " active" : "")
          }
          to="/order"
          onClick={handleLinkClick}
        >
          MyOrder
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            className={({ isActive }) =>
              "navbar-horizontal-link" + (isActive ? " active" : "")
            }
            to="/admin"
            onClick={handleLinkClick}
          >
            Admin
          </NavLink>
        )}
        {user?.token ? (
          <NavLink
            className={({ isActive }) =>
              "navbar-horizontal-link" + (isActive ? " active" : "")
            }
            to="/profile"
            onClick={handleLinkClick}
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              "navbar-horizontal-link" + (isActive ? " active" : "")
            }
            to="/login"
            onClick={handleLinkClick}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}