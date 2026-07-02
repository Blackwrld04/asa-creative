import { useState } from "react";
import WrittenTab from "./WrittenTab";
import VisualTab from "./VisualTab";
import StrategyTab from "./StrategyTab";
import "../styles/globals.css";

/**
 * CampaignDashboard
 * The main results shell shown after the onboarding form is submitted.
 * Holds the three output tabs and the campaign summary header.
 *
 * Props:
 *  - campaignData: the generated campaign object from the backend
 *      { projectName, creatorType, culturalContext, tone, written, visual, strategy }
 *  - onNewCampaign: callback to reset and start over
 */

const TABS = [
  { id: "written", label: "Written content", icon: "✍️" },
  { id: "visual", label: "Visual concepts", icon: "🎨" },
  { id: "strategy", label: "Strategy", icon: "📊" },
];

export default function CampaignDashboard({ campaignData, onNewCampaign, onRegenerate }) {
  const [activeTab, setActiveTab] = useState("written");

  if (!campaignData) {
    return (
      <div style={styles.emptyState}>
        <p>No campaign data yet. Go back and generate one.</p>
      </div>
    );
  }

  const { projectName, creatorType, culturalContext, tone } = campaignData;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.logo}>
            <div style={styles.logoMark}>Àṣà</div>
            <span style={styles.logoText}>
              àṣà<span style={{ color: "var(--asa-orange)" }}>.</span>ai
            </span>
          </div>
          <button onClick={onNewCampaign} style={styles.newBtn}>
            + New campaign
          </button>
        </div>

        {/* Campaign summary header */}
        <div style={styles.summaryCard} className="asa-card">
          <div>
            <p style={styles.summaryEyebrow}>Your campaign</p>
            <h1 style={styles.summaryTitle}>{projectName || "Untitled project"}</h1>
            <div style={styles.metaRow}>
              <span style={styles.metaPill}>{creatorType}</span>
              <span style={styles.metaPill}>{culturalContext}</span>
              <span style={styles.metaPill}>{tone}</span>
            </div>
          </div>
          <button style={styles.regenBtn} onClick={onRegenerate || onNewCampaign}>↻ Regenerate</button>
        </div>

        {/* Tab navigation */}
        <div style={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab.id ? styles.tabButtonActive : {}),
              }}
            >
              <span style={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={styles.tabContent} className="asa-fade-in" key={activeTab}>
          {activeTab === "written" && (
            <WrittenTab data={campaignData.written} />
          )}
          {activeTab === "visual" && <VisualTab data={campaignData.visual} />}
          {activeTab === "strategy" && (
            <StrategyTab data={campaignData.strategy} />
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--asa-bg)",
    padding: "2rem 3rem 4rem",
  },
  container: {
    width: "100%",
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.75rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoMark: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #e8622a 0%, #f4a634 100%)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "13px",
    color: "#fff",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--asa-text-primary)",
  },
  newBtn: {
    background: "#fff",
    border: "0.5px solid var(--asa-border-strong)",
    color: "var(--asa-text-primary)",
    padding: "0.75rem 1.15rem",
    borderRadius: "999px",
    fontSize: "13px",
    boxShadow: "0 14px 34px rgba(31, 31, 31, 0.08)",
  },
  summaryCard: {
    background: "var(--asa-bg-elevated)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.75rem 1.9rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "1.75rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
  },
  summaryEyebrow: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--asa-orange)",
    marginBottom: "0.45rem",
    fontWeight: 700,
  },
  summaryTitle: {
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "-0.4px",
    marginBottom: "0.85rem",
    color: "var(--asa-text-primary)",
  },
  metaRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  metaPill: {
    background: "#fef5f0",
    border: "0.5px solid var(--asa-orange-border)",
    borderRadius: "999px",
    padding: "0.45rem 0.95rem",
    fontSize: "12px",
    color: "var(--asa-text-primary)",
    textTransform: "capitalize",
  },
  regenBtn: {
    background: "#fff",
    border: "0.5px solid var(--asa-border-strong)",
    color: "var(--asa-text-primary)",
    padding: "0.65rem 1.15rem",
    borderRadius: "999px",
    fontSize: "13px",
    whiteSpace: "nowrap",
    boxShadow: "0 14px 34px rgba(31, 31, 31, 0.08)",
  },
  tabBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "1.75rem",
    background: "transparent",
    padding: "4px",
  },
  tabButton: {
    flex: 1,
    background: "#fff",
    border: "0.5px solid var(--asa-border)",
    color: "var(--asa-text-muted)",
    padding: "0.85rem 1rem",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.22s ease",
    boxShadow: "0 18px 48px rgba(31, 31, 31, 0.05)",
  },
  tabButtonActive: {
    background: "#ffe7dc",
    color: "var(--asa-orange)",
    borderColor: "rgba(232, 98, 42, 0.2)",
  },
  tabButtonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 22px 56px rgba(31, 31, 31, 0.08)",
  },
  tabIcon: {
    fontSize: "14px",
  },
  tabContent: {
    minHeight: "300px",
    background: "transparent",
  },
  emptyState: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--asa-text-muted)",
    background: "var(--asa-bg)",
  },
};
