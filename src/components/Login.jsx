import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

  async function handleLogin() {
    if (!email || !password || !selectedRole) {
      toast.error("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format! Please enter a correct email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://rtibackend-production-1234.up.railway.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        toast.error(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("rtia.user", JSON.stringify(data.user));
      onLogin?.(data.user);

      toast.success("Login successful 🎉");

      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (err) {
      toast.error("Server not reachable 🚨");
    } finally {
      setLoading(false);
    }
  }

  // ================= SIGNUP =================
  async function handleSignup() {
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format! Please enter a correct email.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://rtibackend-production-1234.up.railway.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirm_password: confirmPassword,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        toast.error(data.detail || "Signup failed");
        return;
      }

      toast.success("Signup successful 🎉 Please login");
      setIsSignUp(false);

    } catch (err) {
      toast.error("Server error 🚨");
    } finally {
      setLoading(false);
    }
  }

  const roles = [
    { id: "citizen", label: "Citizen", desc: "File RTI applications", icon: "👤" },
    { id: "pio", label: "PIO Officer", desc: "Respond to RTI", icon: "💼" },
    { id: "authority", label: "Authority", desc: "Handle appeals", icon: "⚖️" },
  ];

  const rtiFeatures = [
    { icon: "📋", title: "Easy Applications", text: "File RTI requests in minutes" },
    { icon: "⚡", title: "Fast Processing", text: "Track status in real-time" },
    { icon: "🔒", title: "Secure & Private", text: "Encrypted data protection" },
    { icon: "📊", title: "Transparency", text: "Complete information access" },
  ];

  const rtiInfo = [
    "Right to Information (RTI) is your fundamental right to access information held by government organizations",
    "Get responses within 30 days for general information or 45 days for sensitive matters",
    "File unlimited applications with transparent tracking and appeals",
    "Receive detailed responses with proper documentation",
  ];

  return (
    <div className="login-wrapper">
      <div className="login-hero">
        <div className="hero-content">
          <div className="hero-header">
            <h1 className="hero-title2">RTI Assistant Portal</h1>
            <p className="hero-subtitle">Empowering Citizens Through Transparency</p>
          </div>

          <div className="rti-info-section">
            <h3 className="info-section-title">What is RTI?</h3>
            <div className="info-points">
              {rtiInfo.map((info, idx) => (
                <div key={idx} className="info-point">
                  <span className="info-dot">•</span>
                  <p>{info}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="features-section">
            <h3 className="features-title">Why Use Our Portal?</h3>
            <div className="features-grid">
              {rtiFeatures.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="login-auth">
        <div className="auth-container">

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={!isSignUp ? "auth-tab active" : "auth-tab"}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button
              className={isSignUp ? "auth-tab active" : "auth-tab"}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form">

            {isSignUp && (
              <>
                <input
                  className="form-input"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <input
              className="form-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isSignUp && (
              <input
                className="form-input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            {!isSignUp && (
              <div className="role-selection-section">
                <label className="role-selection-label">Select your role:</label>
                <div className="role-grid-login">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className={`role-card-login ${
                        selectedRole === role.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="role-icon">{role.icon}</div>
                      <div className="role-name-login">{role.label}</div>
                      <small className="role-desc-login">{role.desc}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="auth-button"
              onClick={isSignUp ? handleSignup : handleLogin}
              disabled={
                loading ||
                (!isSignUp && (!email || !password || !selectedRole)) ||
                (isSignUp &&
                  (!name || !email || !phone || !password || !confirmPassword))
              }
            >
              {loading ? "Please wait..." : isSignUp ? "Register" : "Login"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}