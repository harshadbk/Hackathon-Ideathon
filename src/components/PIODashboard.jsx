import RequestCard from "./RequestCard";
import "./PIODashboard.css";

export default function PIODashboard({ requests, onOpen, user, onLogout }) {
  const myRequests = requests.filter((r) => r.status === "awaiting_response");
  const respondedCount = requests.filter(
    (r) => r.status === "responded",
  ).length;
  const appealsCount = requests.filter((r) => r.status === "appealed").length;

  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1 className="h1">👨‍💼 PIO Dashboard</h1>
          <p className="small-muted">Manage RTI requests & responses</p>
        </div>

        <div className="dashboard-user">
          <div className="dashboard-email">{user.email}</div>
          <button className="btn ghost" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="grid-full" style={{ marginBottom: 20 }}>
        <div className="stat-box">
          <div className="stat-label">Pending Requests</div>
          <div className="stat-value">{myRequests.length}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Responded</div>
          <div className="stat-value">{respondedCount}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Appeals</div>
          <div className="stat-value">{appealsCount}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Total</div>
          <div className="stat-value">{requests.length}</div>
        </div>
      </div>

      <div className="card">
        <h2 className="h2">📥 Requests Awaiting Response</h2>
        <div className="list">
          {myRequests.length === 0 ? (
            <div
              style={{ padding: "20px", textAlign: "center", color: "#666" }}
            >
              No pending requests
            </div>
          ) : (
            myRequests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onClick={() => onOpen(req.id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2 className="h2">📊 Quick Actions</h2>
        <div className="grid-full" style={{ marginTop: 12 }}>
          <div className="feature-card">
            <div style={{ fontSize: 28 }}>💬</div>
            <div style={{ fontWeight: 600 }}>Send Response</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              Reply to pending requests
            </div>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: 28 }}>📧</div>
            <div style={{ fontWeight: 600 }}>Send Reminder</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              Auto-email to citizens
            </div>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: 28 }}>📋</div>
            <div style={{ fontWeight: 600 }}>View History</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              All responses & appeals
            </div>
          </div>
        </div>
      </div>
    </>
  );
}