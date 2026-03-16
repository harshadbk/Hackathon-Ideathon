import { useNavigate } from 'react-router-dom'
import RequestCard from '../RequestCard'
import './RecentRequestsSection.css'

export default function RecentRequestsSection({ requests = [], onNew, onOpen }) {
  const navigate = useNavigate()
  
  const recent = requests.slice(0, 6)

  const handleOpenDetail = (id) => {
    onOpen(id)
    navigate(`/detail/${id}`)
  }

  const handleNewRTI = () => {
    onNew()
    navigate('/draft')
  }

  return (
    <div className="recent-section">
      <div className="recent-header">
        <h2 className="section-title">📋 Recent Requests</h2>
        <button className="btn-link" onClick={() => navigate('/applications')}>
          View All →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No RTI Requests Yet</h3>
          <p>Start your RTI journey by filing your first request</p>
          <button className="btn btn-primary" onClick={handleNewRTI}>
            File Your First RTI Request
          </button>
        </div>
      ) : (
        <div className="requests-list">
          {recent.map(r => (
            <RequestCard key={r.id} request={r} onOpen={() => handleOpenDetail(r.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
