import { useState, useEffect } from "react";
import "../styles/globals.css";

const CREATOR_TYPES = [
  { id: "music", label: "Music artist" },
  { id: "film", label: "Filmmaker / storyteller" },
  { id: "brand", label: "Brand / business" },
  { id: "social", label: "Content creator" },
];

const CULTURAL_CONTEXTS = [
  { id: "nigeria-yoruba", label: "Nigeria — Yoruba" },
  { id: "nigeria-igbo", label: "Nigeria — Igbo" },
  { id: "nigeria-hausa", label: "Nigeria — Hausa" },
  { id: "nigeria-pidgin", label: "Nigeria — Pidgin" },
  { id: "ghana", label: "Ghana" },
  { id: "kenya", label: "Kenya" },
  { id: "south-africa", label: "South Africa" },
  { id: "senegal", label: "Senegal" },
  { id: "ethiopia", label: "Ethiopia" },
  { id: "tanzania", label: "Tanzania" },
];

const TONES = [
  { id: "hype", label: "Hype / energetic" },
  { id: "intimate", label: "Intimate / personal" },
  { id: "bold", label: "Bold / confident" },
  { id: "playful", label: "Playful / fun" },
  { id: "premium", label: "Premium / elevated" },
  { id: "raw", label: "Raw / authentic" },
];

const STORAGE_KEY = "asa_creator_profile";

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export default function CreatorProfile({ isOpen, onClose, onApply }) {
  const [profile, setProfile] = useState({
    name: "",
    creatorType: "",
    culturalContext: "",
    tone: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = loadProfile();
    if (existing) setProfile(existing);
  }, [isOpen]);

  const updateField = (field, value) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onApply(profile);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile({ name: "", creatorType: "", culturalContext: "", tone: "" });
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={styles.backdrop} onClick={onClose} />
      <div style={styles.panel} className="slide-panel">
        <div style={styles.panelHeader}>
          <div>
            <p style={styles.panelEyebrow}>Your identity</p>
            <h2 style={styles.panelTitle}>Creator Profile</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <p style={styles.panelSub}>
          Save your preferences and àṣà will pre-fill the form every time — no
          need to repeat yourself.
        </p>

        <div style={styles.fields}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Your name / brand name</label>
            <input
              type="text"
              placeholder="e.g. Blaqboy, Nkem Studios, Pulse NG"
              value={profile.name}
              onChange={(e) => updateField("name", e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>What do you create?</label>
            <div style={styles.chipGrid}>
              {CREATOR_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateField("creatorType", t.id)}
                  style={{
                    ...styles.chip,
                    ...(profile.creatorType === t.id ? styles.chipActive : {}),
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Your cultural context</label>
            <div style={styles.chipGrid}>
              {CULTURAL_CONTEXTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => updateField("culturalContext", c.id)}
                  style={{
                    ...styles.chip,
                    ...(profile.culturalContext === c.id ? styles.chipActive : {}),
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Your usual tone</label>
            <div style={styles.chipGrid}>
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateField("tone", t.id)}
                  style={{
                    ...styles.chip,
                    ...(profile.tone === t.id ? styles.chipActive : {}),
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={handleClear} style={styles.clearBtn}>
            Clear profile
          </button>
          <button
            onClick={handleSave}
            style={{
              ...styles.saveBtn,
              ...(saved ? styles.saveBtnSaved : {}),
            }}
          >
            {saved ? "✓ Saved!" : "Save & apply"}
          </button>
        </div>
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
    width: "420px",
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
  panelEyebrow: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--asa-orange)",
    marginBottom: "0.3rem",
    fontWeight: 700,
  },
  panelTitle: {
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
  panelSub: {
    fontSize: "13px",
    color: "var(--asa-text-secondary)",
    lineHeight: 1.65,
    marginTop: "-0.5rem",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    flex: 1,
  },
  fieldGroup: {},
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    color: "var(--asa-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.6rem",
  },
  input: {
    width: "100%",
    background: "var(--asa-bg)",
    border: "0.5px solid var(--asa-border-strong)",
    borderRadius: "var(--asa-radius-sm)",
    padding: "0.75rem 1rem",
    fontSize: "14px",
    color: "var(--asa-text-primary)",
    outline: "none",
  },
  chipGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    background: "var(--asa-bg)",
    border: "0.5px solid var(--asa-border-strong)",
    borderRadius: "999px",
    padding: "0.45rem 0.9rem",
    fontSize: "12px",
    color: "var(--asa-text-secondary)",
    transition: "all 0.18s",
  },
  chipActive: {
    background: "#fff3eb",
    borderColor: "var(--asa-orange-border)",
    color: "var(--asa-orange)",
  },
  actions: {
    display: "flex",
    gap: "10px",
    paddingTop: "1rem",
    borderTop: "0.5px solid var(--asa-border)",
  },
  clearBtn: {
    flex: 1,
    background: "transparent",
    border: "0.5px solid var(--asa-border-strong)",
    borderRadius: "999px",
    padding: "0.75rem",
    fontSize: "13px",
    color: "var(--asa-text-muted)",
  },
  saveBtn: {
    flex: 2,
    background: "var(--asa-orange)",
    border: "none",
    borderRadius: "999px",
    padding: "0.75rem",
    fontSize: "13px",
    fontWeight: 700,
    color: "#fff",
    transition: "background 0.2s",
  },
  saveBtnSaved: {
    background: "#22a06b",
  },
};
