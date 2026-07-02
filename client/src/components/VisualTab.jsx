import "../styles/globals.css";

const DEMO_DATA = {
  moodDescription:
    "Warm amber dusk light. Ankara-pattern geometric overlays bleeding into the frame edges. Subject framed against a soft-focus Lagos skyline silhouette. Grain and warmth over polish — this should feel lived-in, not staged.",
  colorPalette: [
    { hex: "#E8622A", name: "Sunset clay", meaning: "Warmth, homecoming" },
    { hex: "#F4A634", name: "Harmattan gold", meaning: "Energy, celebration" },
    { hex: "#1A1208", name: "Night soil", meaning: "Grounding, depth" },
    { hex: "#C44536", name: "Adire rust", meaning: "Tradition, craft" },
  ],
  heroImageUrl: null,
  shotList: [
    {
      title: "Opening shot",
      description: "Close-up on hands, traditional fabric texture, slow pull-back to reveal full scene.",
    },
    {
      title: "Mid sequence",
      description: "Wide shot of Lagos street life, natural movement, handheld camera energy.",
    },
    {
      title: "Hero moment",
      description: "Subject centered, golden-hour backlight, direct eye contact with camera.",
    },
    {
      title: "Closing frame",
      description: "Text overlay reveal on dark background, logo lockup, fade to black.",
    },
  ],
};

export default function VisualTab({ data }) {
  const content = data || DEMO_DATA;

  return (
    <div style={styles.wrap} className="asa-fade-in">
      {/* Mood description */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Visual mood</h2>
        <div style={styles.moodCard} className="asa-hover-card">
          <p style={styles.moodText}>{content.moodDescription}</p>
        </div>
      </section>

      {/* Hero image + palette side by side */}
      <section style={styles.twoColSection}>
        <div style={styles.heroImageWrap}>
          <h2 style={styles.sectionTitle}>Hero concept</h2>
          <div style={styles.heroImageBox}>
            {content.heroImageUrl ? (
              <img
                src={content.heroImageUrl}
                alt="AI-generated campaign concept"
                style={styles.heroImage}
              />
            ) : (
              <div style={styles.heroPlaceholder}>
                <span style={styles.heroPlaceholderIcon}>🎨</span>
                <span style={styles.heroPlaceholderText}>
                  Concept image renders here
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={styles.paletteWrap}>
          <h2 style={styles.sectionTitle}>Color palette</h2>
          <div style={styles.paletteList}>
            {content.colorPalette.map((color) => (
              <div key={color.hex} style={styles.colorRow} className="asa-hover-card">
                <div
                  style={{
                    ...styles.colorSwatch,
                    background: color.hex,
                  }}
                />
                <div style={styles.colorInfo}>
                  <span style={styles.colorName}>{color.name}</span>
                  <span style={styles.colorMeaning}>{color.meaning}</span>
                </div>
                <span style={styles.colorHex}>{color.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shot list */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Shot list</h2>
        <div style={styles.shotGrid}>
          {content.shotList.map((shot, i) => (
            <div key={i} style={styles.shotCard} className="asa-hover-card">
              <span style={styles.shotNumber}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={styles.shotTitle}>{shot.title}</p>
                <p style={styles.shotDesc}>{shot.description}</p>
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
  moodCard: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.4rem",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.06)",
  },
  moodText: {
    fontSize: "15px",
    color: "var(--asa-text-primary)",
    lineHeight: 1.8,
  },
  twoColSection: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "1.5rem",
  },
  heroImageBox: {
    borderRadius: "var(--asa-radius-lg)",
    overflow: "hidden",
    border: "0.5px solid var(--asa-border)",
    boxShadow: "0 24px 60px rgba(31, 31, 31, 0.08)",
  },
  heroImage: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    display: "block",
  },
  heroPlaceholder: {
    width: "100%",
    height: "340px",
    background: "linear-gradient(135deg, #fff3eb 0%, #ffe8d9 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
  },
  heroPlaceholderIcon: {
    fontSize: "36px",
  },
  heroPlaceholderText: {
    fontSize: "14px",
    color: "var(--asa-text-secondary)",
  },
  paletteList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  colorRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "0.85rem 0.95rem",
    boxShadow: "0 18px 40px rgba(31, 31, 31, 0.06)",
    transition: "transform 0.22s ease, box-shadow 0.22s ease",
  },
  colorSwatch: {
    width: "40px",
    height: "40px",
    borderRadius: "14px",
    flexShrink: 0,
    border: "0.5px solid rgba(0,0,0,0.06)",
  },
  colorInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  colorName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--asa-text-primary)",
  },
  colorMeaning: {
    fontSize: "12px",
    color: "var(--asa-text-muted)",
  },
  colorHex: {
    fontSize: "12px",
    color: "var(--asa-text-faint)",
    fontFamily: "monospace",
  },
  shotGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  shotCard: {
    background: "var(--asa-bg-card)",
    border: "0.5px solid var(--asa-border)",
    borderRadius: "var(--asa-radius-lg)",
    padding: "1.1rem",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    transition: "transform 0.22s ease, box-shadow 0.22s ease",
  },
  shotNumber: {
    fontSize: "22px",
    fontWeight: 500,
    color: "var(--asa-orange)",
    opacity: 0.5,
    flexShrink: 0,
  },
  shotTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "var(--asa-text-primary)",
    marginBottom: "4px",
  },
  shotDesc: {
    fontSize: "13px",
    color: "var(--asa-text-secondary)",
    lineHeight: 1.55,
  },
};

// Responsive
/*
@media (max-width: 900px) {
  .two-col-section { grid-template-columns: 1fr; }
  .hero-image, .hero-placeholder { height: 240px; }
}
@media (max-width: 600px) {
  .shot-grid { grid-template-columns: 1fr; }
}
*/