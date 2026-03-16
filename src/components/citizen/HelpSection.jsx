import { useNavigate } from 'react-router-dom'
import './HelpSection.css'

export default function HelpSection() {
  const navigate = useNavigate()

  return (
    <div className="help-section">
      <div className="help-grid">
        <div className="help-card">
          <div className="help-icon">📚</div>
          <h3>How to File RTI?</h3>
          <p>Learn the step-by-step process to file a Right to Information request</p>
          <button className="btn-link" onClick={() => navigate('/faq')}>
            Learn More →
          </button>
        </div>

        <div className="help-card">
          <div className="help-icon">⏰</div>
          <h3>Response Timeline</h3>
          <p>Government has 30 days to respond. First appeal deadline is 90 days from original request</p>
          <button className="btn-link" onClick={() => navigate('/guide')}>
            Read Guide →
          </button>
        </div>

        <div className="help-card">
          <div className="help-icon">🔔</div>
          <h3>Stay Updated</h3>
          <p>Get notified when your requests receive responses or deadlines are approaching</p>
          <button className="btn-link" onClick={() => navigate('/notifications')}>
            View Notifications →
          </button>
        </div>
      </div>
    </div>
  )
}
