import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <h2 className="sidebar-logo">WealthWise</h2>
    </div>
    <ul className="sidebar-menu">
      <li>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
          <i className="fas fa-home"></i> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/transactions" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
          <i className="fas fa-exchange-alt"></i> Transactions
        </NavLink>
      </li>
      <li>
        <NavLink to="/budgets" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
          <i className="fas fa-wallet"></i> Budgets
        </NavLink>
      </li>
      <li>
        <NavLink to="/education" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
          <i className="fas fa-graduation-cap"></i> Education
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
          <i className="fas fa-cog"></i> Settings
        </NavLink>
      </li>
    </ul>
    <div className="sidebar-footer">
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  </div>
);

export default Sidebar;
