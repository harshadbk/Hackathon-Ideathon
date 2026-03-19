import './RequestCard.css'

function daysLeft(createdAt, deadlineDays = 30) {
  const created = new Date(createdAt)
  const deadline = new Date(created.getTime() + deadlineDays * 24 * 3600 * 1000)
  return Math.ceil((deadline - new Date()) / (24 * 3600 * 1000))
}

export default function RequestCard({ request, onOpen }) {
  const left = daysLeft(request.createdAt, request.deadlineDays)
  const isLate = left < 0 && request.status === 'awaiting_response'
  const pct = Math.max(6, Math.min(100, Math.round(((request.deadlineDays - Math.max(0, request.deadlineDays - left)) / request.deadlineDays) * 100)))

  const statusColor = {
    responded: 'var(--s-ok)',
    awaiting_response: isLate ? 'var(--s-danger)' : 'var(--s-pending)',
    appealed: 'var(--s-info)',
    closed: 'var(--muted)',
  }[request.status] || 'var(--muted)'

  return (
    <div className="request-card" onClick={onOpen}>
      <div className="rc-left">
        <div className="rc-id">{request.id?.substring(0, 12) || 'RTI-XXXX'}</div>
        <div className="request-title">{request.title}</div>
        <div className="pio">🏢 {request.department}</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{request.pio}</div>
      </div>

      <div className="rc-right">
        <div className={isLate ? 'deadline-late' : 'badge'} style={{ background: statusColor + '18', color: statusColor, borderColor: statusColor + '30' }}>
          {request.status === 'responded' ? '✓ Responded'
            : request.status === 'appealed' ? '⚖ Appealed'
            : request.status === 'closed' ? '✗ Closed'
            : isLate ? `⚠ ${Math.abs(left)}d Overdue`
            : `${left}d Left`}
        </div>
        <div className="rc-progress-wrap">
          <div className="progress">
            <i style={{ width: `${pct}%`, background: isLate ? 'var(--s-danger)' : 'var(--navy)' }} />
          </div>
        </div>
        <div className="rc-arrow">›</div>
      </div>
    </div>
  )
}
