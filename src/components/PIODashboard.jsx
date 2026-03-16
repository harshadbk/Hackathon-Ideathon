import { useState } from "react";
import RequestCard from "./RequestCard";
import "./PIODashboard.css";

export default function PIODashboard({ requests, onOpen, user, onLogout }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredRequests = requests.filter((r) => {

    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || r.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pending = requests.filter(r => r.status === "awaiting_response");
  const responded = requests.filter(r => r.status === "responded");
  const appeals = requests.filter(r => r.status === "appealed");

  function getDeadlineWarning(createdAt, days = 30) {

    const created = new Date(createdAt);
    const deadline = new Date(created.getTime() + days * 86400000);
    const diff = Math.ceil((deadline - new Date()) / 86400000);

    if (diff < 0) return { text: "Overdue", color: "red" };
    if (diff <= 3) return { text: `${diff}d left`, color: "orange" };

    return null;
  }

  return (
    <div className="pio-dashboard-container">

      {/* HEADER */}

      <div className="dashboard-header">

        <div className="dashboard-title">
          <h1>👨‍💼 PIO Dashboard</h1>
          <p>Manage RTI requests & responses</p>
        </div>

        <div className="dashboard-user">
          <div className="dashboard-email">{user?.email}</div>
          <button className="btn ghost" onClick={onLogout}>
            Logout
          </button>
        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-box">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{pending.length}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Responded</div>
          <div className="stat-value">{responded.length}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Appeals</div>
          <div className="stat-value">{appeals.length}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Total</div>
          <div className="stat-value">{requests.length}</div>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="toolbar">

        <input
          type="text"
          placeholder="Search RTI requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="awaiting_response">Pending</option>
          <option value="responded">Responded</option>
          <option value="appealed">Appealed</option>
        </select>

      </div>

      {/* REQUEST LIST */}

      <div className="pio-requests">

        <h2>📥 RTI Requests</h2>

        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            No requests found
          </div>
        ) : (
          filteredRequests.map(req => {

            const warning = getDeadlineWarning(req.createdAt);

            return (
              <div key={req.id} className="request-wrapper">

                {warning && (
                  <span
                    className="deadline-warning"
                    style={{ background: warning.color }}
                  >
                    {warning.text}
                  </span>
                )}

                <RequestCard
                  request={req}
                  onClick={() => onOpen(req.id)}
                />

              </div>
            );

          })
        )}

      </div>

      {/* QUICK ACTIONS */}

      <div>

        <h2 className="section-title">⚡ Quick Actions</h2>

        <div className="quick-actions">

          <div className="feature-card">
            <div className="icon">💬</div>
            <div className="title">Send Response</div>
            <div className="desc">
              Reply to pending RTI requests
            </div>
          </div>

          <div className="feature-card">
            <div className="icon">📧</div>
            <div className="title">Send Reminder</div>
            <div className="desc">
              Email reminder to citizens
            </div>
          </div>

          <div className="feature-card">
            <div className="icon">📋</div>
            <div className="title">View History</div>
            <div className="desc">
              Review previous RTI responses
            </div>
          </div>

          <div className="feature-card">
            <div className="icon">⚖</div>
            <div className="title">Appeals</div>
            <div className="desc">
              Manage first appeal cases
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}