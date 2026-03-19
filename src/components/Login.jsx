import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function handleLogin() {
    if (!selectedRole || !email.trim()) {
      alert('Please select a role and enter your email address.')
      return
    }
    const userData = {
      role: selectedRole,
      email,
      name: isSignUp ? name : email.split('@')[0],
      loginTime: new Date().toISOString(),
    }
    localStorage.setItem('rtia.user', JSON.stringify(userData))
    onLogin?.(userData)
    navigate('/dashboard')
  }

  const roles = [
    { id: 'citizen',   label: 'Citizen',                labelHi: 'नागरिक',         icon: '👤', desc: 'File RTI applications and track status' },
    { id: 'pio',       label: 'Public Info. Officer',   labelHi: 'जन सूचना अधिकारी', icon: '🏢', desc: 'Manage and respond to RTI requests' },
    { id: 'authority', label: 'Appellate Authority',    labelHi: 'अपीलीय प्राधिकरण', icon: '⚖️', desc: 'Review appeals and adjudicate cases' },
  ]

  return (
    <div className="login-root">
      {/* LEFT — information panel */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-emblem-wrap">
            <div className="login-emblem"><span className="login-chakra">☸</span></div>
          </div>
          <h1 className="login-title">RTI Management Portal</h1>
          <p className="login-title-hi">सूचना का अधिकार पोर्टल</p>
          <p className="login-dept">Department of Personnel & Training<br/>Ministry of Personnel, Public Grievances & Pensions</p>

          <div className="login-features">
            <div className="lf-item"><span className="lf-dot"></span><span>Online RTI Application Filing</span></div>
            <div className="lf-item"><span className="lf-dot"></span><span>Real-time Status Tracking</span></div>
            <div className="lf-item"><span className="lf-dot"></span><span>AI-Assisted Request Drafting</span></div>
            <div className="lf-item"><span className="lf-dot"></span><span>Automated Appeal Generation</span></div>
            <div className="lf-item"><span className="lf-dot"></span><span>Multi-role Access Portal</span></div>
          </div>

          <div className="login-timelines">
            <div className="lt-row"><span className="lt-label">RTI Response Deadline</span><span className="lt-val">30 Days</span></div>
            <div className="lt-row"><span className="lt-label">Life & Liberty Cases</span><span className="lt-val">48 Hours</span></div>
            <div className="lt-row"><span className="lt-label">First Appeal Window</span><span className="lt-val">30 Days</span></div>
            <div className="lt-row"><span className="lt-label">Second Appeal Window</span><span className="lt-val">90 Days</span></div>
          </div>

          <div className="login-act-note">Right to Information Act, 2005</div>
        </div>
      </div>

      {/* RIGHT — auth form + info */}
      <div className="login-right">
        <div className="login-form-area">
          <div className="login-form-header">
            <h2>Sign In to Portal</h2>
            <p>Select your role and enter credentials to proceed</p>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab ${!isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(false)}>Sign In</button>
            <button className={`auth-tab ${isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(true)}>Register</button>
          </div>

          {/* Form */}
          <div className="auth-form-body">
            {isSignUp && (
              <div className="fg">
                <label>Full Name</label>
                <input type="text" className="field" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" />
              </div>
            )}
            <div className="fg">
              <label>Email Address / Aadhaar-linked ID</label>
              <input type="email" className="field" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your registered email" />
            </div>
            {isSignUp && (
              <div className="fg">
                <label>Password</label>
                <input type="password" className="field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" />
              </div>
            )}

            <div className="fg">
              <label>Login As (Select Role)</label>
              <div className="role-grid">
                {roles.map(r => (
                  <div key={r.id} className={`role-card-login ${selectedRole === r.id ? 'selected' : ''}`} onClick={() => setSelectedRole(r.id)}>
                    <span className="role-icon-lg">{r.icon}</span>
                    <div className="role-text">
                      <div className="role-name">{r.label}</div>
                      <div className="role-name-hi">{r.labelHi}</div>
                    </div>
                    {selectedRole === r.id && <span className="role-check">✓</span>}
                  </div>
                ))}
              </div>
              {selectedRole && <div className="role-desc-note">{roles.find(r => r.id === selectedRole)?.desc}</div>}
            </div>

            <button className="btn auth-btn" disabled={!email || !selectedRole} onClick={handleLogin}>
              {isSignUp ? 'Register & Proceed' : 'Sign In →'}
            </button>

            <div className="auth-demo-note">Demo version — authentication is simulated for demonstration purposes.</div>
          </div>

          <div className="auth-secure-notice">
            <span>🔒</span>
            <span>This is a secured government portal. All activities are logged and monitored for compliance.</span>
          </div>
        </div>

        {/* Right-side info panel */}
        <div className="login-info-panel">
          <div className="lip-section">
            <h3>About RTI Act</h3>
            <p>The Right to Information Act, 2005 empowers citizens to seek information from public authorities, promoting transparency and accountability in governance.</p>
          </div>
          <div className="lip-section">
            <h3>Citizen Rights</h3>
            <ul>
              <li>✔ Access government records</li>
              <li>✔ Track application status</li>
              <li>✔ File first and second appeals</li>
              <li>✔ Ensure departmental accountability</li>
            </ul>
          </div>
          <div className="lip-section">
            <h3>Important Note</h3>
            <p>BPL (Below Poverty Line) card holders are exempted from RTI filing fees. Standard fee: ₹10 per application.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
