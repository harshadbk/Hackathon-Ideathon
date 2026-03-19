import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header({ onNavigate, onQuickDemo, onLogout, user }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNav = (path, view) => {
    navigate(path)
    onNavigate?.(view)
    setMenuOpen(false)
  }

  return (
    <header className="gov-header">
      {/* Government topbar */}
      <div className="gov-topbar">
        <div className="gov-topbar-inner">
          <div className="topbar-left">
            <span className="topbar-flag">🇮🇳</span>
            <span>Government of India</span>
            <span className="topbar-sep">|</span>
            <span>भारत सरकार</span>
          </div>
          <div className="topbar-right hide-mobile">
            <a href="#">Skip to Main Content</a>
            <span className="topbar-sep">|</span>
            <a href="#">Screen Reader Access</a>
            <span className="topbar-sep">|</span>
            <span className="font-size-ctrl">
              <button title="Increase Text">A+</button>
              <button title="Normal Text">A</button>
              <button title="Decrease Text">A-</button>
            </span>
          </div>
        </div>
      </div>

      {/* Main branding bar */}
      <div className="gov-brand-bar">
        <div className="gov-brand-inner">
          <div className="gov-branding" onClick={() => navigate('/dashboard')} style={{cursor:'pointer'}}>
            <div className="gov-emblem">
              <div className="emblem-disk">
                <span className="emblem-chakra">☸</span>
              </div>
            </div>
            <div className="gov-title-block">
              <div className="gov-portal-title">RTI Management Portal</div>
              <div className="gov-portal-hi">सूचना का अधिकार पोर्टल</div>
              <div className="gov-portal-dept">Ministry of Personnel, Public Grievances & Pensions | Dept. of Personnel & Training</div>
            </div>
          </div>

          {user && (
            <div className="gov-user-block hide-mobile">
              <div className="gov-user-avatar">
                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="gov-user-info">
                <div className="gov-user-name">{user.name || user.email?.split('@')[0] || 'User'}</div>
                <div className="gov-user-role">
                  {user.role === 'pio' ? 'Public Information Officer' : user.role === 'authority' ? 'Appellate Authority' : 'Citizen'}
                </div>
              </div>
              <button className="btn ghost" style={{fontSize:'0.78rem',padding:'6px 12px'}} onClick={() => { onLogout?.(); setMenuOpen(false) }}>
                Sign Out
              </button>
            </div>
          )}

          <button className="gov-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Navigation strip */}
      <nav className={`gov-nav-strip ${menuOpen ? 'nav-open' : ''}`}>
        <div className="gov-nav-inner">
          <button className="gov-nav-link" onClick={() => handleNav('/dashboard', 'dashboard')}>🏠 Dashboard</button>
          <button className="gov-nav-link" onClick={() => handleNav('/draft', 'draft')}>✍️ File RTI</button>
          <button className="gov-nav-link" onClick={() => handleNav('/tracker', 'tracker')}>⏰ Track & Appeal</button>
          <button className="gov-nav-link" onClick={() => handleNav('/guide', 'guide')}>📚 RTI Guide</button>
          <button className="gov-nav-link" onClick={() => handleNav('/faq', 'faq')}>❓ FAQ</button>
          <button className="gov-nav-link" onClick={() => handleNav('/about', 'about')}>ℹ️ About</button>
          <button className="gov-nav-link demo-link" onClick={() => { onQuickDemo?.(); setMenuOpen(false) }}>🎯 Load Demo</button>
        </div>
      </nav>
    </header>
  )
}
