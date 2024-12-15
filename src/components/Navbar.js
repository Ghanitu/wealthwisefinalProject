import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-brand">
      WealthWise
    </Link>
    <div className="navbar-links">
      <Link to="/dashboard" className="navbar-link">
        Dashboard
      </Link>
      <Link to="/transactions" className="navbar-link">
        Transactions
      </Link>
      <Link to="/budgets" className="navbar-link">
        Budgets
      </Link>
      <Link to="/settings" className="navbar-link">
        Settings
      </Link>
    </div>
  </nav>
);

export default Navbar;
