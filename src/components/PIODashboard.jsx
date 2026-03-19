import RequestCard from './RequestCard'
import './PIODashboard.css'

export default function PIODashboard({ requests, onOpen, user, onLogout }) {
  const myRequests = requests.filter(r => r.status === 'awaiting_response')
  const respondedCount = requests.filter(r => r.status === 'responded').length
  const appealsCount = requests.filter(r => r.status === 'appealed').length

  return (
    <div>
      {/* PIO Header */}
      <div className="pio-header">
        <div className="pio-header-inner">
          <div className="pio-brand">
            <div className="pio-emblem">🏢</div>
            <div>
              <div className="pio-title">RTI Management System — PIO Portal</div>
              <div className="pio-sub">Public Information Officer Dashboard</div>
            </div>
          </div>
          <div className="pio-user">
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>{user.email}</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Public Information Officer</div>
            <button className="btn ghost" style={{ fontSize: '0.78rem', padding: '5px 12px', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)', marginTop: 'var(--sp-2)' }} onClick={onLogout}>Sign Out</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-full" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-pending)' }}>{myRequests.length}</div>
          <div className="stat-label">Pending Response</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-ok)' }}>{respondedCount}</div>
          <div className="stat-label">Responded</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-danger)' }}>{appealsCount}</div>
          <div className="stat-label">Appeals Filed</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{requests.length}</div>
          <div className="stat-label">Total Cases</div>
        </div>
      </div>

      <div className="grid">
        <div>
          {/* Pending requests */}
          <div className="card">
            <div className="card-inner-header">
              <h2 className="h2">📥 Applications Awaiting Response</h2>
              <p className="small-muted">These applications require your response within the statutory 30-day period</p>
            </div>
            <div className="list" style={{ marginTop: 'var(--sp-4)' }}>
              {myRequests.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-empty-icon">✅</div>
                  <h3>All Clear — No Pending Requests</h3>
                  <p>All RTI applications have been responded to.</p>
                </div>
              ) : (
                myRequests.map(req => (
                  <RequestCard key={req.id} request={req} onOpen={() => onOpen(req.id)} />
                ))
              )}
            </div>
          </div>
        </div>

        <aside>
          {/* Quick Actions */}
          <div className="card">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-4)' }}>⚡ Quick Actions</h2>
            <div className="feature-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {[
                { icon: '💬', title: 'Send Response', desc: 'Reply to pending requests' },
                { icon: '📧', title: 'Send Reminder', desc: 'Auto-email to citizens' },
                { icon: '📋', title: 'View History', desc: 'All responses & appeals' },
                { icon: '📊', title: 'Analytics', desc: 'Department statistics' },
              ].map((a, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon">{a.icon}</div>
                  <div className="h3">{a.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>📅 PIO Obligations</h2>
            {[
              { label: 'Standard Response', val: '30 Days' },
              { label: 'Life & Liberty', val: '48 Hours' },
              { label: 'Transfer to correct dept', val: '5 Days' },
              { label: 'Fee intimation (if any)', val: '5 Days' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--sp-2) 0', borderBottom: '1px solid var(--border-lt)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--muted)' }}>{d.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{d.val}</span>
              </div>
            ))}
          </div>

          <div className="notice" style={{ marginTop: 'var(--sp-4)' }}>
            ⚠️ Non-compliance with RTI deadlines may result in penalties under Section 20 of the RTI Act, 2005.
          </div>
        </aside>
      </div>
    </div>
  )
}
