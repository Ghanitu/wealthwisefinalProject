import React, { useState } from "react";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="tab-section">
            <h3>Personal Information</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                />
              </div>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        );
      case "security":
        return (
          <div className="tab-section">
            <h3>Account Security</h3>
            <form>
              <div className="form-group">
                <label htmlFor="password">Current Password</label>
                <input type="password" id="password" placeholder="Enter your current password" />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  placeholder="Enter a new password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Re-enter your new password"
                />
              </div>
              <button type="submit" className="save-btn">
                Update Password
              </button>
            </form>
          </div>
        );
      case "logs":
        return (
          <div className="tab-section">
            <h3>Activity Logs</h3>
            <p>View recent activities on your account:</p>
            <ul>
              <li>Logged in from IP: 192.168.0.1 on 2024-12-05</li>
              <li>Updated email address on 2024-12-04</li>
              <li>Changed password on 2024-12-03</li>
            </ul>
          </div>
        );
      case "themes":
        return (
          <div className="tab-section">
            <h3>Theme Settings</h3>
            <form>
              <div className="form-group">
                <label htmlFor="theme">Choose Theme</label>
                <select id="theme">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <button type="submit" className="save-btn">
                Apply Theme
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>
      <p>Manage your account details and settings below.</p>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={`tab-button ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button
          className={`tab-button ${activeTab === "logs" ? "active" : ""}`}
          onClick={() => setActiveTab("logs")}
        >
          Activity Logs
        </button>
        <button
          className={`tab-button ${activeTab === "themes" ? "active" : ""}`}
          onClick={() => setActiveTab("themes")}
        >
          Themes
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ProfileSettings;
