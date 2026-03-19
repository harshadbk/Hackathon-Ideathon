import { useNavigate } from 'react-router-dom'
import './About.css'

export default function About({ onBack }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › About RTI Assistant</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">ℹ️ About RTI Assistant Portal</h1>
              <p className="gov-page-sub">Empowering every Indian citizen to exercise their Right to Information</p>
            </div>
            <button className="btn ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => { onBack(); navigate(-1) }}>← Back</button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          {/* Mission */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 'var(--sp-4)' }}>🎯 Our Mission</h2>
            <p style={{ lineHeight: 1.9, color: 'var(--text-2)', fontSize: '0.95rem' }}>
              To make the Right to Information accessible to every Indian citizen by simplifying the RTI filing process, removing barriers of legal jargon, and empowering people with tools to track, escalate, and exercise their fundamental right to information under the RTI Act, 2005.
            </p>
          </div>

          {/* What makes us different */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 'var(--sp-5)' }}>✨ What Makes This Portal Different</h2>
            {[
              { icon: '🗣️', title: 'Plain Language Drafting', desc: 'No legal jargon required. Write what you need in simple terms and the AI formats it into a proper RTI request.', color: 'var(--s-info)' },
              { icon: '🤖', title: 'AI-Powered Department Detection', desc: 'Auto-suggests the correct department and Public Information Officer based on the nature of your request.', color: 'var(--green)' },
              { icon: '⏰', title: 'Smart Deadline Tracking', desc: 'Never miss a 30-day deadline. The portal tracks all your applications and alerts you when deadlines approach.', color: 'var(--s-pending)' },
              { icon: '📤', title: 'Automated Appeal Generation', desc: 'When no response arrives, generate a legally-worded First Appeal under Section 19(1) of the RTI Act instantly.', color: 'var(--saffron)' },
              { icon: '👥', title: 'Multi-Role Support', desc: 'Supports Citizens, Public Information Officers, and Appellate Authorities in a unified portal.', color: 'var(--s-info)' },
              { icon: '💾', title: 'Secure Local Storage', desc: 'All your requests are stored locally in your browser. Zero data leaks — your information stays with you.', color: 'var(--navy)' },
            ].map((f, i) => (
              <div key={i} className="about-feature-row">
                <div className="about-feature-icon" style={{ background: f.color + '15', color: f.color }}>{f.icon}</div>
                <div className="about-feature-body">
                  <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{f.title}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 'var(--sp-5)' }}>🚀 How It Works</h2>
            <ol style={{ paddingLeft: 'var(--sp-6)', lineHeight: 2.1, color: 'var(--text-2)', fontSize: '0.9rem' }}>
              <li><strong>Draft:</strong> Write your request in plain language — the AI helps format it properly</li>
              <li><strong>Review:</strong> Check the generated RTI application, edit if needed</li>
              <li><strong>Submit:</strong> Download and send to the correct department / PIO</li>
              <li><strong>Track:</strong> Monitor your 30-day deadline and receive alerts</li>
              <li><strong>Escalate:</strong> Auto-generate First Appeal if no response arrives</li>
            </ol>
          </div>

          {/* Stats */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 'var(--sp-5)' }}>📊 By The Numbers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--sp-4)' }}>
              {[
                { val: '1000+', label: 'RTIs Tracked', color: 'var(--navy)' },
                { val: '92%', label: 'Success Rate', color: 'var(--s-ok)' },
                { val: '50+', label: 'Departments', color: 'var(--s-info)' },
                { val: '₹0', label: 'Cost to Users', color: 'var(--saffron)' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'var(--sp-5)', background: 'var(--cream)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-lt)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 'var(--sp-5)' }}>💬 Citizen Testimonials</h2>
            {[
              { quote: 'This tool saved me hours trying to figure out how to write an RTI. The AI suggestions were spot-on and accurate.', name: 'Priya S.', city: 'Mumbai' },
              { quote: 'Finally, a simple way to track RTI deadlines. No more missed responses and I got the information I needed.', name: 'Rajesh K.', city: 'Bengaluru' },
              { quote: 'The auto-appeal feature got me the information I needed without going to court. Highly recommended.', name: 'Deepa M.', city: 'New Delhi' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--text-2)', lineHeight: 1.7, flex: 1 }}>{t.quote}</p>
                <div style={{ marginTop: 'var(--sp-3)', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>— {t.name}, {t.city}</div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="side-panel">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>📜 Legal Disclaimer</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
              This is a prototype tool for educational and demonstration purposes. It is not a substitute for legal advice. Always verify information with official government RTI portals and consult an RTI advocate or lawyer for complex cases.
            </p>
          </div>

          <div className="ai-box" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>🇮🇳 By Citizens, For Citizens</strong>
            <p style={{ marginTop: 'var(--sp-2)', fontSize: '0.82rem', lineHeight: 1.7 }}>
              This project was built to celebrate and simplify the Right to Information Act, 2005 — one of India's most powerful civic tools for accountable governance.
            </p>
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>🔒 Privacy Commitment</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
              Your data is stored only in your browser's local storage. We do not collect, transmit, or share any personal information. Zero server-side storage.
            </p>
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>🏆 Built For</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
              ADCET Hackathon 2026 — Demonstrating how technology can empower citizens to access information and hold government accountable.
            </p>
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>🛠️ Tech Stack</h2>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-2)', lineHeight: 1.9 }}>
              <div>⚛️ React 19 + React Router v7</div>
              <div>⚡ Vite (Rolldown)</div>
              <div>🎨 Custom Gov Design System</div>
              <div>📦 Local Storage Persistence</div>
              <div>🤖 Rule-based AI Suggestions</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
