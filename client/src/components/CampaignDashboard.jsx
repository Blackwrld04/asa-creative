import { useState } from "react";
import WrittenTab from "./WrittenTab";
import VisualTab from "./VisualTab";
import StrategyTab from "./StrategyTab";
import CampaignHistory from "./CampaignHistory";
import CreatorProfile from "./CreatorProfile";
import "../styles/globals.css";

const TABS = [
  { id: "written", label: "Written content" },
  { id: "visual", label: "Visual concepts" },
  { id: "strategy", label: "Strategy" },
];

export default function CampaignDashboard({
  campaignData,
  onNewCampaign,
  onRegenerate,
  onRestoreFromHistory,
}) {
  const [activeTab, setActiveTab] = useState("written");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!campaignData) {
    return (
      <div style={s.emptyState}>
        <p>No campaign data yet. Go back and generate one.</p>
      </div>
    );
  }

  const { projectName, creatorType, culturalContext, tone } = campaignData;

  const handleShare = () => {
    try {
      const payload = {
        projectName: campaignData.projectName,
        creatorType: campaignData.creatorType,
        culturalContext: campaignData.culturalContext,
        tone: campaignData.tone,
        written: campaignData.written,
        visual: campaignData.visual,
        strategy: campaignData.strategy,
      };
      const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
      const shareUrl = `${window.location.origin}${window.location.pathname}?campaign=${encoded}`;
      navigator.clipboard?.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    /* className drives mobile padding via CSS */
    <div className="dashboard-page">
      <CampaignHistory
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onRestore={(entry) => { onRestoreFromHistory(entry); setHistoryOpen(false); }}
      />
      <CreatorProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onApply={() => setProfileOpen(false)}
      />

      <div style={s.container}>

        {/* Top bar — className controls mobile layout */}
        <div className="dashboard-top-bar">
          <div style={s.logo}>
            <div style={s.logoMark}>Àṣà</div>
            <span style={s.logoText}>
              àṣà<span style={{ color: "var(--asa-orange)" }}>.</span>ai
            </span>
          </div>

          {/* Actions — className drives mobile wrap */}
          <div className="dashboard-actions">
            <button onClick={() => setHistoryOpen(true)} style={s.iconBtn}>
              History
            </button>
            <button onClick={() => setProfileOpen(true)} style={s.iconBtn}>
              Profile
            </button>
            <button
              onClick={handleShare}
              style={{ ...s.iconBtn, ...(shareCopied ? s.iconBtnSuccess : {}) }}
            >
              {shareCopied ? "✓ Copied!" : "Share"}
            </button>
            <button onClick={onNewCampaign} style={s.newBtn}>
              + New
            </button>
          </div>
        </div>

        {shareCopied && (
          <div style={s.shareBanner} className="asa-fade-in">
            Share link copied — paste it anywhere to share this campaign
          </div>
        )}

        {/* Summary card — className handles mobile stacking */}
        <div className="asa-card dashboard-summary-card" style={s.summaryCardBase}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={s.summaryEyebrow}>Your campaign</p>
            <h1 className="dashboard-summary-title">
              {projectName || "Untitled project"}
            </h1>
            <div style={s.metaRow}>
              <span style={s.metaPill}>{creatorType}</span>
              <span style={s.metaPill}>{culturalContext}</span>
              <span style={s.metaPill}>{tone}</span>
            </div>
          </div>
          <button style={s.regenBtn} onClick={onRegenerate || onNewCampaign}>
            ↻ Regenerate
          </button>
        </div>

        {/* Tab bar — className gives horizontal scroll on mobile */}
        <div className="dashboard-tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...s.tabButton,
                ...(activeTab === tab.id ? s.tabButtonActive : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="asa-fade-in" key={activeTab} style={{ minHeight: "300px" }}>
          {activeTab === "written" && (
            <WrittenTab data={campaignData.written} projectName={projectName} />
          )}
          {activeTab === "visual" && <VisualTab data={campaignData.visual} />}
          {activeTab === "strategy" && (
            <StrategyTab data={campaignData.strategy} culturalContext={culturalContext} />
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { width: "100%", margin: "0 auto" },
  logo: { display: "flex", alignItems: "center", gap: "12px" },
  logoMark: {
    width: "36px", height: "36px",
    background: "linear-gradient(135deg, #e8622a 0%, #f4a634 100%)",
    borderRadius: "14px", display: "flex", alignItems: "center",
    justifyContent: "center", fontWeight: 700, fontSize: "13px", color: "#fff",
    flexShrink: 0,
  },
  logoText: { fontSize: "16px", fontWeight: 700, color: "var(--asa-text-primary)" },
  iconBtn: {
    background: "#fff",
    border: "0.5px solid var(--asa-border-strong)",
    color: "var(--asa-text-primary)",
    padding: "0.6rem 0.9rem",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    boxShadow: "0 8px 24px rgba(31,31,31,0.06)",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    whiteSpace: "nowrap",
  },
  iconBtnSuccess: {
    background: "#f0faf5",
    borderColor: "rgba(34,160,107,0.3)",
    color: "#22a06b",
  },
  newBtn: {
    background: "var(--asa-orange)",
    border: "none",
    color: "#fff",
    padding: "0.65rem 1.1rem",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 700,
    boxShadow: "0 8px 24px rgba(232,98,42,0.25)",
    whiteSpace: "nowrap",
  },
  shareBanner: {
    background: "#f0faf5",
    border: "0.5px solid rgba(34,160,107,0.3)",
    color: "#22a06b",
    borderRadius: "10px",
    padding: "0.75rem 1.25rem",
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "1.25rem",
  },
  summaryCardBase: {
    padding: "1.75rem 1.9rem",
    marginBottom: "1.75rem",
  },
  summaryEyebrow: {
    fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em",
    color: "var(--asa-orange)", marginBottom: "0.45rem", fontWeight: 700,
  },
  metaRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaPill: {
    background: "#fef5f0", border: "0.5px solid var(--asa-orange-border)",
    borderRadius: "999px", padding: "0.4rem 0.85rem",
    fontSize: "12px", color: "var(--asa-text-primary)", textTransform: "capitalize",
  },
  regenBtn: {
    background: "#fff", border: "0.5px solid var(--asa-border-strong)",
    color: "var(--asa-text-primary)", padding: "0.65rem 1.1rem",
    borderRadius: "999px", fontSize: "13px", whiteSpace: "nowrap",
    boxShadow: "0 14px 34px rgba(31,31,31,0.08)", flexShrink: 0,
  },
  tabButton: {
    flex: "0 0 auto",
    background: "#fff", border: "0.5px solid var(--asa-border)",
    color: "var(--asa-text-muted)", padding: "0.8rem 1.2rem",
    borderRadius: "999px", fontSize: "13px", fontWeight: 600,
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "6px", transition: "all 0.22s ease",
    boxShadow: "0 18px 48px rgba(31,31,31,0.05)", whiteSpace: "nowrap",
  },
  tabButtonActive: {
    background: "#ffe7dc", color: "var(--asa-orange)",
    borderColor: "rgba(232,98,42,0.2)",
  },
  emptyState: {
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", color: "var(--asa-text-muted)", background: "var(--asa-bg)",
  },
};