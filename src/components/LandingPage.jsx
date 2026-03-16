import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./LandingPage.css";

import logoImg from "../assets/RTI2.png";
import heroImg from "../assets/RTI1.jpg";

export default function LandingPage({ onLogin }) {
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const rolesRef = useRef(null);

  const [showTour, setShowTour] = useState(false);
  
  const fullText = "Right to Information, Made Easy!";

const [typedText, setTypedText] = useState("");
const [index, setIndex] = useState(0);



useEffect(() => {
  let typingInterval;

  if (index < fullText.length) {
    typingInterval = setTimeout(() => {
      setTypedText((prev) => prev + fullText[index]);
      setIndex(index + 1);
    }, 80);
  } else {
    setTimeout(() => {
      setTypedText("");
      setIndex(0);
    }, 2000);
  }

  return () => clearTimeout(typingInterval);
}, [index]);


  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

    


      {/* NAVBAR */}
      <nav className="landing-nav">

        <div className="landing-nav-container">

          <div
            className="landing-logo"
            onClick={() => scrollTo(heroRef)}
            style={{ cursor: "pointer" }}
          >
            <img src={logoImg} className="nav-logo-img" alt="RTI Logo" />

            <span className="landing-logo-text">
              Right to Information
            </span>
          </div>

          <div className="landing-nav-buttons">

            <button
              className="nav-btn"
              onClick={() => scrollTo(featuresRef)}
            >
              Features
            </button>

            <button
              className="nav-btn"
              onClick={() => scrollTo(rolesRef)}
            >
              Roles
            </button>

            <button
              className="nav-btn nav-demo"
              onClick={handleTryDemo}
            >
              Try Demo
            </button>

            <button
              className="nav-btn nav-primary"
              onClick={handleGetStarted}
            >
              Sign In
            </button>

          </div>

        </div>

      </nav>


      {/* HERO SECTION */}
      <section className="landing-hero" ref={heroRef}>

        <div className="landing-hero-container">

          <div className="hero-content">

         <h1 className="hero-title">
  {typedText}
</h1>

            <p className="hero-subtitle">
              Your AI-powered companion for filing RTI requests, tracking
              appeals, and accessing government information effortlessly.
            </p>

            <div className="hero-buttons">

              <button
                className="btn-primary"
                onClick={handleGetStarted}
              >
                Start Now
              </button>

              <button
                className="btn-secondary"
                onClick={() => setShowTour(true)}
              >
                Learn More
              </button>

              <button
                className="btn-ghost"
                onClick={handleTryDemo}
              >
                Try Demo
              </button>

            </div>

            <div className="hero-stats">

              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">
                  RTI Requests Filed
                </div>
              </div>

              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">
                  Success Rate
                </div>
              </div>

              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">
                  AI Support
                </div>
              </div>

            </div>

          </div>


          <div className="hero-image">
            <img
              src={heroImg}
              alt="RTI illustration"
              className="hero-visual"
            />
          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="landing-features" ref={featuresRef}>

        <div className="features-container">

          <h2 className="features-title">
            Powerful Features for RTI Success
          </h2>

          <p className="features-subtitle">
            Everything you need to exercise your Right to Information
          </p>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Drafting</h3>
              <p>
                Smart templates and AI assistance to draft perfect RTI requests.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Tracking</h3>
              <p>
                Monitor your RTI requests with live updates.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Auto Appeal Generation</h3>
              <p>
                Automatically generate appeals if response isn't received.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="landing-how-it-works">

        <div className="how-container">

          <h2>How It Works</h2>

          <div className="steps-grid">

            <div className="step">
              <div className="step-number">1</div>
              <h3>Select Role</h3>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Create Request</h3>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Track Progress</h3>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3>Appeal if Needed</h3>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="landing-cta">

        <div className="cta-container">

          <h2>
            Ready to Exercise Your Right to Information?
          </h2>

          <p>
            Join thousands of citizens empowering themselves with knowledge
          </p>

          <button
            className="btn-large"
            onClick={handleGetStarted}
          >
            Get Started for Free
          </button>

        </div>

      </section>


      {/* FOOTER */}
      {/* FOOTER */}
<footer className="landing-footer">

  <div className="footer-content">

    {/* COLUMN 1 */}
    <div className="footer-section">
      <h4>RTI Assistant</h4>
      <p>
        Empowering citizens to access government information.
      </p>
    </div>

    {/* COLUMN 2 */}
    <div className="footer-section">
      <h4>Quick Links</h4>

      <ul>
        <li>
          <a onClick={() => scrollTo(featuresRef)}>Features</a>
        </li>

        <li>
          <a onClick={() => scrollTo(heroRef)}>How It Works</a>
        </li>

        <li>
          <a>Contact</a>
        </li>
      </ul>
    </div>

    {/* COLUMN 3 */}
    <div className="footer-section">
      <h4>Legal</h4>

      <ul>
        <li><a>Privacy Policy</a></li>
        <li><a>Terms of Service</a></li>
        <li><a>Cookies</a></li>
      </ul>
    </div>

    {/* COLUMN 4 */}
    <div className="footer-section">
      <h4>Follow Us</h4>

      <div className="social-links">
        <a>Twitter</a>
        <a>Facebook</a>
        <a>LinkedIn</a>
      </div>
    </div>

  </div>

  <div className="footer-bottom">
    <p>
      © 2026 RTI Assistant. Made for ADCET Hackathon.
    </p>
  </div>

</footer>

    </div>
  );
}