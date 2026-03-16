import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CitizenHeader.css";

export default function CitizenHeader({ onNavigate, onLogout, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path, view) => {
    navigate(path);
    onNavigate?.(view);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setMenuOpen(false);
    setProfileDropdown(false);
  };

  return (
    <header className="citizen-header-wrapper">
      <div className="citizen-header-container">
        {/* LEFT: BRAND */}
        <div
          className="citizen-header-brand"
          onClick={() => navigate("/dashboard")}
        >
          <div className="citizen-header-logo">📋</div>
          <div>
            <div className="citizen-header-title">RTI Portal</div>
            <div className="citizen-header-subtitle">Right to Information</div>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="citizen-header-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV */}
        <nav className={`citizen-header-nav ${menuOpen ? "active" : ""}`}>
          {/* CENTER NAV */}
          <div className="citizen-header-nav-group">
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/dashboard", "dashboard")}
            >
              🏠 Home / Dashboard
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/draft", "draft")}
            >
              📝 File RTI Request
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/applications", "applications")}
            >
              📋 My Applications
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/tracker", "tracker")}
            >
              ⏱️ Track Status
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/appeal-first", "appeal-first")}
            >
              🔔 First Appeal
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/faq", "faq")}
            >
              ❓ Help / FAQ
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/rti-history", "rti-history")}
            >
              📚 RTI History
            </button>
            <button
              className="citizen-header-nav-btn"
              onClick={() => handleNav("/notifications", "notifications")}
            >
              🔕 Notifications
            </button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="citizen-header-nav-actions">
            {user && (
              <div className="citizen-header-user-section">
                <div className="citizen-header-user">
                  <div className="citizen-header-user-avatar">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </div>

                  <div className="citizen-header-user-info">
                    <div className="citizen-header-user-name">
                      {user.name || "User"}
                    </div>
                    <div className="citizen-header-user-email">
                      {user.email}
                    </div>
                  </div>

                  <button
                    className="citizen-header-dropdown-toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileDropdown(!profileDropdown);
                    }}
                  >
                    ⌄
                  </button>
                </div>

                {profileDropdown && (
                  <div className="citizen-header-dropdown-menu">
                    <button
                      className="citizen-header-dropdown-item"
                      onClick={() => {
                        handleNav("/profile", "profile");
                        setProfileDropdown(false);
                      }}
                    >
                      👤 Profile
                    </button>
                    <div className="citizen-header-dropdown-divider"></div>
                    <button
                      className="citizen-header-dropdown-item logout"
                      onClick={handleLogout}
                    >
                      🔓 Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
