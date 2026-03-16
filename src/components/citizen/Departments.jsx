import { useState } from 'react'
import './Departments.css'

const departmentsData = [
  {
    id: 1,
    name: 'Education Department',
    icon: '🎓',
    description: 'Information related to schools, colleges, and educational policies',
    pio: 'Dr. Rajesh Kumar',
    email: 'pio.education@gov.in',
    phone: '+91 98765 43210',
    address: '5th Floor, Education Building, Central City',
    responseTime: '20-30 days',
  },
  {
    id: 2,
    name: 'Health Department',
    icon: '🏥',
    description: 'Healthcare services, hospitals, and medical policies',
    pio: 'Dr. Priya Sharma',
    email: 'pio.health@gov.in',
    phone: '+91 98765 43211',
    address: '3rd Floor, Health Complex, Central City',
    responseTime: '15-25 days',
  },
  {
    id: 3,
    name: 'Revenue Department',
    icon: '💰',
    description: 'Land records, taxes, and financial policies',
    pio: 'Shri Vikram Singh',
    email: 'pio.revenue@gov.in',
    phone: '+91 98765 43212',
    address: '2nd Floor, Revenue Office, Central City',
    responseTime: '20-30 days',
  },
  {
    id: 4,
    name: 'Infrastructure Department',
    icon: '🏗️',
    description: 'Roads, bridges, and infrastructure development projects',
    pio: 'Shri Arjun Patel',
    email: 'pio.infra@gov.in',
    phone: '+91 98765 43213',
    address: '1st Floor, Infrastructure Tower, Central City',
    responseTime: '25-35 days',
  },
  {
    id: 5,
    name: 'Social Welfare Department',
    icon: '🤝',
    description: 'Social schemes, welfare programs, and community services',
    pio: 'Mrs. Anjali Gupta',
    email: 'pio.welfare@gov.in',
    phone: '+91 98765 43214',
    address: 'Ground Floor, Welfare Center, Central City',
    responseTime: '20-30 days',
  },
  {
    id: 6,
    name: 'Environment Department',
    icon: '🌱',
    description: 'Environmental protection, conservation, and pollution control',
    pio: 'Dr. Arun Verma',
    email: 'pio.environment@gov.in',
    phone: '+91 98765 43215',
    address: '4th Floor, Green Building, Central City',
    responseTime: '25-35 days',
  },
]

export default function Departments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState(null)

  const filteredDepts = departmentsData.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="departments">
      <div className="dept-header">
        <h1 className="dept-title">🏛️ Government Departments</h1>
        <p className="dept-subtitle">Find PIO details and contact information for different government departments</p>
      </div>

      {/* Search */}
      <div className="dept-search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search departments by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="dept-grid">
        {filteredDepts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No departments found</h3>
            <p>Try searching with different keywords</p>
          </div>
        ) : (
          filteredDepts.map((dept) => (
            <div key={dept.id} className="dept-card" onClick={() => setSelectedDept(dept)}>
              <div className="dept-card-icon">{dept.icon}</div>
              <h3 className="dept-card-title">{dept.name}</h3>
              <p className="dept-card-description">{dept.description}</p>
              <div className="dept-card-meta">
                <span className="meta-pio">{dept.pio}</span>
                <span className="meta-response">{dept.responseTime}</span>
              </div>
              <button className="view-details-btn">View Details →</button>
            </div>
          ))
        )}
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div className="modal-overlay" onClick={() => setSelectedDept(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDept(null)}>
              ✕
            </button>

            <div className="modal-header">
              <span className="modal-icon">{selectedDept.icon}</span>
              <h2 className="modal-title">{selectedDept.name}</h2>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h4>Overview</h4>
                <p>{selectedDept.description}</p>
              </div>

              <div className="detail-section">
                <h4>Public Information Officer (PIO)</h4>
                <div className="pio-info">
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{selectedDept.pio}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">
                      <a href={`mailto:${selectedDept.email}`}>{selectedDept.email}</a>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">
                      <a href={`tel:${selectedDept.phone}`}>{selectedDept.phone}</a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Office Address</h4>
                <p className="address">{selectedDept.address}</p>
              </div>

              <div className="detail-section">
                <h4>Average Response Time</h4>
                <p className="response-time">{selectedDept.responseTime}</p>
              </div>

              <div className="modal-footer">
                <button className="btn-primary" onClick={() => setSelectedDept(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
