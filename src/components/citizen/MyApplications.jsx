import { useState } from 'react'
import './MyApplications.css'

export default function MyApplications({ requests = [], onOpen, user }) {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter
    const matchesSearch =
      req.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    responded: requests.filter((r) => r.status === 'responded').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f97316',
      responded: '#22c55e',
      rejected: '#ef4444',
    }
    return colors[status] || '#64748b'
  }

  return (
    <div className="my-applications">
      <div className="component-back-section">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      <div className="my-app-header">
        <div className="my-app-title-section">
          <h1 className="my-app-title">📋 My Applications</h1>
          <p className="my-app-subtitle">Track and manage all your RTI requests in one place</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="my-app-stats">
        <div className="stat-card total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
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
      <div className="my-app-controls">
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
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
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

      {/* Applications List */}
      <div className="my-app-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No applications found</h3>
            <p>
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Start by filing a new RTI request'}
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="app-card">
              <div className="app-card-header">
                <div className="app-card-title-section">
                  <h3 className="app-card-subject">{req.subject}</h3>
                  <span className="app-card-id">#{req.id.slice(-6)}</span>
                </div>
                <span
                  className="app-card-status"
                  style={{
                    backgroundColor: getStatusColor(req.status),
                  }}
                >
                  {req.status?.charAt(0).toUpperCase() + req.status?.slice(1)}
                </span>
              </div>

              <div className="app-card-meta">
                <div className="meta-item">
                  <span className="meta-label">Department:</span>
                  <span className="meta-value">{req.department || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Filed on:</span>
                  <span className="meta-value">
                    {req.createdAt
                      ? new Date(req.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="app-card-description">{req.description?.substring(0, 100)}...</div>

              <div className="app-card-footer">
                <button className="btn-view" onClick={() => onOpen(req.id)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
