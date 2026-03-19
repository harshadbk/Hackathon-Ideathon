import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FAQ.css'

export default function FAQ({ onBack }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(null)

  const faqs = [
    { cat: 'Basics', q: 'What is the RTI Act?', a: 'The Right to Information Act, 2005 is an Indian law that gives every citizen the right to request and obtain information from public authorities. It covers all levels of government — central, state, and local.' },
    { cat: 'Filing', q: 'How much does it cost to file an RTI?', a: 'The application fee is ₹10/-. It can be paid by Demand Draft, Indian Postal Order, or cash at the PIO\'s office. BPL (Below Poverty Line) card holders are completely exempted from all fees under the RTI Act.' },
    { cat: 'Process', q: 'What if I don\'t get a response within 30 days?', a: 'You can file a First Appeal with the First Appellate Authority (FAA) under Section 19(1). If still unsatisfied, file a Second Appeal with the State or Central Information Commission. This can be done within 90 days of the FAA order.' },
    { cat: 'Basics', q: 'Can I ask for any information?', a: 'No. Certain information is exempt under Section 8, including national security matters, cabinet papers, personal information of individuals that has no public interest, commercially sensitive information, and information received in confidence from foreign governments.' },
    { cat: 'Appeals', q: 'What if my RTI application is rejected?', a: 'You have the right to appeal the rejection. File a First Appeal with the FAA explaining why the information should be disclosed. If the FAA upholds rejection, escalate to the Information Commission. Penalty can be imposed on errant PIOs.' },
    { cat: 'Basics', q: 'Who is a Public Information Officer (PIO)?', a: 'A PIO is the designated officer in each public authority responsible for receiving, processing, and responding to RTI requests within the statutory 30-day period. Every public authority must designate at least one PIO.' },
    { cat: 'Filing', q: 'Can I request information anonymously?', a: 'No. You must provide your name and contact details (address or email) so the PIO can send the response. However, you do not need to provide reasons for seeking the information.' },
    { cat: 'Filing', q: 'How do I find the right department and PIO?', a: 'Think about which government agency or ministry holds the information. Use the National RTI Portal (rti.gov.in) to search departments and their PIOs. Our AI tool also suggests likely departments based on your query.' },
    { cat: 'Process', q: 'Can I use this application for official filing?', a: 'This is a prototype for drafting and tracking your RTI requests. Always verify details and submit through official government RTI portals or by registered post to the concerned PIO for legally valid filing.' },
    { cat: 'Process', q: 'What file formats can I request information in?', a: 'You can request information in various formats — email, PDF, physical documents, spreadsheets, or inspecting records in person. The PIO must provide the information in the format you request, if reasonably practicable.' },
  ]

  const categories = [...new Set(faqs.map(f => f.cat))]

  return (
    <div>
      <div className="gov-page-header">
        <div className="gov-page-header-inner">
          <div className="gov-breadcrumb">Home › Frequently Asked Questions</div>
          <div className="gov-page-title-row">
            <div>
              <h1 className="gov-page-h1">❓ Frequently Asked Questions</h1>
              <p className="gov-page-sub">Get clear answers to common questions about RTI filing and procedures</p>
            </div>
            <button className="btn ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => { onBack(); navigate(-1) }}>← Back</button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 'var(--sp-6)' }}>
              <div className="faq-cat-header">
                <h2 className="h2">{cat}</h2>
              </div>
              {faqs.filter(f => f.cat === cat).map((faq, i) => {
                const key = `${cat}-${i}`
                return (
                  <div key={key} className="faq-item">
                    <button
                      className={`faq-question ${expanded === key ? 'open' : ''}`}
                      onClick={() => setExpanded(expanded === key ? null : key)}
                    >
                      <span>{faq.q}</span>
                      <span className="faq-toggle">{expanded === key ? '−' : '+'}</span>
                    </button>
                    {expanded === key && (
                      <div className="faq-answer">{faq.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          <div className="notice" style={{ marginTop: 'var(--sp-4)' }}>
            <strong>Still have questions?</strong> Contact the Central Information Commission (cic.gov.in) or your State Information Commission for authoritative guidance.
          </div>
        </div>

        <aside>
          <div className="side-panel">
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>📊 Quick Reference</h2>
            {[
              { label: 'Application Fee', val: '₹10/-' },
              { label: 'BPL Fee', val: 'Free' },
              { label: 'Copy Charges', val: '₹2/page' },
              { label: 'Response Time', val: '30 Days' },
              { label: 'Urgency Cases', val: '48 Hours' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--sp-2) 0', borderBottom: '1px solid var(--border-lt)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--muted)' }}>{r.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{r.val}</span>
              </div>
            ))}
          </div>

          <div className="side-panel" style={{ marginTop: 'var(--sp-4)' }}>
            <h2 className="h2" style={{ marginBottom: 'var(--sp-3)' }}>⚖️ Section Reference</h2>
            <div style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'var(--text-2)' }}>
              <div>Section 6 — Filing RTI Application</div>
              <div>Section 7 — Disposal of Request</div>
              <div>Section 8 — Exemptions</div>
              <div>Section 19 — Appeal Procedure</div>
              <div>Section 20 — Penalties for PIOs</div>
            </div>
          </div>

          <div className="notice" style={{ marginTop: 'var(--sp-4)' }}>
            💡 <strong>Tip:</strong> Always cite the RTI Act, 2005 explicitly in your application for formal acknowledgement.
          </div>
        </aside>
      </div>
    </div>
  )
}
