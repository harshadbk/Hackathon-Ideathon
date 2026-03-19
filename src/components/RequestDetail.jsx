import { useNavigate } from 'react-router-dom'
import './RequestDetail.css'

function daysLeft(createdAt, deadlineDays = 30) {
  const created = new Date(createdAt)
  const deadline = new Date(created.getTime() + deadlineDays * 24 * 3600 * 1000)
  return Math.ceil((deadline - new Date()) / (24 * 3600 * 1000))
}

export default function RequestDetail({ request, onBack, onUpdate }) {
  const navigate = useNavigate()
  if (!request) return <div className="card" style={{ margin: 'var(--sp-6)' }}>No request selected.</div>

  const left = daysLeft(request.createdAt, request.deadlineDays)
  const isLate = left < 0 && request.status === 'awaiting_response'
  const deadline = new Date(new Date(request.createdAt).getTime() + request.deadlineDays * 24 * 3600 * 1000)

  function simulatePIOReply() {
    onUpdate(request.id, {
      status: 'responded',
      timeline: [...(request.timeline || []), { at: new Date().toISOString(), text: 'Response Received (Mock)', actor: 'PIO' }]
    })
  }

  function generateAppeal() {
    const appeal = request.aiAppeal || `FIRST APPEAL UNDER SECTION 19(1) OF THE RTI ACT, 2005\n\nTo,\nThe First Appellate Authority,\n${request.department}\n\nSubject: First Appeal against non-response to RTI Application dated ${new Date(request.createdAt).toLocaleDateString()}\n\nRequest: ${request.title}\n\nThe statutory period of 30 days has elapsed. Please treat this as a formal First Appeal and direct the PIO to provide the required information.\n\nYours faithfully,\nCitizen`
    onUpdate(request.id, {
      status: 'appealed',
      aiAppeal: appeal,
      timeline: [...(request.timeline || []), { at: new Date().toISOString(), text: 'First Appeal Generated', actor: 'assistant' }]
    })
  }

  function downloadDraft() {
    const content = `RTI APPLICATION\n${'='.repeat(60)}\n\nApplication Reference: ${request.id}\nDepartment: ${request.department}\nPublic Information Officer: ${request.pio}\nDate Filed: ${new Date(request.createdAt).toLocaleDateString()}\nDeadline: ${deadline.toLocaleDateString()}\nStatus: ${request.status}\n\n${'='.repeat(60)}\nAPPLICATION TEXT\n${'='.repeat(60)}\n\n${request.aiDraft}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `RTI-Application-${request.id}.txt`
    document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  const statusColors = {
    awaiting_response: isLate ? '#DC2626' : '#D97706',
    responded: '#059669',
    appealed: '#0369A1',
    closed: '#6B7280',
  }
  const statusColor = statusColors[request.status] || '#6B7280'

  return (
    <div>
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › Dashboard › Application Detail</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">Application Detail</h1>
              <p className="gov-page-sub" style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>{request.id} — {request.department}</p>
            </div>
            <button className="btn ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => { onBack(); navigate(-1) }}>← Back</button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          {/* Summary card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--sp-5)', paddingBottom: 'var(--sp-5)', borderBottom: '1px solid var(--border-lt)' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--navy)', marginBottom: 'var(--sp-2)' }}>{request.title}</h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                  <span>🏢 {request.department}</span>
                  <span style={{ margin: '0 var(--sp-3)' }}>•</span>
                  <span>{request.pio}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 700, color: statusColor, lineHeight: 1 }}>
                  {isLate ? `${Math.abs(left)}d Overdue` : `${left}d Left`}
                </div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: statusColor, fontWeight: 600, marginTop: 4 }}>{request.status.replace('_', ' ')}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-4)' }}>
              {[
                { label: 'Date Filed', val: new Date(request.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) },
                { label: 'Response Deadline', val: deadline.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) },
                { label: 'Deadline Period', val: `${request.deadlineDays} Days` },
              ].map((f, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>{f.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RTI Draft */}
          <div className="card">
            <div className="card-inner-header">
              <h2 className="h2">📄 RTI Application Text</h2>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--border-lt)', borderRadius: 'var(--r-sm)', padding: 'var(--sp-5)', marginTop: 'var(--sp-4)', whiteSpace: 'pre-wrap', fontFamily: 'var(--mono)', fontSize: '0.84rem', lineHeight: 1.7 }}>
              {request.aiDraft}
            </div>
            <div className="flex-row" style={{ marginTop: 'var(--sp-4)', flexWrap: 'wrap' }}>
              <button className="btn" onClick={downloadDraft}>📥 Download .txt</button>
              <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(request.aiDraft || '')}>📋 Copy Text</button>
              {request.status === 'awaiting_response' && (
                <button className="btn ghost" onClick={simulatePIOReply}>🔁 Mock PIO Response</button>
              )}
              {isLate && request.status === 'awaiting_response' && (
                <button className="btn saffron" onClick={generateAppeal}>⚖️ Generate First Appeal</button>
              )}
            </div>
          </div>

          {/* Generated Appeal */}
          {request.aiAppeal && (
            <div className="card">
              <div className="card-inner-header">
                <h2 className="h2">⚖️ Generated First Appeal</h2>
                <p className="small-muted">Auto-generated under Section 19(1) of the RTI Act, 2005</p>
              </div>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--r-sm)', padding: 'var(--sp-5)', marginTop: 'var(--sp-4)', whiteSpace: 'pre-wrap', fontFamily: 'var(--mono)', fontSize: '0.84rem', lineHeight: 1.7 }}>
                {request.aiAppeal}
              </div>
              <div className="flex-row" style={{ marginTop: 'var(--sp-4)' }}>
                <button className="btn" onClick={() => {
                  const blob = new Blob([request.aiAppeal], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url; a.download = `First-Appeal-${request.id}.txt`
                  document.body.appendChild(a); a.click(); a.remove()
                  URL.revokeObjectURL(url)
                }}>📥 Download Appeal</button>
                <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(request.aiAppeal)}>📋 Copy</button>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="card">
            <div className="card-inner-header">
              <h2 className="h2">📅 Application Timeline</h2>
            </div>
            <div className="timeline" style={{ marginTop: 'var(--sp-4)' }}>
              {(request.timeline || []).map((t, i) => (
                <div className="item" key={i}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)' }}>{t.text}</div>
                    <div className="small-muted">{new Date(t.at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  </div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', fontWeight: 600, flexShrink: 0 }}>{t.actor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-4)' }}>⚙️ Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <button className="btn ghost w-full" onClick={() => onUpdate(request.id, { status: 'closed' })}>✗ Mark as Closed</button>
              <button className="btn ghost w-full" onClick={() => {
                const t = prompt('Edit title:', request.title)
                if (t) onUpdate(request.id, { title: t })
              }}>✏ Edit Title</button>
            </div>
          </div>

          <div className="notice" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>📌 Reminder:</strong> You have {request.deadlineDays} days from the date of filing to receive a response from the PIO.
          </div>

          <div className="ai-box" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>💡 Next Steps</strong>
            <ol style={{ marginTop: 'var(--sp-2)', paddingLeft: 'var(--sp-4)', fontSize: '0.82rem', lineHeight: 1.9 }}>
              <li>Download and print this application</li>
              <li>Send by registered post to PIO</li>
              <li>Keep acknowledgement receipt</li>
              <li>Track 30-day deadline here</li>
              <li>Generate appeal if no response</li>
            </ol>
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>🔗 Useful Links</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', fontSize: '0.82rem' }}>
              <a href="https://rti.gov.in/" target="_blank" rel="noopener noreferrer">📎 National RTI Portal</a>
              <a href="https://cic.gov.in/" target="_blank" rel="noopener noreferrer">📎 Central Information Commission</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
