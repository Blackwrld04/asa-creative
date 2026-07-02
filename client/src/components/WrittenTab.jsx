import { useState } from "react";
import "../styles/globals.css";

const DEMO_DATA = {
  captions: [
    {
      id: "c1",
      length: "short",
      platform: "Instagram",
      text: 'E don drop! 🔥 "Aso" na the vibe we been waiting for. Lagos sound, straight from the soul.',
    },
    {
      id: "c2",
      length: "medium",
      platform: "Twitter / X",
      text: "This one different. \"Aso\" carries something personal — the kind of record you play when you need to remember who you are. Stream am now, share with who go feel am.",
    },
    {
      id: "c3",
      length: "long",
      platform: "TikTok",
      text: "Some songs are made to be heard. \"Aso\" was made to be felt. Three years in the making, rooted in where I'm from, built for where we're going. This is more than a single — it's a piece of home, wrapped in sound. Out now everywhere.",
    },
  ],
  hashtags: {
    primary: ["#AsoTheSingle", "#NaijaMusic", "#Afrobeats"],
    secondary: ["#LagosSound", "#NewMusicFriday", "#AfricanArtist", "#NaijaTwitter"],
  },
  scriptHook: '"You don\'t know who I am until you\'ve heard where I\'m from." — open on a close-up shot, Lagos street sounds bleeding into the beat drop.',
  ctas: [
    "Stream 'Aso' now — link in bio",
    "Tag someone who needs to hear this",
    "Add to your weekend playlist",
  ],
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      style={styles.copyBtn}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

export default function WrittenTab({ data }) {
  const content = data || DEMO_DATA;

  return (
    <div style={styles.wrap} className="asa-fade-in">
      {/* Captions */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Caption variations</h2>
        <div style={styles.captionsGrid}>
          {content.captions.map((caption) => (
            <div key={caption.id} style={styles.captionCard} className="asa-hover-card">
              <div style={styles.captionHeader}>
                <span style={styles.captionMeta}>
                  {caption.length} · {caption.platform}
                </span>
                <CopyButton text={caption.text} />
              </div>
              <p style={styles.captionText}>{caption.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hashtags */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Hashtag strategy</h2>
        <div style={styles.hashtagCard} className="asa-hover-card">
          <div style={styles.hashtagRow}>
            <span style={styles.hashtagLabel}>Primary</span>
            <div style={styles.hashtagList}>
              {content.hashtags.primary.map((tag) => (
                <span key={tag} style={styles.hashtagPillPrimary}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.hashtagRow}>
            <span style={styles.hashtagLabel}>Secondary</span>
            <div style={styles.hashtagList}>
              {content.hashtags.secondary.map((tag) => (
                <span key={tag} style={styles.hashtagPillSecondary}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Script hook */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Script hook (first 3 seconds)</h2>
        <div style={styles.hookCard} className="asa-hover-card">
          <p style={styles.hookText}>{content.scriptHook}</p>
          <CopyButton text={content.scriptHook} />
        </div>
      </section>

      {/* CTAs */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Call-to-action options</h2>
        <div style={styles.ctaList}>
          {content.ctas.map((cta, i) => (
            <div key={i} style={styles.ctaItem} className="asa-hover-card">
              <span style={styles.ctaDot} />
              <span style={styles.ctaText}>{cta}</span>
              <CopyButton text={cta} />
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
  captionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.25rem",
  },
  captionCard: {
    background: "var(--asa-bg-card)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.4rem",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
    border: "0.5px solid var(--asa-border)",
  },
  captionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.8rem",
    gap: "0.75rem",
  },
  captionMeta: {
    fontSize: "11px",
    color: "var(--asa-text-faint)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  captionText: {
    fontSize: "14px",
    color: "var(--asa-text-primary)",
    lineHeight: 1.75,
    flex: 1,
  },
  copyBtn: {
    background: "#fff",
    border: "0.5px solid var(--asa-border-strong)",
    color: "var(--asa-text-secondary)",
    fontSize: "11px",
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    flexShrink: 0,
    boxShadow: "0 18px 34px rgba(31, 31, 31, 0.06)",
    transition: "all 0.2s",
    cursor: "pointer",
  },
  hashtagCard: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.4rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
  },
  hashtagRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  hashtagLabel: {
    fontSize: "11px",
    color: "var(--asa-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  hashtagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  hashtagPillPrimary: {
    background: "#fff3eb",
    color: "var(--asa-orange)",
    fontSize: "12px",
    padding: "6px 14px",
    borderRadius: "999px",
    border: "0.5px solid var(--asa-orange-border)",
  },
  hashtagPillSecondary: {
    background: "transparent",
    color: "var(--asa-text-secondary)",
    fontSize: "12px",
    padding: "6px 14px",
    borderRadius: "999px",
    border: "0.5px solid var(--asa-border)",
  },
  hookCard: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.4rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "1rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
  },
  hookText: {
    fontSize: "14px",
    color: "var(--asa-text-primary)",
    lineHeight: 1.8,
    fontStyle: "italic",
    flex: 1,
  },
  ctaList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  ctaItem: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "999px",
    padding: "0.9rem 1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 18px 42px rgba(31, 31, 31, 0.05)",
  },
  ctaDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--asa-orange)",
    flexShrink: 0,
  },
  ctaText: {
    fontSize: "14px",
    color: "var(--asa-text-primary)",
    flex: 1,
  },
};

// Responsive
const responsiveStyles = `
@media (max-width: 1024px) {
  .captions-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .captions-grid { grid-template-columns: 1fr; }
  .hook-card { flex-direction: column; align-items: stretch; }
}
`;