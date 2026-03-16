import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header({ onNavigate, onQuickDemo, onLogout, user }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const navigate = useNavigate()

  const handleNav = (path, view) => {
    navigate(path)
    onNavigate?.(view)
    setMenuOpen(false)
  }

  const handleLogout = () => {
    onLogout?.()
    setMenuOpen(false)
    setProfileDropdown(false)
  }

  return (
    <header className="header-wrapper">
      <div className="header-container">

        {/* LEFT: BRAND */}
        <div className="header-brand" onClick={() => navigate('/dashboard')}>
          <div className="header-logo">📋</div>
          <div>
            <div className="header-title">RTI Portal</div>
            <div className="header-subtitle">
              Right to Information
            </div>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="header-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV */}
        <nav className={`header-nav ${menuOpen ? 'active' : ''}`}>

          {/* CENTER NAV */}
          <div className="header-nav-group">
            <button className="header-nav-btn" onClick={() => handleNav('/dashboard', 'dashboard')}>🏠 Home / Dashboard</button>
            <button className="header-nav-btn" onClick={() => handleNav('/draft', 'draft')}>📝 File RTI Request</button>
            <button className="header-nav-btn" onClick={() => handleNav('/applications', 'applications')}>📋 My Applications</button>
            <button className="header-nav-btn" onClick={() => handleNav('/tracker', 'tracker')}>⏱️ Track Status</button>
            <button className="header-nav-btn" onClick={() => handleNav('/appeal-first', 'appeal-first')}>🔔 First Appeal</button>
            <button className="header-nav-btn" onClick={() => handleNav('/appeal-second', 'appeal-second')}>📢 Second Appeal</button>
            <button className="header-nav-btn" onClick={() => handleNav('/departments', 'departments')}>🏛️ Departments</button>
            <button className="header-nav-btn" onClick={() => handleNav('/faq', 'faq')}>❓ Help / FAQ</button>
            <button className="header-nav-btn" onClick={() => handleNav('/notifications', 'notifications')}>🔕 Notifications</button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="header-nav-actions">
            {user && (
              <div className="header-user-section">
                <div className="header-user">
                  <div className="header-user-avatar">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </div>

                  <div className="header-user-info">
                    <div className="header-user-name">
                      {user.name || 'User'}
                    </div>
                    <div className="header-user-email">
                      {user.email}
                    </div>
                  </div>

                  <button
                    className="header-dropdown-toggle"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    ⌄
                  </button>
                </div>

                {profileDropdown && (
                  <div className="header-dropdown-menu">
                    <button
                      className="header-dropdown-item"
                      onClick={() => {
                        handleNav('/profile', 'profile')
                        setProfileDropdown(false)
                      }}
                    >
                      👤 Profile
                    </button>
                    <div className="header-dropdown-divider"></div>
                    <button
                      className="header-dropdown-item logout"
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
  )
}