import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (!selectedRole || !email.trim()) {
      alert("Please select a role and enter email");
      return;
    }

    const userData = {
      role: selectedRole,
      email,
      name: isSignUp ? name : email.split("@")[0],
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("rtia.user", JSON.stringify(userData));
    onLogin?.(userData);
    navigate("/dashboard");
  }

  const roles = [
    {
      id: "citizen",
      label: "Citizen",
      desc: "File RTI applications and track status",
    },
    {
      id: "pio",
      label: "PIO Officer",
      desc: "Respond to RTI requests",
    },
    {
      id: "authority",
      label: "Appellate Authority",
      desc: "Handle appeals and review cases",
    },
  ];

  return (
    <div className="login-wrapper">
      {/* LEFT PANEL – INFORMATION */}
      <div className="login-hero">
        <div className="hero-content">
          <h1 className="hero-title2">RTI Assistant Portal</h1>

          <p className="hero-description">
            Official portal for filing Right to Information (RTI) applications,
            tracking requests, and managing appeals in a transparent and
            time-bound manner.
          </p>

          <div className="hero-features2">
            <div className="feature-item2">✔ Online RTI Filing</div>
            <div className="feature-item2">✔ Status Tracking</div>
            <div className="feature-item2">✔ Secure & Transparent</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL – LOGIN */}
      <div className="login-auth">
        <div className="auth-container">
          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${!isSignUp ? "active" : ""}`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${isSignUp ? "active" : ""}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {/* Role Selection */}
            <div className="form-group">
              <label className="form-label">Select User Role</label>

              <div className="role-grid-login">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`role-card-login ${
                      selectedRole === role.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="role-name-login">{role.label}</div>
                    <div className="role-desc-login">{role.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="auth-button"
              disabled={!email || !selectedRole}
              onClick={handleLogin}
            >
              {isSignUp ? "Register" : "Login"}
            </button>

            <div className="auth-info">
              Demo version — authentication is simulated for demonstration
              purposes.
            </div>
          </div>
        </div>
        {/* Right Side Information Panel */}
        <div className="right-side-panel">
          <div className="info-section">
            <h3>About RTI Act</h3>
            <p>
              The Right to Information Act, 2005 empowers citizens to seek
              information from public authorities, promoting transparency and
              accountability in governance.
            </p>
          </div>

          <div className="info-section">
            <h3>Key Timelines</h3>
            <ul>
              <li>
                RTI Reply: <strong>30 days</strong>
              </li>
              <li>
                Life & Liberty: <strong>48 hours</strong>
              </li>
              <li>
                First Appeal: <strong>30 days</strong>
              </li>
              <li>
                Second Appeal: <strong>90 days</strong>
              </li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Citizen Rights</h3>
            <ul>
              <li>✔ Access government records</li>
              <li>✔ Track application status</li>
              <li>✔ File appeals online</li>
              <li>✔ Ensure accountability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
