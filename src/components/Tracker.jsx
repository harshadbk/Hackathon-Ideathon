import { useNavigate } from 'react-router-dom'
import RequestCard from './RequestCard'
import './Tracker.css'

function computeDaysLeft(createdAt, deadlineDays = 30) {
  const created = new Date(createdAt)
  const deadline = new Date(created.getTime() + deadlineDays * 24 * 3600 * 1000)
  return Math.ceil((deadline - new Date()) / (24 * 3600 * 1000))
}

export default function Tracker({ requests = [], onOpen, onUpdate }) {
  const navigate = useNavigate()

  const handleOpenDetail = id => { onOpen(id); navigate(`/detail/${id}`) }
  const enriched = requests.map(r => ({ ...r, daysLeft: computeDaysLeft(r.createdAt, r.deadlineDays) }))
  const overdue = enriched.filter(r => r.daysLeft < 0 && r.status === 'awaiting_response')
  const atRisk = enriched.filter(r => r.daysLeft >= 0 && r.daysLeft <= 5 && r.status === 'awaiting_response')

  function autoAppeal(r) {
    const appealText = `FIRST APPEAL UNDER SECTION 19(1) OF THE RTI ACT, 2005\n\nTo,\nThe First Appellate Authority,\n${r.department}\n\nSubject: First Appeal against non-response to RTI Application dated ${new Date(r.createdAt).toLocaleDateString()}\n\nSir/Madam,\n\nI had filed an RTI Application titled "${r.title}" to ${r.pio} on ${new Date(r.createdAt).toLocaleDateString()}. The statutory period of 30 days has elapsed without any response from the Public Information Officer.\n\nUnder Section 19(1) of the Right to Information Act, 2005, I hereby file this First Appeal and request that the Appellate Authority direct the PIO to provide the required information within the stipulated timeframe.\n\nEnclosures:\n1. Copy of original RTI Application\n2. Postal/Email receipt\n\nYours faithfully,\nCitizen`
    onUpdate(r.id, {
      status: 'appealed',
      timeline: [...(r.timeline || []), { at: new Date().toISOString(), text: 'First Appeal Generated', actor: 'assistant' }],
      aiAppeal: appealText
    })
  }

  return (
    <div>
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › Track & Appeal</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">⏰ Track RTI Requests & Generate Appeals</h1>
              <p className="gov-page-sub">Monitor deadline status and generate first appeals for overdue applications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          {/* Overdue section */}
          {overdue.length > 0 && (
            <div style={{ marginBottom: 'var(--sp-6)' }}>
              <div className="tracker-section-header danger">
                <span>🚨</span>
                <h2 className="h2" style={{ color: 'var(--s-danger)' }}>Overdue Applications — Action Required ({overdue.length})</h2>
              </div>
              <div className="notice" style={{ background: 'var(--s-danger-bg)', borderColor: '#FCA5A5', color: 'var(--s-danger)', marginBottom: 'var(--sp-3)' }}>
                ⚠️ These RTI applications have exceeded the 30-day statutory deadline. You are eligible to file a First Appeal under Section 19(1) of the RTI Act.
              </div>
              <div className="list">
                {overdue.map(r => (
                  <div key={r.id} className="tracker-row">
                    <div onClick={() => handleOpenDetail(r.id)} style={{ flex: 1, cursor: 'pointer' }}>
                      <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                    </div>
                    <div className="tracker-actions">
                      <button className="btn saffron" onClick={() => autoAppeal(r)}>⚖️ Generate Appeal</button>
                      <button className="btn ghost" onClick={() => onUpdate(r.id, { status: 'closed' })}>Close</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* At risk section */}
          {atRisk.length > 0 && (
            <div style={{ marginBottom: 'var(--sp-6)' }}>
              <div className="tracker-section-header warning">
                <span>⏰</span>
                <h2 className="h2" style={{ color: 'var(--s-pending)' }}>Approaching Deadline ({atRisk.length})</h2>
              </div>
              <div className="list">
                {atRisk.map(r => (
                  <div key={r.id} onClick={() => handleOpenDetail(r.id)} style={{ cursor: 'pointer' }}>
                    <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All requests */}
          <div>
            <div className="tracker-section-header">
              <span>📋</span>
              <h2 className="h2">All Applications ({enriched.length})</h2>
            </div>
            {enriched.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-icon">📭</div>
                <h3>No Applications Found</h3>
                <p>File your first RTI application using the drafting assistant.</p>
              </div>
            ) : (
              <div className="list">
                {enriched.map(r => (
                  <div key={r.id} onClick={() => handleOpenDetail(r.id)} style={{ cursor: 'pointer' }}>
                    <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside>
          <div className="card">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-4)' }}>📅 RTI Timeline Reference</h2>
            {[
              { label: 'Standard Response', val: '30 Days', color: 'var(--navy)' },
              { label: 'Life & Liberty Cases', val: '48 Hours', color: 'var(--s-danger)' },
              { label: 'Sensitive / 3rd Party Info', val: '45 Days', color: 'var(--s-pending)' },
              { label: 'First Appeal Decision', val: '30 Days', color: 'var(--s-info)' },
              { label: 'Second Appeal at CIC/SIC', val: '90 Days', color: 'var(--s-ok)' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--sp-2) 0', borderBottom: '1px solid var(--border-lt)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--muted)' }}>{t.label}</span>
                <span style={{ fontWeight: 700, color: t.color }}>{t.val}</span>
              </div>
            ))}
          </div>

          <div className="ai-box" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>💡 Pro Tip</strong>
            <p style={{ marginTop: 'var(--sp-2)', fontSize: '0.82rem', lineHeight: 1.6 }}>
              File your First Appeal as soon as the 30-day period expires — don't wait. Early appeals demonstrate proactive enforcement of your rights and create a formal record.
            </p>
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>⚖️ Appeal Process</h2>
            <ol style={{ paddingLeft: 'var(--sp-5)', fontSize: '0.82rem', lineHeight: 1.9 }}>
              <li>No response within 30 days → File First Appeal</li>
              <li>Unsatisfied with response → File First Appeal within 30 days</li>
              <li>First Appeal unsatisfactory → File Second Appeal to CIC/SIC within 90 days</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}
