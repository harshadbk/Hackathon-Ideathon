import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DraftAssistant.css'

const DEPT_MAP = [
  { q: ['school','education','student','teacher'], dept: 'Department of School Education', pio: 'PIO, District Education Office' },
  { q: ['water','sewer','drain','municipal'], dept: 'Municipal Water Department', pio: 'PIO, Municipal Corporation' },
  { q: ['contract','tender','procurement','vendor'], dept: 'Public Works / Procurement', pio: 'PIO, Procurement Cell' },
  { q: ['land','property','revenue'], dept: 'Land Revenue Department', pio: 'PIO, Revenue Office' },
  { q: ['hospital','health','doctor','medicine','nurse'], dept: 'Department of Health & Family Welfare', pio: 'PIO, District Health Office' },
  { q: ['police','fir','crime','arrest'], dept: 'Home Department / Police', pio: 'PIO, Superintendent of Police' },
  { q: ['road','bridge','highway','construction'], dept: 'Public Works Department', pio: 'PIO, PWD Office' },
  { q: ['pension','retirement','ppo'], dept: 'Department of Pension & Pensioners Welfare', pio: 'PIO, Pension Disbursing Office' },
]

function suggestDept(text) {
  const t = text.toLowerCase()
  for (const m of DEPT_MAP) {
    if (m.q.some(k => t.includes(k))) return m
  }
  return { dept: 'State Public Authority', pio: 'PIO (State Authority)' }
}

export default function DraftAssistant({ onSubmit, onBack }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [topic, setTopic] = useState('')
  const suggested = useMemo(() => suggestDept(topic || ''), [topic])
  const [department, setDepartment] = useState('')
  const [pio, setPio] = useState('')
  const [draft, setDraft] = useState('')

  function generateDraft() {
    const base = topic || 'Information requested'
    const d = `Dear Sir/Madam,\n\nUnder the Right to Information Act, 2005, I hereby request the following information:\n\n${base}\n\nPlease provide the information in PDF/email format where available. If any fees are applicable, kindly inform me in writing before proceeding.\n\nI am enclosing the prescribed fee of ₹10/- herewith.\n\nThank you,\nCitizen`
    setDraft(d)
    setDepartment(department || suggested.dept)
    setPio(pio || suggested.pio)
    setStep(3)
  }

  function improveDraft() {
    setDraft(s => s + `\n\n[✓ AI Improved] Added specific reference to RTI Act sections and requested information formats. Ensure all points are clearly enumerated.`)
  }

  function submit() {
    const payload = {
      title: topic.split('\n')[0].substring(0, 60) || 'RTI Request',
      department: department || suggested.dept,
      pio: pio || suggested.pio,
      deadlineDays: 30,
      status: 'awaiting_response',
      aiDraft: draft,
      timeline: [{ at: new Date().toISOString(), text: 'RTI Filed', actor: 'citizen' }]
    }
    onSubmit(payload)
    navigate('/dashboard')
  }

  return (
    <div>
      {/* Page header */}
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › File RTI Application</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">✍️ RTI Drafting Assistant</h1>
              <p className="gov-page-sub">Step-by-step AI guidance for writing your RTI request under the RTI Act, 2005</p>
            </div>
            <button className="btn ghost" style={{color:'rgba(255,255,255,0.8)', borderColor:'rgba(255,255,255,0.3)'}} onClick={() => { onBack(); navigate('/dashboard') }}>← Back to Dashboard</button>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="da-steps-bar">
        <div className={`da-step-item ${step >= 1 ? 'active' : ''}`}>
          <div className="da-step-num">1</div>
          <div className="da-step-label">Describe Your Request</div>
        </div>
        <div className="da-step-line"></div>
        <div className={`da-step-item ${step >= 3 ? 'active' : ''}`}>
          <div className="da-step-num">2</div>
          <div className="da-step-label">Review & Submit</div>
        </div>
      </div>

      {step === 1 && (
        <div className="grid">
          <div className="card">
            <div className="card-inner-header">
              <h2 className="h2">📝 Describe What You Need</h2>
              <p className="small-muted">Write in plain language — our AI will help format it into an official RTI request</p>
            </div>
            <div style={{ marginTop: 'var(--sp-4)' }}>
              <label>What information do you want to request? (write in simple, plain language)</label>
              <textarea
                className="field"
                rows={7}
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. I want copies of the school budget allocation for 2024 including grants received and how they were spent..."
              />
              <div className="flex-row" style={{ marginTop: 'var(--sp-3)' }}>
                <button className="btn" onClick={generateDraft} disabled={!topic.trim()}>Generate RTI Draft →</button>
                <button className="btn ghost" onClick={() => setTopic('Copy of school development grants and utilization certificates for FY 2024 including contractor details and completion status')}>Load Example</button>
              </div>
            </div>

            {topic.trim() && (
              <div className="ai-box" style={{ marginTop: 'var(--sp-5)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--sp-3)' }}>🤖 AI Department Suggestion</div>
                <div style={{ fontWeight: 600 }}>{suggested.dept}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 4 }}>{suggested.pio}</div>
                <div style={{ fontSize: '0.75rem', marginTop: 'var(--sp-2)', color: 'var(--navy-2)' }}>
                  ℹ Based on keywords detected in your request. You can change this in the next step.
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="side-panel">
              <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>💡 Tips for Effective RTI Requests</h2>
              <ul style={{ paddingLeft: 'var(--sp-4)', fontSize: '0.82rem', lineHeight: 1.9 }}>
                <li>Be specific about dates and periods</li>
                <li>Use clear, simple language</li>
                <li>Request specific document formats</li>
                <li>One topic per RTI application</li>
                <li>Avoid seeking opinions or judgements</li>
                <li>Include reference numbers if known</li>
              </ul>
            </div>
            <div className="notice">
              <strong>📌 Note:</strong> You cannot request personal information about others. Information affecting national security may be exempt.
            </div>
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="grid">
          <div>
            <div className="card">
              <div className="card-inner-header">
                <h2 className="h2">🏢 Department & PIO Details</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)' }}>
                <div>
                  <label>Addressed To — Department / Authority</label>
                  <input className="field" value={department || suggested.dept} onChange={e => setDepartment(e.target.value)} />
                </div>
                <div>
                  <label>Public Information Officer (PIO)</label>
                  <input className="field" value={pio || suggested.pio} onChange={e => setPio(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-inner-header">
                <h2 className="h2">📄 Your RTI Application Draft</h2>
                <p className="small-muted">Review and edit before submission. This is the formal RTI text.</p>
              </div>
              <textarea className="field" rows={12} value={draft} onChange={e => setDraft(e.target.value)} style={{ marginTop: 'var(--sp-4)', fontFamily: 'var(--mono)', fontSize: '0.85rem', lineHeight: 1.7 }} />
              <div className="flex-row" style={{ marginTop: 'var(--sp-4)', flexWrap: 'wrap' }}>
                <button className="btn" onClick={improveDraft}>🤖 AI Improve</button>
                <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(draft)}>📋 Copy Text</button>
                <button className="btn saffron" onClick={submit}>📤 Submit RTI Application</button>
                <button className="btn ghost" onClick={() => setStep(1)}>← Edit Topic</button>
              </div>
            </div>

            <div className="notice" style={{ marginTop: 'var(--sp-3)' }}>
              ℹ️ After submission, the portal will track your 30-day deadline and alert you if no response is received. You can generate a First Appeal automatically.
            </div>
          </div>

          <aside>
            <div className="side-panel">
              <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>📋 Next Steps</h2>
              <ol style={{ paddingLeft: 'var(--sp-5)', fontSize: '0.82rem', lineHeight: 1.9 }}>
                <li>Review the drafted application</li>
                <li>Download or copy the text</li>
                <li>Send to the designated PIO by post or email</li>
                <li>Attach payment of ₹10/- (DD, PO or cash)</li>
                <li>Track your 30-day deadline here</li>
                <li>File First Appeal if no response</li>
              </ol>
            </div>
            <div className="ai-box">
              <strong>📋 Drafting For:</strong>
              <div style={{ fontSize: '0.82rem', marginTop: 'var(--sp-2)', fontWeight: 600 }}>{topic.substring(0, 60)}{topic.length > 60 ? '...' : ''}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 'var(--sp-1)' }}>Dept: {department || suggested.dept}</div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
