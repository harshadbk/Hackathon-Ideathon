import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RequestDetail.css";

function daysLeft(createdAt, deadlineDays = 30) {
  const created = new Date(createdAt);
  const deadline = new Date(
    created.getTime() + deadlineDays * 24 * 3600 * 1000,
  );
  const diff = Math.ceil((deadline - new Date()) / (24 * 3600 * 1000));
  return diff;
}

export default function RequestDetail({ request, onBack, onUpdate }) {
  const navigate = useNavigate();
  const [responseText, setResponseText] = useState("");
  if (!request) return <div className="card">No request selected.</div>;

  const left = daysLeft(request.createdAt, request.deadlineDays);
  const isLate = left < 0 && request.status === "awaiting_response";

  function generateAppeal() {
    const appeal =
      request.aiAppeal ||
      `Dear Sir/Madam,\n\nThis is a First Appeal under the RTI Act against the non-response to my RTI request dated ${new Date(request.createdAt).toLocaleDateString()}.\n\nRequest: ${request.title}\n\nThe statutory period has elapsed. Please treat this as a formal First Appeal.\n\nThank you,\nCitizen`;
    onUpdate(request.id, {
      status: "appealed",
      aiAppeal: appeal,
      timeline: [
        ...(request.timeline || []),
        {
          at: new Date().toISOString(),
          text: "First Appeal Generated",
          actor: "assistant",
        },
      ],
    });
  }

  function submitPIOResponse() {
    if (!responseText.trim()) {
      alert("Please enter a response");
      return;
    }
    onUpdate(request.id, {
      status: "responded",
      pioResponse: responseText,
      respondedAt: new Date().toISOString(),
      timeline: [
        ...(request.timeline || []),
        {
          at: new Date().toISOString(),
          text: "Response Submitted by PIO",
          actor: "PIO",
        },
      ],
    });
    setResponseText("");
    alert("Response submitted successfully!");
  }

  function downloadDraft() {
    const content = `RTI Request\n${"=".repeat(50)}\n\nDepartment: ${request.department}\nPIO: ${request.pio}\nDate: ${new Date(request.createdAt).toLocaleDateString()}\n\n${request.aiDraft}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rti-${request.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: 16,
        }}
      >
        <div>
          <h1 className="h1">Request Details</h1>
          <div className="small-muted">
            Review, download, and manage your RTI request.
          </div>
        </div>
        <button
          className="btn ghost"
          onClick={() => {
            onBack();
            navigate(-1);
          }}
        >
          ← Back
        </button>
      </div>

      <div className="grid">
        <div>
          <div
            style={{
              background: "linear-gradient(135deg,#f3f4f6 0%,#f9fafb 100%)",
              padding: 14,
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div>
                <div className="h2">{request.title}</div>
                <div className="small-muted" style={{ marginTop: 6 }}>
                  {request.department} — {request.pio}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: isLate ? "#dc2626" : "#16a34a",
                  }}
                >
                  {isLate ? `${Math.abs(left)}d Overdue` : `${left}d Left`}
                </div>
                <div
                  className="small-muted"
                  style={{ textTransform: "capitalize" }}
                >
                  Status: {request.status}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div className="small-muted">Filed</div>
                <div style={{ fontWeight: "600" }}>
                  {new Date(request.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="small-muted">Deadline</div>
                <div style={{ fontWeight: "600" }}>
                  {new Date(
                    new Date(request.createdAt).getTime() +
                      request.deadlineDays * 24 * 3600 * 1000,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="h2" style={{ margin: 0 }}>
              Your RTI Request
            </label>
            <div
              className="ai-box"
              style={{
                whiteSpace: "pre-wrap",
                marginTop: 10,
                fontFamily: "monospace",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {request.aiDraft}
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <button className="btn" onClick={downloadDraft}>
                📥 Download
              </button>
              <button
                className="btn ghost"
                onClick={() =>
                  navigator.clipboard?.writeText(request.aiDraft || "")
                }
              >
                📋 Copy
              </button>
              {isLate && request.status === "awaiting_response" && (
                <button className="btn" onClick={generateAppeal}>
                  Generate Appeal
                </button>
              )}
            </div>
          </div>
          {request.status === "awaiting_response" && !request.pioResponse && (
            <div
              style={{
                marginBottom: 16,
                padding: 16,
                background: "linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)",
                border: "2px solid #fcd34d",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: "28px" }}>⏳</div>
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#92400e",
                    }}
                  >
                    Awaiting Response
                  </div>
                  <div className="small-muted" style={{ color: "#b45309" }}>
                    The PIO has {left} days left to respond
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: 12,
                  background: "white",
                  borderLeft: "3px solid #fcd34d",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#92400e",
                    marginBottom: 6,
                  }}
                >
                  📝 What to do:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "#b45309",
                  }}
                >
                  <li>Check back regularly for the PIO's response</li>
                  <li>
                    You will receive a notification when a response is submitted
                  </li>
                  <li>
                    If deadline passes without response, you can file a First
                    Appeal
                  </li>
                </ul>
              </div>
            </div>
          )}

          {request.status === "awaiting_response" && request.pioResponse && (
            <div
              style={{
                marginBottom: 16,
                padding: 16,
                background: "linear-gradient(135deg,#dcfce7 0%,#bbf7d0 100%)",
                border: "2px solid #22c55e",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: "28px" }}>✅</div>
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#15803d",
                    }}
                  >
                    Response Received
                  </div>
                  {request.respondedAt && (
                    <div className="small-muted" style={{ color: "#166534" }}>
                      Received on{" "}
                      {new Date(request.respondedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <label
                className="h2"
                style={{ margin: 0, color: "#15803d", marginTop: 12 }}
              >
                📝 Response from PIO
              </label>
              <div
                className="ai-box"
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: 10,
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  background: "white",
                  border: "1px solid #86efac",
                  padding: 12,
                }}
              >
                {request.pioResponse}
              </div>
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  background: "white",
                  borderLeft: "3px solid #22c55e",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#15803d",
                    marginBottom: 6,
                  }}
                >
                  📌 Important Notes:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "#166534",
                  }}
                >
                  <li>
                    Review the response carefully for all requested information
                  </li>
                  <li>
                    If information is partially denied, check the reasons
                    provided
                  </li>
                  <li>
                    You have 30 days to file a First Appeal if dissatisfied
                  </li>
                  <li>Keep a copy for your records</li>
                </ul>
              </div>
            </div>
          )}

          {request.status === "rejected" && (
            <div
              style={{
                marginBottom: 16,
                padding: 16,
                background: "linear-gradient(135deg,#fee2e2 0%,#fecaca 100%)",
                border: "2px solid #ef4444",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: "28px" }}>❌</div>
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#991b1b",
                    }}
                  >
                    Response Rejected
                  </div>
                  {request.respondedAt && (
                    <div className="small-muted" style={{ color: "#7c2d12" }}>
                      Rejected on{" "}
                      {new Date(request.respondedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <label
                className="h2"
                style={{ margin: 0, color: "#991b1b", marginTop: 12 }}
              >
                📝 Rejection Reason from PIO
              </label>
              <div
                className="ai-box"
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: 10,
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  background: "white",
                  border: "1px solid #fca5a5",
                  padding: 12,
                }}
              >
                {request.pioResponse}
              </div>
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  background: "white",
                  borderLeft: "3px solid #ef4444",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#991b1b",
                    marginBottom: 6,
                  }}
                >
                  📌 Next Steps:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "#7c2d12",
                  }}
                >
                  <li>Review the reasons for rejection carefully</li>
                  <li>
                    You have 30 days (from the date of rejection) to file a
                    First Appeal
                  </li>
                  <li>
                    Include relevant facts and address each reason in your
                    appeal
                  </li>
                  <li>Submit appeal to the First Appellate Authority</li>
                </ul>
              </div>
            </div>
          )}
          {request.aiAppeal && (
            <div style={{ marginBottom: 16 }}>
              <label className="h2" style={{ margin: 0 }}>
                Generated Appeal
              </label>
              <div
                className="ai-box"
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: 10,
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                {request.aiAppeal}
              </div>
            </div>
          )}

          {request.status === "responded" && (
            <div
              style={{
                marginBottom: 16,
                padding: 16,
                background: "linear-gradient(135deg,#dcfce7 0%,#bbf7d0 100%)",
                border: "2px solid #22c55e",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: "28px" }}>✅</div>

                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#15803d",
                    }}
                  >
                    Response Received from PIO
                  </div>

                  {request.respondedAt && (
                    <div className="small-muted" style={{ color: "#166534" }}>
                      Received on{" "}
                      {new Date(request.respondedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <label className="h2" style={{ margin: 0, color: "#15803d" }}>
                📝 PIO Response
              </label>

              <div
                className="ai-box"
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: 10,
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  background: "white",
                  border: "1px solid #86efac",
                  padding: 12,
                }}
              >
                {request.pioResponse}
              </div>

              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  background: "white",
                  borderLeft: "3px solid #22c55e",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#15803d",
                    marginBottom: 6,
                  }}
                >
                  📌 What You Can Do Now
                </div>

                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "#166534",
                  }}
                >
                  <li>Review the information provided by the PIO</li>
                  <li>If information is incomplete, file a First Appeal</li>
                  <li>If satisfied, mark the request as closed</li>
                  <li>Keep the response copy for records</li>
                </ul>
              </div>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label className="h2" style={{ margin: 0 }}>
              Timeline
            </label>
            <div className="timeline" style={{ marginTop: 10 }}>
              {(request.timeline || []).map((t, i) => (
                <div className="item" key={i}>
                  <div>
                    <div style={{ fontWeight: "600" }}>{t.text}</div>
                    <div className="small-muted">
                      {new Date(t.at).toLocaleString()}
                    </div>
                  </div>
                  <div className="small-muted" style={{ fontSize: "12px" }}>
                    {t.actor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="side-panel">
            <div className="h2">Actions</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 12,
              }}
            >
              <button
                className="btn ghost"
                onClick={() => onUpdate(request.id, { status: "closed" })}
              >
                Mark Closed
              </button>
              <button
                className="btn ghost"
                onClick={() =>
                  onUpdate(request.id, {
                    title:
                      prompt("Edit title:", request.title) || request.title,
                  })
                }
              >
                Edit Details
              </button>
            </div>
          </div>

          <div className="notice" style={{ marginTop: 12 }}>
            <strong>📌 Remember:</strong> You have {request.deadlineDays} days
            to receive a response from the PIO.
          </div>

          <div className="ai-box" style={{ marginTop: 12 }}>
            <strong>💡 Next Steps</strong>
            <ol
              style={{
                marginTop: 8,
                paddingLeft: 16,
                fontSize: "12px",
                lineHeight: 1.8,
              }}
            >
              <li>Download & print</li>
              <li>Email to PIO</li>
              <li>Keep copy safe</li>
              <li>Track deadline</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
