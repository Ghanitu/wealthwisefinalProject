import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/Main"; // Assuming MainPage is your landing page
import Login from "./components/Login"; // Assuming Login is your login page
import Register from "./components/Register"; // Assuming Register is your registration page
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Budgets from "./components/Budgets";
import Education from "./components/Education";
import Settings from "./components/Settings";
import ProfileSettings from "./components/ProfileSettings";
import NotificationSettings from "./components/NotificationSettings";
import Preferences from "./components/Preferences";
import Sidebar from "./components/Sidebar";

const AppLayout = () => (
  <div className="app-layout">
    <Sidebar />
    <div className="content">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/education" element={<Education />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/preferences" element={<Preferences />} />
      </Routes>
    </div>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Pages with Sidebar */}
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  </Router>
);

export default App;
