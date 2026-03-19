import RequestCard from './RequestCard'
import './AuthorityDashboard.css'

export default function AuthorityDashboard({ requests, onOpen, user, onLogout }) {
  const appealedCount = requests.filter(r => r.status === 'appealed').length
  const closedCount = requests.filter(r => r.status === 'closed').length
  const activeAppeals = requests.filter(r => r.status === 'appealed')

  return (
    <div>
      <div className="auth-header">
        <div className="auth-header-inner">
          <div className="auth-brand">
            <div className="auth-emblem">⚖️</div>
            <div>
              <div className="auth-title">RTI Appellate Authority Panel</div>
              <div className="auth-sub">Appeal Review & Adjudication System</div>
            </div>
          </div>
          <div className="auth-user">
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>{user.email}</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Appellate Authority</div>
            <button className="btn ghost" style={{ fontSize: '0.78rem', padding: '5px 12px', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)', marginTop: 'var(--sp-2)' }} onClick={onLogout}>Sign Out</button>
          </div>
        </div>
      </div>

      <div className="grid-full" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-danger)' }}>{appealedCount}</div>
          <div className="stat-label">Active Appeals</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--s-ok)' }}>{closedCount}</div>
          <div className="stat-label">Decided Cases</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{requests.length}</div>
          <div className="stat-label">Total Cases</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--green)' }}>92%</div>
          <div className="stat-label">Resolution Rate</div>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card">
            <div className="card-inner-header">
              <h2 className="h2">⚡ Appeals Under Review</h2>
              <p className="small-muted">First Appeals filed under Section 19(1) of the RTI Act, 2005 requiring adjudication</p>
            </div>
            <div className="list" style={{ marginTop: 'var(--sp-4)' }}>
              {activeAppeals.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-empty-icon">⚖️</div>
                  <h3>No Active Appeals</h3>
                  <p>There are no pending appeals requiring review at this time.</p>
                </div>
              ) : (
                activeAppeals.map(req => (
                  <RequestCard key={req.id} request={req} onOpen={() => onOpen(req.id)} />
                ))
              )}
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-4)' }}>📊 Appeal Statistics</h2>
            {[
              { label: 'Avg. Resolution Time', val: '18 Days', color: 'var(--s-info)' },
              { label: 'Approval Rate', val: '78%', color: 'var(--s-ok)' },
              { label: 'Penalty Orders', val: '12%', color: 'var(--s-danger)' },
              { label: 'Pending > 30 Days', val: `${Math.max(0, appealedCount - 2)}`, color: 'var(--s-pending)' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--border-lt)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-4)' }}>⚙️ Available Actions</h2>
            <div className="feature-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {[
                { icon: '✅', title: 'Approve', desc: 'Grant RTI request' },
                { icon: '❌', title: 'Reject', desc: 'Uphold PIO decision' },
                { icon: '📝', title: 'Add Order', desc: 'Write judgment' },
                { icon: '🔁', title: 'Remand', desc: 'Send back to PIO' },
              ].map((a, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon">{a.icon}</div>
                  <div className="h3">{a.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="notice" style={{ marginTop: 'var(--sp-4)' }}>
            📋 Under Section 19(6), the First Appellate Authority must dispose of appeals within 30 days, extendable to 45 days with written justification.
          </div>
        </aside>
      </div>
    </div>
  )
}
