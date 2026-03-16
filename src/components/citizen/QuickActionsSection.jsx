import { useNavigate } from 'react-router-dom'
import './QuickActionsSection.css'

export default function QuickActionsSection({ onNew, onTrack }) {
  const navigate = useNavigate()

  const handleNewRTI = () => {
    onNew()
    navigate('/draft')
  }

  const handleTrack = () => {
    onTrack()
    navigate('/tracker')
  }

  const navigateTo = (path) => {
    navigate(path)
  }

  return (
    <div className="quick-actions-section">
      <h2 className="section-title">⚡ Quick Actions</h2>
      <div className="actions-grid">
        <button className="action-card" onClick={handleNewRTI}>
          <div className="action-icon">📝</div>
          <div className="action-title">File New RTI Request</div>
          <div className="action-description">Submit a fresh request to any government department</div>
        </button>

        <button className="action-card" onClick={handleTrack}>
          <div className="action-icon">⏱️</div>
          <div className="action-title">Track RTI Status</div>
          <div className="action-description">Check progress and updates on your requests</div>
        </button>

        <button className="action-card" onClick={() => navigateTo('/appeal-first')}>
          <div className="action-icon">🔔</div>
          <div className="action-title">File First Appeal</div>
          <div className="action-description">Appeal if no response within 30 days</div>
        </button>

        <button className="action-card" onClick={() => navigateTo('/applications')}>
          <div className="action-icon">📋</div>
          <div className="action-title">View Responses</div>
          <div className="action-description">Download documents from Public Information Officer</div>
        </button>

        <button className="action-card" onClick={() => navigateTo('/draft-assistant')}>
          <div className="action-icon">🤖</div>
          <div className="action-title">Ask AI Assistant</div>
          <div className="action-description">Get help drafting your RTI request</div>
        </button>

        <button className="action-card" onClick={() => navigateTo('/departments')}>
          <div className="action-icon">🏛️</div>
          <div className="action-title">Departments Directory</div>
          <div className="action-description">Find department info and PIO contact details</div>
        </button>
      </div>
    </div>
  )
}
