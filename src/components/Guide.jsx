import { useNavigate } from 'react-router-dom'
import './Guide.css'

export default function Guide({ onBack }) {
  const navigate = useNavigate()
  return (
    <div>
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › RTI Guide & Resources</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">📚 RTI Guide & Resources</h1>
              <p className="gov-page-sub">Learn how to file Right to Information requests effectively under the RTI Act, 2005</p>
            </div>
            <button className="btn ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => { onBack(); navigate(-1) }}>← Back</button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 'var(--sp-3)' }}>📋 What is the RTI Act?</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--text-2)' }}>
              The Right to Information (RTI) Act, 2005 is a landmark legislation that empowers every Indian citizen to request information from public authorities. It promotes transparency and accountability in governance by making government processes open to public scrutiny.
            </p>
          </div>

          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 'var(--sp-5)' }}>✅ Step-by-Step Filing Process</h2>
            {[
              { step: '01', title: 'Identify the Correct Authority', desc: 'Determine which government department or agency holds the information you need. Use the National RTI Portal to find the correct PIO.' },
              { step: '02', title: 'Prepare Your Request', desc: 'Write a clear, specific request in plain language. Describe exactly what information you need, including relevant dates, reference numbers, and period.' },
              { step: '03', title: 'Pay the Prescribed Fee', desc: 'Pay the application fee of ₹10/- by Demand Draft, Indian Postal Order, or cash. BPL card holders are exempted from all fees.' },
              { step: '04', title: 'Submit to the PIO', desc: 'Submit your application to the designated Public Information Officer (PIO) by registered post, email, or in person. Obtain an acknowledgement.' },
              { step: '05', title: 'Track & Follow Up', desc: 'Monitor your 30-day deadline. If no response, file a First Appeal. If still unsatisfied, escalate to the State/Central Information Commission.' },
            ].map((s, i) => (
              <div key={i} className="guide-step">
                <div className="guide-step-num">{s.step}</div>
                <div className="guide-step-body">
                  <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, color: 'var(--navy)', marginBottom: 'var(--sp-2)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 'var(--sp-4)' }}>⏰ Key Deadlines Under RTI Act</h2>
            {[
              { label: 'Standard Response Period', val: '30 Days', note: 'From date of receipt of application' },
              { label: 'Life & Liberty Cases', val: '48 Hours', note: 'For information relating to life or personal liberty' },
              { label: 'Information via 3rd Party', val: '45 Days', note: 'When 3rd party consultation is required' },
              { label: 'First Appeal Deadline', val: '30 Days', note: 'From date of response or expiry of original deadline' },
              { label: 'First Appellate Decision', val: '30–45 Days', note: 'FAA must decide within 30 days (max 45)' },
              { label: 'Second Appeal at CIC/SIC', val: '90 Days', note: 'From date of FAA order' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--sp-4)', alignItems: 'start', padding: 'var(--sp-4) 0', borderBottom: '1px solid var(--border-lt)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{d.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 2 }}>{d.note}</div>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{d.val}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 'var(--sp-4)' }}>💡 Tips for Success</h2>
            <ul style={{ paddingLeft: 'var(--sp-5)', lineHeight: 2, fontSize: '0.875rem', color: 'var(--text-2)' }}>
              <li><strong>Be Specific:</strong> Include dates, reference numbers, and precise details</li>
              <li><strong>One Topic Per RTI:</strong> Keep requests focused and narrow in scope</li>
              <li><strong>Simple Language:</strong> Use plain language, not legal jargon</li>
              <li><strong>Keep Records:</strong> Save all copies and correspondence with receipts</li>
              <li><strong>Get Receipts:</strong> Obtain proof of submission with date and time</li>
              <li><strong>File Appeals Promptly:</strong> Don't delay — appeal as soon as deadline passes</li>
            </ul>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--s-danger)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--s-danger)', marginBottom: 'var(--sp-4)' }}>❌ Common Mistakes to Avoid</h2>
            <ul style={{ paddingLeft: 'var(--sp-5)', lineHeight: 2, fontSize: '0.875rem', color: 'var(--text-2)' }}>
              <li>Asking for personal information about other individuals</li>
              <li>Filing vague or excessively broad requests</li>
              <li>Not explicitly mentioning the RTI Act, 2005</li>
              <li>Giving up after a first denial or partial response</li>
              <li>Submitting to the wrong department or PIO</li>
              <li>Missing appeal windows due to delayed action</li>
            </ul>
          </div>
        </div>

        <aside>
          <div className="side-panel">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>📞 Official RTI Resources</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', fontSize: '0.82rem' }}>
              <a href="https://rti.gov.in/" target="_blank" rel="noopener noreferrer" className="guide-link">📎 National RTI Portal (rti.gov.in)</a>
              <a href="https://www.dopt.gov.in/" target="_blank" rel="noopener noreferrer" className="guide-link">📎 Dept. of Personnel & Training</a>
              <a href="https://cic.gov.in/" target="_blank" rel="noopener noreferrer" className="guide-link">📎 Central Information Commission</a>
              <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" className="guide-link">📎 RTI Online Portal</a>
            </div>
          </div>
          <div className="ai-box" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>🤖 Use This Tool To:</strong>
            <ul style={{ marginTop: 'var(--sp-3)', paddingLeft: 'var(--sp-4)', fontSize: '0.82rem', lineHeight: 1.9 }}>
              <li>Draft requests in plain language</li>
              <li>Auto-detect correct department</li>
              <li>Track 30-day deadlines</li>
              <li>Generate First Appeals</li>
            </ul>
          </div>
          <div className="notice" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>Disclaimer:</strong> This is a prototype tool. Always verify with official government RTI portals. Consult an RTI advocate for complex cases.
          </div>
        </aside>
      </div>
    </div>
  )
}
