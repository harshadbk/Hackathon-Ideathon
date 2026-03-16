import './StatisticsSection.css'

export default function StatisticsSection({ requests = [] }) {
  // Calculate statistics
  const totalFiled = requests.length
  const responded = requests.filter(r => r.status === 'responded').length
  const pending = requests.filter(r => r.status === 'awaiting_response').length
  const resolved = responded
  const appeals = requests.filter(r => r.hasAppeal).length || 0

  return (
    <div className="statistics-section">
      <h2 className="section-title">📊 Your RTI Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📑</div>
          <div className="stat-content">
            <div className="stat-value">{totalFiled}</div>
            <div className="stat-label">Total RTI Filed</div>
            <div className="stat-detail">All requests submitted</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value highlight-orange">{pending}</div>
            <div className="stat-label">Pending Requests</div>
            <div className="stat-detail">Awaiting response</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value highlight-green">{resolved}</div>
            <div className="stat-label">Resolved Requests</div>
            <div className="stat-detail">Response received</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚖️</div>
          <div className="stat-content">
            <div className="stat-value highlight-blue">{appeals}</div>
            <div className="stat-label">Appeals Filed</div>
            <div className="stat-detail">First or Second Appeal</div>
          </div>
        </div>
      </div>
    </div>
  )
}
