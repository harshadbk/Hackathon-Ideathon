import { useState } from 'react'
import './Notifications.css'

const notificationsData = [
  {
    id: 1,
    type: 'status',
    title: 'RTI Request Acknowledged',
    message: 'Your RTI request #12345 has been acknowledged by the Education Department. They have 30 days to provide a response.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    icon: '📬',
  },
  {
    id: 2,
    type: 'success',
    title: 'Information Provided',
    message: 'Response to your RTI request #12340 (Vendor Selection for Municipal Water Contract) is ready. Click to view.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false,
    icon: '✓',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Deadline Approaching',
    message: 'Your First Appeal deadline is on March 25, 2026. Only 8 days left to file an appeal for request #12339.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: false,
    icon: '⚠️',
  },
  {
    id: 4,
    type: 'info',
    title: 'System Maintenance',
    message: 'Our system will undergo maintenance on March 20, 2026 from 2:00 AM to 6:00 AM IST. During this time, you won\'t be able to file new requests.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '🔧',
  },
  {
    id: 5,
    type: 'success',
    title: 'Appeal Submitted',
    message: 'Your First Appeal for request #12338 (Annual Audit Reports) has been successfully submitted to the Appellate Authority.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '✓',
  },
  {
    id: 6,
    type: 'status',
    title: 'Request Extended',
    message: 'Response period for request #12335 has been extended by 1 month due to voluminous data compilation.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '📅',
  },
  {
    id: 7,
    type: 'warning',
    title: 'Partial Information Denied',
    message: 'Response to request #12332 contains some redacted sections under Section 8(1)(g) of the RTI Act.',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '⚠️',
  },
  {
    id: 8,
    type: 'info',
    title: 'New Feature Available',
    message: 'You can now generate AI-assisted appeals directly from the request details page. Try it out!',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '🎉',
  },
  {
    id: 9,
    type: 'success',
    title: 'Request Approved',
    message: 'Your RTI request #12330 for School Development Grant Records has been marked as complete.',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '✓',
  },
  {
    id: 10,
    type: 'status',
    title: 'Reminder: File Your Request',
    message: 'You have not filed any RTI requests in the last 30 days. Need information? File a new request now!',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    read: true,
    icon: '📋',
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filter, setFilter] = useState('all')

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getTypeColor = (type) => {
    const colors = {
      success: '#22c55e',
      warning: '#f97316',
      info: '#3b82f6',
      status: '#8b5cf6',
    }
    return colors[type] || '#64748b'
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="notifications">
      <div className="notif-header">
        <div className="notif-title-section">
          <h1 className="notif-title">🔔 Notifications</h1>
          {unreadCount > 0 && <span className="unread-badge">{unreadCount} New</span>}
        </div>
        <p className="notif-subtitle">Stay updated with your RTI requests and system alerts</p>
      </div>

      {/* Controls */}
      <div className="notif-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="notif-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item ${notif.read ? 'read' : 'unread'}`}
              onClick={() => !notif.read && markAsRead(notif.id)}
            >
              <div className="notif-icon" style={{ backgroundColor: getTypeColor(notif.type) }}>
                {notif.icon}
              </div>

              <div className="notif-content">
                <div className="notif-header-row">
                  <h3 className="notif-item-title">{notif.title}</h3>
                  <span className="notif-time">{formatTime(notif.timestamp)}</span>
                </div>
                <p className="notif-message">{notif.message}</p>
              </div>

              <div className="notif-actions">
                {!notif.read && (
                  <button
                    className="action-btn mark-read"
                    onClick={(e) => {
                      e.stopPropagation()
                      markAsRead(notif.id)
                    }}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="action-btn delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(notif.id)
                  }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Preferences */}
      <div className="notif-preferences">
        <h3 className="preferences-title">🔧 Notification Preferences</h3>
        <div className="preferences-list">
          <div className="preference-item">
            <div className="preference-info">
              <h4>Email Notifications</h4>
              <p>Receive email for important updates</p>
            </div>
            <input type="checkbox" defaultChecked className="preference-toggle" />
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h4>Deadline Reminders</h4>
              <p>Get reminded about approaching deadlines</p>
            </div>
            <input type="checkbox" defaultChecked className="preference-toggle" />
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h4>Status Updates</h4>
              <p>Notify when RTI status changes</p>
            </div>
            <input type="checkbox" defaultChecked className="preference-toggle" />
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h4>System Alerts</h4>
              <p>Maintenance and system announcements</p>
            </div>
            <input type="checkbox" defaultChecked className="preference-toggle" />
          </div>
        </div>
      </div>
    </div>
  )
}
