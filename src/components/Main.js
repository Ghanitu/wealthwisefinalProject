import React, { useState, useEffect } from "react";
import { Clock, Bell, Shield, Smartphone, X, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Main.css';

const DemoModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}>
        <X size={24} />
      </button>
      <div className="demo-preview">
        <img src="/api/placeholder/800/400" alt="Demo Preview" className="demo-image" />
        <div className="demo-play-button">
          <Play size={48} color="#0066ff" />
        </div>
      </div>
    </div>
  </div>
);

const MainPage = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleStartTrial = () => {
    navigate("/register");
  };

  const handleWatchDemo = () => {
    setShowDemoModal(true);
  };

  const handleDashboardPreview = () => {
    navigate("/dashboard");
  };

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <nav className="top-nav">
        <div className="logo-wrapper">
          <Clock className="logo-icon" />
          <span>WealthWise</span>
        </div>
        <div className="auth-buttons">
          <button 
            onClick={handleSignIn} 
            className="sign-in-btn"
          >
            Sign In
          </button>
          <button 
            onClick={handleSignUp} 
            className="sign-up-btn"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="main-title">
            Smart Financial Management for<br />Modern Life
          </h1>
          <p className="main-description">
            Take control of your finances with AI-powered insights, real-time tracking, and smart budgeting tools.
          </p>
          <div className="action-buttons">
            <button 
              onClick={handleStartTrial}
              className="start-trial-btn"
            >
              Start Free Trial &gt;
            </button>
            <button 
            onClick={() => window.open("https://www.youtube.com/watch?v=Sa9xjg6b34c", "_blank")}
           className="watch-demo-btn"
           >
           Watch Demo
           </button>

          </div>
          
          <div className="user-proof">
            <div className="user-avatars">
            <img src="https://ui-avatars.com/api/?name=John&background=random" alt="User" className="avatar" />
            <img src="https://ui-avatars.com/api/?name=Sara&background=random" alt="User" className="avatar" />
            <img src="https://ui-avatars.com/api/?name=Mike&background=random" alt="User" className="avatar" />

            </div>
            <span className="user-count">Joined by 50,000+ users</span>
          </div>
        </div>

        <div className="preview-section" onClick={handleDashboardPreview}>
        <img 
          src="/images/image.png" 
          alt="Dashboard Preview" 
          className="dashboard-preview"
        />
          <div className="savings-card">
            <Clock size={20} />
            <div className="savings-content">
              <span className="savings-label">Monthly Savings</span>
              <span className="savings-value">+27%</span>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Everything you need to manage expenses</h2>
        <div className="features-grid">
          <div className="feature-item">
            <Clock size={24} />
            <h3>Smart Analytics</h3>
            <p>Get AI-powered insights about your spending patterns and recommendations.</p>
          </div>
          <div className="feature-item">
            <Bell size={24} />
            <h3>Real-time Alerts</h3>
            <p>Stay on top of your expenses with customizable notifications and budget alerts.</p>
          </div>
          <div className="feature-item">
            <Shield size={24} />
            <h3>Bank-grade Security</h3>
            <p>Your financial data is protected with enterprise-level encryption.</p>
          </div>
          <div className="feature-item">
            <Smartphone size={24} />
            <h3>Mobile First</h3>
            <p>Track expenses on the go with our powerful mobile app.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>50K+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h3>$10M+</h3>
          <p>Expenses Tracked</p>
        </div>
        <div className="stat-item">
          <h3>4.9/5</h3>
          <p>User Rating</p>
        </div>
      </section>

      {/* Modal */}
      {showDemoModal && <DemoModal onClose={() => setShowDemoModal(false)} />}
    </div>
  );
};

export default MainPage;