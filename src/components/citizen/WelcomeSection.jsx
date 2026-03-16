import "./WelcomeSection.css";

export default function WelcomeSection({ user }) {
  const citizenId = user?.id
    ? `RTI-CIT-${user.id.slice(-4).padStart(4, "0")}`
    : "RTI-CIT-0000";

  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <h1 className="welcome-title">
          Welcome, {user?.name || "Citizen"} 👋
        </h1>

        <div className="citizen-info">
          <div className="info-item">
            <span className="info-label">Citizen ID:</span>
            <span className="info-value">{citizenId}</span>
          </div>

          {user?.email && (
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
          )}
        </div>

        <p className="welcome-subtitle">
          Manage your RTI requests, track their status, and file appeals easily.
        </p>
      </div>
    </section>
  );
}