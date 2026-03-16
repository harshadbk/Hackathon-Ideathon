import { useNavigate } from 'react-router-dom'
import RequestCard from './RequestCard'
import './Tracker.css'

function computeDaysLeft(createdAt, deadlineDays=30){
  const created = new Date(createdAt)
  const deadline = new Date(created.getTime() + deadlineDays*24*3600*1000)
  return Math.ceil((deadline - new Date())/(24*3600*1000))
}

function getRequestStage(request) {
  const timeline = request.timeline || []
  const status = request.status
  
  if (status === 'responded' || status === 'rejected') return 'Responded'
  if (status === 'appealed') return 'Appealed'
  if (status === 'closed') return 'Closed'
  
  const hasAcknowledgement = timeline.some(t => t.text.includes('Acknowledged'))
  if (!hasAcknowledgement) return 'Filed'
  
  return 'PIO Checking'
}

function getRTIStagesVisualization(request) {
  const stages = ['Filed', 'Acknowledged', 'PIO Checking', 'Response']
  const currentStage = getRequestStage(request)
  const stageIndex = stages.indexOf(currentStage)
  
  const stageEmojis = { 'Filed': '📝', 'Acknowledged': '✓', 'PIO Checking': '⏳', 'Response': '📄' }
  const statusColors = { 'Filed': '#999', 'Acknowledged': '#3b82f6', 'PIO Checking': '#ea580c', 'Response': '#10b981' }
  
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'12px',marginTop:8,padding:'8px 0'}}>
      {stages.map((stage, idx) => (
        <div key={stage} style={{display:'flex',alignItems:'center',gap:6,flex:1}}>
          <div style={{
            width:24,
            height:24,
            borderRadius:'50%',
            background: idx <= stageIndex ? statusColors[stage] : '#e5e7eb',
            color: idx <= stageIndex ? 'white' : '#999',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontSize:'11px',
            fontWeight:'bold'
          }}>
            {stageEmojis[stage]}
          </div>
          {idx < stages.length - 1 && (
            <div style={{
              height:2,
              background: idx < stageIndex ? '#10b981' : '#e5e7eb',
              flex:1,
              margin:'0 -4px'
            }}></div>
          )}
        </div>
      ))}
      <div style={{fontSize:'11px',color:'var(--muted)',fontWeight:500}}>
        {currentStage}
      </div>
    </div>
  )
}

export default function Tracker({ requests = [], onOpen, onUpdate }) {
  const navigate = useNavigate()

  const handleOpenDetail = (id) => {
    onOpen(id)
    navigate(`/detail/${id}`)
  }
  const enriched = requests.map(r => ({...r, daysLeft: computeDaysLeft(r.createdAt, r.deadlineDays)}))
  
  const activeRequests = enriched.filter(r => r.status === 'awaiting_response')
  const historyRequests = enriched.filter(r => r.status !== 'awaiting_response')
  
  const overdue = enriched.filter(r => r.daysLeft < 0 && r.status === 'awaiting_response')
  const atRisk = enriched.filter(r => r.daysLeft >= 0 && r.daysLeft <= 5 && r.status === 'awaiting_response')

  function autoAppeal(r) {
    const appealText = `Dear Sir/Madam,\n\nThis is a First Appeal under the RTI Act against the non-response to my RTI request dated ${new Date(r.createdAt).toLocaleDateString()}.\n\nRequest: ${r.title}\n\nDepartment: ${r.department}\n\nThe statutory period of 30 days has elapsed without a response. Please treat this as a formal First Appeal.\n\nThank you,\nCitizen`
    onUpdate(r.id, { 
      status: 'appealed', 
      timeline: [...(r.timeline||[]), { at: new Date().toISOString(), text: 'First Appeal Generated', actor: 'assistant' }], 
      aiAppeal: appealText 
    })
  }

  return (
    <div>
      <div className="card card-header">
        <div>
          <h1 className="h1">⏰ Track Your RTI Requests</h1>
          <p className="small-muted">Monitor the status of your filed RTI requests and receive deadline alerts.</p>
        </div>
      </div>

      <div className="grid" style={{marginTop:20}}>
        <div>
          {/* ACTIVE REQUESTS SECTION */}
          <div style={{marginBottom:32}}>
            <div className="h2" style={{marginBottom:16,paddingBottom:8,borderBottom:'2px solid var(--border)'}}>📋 Active Requests - PIO Checking ({activeRequests.length})</div>
            
            {activeRequests.length === 0 ? (
              <div style={{background:'#f3f4f6',padding:16,borderRadius:8,textAlign:'center',color:'var(--muted)'}}>
                No active requests. All your RTI requests have been completed!
              </div>
            ) : (
              <>
                {overdue.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <div className="h3" style={{color:'#dc2626',marginBottom:12}}>🚨 Overdue ({overdue.length})</div>
                    <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:12,marginBottom:12,fontSize:'12px'}}>
                      <strong>⚠️ Action Needed:</strong> These RTI requests have exceeded the 30-day deadline. Consider filing an appeal.
                    </div>
                    <div className="list">
                      {overdue.map(r => (
                        <div key={r.id} style={{border:'1px solid #fecaca',borderLeft:'4px solid #dc2626',background:'#fffbfa',borderRadius:6,padding:12,marginBottom:10}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12,marginBottom:8}}>
                            <div onClick={() => handleOpenDetail(r.id)} style={{flex:1,cursor:'pointer'}}>
                              <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                            </div>
                            <div style={{display:'flex',gap:8,whiteSpace:'nowrap'}}>
                              <button className="btn" onClick={() => autoAppeal(r)}>Appeal</button>
                              <button className="btn ghost" onClick={() => onUpdate(r.id, {status:'closed'})}>Close</button>
                            </div>
                          </div>
                          {getRTIStagesVisualization(r)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {atRisk.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <div className="h3" style={{color:'#ea580c',marginBottom:12}}>⏰ At Risk ({atRisk.length})</div>
                    <div className="list">
                      {atRisk.map(r => (
                        <div key={r.id} style={{border:'1px solid #fed7aa',borderLeft:'4px solid #ea580c',background:'#fffbf0',borderRadius:6,padding:12,marginBottom:10}} onClick={() => handleOpenDetail(r.id)}>
                          <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                          {getRTIStagesVisualization(r)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Active Requests */}
                {(activeRequests.length - overdue.length - atRisk.length) > 0 && (
                  <div>
                    <div className="h3" style={{marginBottom:12}}>✓ In Progress ({activeRequests.length - overdue.length - atRisk.length})</div>
                    <div className="list">
                      {activeRequests.filter(r => !overdue.includes(r) && !atRisk.includes(r)).map(r => (
                        <div key={r.id} style={{border:'1px solid #dbeafe',borderLeft:'4px solid #3b82f6',background:'#f0f9ff',borderRadius:6,padding:12,marginBottom:10}} onClick={() => handleOpenDetail(r.id)}>
                          <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                          {getRTIStagesVisualization(r)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* HISTORY SECTION */}
          {historyRequests.length > 0 && (
            <div>
              <div className="h2" style={{marginBottom:16,paddingBottom:8,borderBottom:'2px solid var(--border)'}}>📁 RTI History ({historyRequests.length})</div>
              
              {/* History Stats */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:20}}>
                <div style={{background:'#f3f4f6',padding:16,borderRadius:8,textAlign:'center'}}>
                  <div style={{fontSize:24,fontWeight:'bold',color:'#374151'}}>{historyRequests.length}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>Total Completed</div>
                </div>
                <div style={{background:'#d1fae5',padding:16,borderRadius:8,textAlign:'center'}}>
                  <div style={{fontSize:24,fontWeight:'bold',color:'#059669'}}>{historyRequests.filter(r => r.status === 'responded').length}</div>
                  <div style={{fontSize:12,color:'#047857',marginTop:4}}>Responded</div>
                </div>
                <div style={{background:'#fee2e2',padding:16,borderRadius:8,textAlign:'center'}}>
                  <div style={{fontSize:24,fontWeight:'bold',color:'#dc2626'}}>{historyRequests.filter(r => r.status === 'rejected').length}</div>
                  <div style={{fontSize:12,color:'#b91c1c',marginTop:4}}>Rejected</div>
                </div>
                <div style={{background:'#fef3c7',padding:16,borderRadius:8,textAlign:'center'}}>
                  <div style={{fontSize:24,fontWeight:'bold',color:'#d97706'}}>{historyRequests.filter(r => r.status === 'appealed').length}</div>
                  <div style={{fontSize:12,color:'#92400e',marginTop:4}}>Appealed</div>
                </div>
              </div>
              
              <div className="list">
                {historyRequests.map(r => {
                  const statusColor = {
                    'responded': '#10b981',
                    'rejected': '#ef4444',
                    'appealed': '#f59e0b',
                    'closed': '#6b7280'
                  }[r.status] || '#999'
                  
                  const statusLabel = {
                    'responded': '✓ Responded',
                    'rejected': '✗ Rejected',
                    'appealed': '⬆️ Appealed',
                    'closed': '◯ Closed'
                  }[r.status] || 'Completed'
                  
                  const respondedDate = r.respondedAt ? new Date(r.respondedAt).toLocaleDateString() : 'N/A'
                  const createdDate = new Date(r.createdAt).toLocaleDateString()
                  
                  return (
                    <div key={r.id} style={{border:'1px solid #e5e7eb',borderLeft:`4px solid ${statusColor}`,background:'#fafafa',borderRadius:6,padding:12,marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12,marginBottom:8}}>
                        <div style={{flex:1,cursor:'pointer'}} onClick={() => handleOpenDetail(r.id)}>
                          <RequestCard request={r} onOpen={() => handleOpenDetail(r.id)} />
                        </div>
                        <div style={{background:statusColor,color:'white',padding:'4px 12px',borderRadius:4,fontSize:'11px',fontWeight:600,whiteSpace:'nowrap'}}>
                          {statusLabel}
                        </div>
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:12,fontSize:'12px',color:'var(--muted)',marginBottom:8}}>
                        <div>📅 <strong>Filed:</strong> {createdDate}</div>
                        <div>📬 <strong>Responded:</strong> {respondedDate}</div>
                        <div>⏱️ <strong>Days Taken:</strong> {r.respondedAt ? Math.ceil((new Date(r.respondedAt) - new Date(r.createdAt))/(24*3600*1000)) : 'Pending'} days</div>
                      </div>
                      {getRTIStagesVisualization(r)}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <aside style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card">
            <strong style={{fontSize:'12px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>RTI Request Stages</strong>
            <div style={{fontSize:'12px',lineHeight:2,marginTop:12,color:'var(--text)'}}>
              <p>📝 <strong>Filed:</strong> RTI request submitted</p>
              <p>✓ <strong>Acknowledged:</strong> Department received request</p>
              <p>⏳ <strong>PIO Checking:</strong> Under review (30 days)</p>
              <p>📄 <strong>Response:</strong> Reply received</p>
            </div>
          </div>
          <div className="card">
            <strong style={{fontSize:'12px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>Timeline Tips</strong>
            <div style={{fontSize:'12px',lineHeight:1.8,marginTop:12,color:'var(--text)'}}>
              <p>✓ <strong>30 days:</strong> Standard response deadline</p>
              <p>✓ <strong>45 days:</strong> For sensitive info</p>
              <p>✓ <strong>30 more days:</strong> After appeal filed</p>
            </div>
          </div>
          <div className="card" style={{background:'linear-gradient(135deg, #dbeafe, #f0f9ff)',border:'1px solid #bfdbfe'}}>
            <strong style={{fontSize:'12px',color:'#1e40af'}}>💡 Pro Tip</strong>
            <div style={{fontSize:'12px',lineHeight:1.8,marginTop:12,color:'#1e40af'}}>
              File appeals early! Don't wait until the deadline passes. Early appeals show you're proactive.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
