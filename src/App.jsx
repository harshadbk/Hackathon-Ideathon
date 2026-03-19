import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/rtia.css'
import './styles/responsive.css'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import DraftAssistant from './components/DraftAssistant'
import Tracker from './components/Tracker'
import RequestDetail from './components/RequestDetail'
import Guide from './components/Guide'
import FAQ from './components/FAQ'
import About from './components/About'
import PIODashboard from './components/PIODashboard'
import AuthorityDashboard from './components/AuthorityDashboard'
import LandingPage from './components/LandingPage'
import { loadRequests, saveRequests } from './utils/storage'
import mockRequests from './data/mockRequests'

function AppContent() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('dashboard')
  const [requests, setRequests] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('rtia.user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    const storedReqs = loadRequests()
    if (!storedReqs || storedReqs.length === 0) {
      saveRequests(mockRequests)
      setRequests(mockRequests)
    } else {
      setRequests(storedReqs)
    }
  }, [])

  useEffect(() => saveRequests(requests), [requests])

  function openDetail(id) { setSelectedId(id); setView('detail') }

  function addRequest(r) {
    const newReq = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...r }
    setRequests(s => [newReq, ...s])
    setSelectedId(newReq.id)
    setView('detail')
  }

  function updateRequest(id, patch) {
    setRequests(s => s.map(r => r.id === id ? { ...r, ...patch } : r))
  }

  function handleLogout() {
    localStorage.removeItem('rtia.user')
    setUser(null)
    setView('dashboard')
  }

  // ── NOT AUTHENTICATED ──
  if (!user) {
    return (
      <div className="app-root">
        <Routes>
          <Route path="/" element={<LandingPage onLogin={setUser} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    )
  }

  const isPIO = user.role === 'pio'
  const isAuthority = user.role === 'authority'

  // ── APPELLATE AUTHORITY ──
  if (isAuthority) {
    return (
      <div className="app-root">
        <div className="header">
          <div style={{ background: 'var(--navy)', borderBottom: '3px solid var(--gold)', padding: 'var(--sp-4) var(--sp-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', color: '#fff' }}>
              <span style={{ fontSize: '1.8rem' }}>⚖️</span>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.1rem' }}>RTI Appellate Authority</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Appeal Review System</div>
              </div>
            </div>
            <button className="btn ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }} onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        <main className="container">
          <Routes>
            <Route path="/dashboard" element={<AuthorityDashboard requests={requests} onOpen={openDetail} user={user} onLogout={handleLogout} />} />
            <Route path="/detail/:id" element={selectedId && <RequestDetail request={requests.find(r => r.id === selectedId)} onBack={() => window.history.back()} onUpdate={updateRequest} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    )
  }

  // ── PIO OFFICER ──
  if (isPIO) {
    return (
      <div className="app-root">
        <div className="header">
          <div style={{ background: 'var(--navy)', borderBottom: '3px solid var(--saffron)', padding: 'var(--sp-4) var(--sp-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', color: '#fff' }}>
              <span style={{ fontSize: '1.8rem' }}>🏢</span>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.1rem' }}>RTI Management System</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Public Information Officer Portal</div>
              </div>
            </div>
            <button className="btn ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }} onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        <main className="container">
          <Routes>
            <Route path="/dashboard" element={<PIODashboard requests={requests} onOpen={openDetail} user={user} onLogout={handleLogout} />} />
            <Route path="/detail/:id" element={selectedId && <RequestDetail request={requests.find(r => r.id === selectedId)} onBack={() => window.history.back()} onUpdate={updateRequest} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    )
  }

  // ── CITIZEN (default) ──
  return (
    <div className="app-root">
      <Header
        onNavigate={v => setView(v)}
        onLogout={handleLogout}
        user={user}
        onQuickDemo={() => {
          saveRequests(mockRequests)
          setRequests(mockRequests)
          setView('dashboard')
        }}
      />
      <main className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard requests={requests} onNew={() => setView('draft')} onOpen={openDetail} onTrack={() => setView('tracker')} />} />
          <Route path="/draft" element={<DraftAssistant onSubmit={payload => addRequest(payload)} onBack={() => setView('dashboard')} />} />
          <Route path="/tracker" element={<Tracker requests={requests} onOpen={openDetail} onUpdate={updateRequest} />} />
          <Route path="/detail/:id" element={selectedId && <RequestDetail request={requests.find(r => r.id === selectedId)} onBack={() => window.history.back()} onUpdate={updateRequest} />} />
          <Route path="/guide" element={<Guide onBack={() => window.history.back()} />} />
          <Route path="/faq" element={<FAQ onBack={() => window.history.back()} />} />
          <Route path="/about" element={<About onBack={() => window.history.back()} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
