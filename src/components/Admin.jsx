import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Admin.css";
export default function Admin() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <NavLink
          className={({ isActive }) =>
            "admin-nav-link" + (isActive ? " active" : "")
          }
          to="/admin"
          end
        >
          Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "admin-nav-link" + (isActive ? " active" : "")
          }
          to="/admin/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "admin-nav-link" + (isActive ? " active" : "")
          }
          to="/admin/orders"
        >
          Orders
        </NavLink>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}