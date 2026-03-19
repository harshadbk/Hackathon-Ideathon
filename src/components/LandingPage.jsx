import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import './LandingPage.css'
import logoImg from '../assets/RTI2.png'
import heroImg from '../assets/RTI1.jpg'

export default function LandingPage({ onLogin }) {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const rolesRef = useRef(null)
  const howRef = useRef(null)

  const fullText = 'Right to Information, Made Easy!'
  const [typedText, setTypedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer = null
    if (index < fullText.length) {
      timer = setTimeout(() => {
        setTypedText(prev => prev + fullText[index])
        setIndex(i => i + 1)
      }, 80)
    } else {
      timer = setTimeout(() => { setTypedText(''); setIndex(0) }, 2000)
    }
    return () => { if (timer) clearTimeout(timer) }
  }, [index])

  const scrollTo = ref => { if (ref?.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const handleGetStarted = () => navigate('/login')
  const handleTryDemo = () => { if (typeof onLogin === 'function') onLogin(); navigate('/demo') }

  return (
    <div className="lp-root">
      {/* TOPBAR */}
      <div className="lp-topbar">
        <div className="lp-topbar-inner">
          <span>🇮🇳 Government of India | भारत सरकार</span>
          <span className="lp-topbar-right">Right to Information Act, 2005</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-logo" onClick={() => scrollTo(heroRef)} style={{cursor:'pointer'}}>
            <img src={logoImg} alt="RTI Logo" className="lp-logo-img" />
            <div>
              <div className="lp-logo-title">RTI Assistant Portal</div>
              <div className="lp-logo-sub">सूचना का अधिकार पोर्टल</div>
            </div>
          </div>
          <div className="lp-nav-links">
            <button className="lp-nav-btn" onClick={() => scrollTo(featuresRef)}>Features</button>
            <button className="lp-nav-btn" onClick={() => scrollTo(rolesRef)}>Roles</button>
            <button className="lp-nav-btn" onClick={() => scrollTo(howRef)}>How It Works</button>
            <button className="lp-nav-btn lp-demo" onClick={handleTryDemo}>Try Demo</button>
            <button className="lp-nav-btn lp-primary" onClick={handleGetStarted}>Sign In →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero" ref={heroRef}>
        <div className="lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">🇮🇳 Official RTI Management System</div>
            <h1 className="lp-hero-title">{typedText}<span className="lp-cursor">|</span></h1>
            <p className="lp-hero-sub">
              Your AI-powered companion for filing RTI requests, tracking appeals, and accessing government information effortlessly.
            </p>
            <div className="lp-hero-btns">
              <button className="lp-btn-primary" onClick={handleGetStarted}>Start Filing RTI</button>
              <button className="lp-btn-secondary" onClick={() => scrollTo(howRef)}>Learn More</button>
              <button className="lp-btn-ghost" onClick={handleTryDemo}>Try Demo</button>
            </div>
            <div className="lp-hero-stats">
              <div className="lp-stat"><div className="lp-stat-num">10K+</div><div className="lp-stat-lbl">RTI Requests Filed</div></div>
              <div className="lp-stat-div"></div>
              <div className="lp-stat"><div className="lp-stat-num">98%</div><div className="lp-stat-lbl">Success Rate</div></div>
              <div className="lp-stat-div"></div>
              <div className="lp-stat"><div className="lp-stat-num">24/7</div><div className="lp-stat-lbl">AI Support</div></div>
            </div>
          </div>
          <div className="lp-hero-img-wrap">
            <img src={heroImg} alt="RTI Portal" className="lp-hero-img" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features" ref={featuresRef}>
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <h2>Powerful Features for RTI Success</h2>
            <p>Everything you need to exercise your Right to Information</p>
          </div>
          <div className="lp-features-grid">
            {[
              { icon: '🤖', title: 'AI-Powered Drafting', desc: 'Smart templates and AI assistance to draft perfect RTI requests quickly and accurately.' },
              { icon: '📡', title: 'Real-Time Tracking', desc: 'Monitor your RTI requests with live status updates and deadline alerts.' },
              { icon: '⚡', title: 'Auto Appeal Generation', desc: 'Automatically generate first or second appeals if responses are delayed.' },
              { icon: '📊', title: 'Department Analytics', desc: 'View performance statistics and response rates for government departments.' },
              { icon: '⭐', title: 'Citizen Reviews', desc: 'Rate departments and share feedback about your RTI experience.' },
              { icon: '📄', title: 'Report Generation', desc: 'Generate structured reports of RTI requests, responses, and department activity.' },
            ].map((f, i) => (
              <div className="lp-feature-card" key={i}>
                <div className="lp-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="lp-roles" ref={rolesRef}>
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <h2>For Every Stakeholder</h2>
            <p>A unified platform serving citizens, officers, and appellate authorities</p>
          </div>
          <div className="lp-roles-grid">
            {[
              { icon: '👤', title: 'For Citizens', desc: 'File RTI requests, track status, and get timely appeals', features: ['✏ Easy Drafting', '📊 Live Tracking', '⚡ Auto Appeals'] },
              { icon: '🧑‍💼', title: 'For PIO Officers', desc: 'Manage RTI requests, respond efficiently, and maintain records', features: ['📄 Request Management', '📅 Deadline Tracking', '📈 Analytics'] },
              { icon: '⚖️', title: 'For Appellate Authority', desc: 'Review appeals, maintain compliance, and ensure fair decisions', features: ['📑 Appeal Review', '⚖ Case Management', '📊 Reports'] },
            ].map((r, i) => (
              <div className="lp-role-card" key={i}>
                <div className="lp-role-icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <ul>{r.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-how" ref={howRef}>
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <h2>How It Works</h2>
            <p>Simple four-step process to exercise your right to information</p>
          </div>
          <div className="lp-steps">
            {[
              { n: '1', title: 'Select Role', desc: 'Login as Citizen, PIO, or Appellate Authority' },
              { n: '2', title: 'Create Request', desc: 'Draft your RTI with AI assistance' },
              { n: '3', title: 'Track Progress', desc: 'Monitor deadlines and receive alerts' },
              { n: '4', title: 'Appeal if Needed', desc: 'Auto-generate appeals on non-response' },
            ].map((s, i) => (
              <div className="lp-step" key={i}>
                <div className="lp-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-cta-inner">
          <h2>Ready to Exercise Your Right to Information?</h2>
          <p>Join thousands of citizens empowering themselves with knowledge and transparency</p>
          <button className="lp-btn-primary lp-cta-btn" onClick={handleGetStarted}>Get Started for Free</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-col">
            <h4>RTI Assistant Portal</h4>
            <p>Empowering citizens to access government information under the Right to Information Act, 2005.</p>
          </div>
          <div className="lp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><button className="lp-footer-link" onClick={() => scrollTo(featuresRef)}>Features</button></li>
              <li><button className="lp-footer-link" onClick={() => scrollTo(howRef)}>How It Works</button></li>
              <li><button className="lp-footer-link">Contact Us</button></li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><button className="lp-footer-link">Privacy Policy</button></li>
              <li><button className="lp-footer-link">Terms of Service</button></li>
              <li><button className="lp-footer-link">Accessibility</button></li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Official Resources</h4>
            <ul>
              <li><a href="https://rti.gov.in/" target="_blank" rel="noopener noreferrer">National RTI Portal</a></li>
              <li><a href="https://cic.gov.in/" target="_blank" rel="noopener noreferrer">Central Info. Commission</a></li>
              <li><a href="https://www.dopt.gov.in/" target="_blank" rel="noopener noreferrer">Dept. of Personnel</a></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>© 2026 RTI Assistant Portal — Ministry of Personnel, Public Grievances & Pensions | Government of India</p>
        </div>
      </footer>
    </div>
  )
}
