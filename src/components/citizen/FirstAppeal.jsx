import { useState, useEffect } from 'react'
import './FirstAppeal.css'

export default function FirstAppeal({ requests = [], onSubmit, onBack, user = {} }) {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [formData, setFormData] = useState({
    applicantName: user?.name || '',
    email: user?.email || '',
    mobile: user?.phone || '',
    originalRequestId: '',
    appealReason: '',
    appealDescription: '',
    expectedOutcome: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [delayedRequests, setDelayedRequests] = useState([])

  // Auto-detect delayed requests (>30 days without response)
  useEffect(() => {
    const today = new Date()
    const delayed = requests.filter((req) => {
      const filedDate = new Date(req.filedDate)
      const daysPassed = Math.floor((today - filedDate) / (1000 * 60 * 60 * 24))
      return daysPassed > 30 && (req.status === 'pending' || req.status === 'acknowledged')
    })
    setDelayedRequests(delayed)
  }, [requests])

  // AI Logic: Auto-generate appeal description based on request
  const generateAppealText = (request, reason) => {
    if (!request) return ''

    const daysPassed = Math.floor(
      (new Date() - new Date(request.filedDate)) / (1000 * 60 * 60 * 24)
    )

    let appealText = ''

    if (reason === 'no-response' || daysPassed > 30) {
      appealText = `This is to formally lodge an appeal under Section 19 of the Right to Information Act, 2005.

I had filed an RTI request (ID: ${request.id}) on ${new Date(request.filedDate).toLocaleDateString()} seeking information regarding: "${request.subject}"

It has been ${daysPassed} days since the filing of the request, which exceeds the statutory period of 30 days prescribed under Section 7 of the RTI Act. Despite the passage of this period, no response or acknowledgement has been received from the PIO (Public Information Officer) of the ${request.department} Department.

This delay is a clear violation of the statutory requirements and the right to information of the citizen. The failure to provide a response within the prescribed timeframe is an act of non-compliance with the RTI Act.

I hereby appeal to the First Appellate Authority to:
1. Direct the PIO to furnish the requested information immediately
2. Direct the PIO to provide reasons for the unjustified delay
3. Take appropriate action against the concerned Public Information Officer for non-compliance with the RTI Act

Looking forward to your prompt action on this critical matter.`
    } else if (reason === 'rejection') {
      appealText = `This is to formally lodge an appeal against the rejection of my RTI request (ID: ${request.id}) filed on ${new Date(request.filedDate).toLocaleDateString()}.

I had requested information regarding: "${request.subject}" from the ${request.department} Department.

The request was rejected by the Public Information Officer. This rejection appears to be unjustified and contrary to the provisions of the Right to Information Act, 2005. The reasons provided do not justify the outright rejection of the request.

I appeal to the First Appellate Authority to:
1. Set aside the rejection order
2. Direct the PIO to provide the requested information
3. Provide me with detailed reasons for the decision

Your favorable action would be highly appreciated.`
    } else if (reason === 'incomplete') {
      appealText = `This is to lodge an appeal regarding the incomplete and inadequate response to my RTI request (ID: ${request.id}) filed on ${new Date(request.filedDate).toLocaleDateString()}.

I had requested information regarding: "${request.subject}" from the ${request.department} Department.

The information provided in response does not comprehensively address my request. Several critical aspects of my query remain unanswered, and the response appears to be partial and insufficient.

I request the First Appellate Authority to:
1. Direct the PIO to provide complete and comprehensive information
2. Clarify the information that was omitted in the initial response
3. Provide reasons for any information not disclosed

I trust the matter will be resolved promptly.`
    }

    return appealText
  }

  const handleRequestSelect = (requestId) => {
    const request = requests.find((r) => r.id === requestId)
    setSelectedRequest(request)
    setFormData((prev) => ({
      ...prev,
      originalRequestId: requestId,
    }))
    setShowReview(true)

    // Auto-detect best appeal reason
    const daysPassed = Math.floor(
      (new Date() - new Date(request.filedDate)) / (1000 * 60 * 60 * 24)
    )
    let reason = 'no-response'
    if (daysPassed > 30 && (request.status === 'pending' || request.status === 'acknowledged')) {
      reason = 'no-response'
    } else if (request.status === 'rejected') {
      reason = 'rejection'
    } else if (request.status === 'responded' && request.description) {
      reason = 'incomplete'
    }

    setFormData((prev) => ({
      ...prev,
      appealReason: reason,
      appealDescription: generateAppealText(request, reason),
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReasonChange = (reason) => {
    setFormData((prev) => ({
      ...prev,
      appealReason: reason,
      appealDescription: generateAppealText(selectedRequest, reason),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSelectedRequest(null)
      setShowReview(false)
      setFormData({
        applicantName: user?.name || '',
        email: user?.email || '',
        mobile: user?.phone || '',
        originalRequestId: '',
        appealReason: '',
        appealDescription: '',
        expectedOutcome: '',
      })
    }, 3000)
  }

  return (
    <div className="first-appeal">
      <div className="component-back-section">
        <button className="back-btn" onClick={() => {
          setShowReview(false)
          setSelectedRequest(null)
        }}>
          ← Back
        </button>
      </div>

      <div className="appeal-header">
        <h1 className="appeal-title">🔔 File First Appeal</h1>
        <p className="appeal-subtitle">
          Smart appeal filing tool - automatically detects delayed responses and generates appeals
        </p>
      </div>

      {!showReview ? (
        <>
          {/* Auto-Detected Delayed Requests */}
          {delayedRequests.length > 0 && (
            <div className="auto-detected-section">
              <div className="alert-banner delayed">
                <span className="alert-icon">⚠️</span>
                <div>
                  <h3>Delayed Requests Detected</h3>
                  <p>
                    We found {delayedRequests.length} request(s) that exceed the 30-day response
                    period. You can file an appeal for delayed response.
                  </p>
                </div>
              </div>

              <div className="delayed-requests">
                {delayedRequests.map((req) => {
                  const daysPassed = Math.floor(
                    (new Date() - new Date(req.filedDate)) / (1000 * 60 * 60 * 24)
                  )
                  return (
                    <div key={req.id} className="delayed-request-card">
                      <div className="card-header">
                        <h4>{req.subject}</h4>
                        <span className="delay-badge">{daysPassed} days delayed</span>
                      </div>
                      <p className="card-dept">Department: {req.department}</p>
                      <p className="card-date">Filed: {new Date(req.filedDate).toLocaleDateString()}</p>
                      <button
                        className="btn-appeal-auto"
                        onClick={() => handleRequestSelect(req.id)}
                      >
                        Review & File Appeal 📝
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Manual Selection */}
          {delayedRequests.length === 0 && (
            <div className="manual-selection-section">
              <h3 className="section-title">Select Request to Appeal</h3>
              <p className="section-subtitle">Choose any of your RTI requests to file an appeal</p>

              <div className="requests-list">
                {requests.length === 0 ? (
                  <div className="empty-state">
                    <p>No RTI requests found. Please file a request first.</p>
                  </div>
                ) : (
                  requests.map((req) => {
                    const daysPassed = Math.floor(
                      (new Date() - new Date(req.filedDate)) / (1000 * 60 * 60 * 24)
                    )
                    return (
                      <div key={req.id} className="request-item">
                        <div className="item-info">
                          <h4>{req.subject}</h4>
                          <p>
                            {req.department} • Filed{' '}
                            {new Date(req.filedDate).toLocaleDateString()} • Status:{' '}
                            <span className="status-badge">{req.status}</span>
                          </p>
                          <p className="days-info">
                            {daysPassed} days passed {daysPassed > 30 ? '⚠️ Overdue' : ''}
                          </p>
                        </div>
                        <button
                          className="btn-select-appeal"
                          onClick={() => handleRequestSelect(req.id)}
                        >
                          Appeal →
                        </button>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </>
      ) : selectedRequest ? (
        <>
          {/* Review & Edit Section */}
          <div className="review-section">
            <h3 className="review-title">Review Your Request & Appeal</h3>

            {/* Original Request Details */}
            <div className="request-details-box">
              <h4 className="box-title">📋 Original RTI Request Details</h4>
              <div className="details-grid">
                <div className="detail-row">
                  <label>Request ID:</label>
                  <span>{selectedRequest.id}</span>
                </div>
                <div className="detail-row">
                  <label>Subject:</label>
                  <span>{selectedRequest.subject}</span>
                </div>
                <div className="detail-row">
                  <label>Department:</label>
                  <span>{selectedRequest.department}</span>
                </div>
                <div className="detail-row">
                  <label>Filed Date:</label>
                  <span>{new Date(selectedRequest.filedDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <label>Status:</label>
                  <span className={`status-${selectedRequest.status}`}>{selectedRequest.status}</span>
                </div>
                <div className="detail-row full-width">
                  <label>Description:</label>
                  <p>{selectedRequest.description}</p>
                </div>
              </div>
            </div>

            {/* Appeal Form */}
            <form className="appeal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Full Name *</label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Appeal Reason *</label>
                <div className="reason-buttons">
                  <button
                    type="button"
                    className={`reason-btn ${formData.appealReason === 'no-response' ? 'active' : ''}`}
                    onClick={() => handleReasonChange('no-response')}
                  >
                    No Response (30+ days)
                  </button>
                  <button
                    type="button"
                    className={`reason-btn ${formData.appealReason === 'rejection' ? 'active' : ''}`}
                    onClick={() => handleReasonChange('rejection')}
                  >
                    Request Rejected
                  </button>
                  <button
                    type="button"
                    className={`reason-btn ${formData.appealReason === 'incomplete' ? 'active' : ''}`}
                    onClick={() => handleReasonChange('incomplete')}
                  >
                    Incomplete Response
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Appeal Description * <span className="ai-badge">🤖 AI Generated</span>
                </label>
                <p className="ai-note">
                  This appeal has been auto-generated based on your request details. You can review
                  and edit it before submission.
                </p>
                <textarea
                  name="appealDescription"
                  value={formData.appealDescription}
                  onChange={handleChange}
                  required
                  rows="10"
                  className="form-textarea"
                />
                <div className="char-count">{formData.appealDescription.length} characters</div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Comments (Optional)</label>
                <textarea
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleChange}
                  placeholder="Add any additional points or expectations..."
                  rows="4"
                  className="form-textarea"
                />
              </div>

              <div className="appeal-form-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setShowReview(false)
                    setSelectedRequest(null)
                  }}
                >
                  ← Back
                </button>
                <button type="submit" className="btn-submit">
                  Submit Appeal ✓
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}

      {submitted && (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Appeal Submitted Successfully!</h3>
          <p>
            Your First Appeal has been filed. A confirmation email will be sent to {formData.email}
          </p>
        </div>
      )}
    </div>
  )
}
