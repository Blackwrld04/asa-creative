import { useState, useEffect } from "react";
import "../styles/globals.css";

const STORAGE_KEY = "asa_campaign_history";
const MAX_HISTORY = 10;

export function saveToHistory(campaignData) {
  try {
    const existing = loadHistory();
    const entry = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      ...campaignData,
    };
    const updated = [entry, ...existing].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to save campaign history:", err);
  }
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CampaignHistory({ isOpen, onClose, onRestore }) {
  const [history, setHistory] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (isOpen) setHistory(loadHistory());
  }, [isOpen]);

  const handleRestore = (entry) => {
    onRestore(entry);
    onClose();
  };

  const handleDelete = (id) => {
    const updated = history.filter((h) => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setHistory(updated);
    setConfirmDelete(null);
  };

  const handleClearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={styles.backdrop} onClick={onClose} />
      <div style={styles.panel} className="slide-panel">
        <div style={styles.panelHeader}>
          <div>
            <p style={styles.eyebrow}>Saved work</p>
            <h2 style={styles.title}>Campaign History</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {history.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No campaigns saved yet.</p>
            <p style={styles.emptySub}>
              Generate your first campaign and it will appear here automatically.
            </p>
          </div>
        ) : (
          <>
            <div style={styles.list}>
              {history.map((entry) => (
                <div key={entry.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <div style={styles.cardMeta}>
                      <span style={styles.cardDate}>{formatDate(entry.savedAt)}</span>
                    </div>
                    <button
                      onClick={() =>
                        setConfirmDelete(
                          confirmDelete === entry.id ? null : entry.id
                        )
                      }
                      style={styles.deleteBtn}
                    >
                      {confirmDelete === entry.id ? "Cancel" : "✕"}
                    </button>
                  </div>

                  <p style={styles.cardName}>
                    {entry.projectName || "Untitled project"}
                  </p>

                  <div style={styles.pills}>
                    <span style={styles.pill}>{entry.creatorType}</span>
                    <span style={styles.pill}>{entry.culturalContext}</span>
                    <span style={styles.pill}>{entry.tone}</span>
                  </div>

                  {confirmDelete === entry.id ? (
                    <button
                      onClick={() => handleDelete(entry.id)}
                      style={styles.confirmDeleteBtn}
                    >
                      Yes, delete this campaign
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRestore(entry)}
                      style={styles.restoreBtn}
                    >
                      Restore campaign →
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button onClick={handleClearAll} style={styles.clearAllBtn}>
              Clear all history
            </button>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(31,31,31,0.35)",
    backdropFilter: "blur(4px)",
    zIndex: 100,
  },
  panel: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "400px",
    background: "#fff",
    zIndex: 101,
    padding: "2rem",
    overflowY: "auto",
    boxShadow: "-24px 0 80px rgba(31,31,31,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  panelHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  eyebrow: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--asa-orange)",
    marginBottom: "0.3rem",
    fontWeight: 700,
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--asa-text-primary)",
    letterSpacing: "-0.3px",
  },
  closeBtn: {
    background: "var(--asa-bg)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "999px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    color: "var(--asa-text-muted)",
    flexShrink: 0,
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    paddingBottom: "4rem",
  },
  emptyText: {
    fontSize: "15px",
    fontWeight: 600,
    color: "var(--asa-text-primary)",
  },
  emptySub: {
    fontSize: "13px",
    color: "var(--asa-text-muted)",
    textAlign: "center",
    maxWidth: "260px",
    lineHeight: 1.6,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
  },
  card: {
    background: "var(--asa-bg)",
    border: "0.5px solid var(--asa-border-strong)",
    borderRadius: "var(--asa-radius-md)",
    padding: "1rem 1.1rem",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardMeta: {},
  cardDate: {
    fontSize: "11px",
    color: "var(--asa-text-faint)",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    fontSize: "12px",
    color: "var(--asa-text-faint)",
    padding: "2px 6px",
  },
  cardName: {
    fontSize: "15px",
    fontWeight: 700,
    color: "var(--asa-text-primary)",
  },
  pills: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  pill: {
    background: "#fff",
    border: "0.5px solid var(--asa-border-strong)",
    borderRadius: "999px",
    padding: "3px 10px",
    fontSize: "11px",
    color: "var(--asa-text-secondary)",
    textTransform: "capitalize",
  },
  restoreBtn: {
    background: "var(--asa-orange)",
    border: "none",
    borderRadius: "999px",
    padding: "0.6rem 1rem",
    fontSize: "12px",
    fontWeight: 700,
    color: "#fff",
    alignSelf: "flex-start",
    marginTop: "4px",
  },
  confirmDeleteBtn: {
    background: "#fee2e2",
    border: "0.5px solid #fca5a5",
    borderRadius: "999px",
    padding: "0.6rem 1rem",
    fontSize: "12px",
    fontWeight: 700,
    color: "#dc2626",
    alignSelf: "flex-start",
    marginTop: "4px",
  },
  clearAllBtn: {
    background: "transparent",
    border: "0.5px solid var(--asa-border-strong)",
    borderRadius: "999px",
    padding: "0.65rem",
    fontSize: "12px",
    color: "var(--asa-text-muted)",
    width: "100%",
  },
};
