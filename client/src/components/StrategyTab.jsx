import "../styles/globals.css";

const DEMO_DATA = {
  platforms: [
    {
      name: "Instagram",
      fit: "Strongest",
      reason: "Visual-first, ideal for the hero image and Reels rollout.",
    },
    {
      name: "TikTok",
      fit: "Strong",
      reason: "Sound-driven discovery — built for the script hook moment.",
    },
    {
      name: "X (Twitter)",
      fit: "Good",
      reason: "Real-time conversation, strong for Nigerian Twitter culture.",
    },
  ],
  postingTimes: [
    { day: "Thursday", window: "7:00 PM – 9:00 PM WAT", note: "Pre-weekend peak engagement" },
    { day: "Saturday", window: "11:00 AM – 1:00 PM WAT", note: "Weekend leisure browsing" },
    { day: "Sunday", window: "5:00 PM – 7:00 PM WAT", note: "Evening wind-down scroll" },
  ],
  audience: {
    description:
      "Young adults 18–29 across Lagos, Accra, and the diaspora — culturally rooted but globally plugged in. They value authenticity over polish and respond to storytelling that reflects their own experience.",
    interests: ["Afrobeats", "Nollywood", "Streetwear", "Diaspora culture", "Lagos nightlife"],
  },
  narrativeArc: [
    {
      step: 1,
      title: "The tease",
      description: "Short, mysterious clip. No reveal — just a feeling and a date.",
    },
    {
      step: 2,
      title: "The story",
      description: "Behind-the-scenes context. Why this project, why now, why it matters.",
    },
    {
      step: 3,
      title: "The drop",
      description: "Full reveal with the hero asset. Clear, direct call-to-action.",
    },
  ],
};

export default function StrategyTab({ data }) {
  const content = data || DEMO_DATA;

  return (
    <div style={styles.wrap} className="asa-fade-in">
      {/* Platforms */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Best platforms</h2>
        <div style={styles.platformGrid}>
          {content.platforms.map((p) => (
            <div key={p.name} style={styles.platformCard} className="asa-hover-card">
              <div style={styles.platformHeader}>
                <span style={styles.platformName}>{p.name}</span>
                <span
                  style={{
                    ...styles.fitBadge,
                    ...(p.fit === "Strongest" ? styles.fitBadgeTop : {}),
                  }}
                >
                  {p.fit}
                </span>
              </div>
              <p style={styles.platformReason}>{p.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Posting times + Audience side by side */}
      <section style={styles.twoColSection}>
        <div>
          <h2 style={styles.sectionTitle}>Posting windows</h2>
          <div style={styles.timesList}>
            {content.postingTimes.map((t, i) => (
              <div key={i} style={styles.timeRow} className="asa-hover-card">
                <div style={styles.timeDay}>{t.day}</div>
                <div style={styles.timeInfo}>
                  <span style={styles.timeWindow}>{t.window}</span>
                  <span style={styles.timeNote}>{t.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={styles.sectionTitle}>Audience</h2>
          <div style={styles.audienceCard} className="asa-hover-card">
            <p style={styles.audienceText}>{content.audience.description}</p>
            <div style={styles.interestList}>
              {content.audience.interests.map((interest) => (
                <span key={interest} style={styles.interestPill}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative arc */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Campaign narrative arc</h2>
        <div style={styles.arcContainer}>
          {content.narrativeArc.map((step, i) => (
            <div key={step.step} style={styles.arcStep} className="asa-hover-card">
              <div style={styles.arcStepHeader}>
                <span style={styles.arcStepNumber}>{step.step}</span>
                {i < content.narrativeArc.length - 1 && (
                  <span style={styles.arcConnector} />
                )}
              </div>
              <div style={styles.arcStepBody}>
                <p style={styles.arcStepTitle}>{step.title}</p>
                <p style={styles.arcStepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
  },
  section: {},
  sectionTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--asa-text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    marginBottom: "1.25rem",
  },
  platformGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.25rem",
  },
  platformCard: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.25rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
    transition: "transform 0.22s ease, box-shadow 0.22s ease",
  },
  platformHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    gap: "8px",
  },
  platformName: {
    fontSize: "15px",
    fontWeight: 700,
    color: "var(--asa-text-primary)",
  },
  fitBadge: {
    fontSize: "10px",
    color: "var(--asa-text-secondary)",
    border: "0.5px solid var(--asa-border)",
    padding: "4px 10px",
    borderRadius: "999px",
  },
  fitBadgeTop: {
    color: "var(--asa-orange)",
    borderColor: "var(--asa-orange-border)",
    background: "#fff3eb",
  },
  platformReason: {
    fontSize: "13px",
    color: "var(--asa-text-secondary)",
    lineHeight: 1.75,
  },
  twoColSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  timesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  timeRow: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1rem 1.1rem",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    boxShadow: "0 18px 42px rgba(31, 31, 31, 0.06)",
  },
  timeDay: {
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--asa-orange)",
    minWidth: "80px",
  },
  timeInfo: {
    display: "flex",
    flexDirection: "column",
  },
  timeWindow: {
    fontSize: "14px",
    color: "var(--asa-text-primary)",
  },
  timeNote: {
    fontSize: "12px",
    color: "var(--asa-text-muted)",
  },
  audienceCard: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.3rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
  },
  audienceText: {
    fontSize: "14px",
    color: "var(--asa-text-secondary)",
    lineHeight: 1.8,
    marginBottom: "1rem",
  },
  interestList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  interestPill: {
    fontSize: "12px",
    color: "var(--asa-text-secondary)",
    border: "0.5px solid var(--asa-border)",
    padding: "5px 14px",
    borderRadius: "999px",
    background: "#fff",
  },
  arcContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  arcStep: {
    display: "flex",
    gap: "18px",
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.2rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
    transition: "transform 0.22s ease, box-shadow 0.22s ease",
  },
  arcStepHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  arcStepNumber: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#fff3eb",
    border: "0.5px solid var(--asa-orange-border)",
    color: "var(--asa-orange)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 700,
    flexShrink: 0,
  },
  arcConnector: {
    width: "2px",
    flex: 1,
    background: "var(--asa-border)",
    minHeight: "20px",
    marginTop: "1px",
  },
  arcStepBody: {
    paddingBottom: "0.25rem",
  },
  arcStepTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "var(--asa-text-primary)",
    marginBottom: "6px",
  },
  arcStepDesc: {
    fontSize: "13px",
    color: "var(--asa-text-secondary)",
    lineHeight: 1.75,
  },
};

// Responsive
/*
@media (max-width: 900px) {
  .platform-grid { grid-template-columns: repeat(2, 1fr); }
  .two-col-section { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .platform-grid { grid-template-columns: 1fr; }
  .arc-step { flex-direction: column; align-items: stretch; }
}
*/