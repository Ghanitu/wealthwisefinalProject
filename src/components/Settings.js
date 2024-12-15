import React from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => (
  <div className="settings-container">
    <h2>Settings</h2>
    <p>Manage your preferences:</p>
    <ul className="settings-options">
      <li>
        <Link to="/settings/profile">Profile Settings</Link>
      </li>
      <li>
        <Link to="/settings/notifications">Notification Settings</Link>
      </li>
      <li>
        <Link to="/settings/preferences">Preferences</Link>
      </li>
    </ul>
  </div>
);

export default Settings;
