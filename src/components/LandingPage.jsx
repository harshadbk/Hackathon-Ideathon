import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./LandingPage.css";

// Use the filenames you actually put in src/assets
import logoImg from "../assets/RTI2.png";
import heroImg from "../assets/RTI1.jpg";

export default function LandingPage({ onLogin }) {
  const navigate = useNavigate();

  // refs used by the nav buttons
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const rolesRef = useRef(null);

  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // placeholder if you plan to animate stats later
    return () => {};
  }, []);

  const scrollTo = (ref) => {
    if (ref && ref.current)
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleTryDemo = () => {
    if (typeof onLogin === "function") onLogin();
    navigate("/demo");
  };

  return (
    <div className="landing-root">
      {/* Navigation */}
      <nav className="landing-nav" role="navigation" aria-label="Main">
        <div className="landing-nav-container">
          <div
            className="landing-logo"
            onClick={() => scrollTo(heroRef)}
            style={{ cursor: "pointer" }}
          >
            <span className="landing-logo-text">RTI Assistant</span>
          </div>

          <div className="landing-nav-buttons">
            <button className="nav-btn" onClick={() => scrollTo(featuresRef)}>
              Features
            </button>
            <button className="nav-btn" onClick={() => scrollTo(rolesRef)}>
              Roles
            </button>
            <button className="nav-btn nav-demo" onClick={handleTryDemo}>
              Try Demo
            </button>
            <button className="nav-btn nav-primary" onClick={handleGetStarted}>
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" ref={heroRef}>
        <div className="landing-hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Right to Information, Made Easy</h1>
            <p className="hero-subtitle">
              Your AI-powered companion for filing RTI requests, tracking
              appeals, and accessing government information effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleGetStarted}>
                Start Now
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowTour(true)}
              >
                Learn More
              </button>
              <button className="btn-ghost" onClick={handleTryDemo}>
                Try Demo
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">RTI Requests Filed</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Success Rate</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">AI Support</div>
              </div>
            </div>
          </div>

          <div className="hero-image" aria-hidden="false">
            <img src={heroImg} alt="RTI illustration" className="hero-visual" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features" ref={featuresRef}>
        <div className="features-container">
          <h2 className="features-title">Powerful Features for RTI Success</h2>
          <p className="features-subtitle">
            Everything you need to exercise your Right to Information
          </p>

          <div className="features-grid">
            {/* Feature cards (same as before) */}
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Drafting</h3>
              <p>
                Smart templates and AI assistance to draft perfect RTI requests
                in minutes.
              </p>
              <ul className="feature-list">
                <li>Auto-detect departments</li>
                <li>Smart suggestions</li>
                <li>Compliance check</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Tracking</h3>
              <p>
                Monitor your RTI requests with live updates and detailed
                timeline visualization.
              </p>
              <ul className="feature-list">
                <li>Live status updates</li>
                <li>Timeline tracking</li>
                <li>Deadline alerts</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Auto Appeal Generation</h3>
              <p>
                Automatically generate appeals if your RTI isn't responded on
                time.
              </p>
              <ul className="feature-list">
                <li>Auto-generate appeals</li>
                <li>Compliance templates</li>
                <li>Expert guidance</li>
              </ul>
            </div>

            {/* remaining feature cards... */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-how-it-works">
        <div className="how-container">
          <h2>How It Works</h2>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Select Role</h3>
              <p>
                Choose whether you're a Citizen, PIO Officer, or Appellate
                Authority
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Create Request</h3>
              <p>Use AI assistance to draft your RTI request with templates</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Track Progress</h3>
              <p>Monitor your request status with real-time updates</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3>Appeal if Needed</h3>
              <p>Auto-generate appeals if response doesn't arrive on time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="landing-roles" ref={rolesRef}>
        <div className="roles-container">
          <h2>For Every Stakeholder</h2>

          <div className="roles-grid">
            <div className="role-card">
              <div className="role-icon">👤</div>
              <h3>For Citizens</h3>
              <p>File RTI requests, track status, and get timely appeals</p>
              <div className="role-features">
                <span>📝 Easy Drafting</span>
                <span>📊 Live Tracking</span>
                <span>⚡ Auto Appeals</span>
              </div>
            </div>

            <div className="role-card">
              <div className="role-icon">👨‍💼</div>
              <h3>For PIO Officers</h3>
              <p>
                Manage RTI requests, respond efficiently, and maintain records
              </p>
              <div className="role-features">
                <span>📋 Request Management</span>
                <span>📅 Deadline Tracking</span>
                <span>📊 Analytics</span>
              </div>
            </div>

            <div className="role-card">
              <div className="role-icon">⚖️</div>
              <h3>For Appellate Authority</h3>
              <p>
                Review appeals, maintain compliance, and ensure fair decisions
              </p>
              <div className="role-features">
                <span>📄 Appeal Review</span>
                <span>⚖️ Case Management</span>
                <span>📈 Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="cta-container">
          <h2>Ready to Exercise Your Right to Information?</h2>
          <p>Join thousands of citizens empowering themselves with knowledge</p>
          <button className="btn-large" onClick={handleGetStarted}>
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>RTI Assistant</h4>
            <p>Empowering citizens to access government information.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a
                  onClick={() => scrollTo(featuresRef)}
                  style={{ cursor: "pointer" }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollTo(heroRef)}
                  style={{ cursor: "pointer" }}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#cookies">Cookies</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 RTI Assistant. Made for ADCET Hackathon 2026. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
