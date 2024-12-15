import React, { useState } from "react";
import "./NotificationSettings.css"; // Import your CSS file

const NotificationSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleEnableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setIsEnabled(true);
      new Notification("Notifications enabled!");
    } else {
      alert("You need to allow notifications.");
    }
  };

  const handleDisableNotifications = () => {
    setIsEnabled(false);
    alert("Notifications disabled.");
  };

  return (
    <div className="notification-container">
      <h2>Notification Settings</h2>
      <p>Manage your notification preferences:</p>
      <button
        onClick={isEnabled ? handleDisableNotifications : handleEnableNotifications}
        className={`notification-button ${isEnabled ? "enabled" : "disabled"}`}
      >
        {isEnabled ? "Disable Notifications" : "Enable Notifications"}
      </button>
    </div>
  );
};

export default NotificationSettings;
