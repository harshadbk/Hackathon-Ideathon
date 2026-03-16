import { useState } from 'react'
import './RTIHistory.css'

export default function RTIHistory({ requests = [], onOpen, user }) {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter to show only responded or rejected requests
  const completedRequests = requests.filter(
    (req) => req.status === 'responded' || req.status === 'rejected'
  )

  const filteredRequests = completedRequests.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter
    const matchesSearch =
      req.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: completedRequests.length,
    responded: completedRequests.filter((r) => r.status === 'responded').length,
    rejected: completedRequests.filter((r) => r.status === 'rejected').length,
  }

  const getStatusColor = (status) => {
    const colors = {
      responded: '#22c55e',
      rejected: '#ef4444',
    }
    return colors[status] || '#64748b'
  }

  const getStatusIcon = (status) => {
    const icons = {
      responded: '✅',
      rejected: '❌',
    }
    return icons[status] || '📋'
  }

  return (
    <div className="rti-history">
      <div className="component-back-section">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      <div className="rti-history-header">
        <div className="rti-history-title-section">
          <h1 className="rti-history-title">📚 RTI History</h1>
          <p className="rti-history-subtitle">
            View all your completed RTI requests (responded or rejected)
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="rti-history-stats">
        <div className="stat-card total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Completed</div>
        </div>
        <div className="stat-card responded">
          <div className="stat-value">{stats.responded}</div>
          <div className="stat-label">Responded</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-value">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rti-history-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by subject or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'responded' ? 'active' : ''}`}
            onClick={() => setFilter('responded')}
          >
            Responded
          </button>
          <button
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="rti-history-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No history found</h3>
            <p>
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Your completed RTI requests will appear here'}
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="history-card">
              <div className="history-card-header">
                <div className="history-card-title-section">
                  <span className="status-icon">{getStatusIcon(req.status)}</span>
                  <h3 className="history-card-subject">
                    {req.subject || req.title}
                  </h3>
                  <span className="history-card-id">#{req.id.slice(-6)}</span>
                </div>
                <span
                  className="history-card-status"
                  style={{
                    backgroundColor: getStatusColor(req.status),
                  }}
                >
                  {req.status?.charAt(0).toUpperCase() + req.status?.slice(1)}
                </span>
              </div>

              <div className="history-card-meta">
                <div className="meta-item">
                  <span className="meta-label">Department:</span>
                  <span className="meta-value">{req.department || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">PIO:</span>
                  <span className="meta-value">{req.pio || 'N/A'}</span>
                </div>
              </div>

              <div className="history-card-dates">
                <div className="date-item">
                  <span className="date-label">Filed on:</span>
                  <span className="date-value">
                    {req.createdAt
                      ? new Date(req.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
                {req.respondedAt && (
                  <div className="date-item">
                    <span className="date-label">
                      {req.status === 'responded' ? 'Responded on:' : 'Rejected on:'}
                    </span>
                    <span className="date-value">
                      {new Date(req.respondedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="history-card-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => onOpen?.(req.id)}
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
