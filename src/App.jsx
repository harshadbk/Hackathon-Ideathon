import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import './styles/rtia.css'
import './styles/responsive.css'
import Login from './components/Login'
import CitizenHeader from './components/citizen/CitizenHeader'
import CitizenDashboard from './components/citizen/CitizenDashboard'
import DraftAssistant from './components/DraftAssistant'
import Tracker from './components/Tracker'
import RequestDetail from './components/RequestDetail'
import Guide from './components/Guide'
import FAQ from './components/FAQ'
import About from './components/About'
import MyApplications from './components/citizen/MyApplications'
import RTIHistory from './components/citizen/RTIHistory'
import FirstAppeal from './components/citizen/FirstAppeal'
import Departments from './components/citizen/Departments'
import Notifications from './components/citizen/Notifications'
import PIODashboard from './components/PIODashboard'
import AuthorityDashboard from './components/AuthorityDashboard'
import { loadRequests, saveRequests } from './utils/storage'
import mockRequests from './data/mockRequests'
import LandingPage from './components/LandingPage'
import { Toaster } from "react-hot-toast";

// Detail Page Wrapper Component
function DetailPageWrapper({ requests, onUpdate }) {
  const { id } = useParams()
  const request = requests.find((r) => r.id === id)

  if (!request) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Request not found</h2>
        <button onClick={() => window.history.back()} className="btn ghost">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <RequestDetail
      request={request}
      onBack={() => window.history.back()}
      onUpdate={onUpdate}
    />
  )
}

function AppContent() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('dashboard')
  const [requests, setRequests] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Check for existing login
    const stored = localStorage.getItem('rtia.user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }

    // Load requests
    const storedReqs = loadRequests()
    if (!storedReqs || storedReqs.length === 0) {
      saveRequests(mockRequests)
      setRequests(mockRequests)
    } else {
      setRequests(storedReqs)
    }
  }, [])

  useEffect(() => saveRequests(requests), [requests])

  function openDetail(id) {
    navigate(`/detail/${id}`)
  }

  function addRequest(r) {
    const newReq = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...r }
    setRequests((s) => [newReq, ...s])
    navigate(`/detail/${newReq.id}`)
  }

  function updateRequest(id, patch) {
    setRequests((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  function handleLogout() {
    localStorage.removeItem('rtia.user')
    setUser(null)
    setView('dashboard')
  }

  // Show login if not authenticated
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

  // Role-specific UI
  const isCitizens = user.role === 'citizen'
  const isPIO = user.role === 'pio'
  const isAuthority = user.role === 'authority'

  return (
    <div className="app-root">
      {isAuthority ? (
        // Appellate Authority UI (no Header nav, different layout)
        <>
          <div className="header">
            <div className="brand">
              <div className="logo-mark">⚖️</div>
              <div className="brand-info">
                <div className="brand-title">RTI Appellate Authority</div>
                <div className="brand-sub">Appeal Review System</div>
              </div>
            </div>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </div>
          <main className="container">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <AuthorityDashboard
                    requests={requests}
                    onOpen={openDetail}
                    user={user}
                    onLogout={handleLogout}
                  />
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <DetailPageWrapper
                    requests={requests}
                    onUpdate={updateRequest}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <footer className="footer-note">
              RTI Appellate Authority © 2024 — Ensuring fair RTI implementation 🇮🇳
            </footer>
          </main>
        </>
      ) : isPIO ? (
        // PIO Officer UI (no Header nav, different layout)
        <>
          <div className="header">
            <div className="brand">
              <div className="logo-mark">👨‍💼</div>
              <div className="brand-info">
                <div className="brand-title">RTI Management System</div>
                <div className="brand-sub">PIO Portal</div>
              </div>
            </div>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </div>
          <main className="container">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PIODashboard
                    requests={requests}
                    onOpen={openDetail}
                    user={user}
                    onLogout={handleLogout}
                  />
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <DetailPageWrapper
                    requests={requests}
                    onUpdate={updateRequest}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <footer className="footer-note">
              RTI Management System © 2024 — Streamlining RTI processes 🇮🇳
            </footer>
          </main>
        </>
      ) : (
        // Citizen UI (with CitizenHeader nav)
        <>
          <CitizenHeader
            onNavigate={(v) => setView(v)}
            onLogout={handleLogout}
            user={user}
          />
          <main className="container">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <CitizenDashboard
                    requests={requests}
                    onNew={() => setView('draft')}
                    onOpen={openDetail}
                    onTrack={() => setView('tracker')}
                    user={user}
                  />
                }
              />
              <Route
                path="/draft"
                element={
                  <DraftAssistant
                    onSubmit={(payload) => addRequest(payload)}
                    onBack={() => setView('dashboard')}
                  />
                }
              />
              <Route
                path="/applications"
                element={
                  <MyApplications
                    requests={requests}
                    onOpen={openDetail}
                  />
                }
              />
              <Route
                path="/rti-history"
                element={
                  <RTIHistory
                    requests={requests}
                    onOpen={openDetail}
                  />
                }
              />
              <Route
                path="/tracker"
                element={
                  <Tracker
                    requests={requests}
                    onOpen={openDetail}
                    onUpdate={updateRequest}
                  />
                }
              />
              <Route
                path="/appeal-first"
                element={
                  <FirstAppeal
                    requests={requests}
                    onSubmit={(payload) => addRequest({ ...payload, type: 'appeal-first' })}
                    onBack={() => window.history.back()}
                  />
                }
              />
              <Route
                path="/departments"
                element={<Departments />}
              />
              <Route
                path="/notifications"
                element={<Notifications />}
              />
              <Route
                path="/detail/:id"
                element={
                  <DetailPageWrapper
                    requests={requests}
                    onUpdate={updateRequest}
                  />
                }
              />
              <Route
                path="/guide"
                element={<Guide onBack={() => window.history.back()} />}
              />
              <Route
                path="/faq"
                element={<FAQ onBack={() => window.history.back()} />}
              />
              <Route
                path="/about"
                element={<About onBack={() => window.history.back()} />}
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <footer className="footer-note">
              RTI Assistant © 2024 — Empowering citizens to exercise their Right to Information 🇮🇳
            </footer>
          </main>
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <AppContent />
    </BrowserRouter>
  )
}
