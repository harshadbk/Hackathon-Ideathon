import { useNavigate } from 'react-router-dom'
import RequestCard from './RequestCard'
import './Dashboard.css'

export default function Dashboard({ requests = [], onNew, onOpen, onTrack }) {
  const navigate = useNavigate()
  const recent = requests.slice(0, 6)
  const responded = requests.filter(r => r.status === 'responded').length
  const pending = requests.filter(r => r.status === 'awaiting_response').length
  const overdue = requests.filter(r => {
    const left = Math.ceil((new Date(new Date(r.createdAt).getTime() + r.deadlineDays * 24 * 3600 * 1000) - new Date()) / (24 * 3600 * 1000))
    return left < 0 && r.status === 'awaiting_response'
  }).length

  const handleOpenDetail = id => { onOpen(id); navigate(`/detail/${id}`) }
  const handleNewRTI = () => { onNew(); navigate('/draft') }
  const handleTrack = () => { onTrack(); navigate('/tracker') }

  return (
    <div>
      {/* Page header */}
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › Dashboard</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">My RTI Dashboard</h1>
              <p className="gov-page-sub">Track and manage your Right to Information applications</p>
            </div>
            <div className="flex-row">
              <button className="btn" onClick={handleNewRTI}>✍️ File New RTI</button>
              <button className="btn ghost" onClick={handleTrack}>⏰ Track Appeals</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-full" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="stat-box">
          <div className="stat-value">{requests.length}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-ok)' }}>{responded}</div>
          <div className="stat-label">Responded</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-pending)' }}>{pending}</div>
          <div className="stat-label">Awaiting Response</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-danger)' }}>{overdue}</div>
          <div className="stat-label">Overdue / At Risk</div>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid">
        {/* Requests list */}
        <div>
          {/* Section header */}
          <div className="dash-section-header">
            <div className="dash-section-title">
              <span className="dash-section-icon">📋</span>
              <h2 className="h2">Recent Applications</h2>
            </div>
            {requests.length > 6 && (
              <button className="btn ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }} onClick={handleTrack}>View All →</button>
            )}
          </div>

          {recent.length === 0 ? (
            <div className="dash-empty">
              <div className="dash-empty-icon">📭</div>
              <h3>No RTI Applications Yet</h3>
              <p>Click <strong>File New RTI</strong> to begin or load demo data using the <strong>Load Demo</strong> button in the header.</p>
              <button className="btn" style={{ marginTop: 'var(--sp-4)' }} onClick={handleNewRTI}>✍️ File Your First RTI</button>
            </div>
          ) : (
            <div className="list">
              {recent.map(r => (
                <RequestCard key={r.id} request={r} onOpen={() => handleOpenDetail(r.id)} />
              ))}
            </div>
          )}

          {/* Key Features */}
          <div className="card" style={{ marginTop: 'var(--sp-6)' }}>
            <div className="dash-section-header" style={{ marginBottom: 'var(--sp-4)' }}>
              <div className="dash-section-title">
                <span className="dash-section-icon">🎯</span>
                <h2 className="h2">Key Features</h2>
              </div>
            </div>
            <div className="feature-grid">
              {[
                { icon: '✍️', title: 'Plain Language', desc: 'Write in simple terms' },
                { icon: '🤖', title: 'AI Suggestions', desc: 'Auto-suggest departments' },
                { icon: '⏰', title: 'Deadline Track', desc: 'Never miss a deadline' },
                { icon: '📤', title: 'Auto-Appeals', desc: 'Generate on non-response' },
                { icon: '📊', title: 'Analytics', desc: 'Track all requests' },
                { icon: '💾', title: 'Secure Storage', desc: 'Safe local backup' },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="h3">{f.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 2 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          {/* Quick actions */}
          <div className="side-panel">
            <div className="dash-section-title" style={{ marginBottom: 'var(--sp-3)' }}>
              <span>⚡</span>
              <h2 className="h2">Quick Actions</h2>
            </div>
            {[
              { icon: '✍️', label: 'File New RTI', action: handleNewRTI },
              { icon: '⏰', label: 'Track & Appeals', action: handleTrack },
              { icon: '📚', label: 'RTI Guidelines', action: () => navigate('/guide') },
              { icon: '❓', label: 'FAQ', action: () => navigate('/faq') },
            ].map((a, i) => (
              <button key={i} className="dash-quick-action" onClick={a.action}>
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>

          {/* Important dates */}
          <div className="side-panel">
            <div className="dash-section-title" style={{ marginBottom: 'var(--sp-3)' }}>
              <span>📅</span>
              <h2 className="h2">Key Timelines</h2>
            </div>
            {[
              { label: 'Initial Response', val: '30 Days' },
              { label: 'Life & Liberty Cases', val: '48 Hours' },
              { label: 'First Appeal Window', val: '30 Days' },
              { label: 'Second Appeal Window', val: '90 Days' },
            ].map((d, i) => (
              <div key={i} className="dash-timeline-row">
                <span className="dash-tl-label">{d.label}</span>
                <span className="dash-tl-val">{d.val}</span>
              </div>
            ))}
          </div>

          {/* RTI Quick Guide */}
          <div className="ai-box">
            <div className="dash-section-title" style={{ marginBottom: 'var(--sp-3)' }}>
              <span>🚀</span>
              <strong>Quick Start Guide</strong>
            </div>
            <ol style={{ paddingLeft: 'var(--sp-5)', fontSize: '0.82rem', lineHeight: 1.8 }}>
              <li>Click <strong>File New RTI</strong></li>
              <li>Describe what information you need</li>
              <li>Review the AI-generated draft</li>
              <li>Submit and track your request</li>
            </ol>
          </div>

          {/* RTI resources */}
          <div className="side-panel">
            <div className="dash-section-title" style={{ marginBottom: 'var(--sp-3)' }}>
              <span>📖</span>
              <h2 className="h2">Official Resources</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', fontSize: '0.82rem' }}>
              <a href="https://rti.gov.in/" target="_blank" rel="noopener noreferrer">📎 National RTI Portal</a>
              <a href="https://cic.gov.in/" target="_blank" rel="noopener noreferrer">📎 Central Information Commission</a>
              <a href="https://www.dopt.gov.in/" target="_blank" rel="noopener noreferrer">📎 Dept. of Personnel & Training</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
