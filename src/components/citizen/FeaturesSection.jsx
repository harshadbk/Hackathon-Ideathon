import './FeaturesSection.css'

export default function FeaturesSection() {
  return (
    <div className="features-section">
      <h2 className="section-title">✨ Key Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">✍️</div>
          <div className="feature-title">Plain Language</div>
          <div className="feature-description">Write in simple terms without legal jargon</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <div className="feature-title">AI Suggestions</div>
          <div className="feature-description">Get intelligent suggestions for departments</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <div className="feature-title">Deadline Tracker</div>
          <div className="feature-description">Never miss an important deadline</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📤</div>
          <div className="feature-title">Auto-Appeals</div>
          <div className="feature-description">Generate appeals when responses are overdue</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <div className="feature-title">Full Analytics</div>
          <div className="feature-description">Comprehensive tracking and statistics</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <div className="feature-title">Secure Storage</div>
          <div className="feature-description">All data is safely saved locally</div>
        </div>
      </div>
    </div>
  )
}
