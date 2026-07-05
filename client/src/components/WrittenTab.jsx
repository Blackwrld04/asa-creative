import { useState } from "react";
import "../styles/globals.css";

const DEMO_DATA = {
  captions: [
    {
      id: "c1", length: "short", platform: "Instagram",
      text: '"Aso" na the vibe we been waiting for. Lagos sound, straight from the soul.',
      translations: {
        english: '"Aso" is finally here. Lagos sound. Pure soul.',
        pidgin: '"Aso" na the vibe we been waiting for. Lagos sound, straight from the soul.',
        yoruba: '"Aso" ni orin tí a ń retí. Ohùn Lagos, tó jáde lára ọkàn.',
        swahili: '"Aso" ndiyo wimbo tuliosubiri. Sauti ya Lagos, moja kwa moja kutoka moyoni.',
      },
    },
    {
      id: "c2", length: "medium", platform: "Twitter / X",
      text: 'This one different. "Aso" carries something personal. The kind of record you play when you need to remember who you are.',
      translations: {
        english: '"Aso" carries something personal. The kind of record you play when you need to remember who you are. Stream now.',
        pidgin: 'This one different. "Aso" carry something wey dey personal. The kind record wey you go play when you wan remember who you be.',
        yoruba: 'Èyí yàtọ̀. "Aso" gbé nǹkan tó jẹ́ ti ara ẹni. Irú ìwé tí a máa ń gbọ́ nígbà tí a bá fẹ́ rántí ẹni tí a jẹ́.',
        swahili: 'Hii ni tofauti. "Aso" inabeba kitu cha kibinafsi. Aina ya rekodi unayocheza unapohitaji kukumbuka wewe ni nani.',
      },
    },
    {
      id: "c3", length: "long", platform: "TikTok",
      text: 'Some songs are made to be heard. "Aso" was made to be felt. Three years in the making, rooted in where I\'m from.',
      translations: {
        english: 'Some songs are made to be heard. "Aso" was made to be felt. Three years in the making, rooted in where I\'m from.',
        pidgin: 'Some songs dem make am to dey hear. "Aso" dem make am to dey feel. Three years for making, rooted for where I come from.',
        yoruba: 'Àwọn orin kan ni a ṣe láti gbọ́. "Aso" ni a ṣe láti lero. Ọdún mẹta ni a ṣe rẹ̀, gbìn sí ibiti mo ti wá.',
        swahili: 'Nyimbo zingine zimetengenezwa kusikiwa. "Aso" imetengenezwa kuhisiwa. Miaka mitatu ya kutengeneza.',
      },
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

const LANGUAGES = [
  { id: "english", label: "English" },
  { id: "pidgin", label: "Pidgin" },
  { id: "yoruba", label: "Yoruba" },
  { id: "swahili", label: "Swahili" },
];

const PREVIEW_PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter / X" },
  { id: "tiktok", label: "TikTok" },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} style={styles.copyBtn}>
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function exportToPDF(content, projectName) {
  const printWindow = window.open("", "_blank");
  const html = `<!DOCTYPE html><html><head><title>${projectName || "Campaign"} — àṣà</title>
  <style>body{font-family:'Helvetica Neue',sans-serif;max-width:700px;margin:40px auto;color:#1f1f1f;line-height:1.6}
  h1{font-size:28px;font-weight:700;margin-bottom:4px}.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#e8622a;margin-bottom:8px;font-weight:700}
  .section{margin:32px 0}.section-title{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#888;font-weight:700;margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:6px}
  .caption{background:#f9f6f3;border-radius:12px;padding:16px;margin-bottom:12px}.caption-meta{font-size:11px;color:#bbb;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
  .hashtag{display:inline-block;background:#fff3eb;color:#e8622a;border-radius:999px;padding:4px 12px;font-size:12px;margin:3px}
  .hashtag-sec{display:inline-block;border:1px solid #eee;border-radius:999px;padding:4px 12px;font-size:12px;margin:3px;color:#666}
  .hook{font-style:italic;background:#f9f6f3;padding:16px;border-radius:12px;font-size:14px}
  .cta{padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px}
  .footer{margin-top:48px;font-size:11px;color:#bbb;text-align:center}</style></head><body>
  <div class="eyebrow">Campaign export — àṣà.ai</div><h1>${projectName || "Campaign"}</h1>
  <div class="section"><div class="section-title">Caption variations</div>
  ${content.captions.map(c => `<div class="caption"><div class="caption-meta">${c.length} · ${c.platform}</div><div>${c.text}</div></div>`).join("")}
  </div><div class="section"><div class="section-title">Hashtag strategy</div>
  <div>${content.hashtags.primary.map(t => `<span class="hashtag">${t}</span>`).join("")}</div>
  <div style="margin-top:8px">${content.hashtags.secondary.map(t => `<span class="hashtag-sec">${t}</span>`).join("")}</div></div>
  <div class="section"><div class="section-title">Script hook</div><div class="hook">${content.scriptHook}</div></div>
  <div class="section"><div class="section-title">Call-to-action options</div>
  ${content.ctas.map(c => `<div class="cta">→ ${c}</div>`).join("")}</div>
  <div class="footer">Generated by àṣà.ai — culturally-aware AI creative campaigns for African creators</div>
  </body></html>`;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); printWindow.close(); }, 400);
}

function InstagramPreview({ caption, hashtags, projectName }) {
  const handle = (projectName || "creator").toLowerCase().replace(/\s+/g, "_");
  return (
    <div style={pv.igWrap}>
      <div style={pv.igHeader}>
        <div style={pv.igAvatar}>{(projectName || "C").charAt(0).toUpperCase()}</div>
        <div>
          <div style={pv.igHandle}>{handle}</div>
          <div style={pv.igLocation}>Lagos, Nigeria</div>
        </div>
        <div style={{ marginLeft: "auto", color: "#888", fontSize: "18px" }}>•••</div>
      </div>
      <div style={pv.igImage}>
        <span style={{ fontSize: "32px" }}>🎵</span>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>Campaign visual</span>
      </div>
      <div style={pv.igActions}>
        <span style={pv.igAction}>🤍</span>
        <span style={pv.igAction}>💬</span>
        <span style={pv.igAction}>✈️</span>
        <span style={{ ...pv.igAction, marginLeft: "auto" }}>🔖</span>
      </div>
      <div style={pv.igLikes}>2,847 likes</div>
      <div style={pv.igCaption}>
        <span style={pv.igCaptionHandle}>{handle} </span>{caption}
      </div>
      <div style={pv.igHashtags}>{hashtags.primary.concat(hashtags.secondary).join(" ")}</div>
      <div style={pv.igTime}>2 HOURS AGO</div>
    </div>
  );
}

function TwitterPreview({ caption, hashtags, projectName }) {
  const handle = "@" + (projectName || "creator").toLowerCase().replace(/\s+/g, "");
  return (
    <div style={pv.twWrap}>
      <div style={pv.twHeader}>
        <div style={pv.twAvatar}>{(projectName || "C").charAt(0).toUpperCase()}</div>
        <div>
          <div style={pv.twName}>{projectName || "Creator"}</div>
          <div style={pv.twHandle}>{handle}</div>
        </div>
        <div style={{ marginLeft: "auto", color: "#1d9bf0", fontWeight: 700, fontSize: "18px" }}>𝕏</div>
      </div>
      <p style={pv.twText}>
        {caption}{" "}
        <span style={{ color: "#1d9bf0" }}>{hashtags.primary.join(" ")}</span>
      </p>
      <div style={pv.twImgBox}>
        <span style={{ fontSize: "28px" }}>🎵</span>
        <span style={{ fontSize: "12px", color: "#888", marginTop: "6px" }}>Campaign visual</span>
      </div>
      <div style={pv.twActions}>
        <span style={pv.twAction}>💬 84</span>
        <span style={pv.twAction}>🔁 312</span>
        <span style={pv.twAction}>🤍 2.1K</span>
        <span style={pv.twAction}>↗️</span>
      </div>
      <div style={pv.twTime}>10:34 PM · Jul 4, 2026</div>
    </div>
  );
}

function TikTokPreview({ caption, hashtags, projectName }) {
  const handle = "@" + (projectName || "creator").toLowerCase().replace(/\s+/g, "");
  const shortCaption = caption.length > 80 ? caption.slice(0, 80) + "..." : caption;
  return (
    <div style={pv.ttOuter}>
      <div style={pv.ttPhone}>
        <div style={pv.ttScreen}>
          <div style={pv.ttCenter}>
            <span style={{ fontSize: "36px" }}>🎵</span>
          </div>

          <div style={pv.ttSidebar}>
            <div style={pv.ttAvatarWrap}>
              <div style={pv.ttAvatar}>{(projectName || "C").charAt(0).toUpperCase()}</div>
              <div style={pv.ttFollowBtn}>+</div>
            </div>
            <div style={pv.ttSideBtn}>
              <div style={{ fontSize: "22px" }}>❤️</div>
              <div style={pv.ttSideCount}>47.2K</div>
            </div>
            <div style={pv.ttSideBtn}>
              <div style={{ fontSize: "22px" }}>💬</div>
              <div style={pv.ttSideCount}>1.8K</div>
            </div>
            <div style={pv.ttSideBtn}>
              <div style={{ fontSize: "22px" }}>↗️</div>
              <div style={pv.ttSideCount}>Share</div>
            </div>
          </div>

          <div style={pv.ttBottom}>
            <div style={pv.ttHandle}>{handle}</div>
            <div style={pv.ttCaption}>{shortCaption}</div>
            <div style={pv.ttTags}>
              {hashtags.primary.slice(0, 3).map(t => (
                <span key={t} style={pv.ttTag}>{t} </span>
              ))}
            </div>
            <div style={pv.ttSound}>♪ Original sound · {projectName || "Creator"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WrittenTab({ data, projectName }) {
  const content = data || DEMO_DATA;
  const [activeLang, setActiveLang] = useState("pidgin");
  const [previewPlatform, setPreviewPlatform] = useState("instagram");
  const [showPreview, setShowPreview] = useState(false);

  const getCaptionText = (caption) => {
    if (caption.translations && caption.translations[activeLang]) {
      return caption.translations[activeLang];
    }
    return caption.text;
  };

  const getPreviewCaption = () => {
    const platformMap = { instagram: "Instagram", twitter: "Twitter / X", tiktok: "TikTok" };
    const match = content.captions.find(c => c.platform === platformMap[previewPlatform]);
    return getCaptionText(match || content.captions[0]);
  };

  return (
    <div style={styles.wrap} className="asa-fade-in">

      <div style={styles.controlsRow} className="written-controls-row">
        <div style={styles.langToggle}>
          <span style={styles.langLabel}>Language:</span>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              style={{ ...styles.langBtn, ...(activeLang === lang.id ? styles.langBtnActive : {}) }}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <div style={styles.rightControls} className="written-right-controls">
          <button
            onClick={() => setShowPreview(!showPreview)}
            style={{ ...styles.previewToggleBtn, ...(showPreview ? styles.previewToggleBtnActive : {}) }}
          >
            {showPreview ? "✕ Close preview" : "Platform preview"}
          </button>
          <button onClick={() => exportToPDF(content, projectName)} style={styles.exportBtn}>
            ↓ Export PDF
          </button>
        </div>
      </div>

      {showPreview && (
        <div style={styles.previewSection} className="asa-fade-in">
          <div style={styles.previewHeader}>
            <h2 style={styles.sectionTitle}>Platform preview</h2>
            <div style={styles.previewPlatformTabs}>
              {PREVIEW_PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreviewPlatform(p.id)}
                  style={{ ...styles.platformTabBtn, ...(previewPlatform === p.id ? styles.platformTabBtnActive : {}) }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.previewContainer}>
            {previewPlatform === "instagram" && (
              <InstagramPreview caption={getPreviewCaption()} hashtags={content.hashtags} projectName={projectName} />
            )}
            {previewPlatform === "twitter" && (
              <TwitterPreview caption={getPreviewCaption()} hashtags={content.hashtags} projectName={projectName} />
            )}
            {previewPlatform === "tiktok" && (
              <TikTokPreview caption={getPreviewCaption()} hashtags={content.hashtags} projectName={projectName} />
            )}
          </div>
        </div>
      )}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Caption variations</h2>
        <div style={styles.captionsGrid} className="captions-grid">
          {content.captions.map((caption) => (
            <div key={caption.id} style={styles.captionCard} className="asa-hover-card">
              <div style={styles.captionHeader}>
                <span style={styles.captionMeta}>{caption.length} · {caption.platform}</span>
                <CopyButton text={getCaptionText(caption)} />
              </div>
              <p style={styles.captionText}>{getCaptionText(caption)}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Hashtag strategy</h2>
        <div style={styles.hashtagCard} className="asa-hover-card">
          <div style={styles.hashtagRow}>
            <span style={styles.hashtagLabel}>Primary</span>
            <div style={styles.hashtagList}>
              {content.hashtags.primary.map(tag => <span key={tag} style={styles.hashtagPillPrimary}>{tag}</span>)}
            </div>
          </div>
          <div style={styles.hashtagRow}>
            <span style={styles.hashtagLabel}>Secondary</span>
            <div style={styles.hashtagList}>
              {content.hashtags.secondary.map(tag => <span key={tag} style={styles.hashtagPillSecondary}>{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Script hook (first 3 seconds)</h2>
        <div style={styles.hookCard} className="asa-hover-card">
          <p style={styles.hookText}>{content.scriptHook}</p>
          <CopyButton text={content.scriptHook} />
        </div>
      </section>

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

const pv = {
  igWrap: { background: "#fff", borderRadius: "16px", border: "1px solid #efefef", width: "360px", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", overflow: "hidden" },
  igHeader: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px" },
  igAvatar: { width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#e8622a,#f4a634)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", flexShrink: 0 },
  igHandle: { fontSize: "13px", fontWeight: 700, color: "#000" },
  igLocation: { fontSize: "11px", color: "#888" },
  igImage: { width: "100%", height: "300px", background: "linear-gradient(135deg,#1a0c08,#7a2a10,#e8622a)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  igActions: { display: "flex", gap: "14px", padding: "10px 14px 4px", fontSize: "22px" },
  igAction: { cursor: "pointer" },
  igLikes: { padding: "0 14px", fontSize: "13px", fontWeight: 700, color: "#000", marginBottom: "4px" },
  igCaption: { padding: "0 14px", fontSize: "13px", color: "#000", lineHeight: 1.5, marginBottom: "4px" },
  igCaptionHandle: { fontWeight: 700 },
  igHashtags: { padding: "0 14px", fontSize: "12px", color: "#00376b", lineHeight: 1.5, marginBottom: "6px", wordBreak: "break-word" },
  igTime: { padding: "0 14px 12px", fontSize: "10px", color: "#8e8e8e", textTransform: "uppercase", letterSpacing: "0.05em" },
  twWrap: { background: "#fff", borderRadius: "16px", border: "1px solid #efefef", width: "400px", padding: "16px", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" },
  twHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  twAvatar: { width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg,#e8622a,#f4a634)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "16px", flexShrink: 0 },
  twName: { fontSize: "14px", fontWeight: 700, color: "#000" },
  twHandle: { fontSize: "13px", color: "#536471" },
  twText: { fontSize: "15px", color: "#000", lineHeight: 1.6, marginBottom: "12px" },
  twImgBox: { background: "linear-gradient(135deg,#1a0c08,#7a2a10)", borderRadius: "12px", height: "160px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "12px" },
  twActions: { display: "flex", gap: "24px", fontSize: "13px", color: "#536471", marginBottom: "10px" },
  twAction: { cursor: "pointer" },
  twTime: { fontSize: "13px", color: "#536471", borderTop: "1px solid #efefef", paddingTop: "10px" },
  ttOuter: { display: "flex", justifyContent: "center" },
  ttPhone: { width: "260px", background: "#000", borderRadius: "28px", overflow: "hidden", border: "6px solid #111", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" },
  ttScreen: { position: "relative", height: "460px", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  ttCenter: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.5 },
  ttSidebar: { position: "absolute", right: "10px", bottom: "90px", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" },
  ttAvatarWrap: { position: "relative", marginBottom: "4px" },
  ttAvatar: { width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg,#e8622a,#f4a634)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", border: "2px solid #fff" },
  ttFollowBtn: { position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", width: "18px", height: "18px", borderRadius: "50%", background: "#fe2c55", color: "#fff", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  ttSideBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" },
  ttSideCount: { color: "#fff", fontSize: "10px", fontWeight: 600 },
  ttBottom: { position: "absolute", bottom: 0, left: 0, right: "55px", padding: "12px", background: "linear-gradient(transparent, rgba(0,0,0,0.85))" },
  ttHandle: { color: "#fff", fontWeight: 700, fontSize: "13px", marginBottom: "4px" },
  ttCaption: { color: "#fff", fontSize: "12px", lineHeight: 1.4, marginBottom: "6px", wordBreak: "break-word" },
  ttTags: { marginBottom: "6px" },
  ttTag: { color: "#fff", fontSize: "11px", fontWeight: 600 },
  ttSound: { color: "rgba(255,255,255,0.75)", fontSize: "11px" },
};

const styles = {
  wrap: { display: "flex", flexDirection: "column", gap: "2.5rem" },
  controlsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" },
  langToggle: { display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "0.5px solid var(--asa-border-strong)", borderRadius: "999px", padding: "5px 5px 5px 12px", boxShadow: "0 8px 24px rgba(31,31,31,0.06)" },
  langLabel: { fontSize: "11px", fontWeight: 700, color: "var(--asa-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: "4px" },
  langBtn: { background: "transparent", border: "none", borderRadius: "999px", padding: "0.35rem 0.85rem", fontSize: "12px", fontWeight: 600, color: "var(--asa-text-muted)", transition: "all 0.18s" },
  langBtnActive: { background: "var(--asa-orange)", color: "#fff" },
  rightControls: { display: "flex", gap: "8px", alignItems: "center" },
  previewToggleBtn: { background: "#fff", border: "0.5px solid var(--asa-border-strong)", borderRadius: "999px", padding: "0.6rem 1.2rem", fontSize: "13px", fontWeight: 700, color: "var(--asa-text-primary)", boxShadow: "0 8px 24px rgba(31,31,31,0.06)", whiteSpace: "nowrap" },
  previewToggleBtnActive: { background: "#fff3eb", borderColor: "var(--asa-orange-border)", color: "var(--asa-orange)" },
  exportBtn: { background: "#fff", border: "0.5px solid var(--asa-border-strong)", borderRadius: "999px", padding: "0.6rem 1.2rem", fontSize: "13px", fontWeight: 700, color: "var(--asa-text-primary)", boxShadow: "0 8px 24px rgba(31,31,31,0.06)", whiteSpace: "nowrap" },
  previewSection: { background: "var(--asa-bg-card)", border: "0.5px solid var(--asa-border)", borderRadius: "var(--asa-radius-lg)", padding: "1.5rem", boxShadow: "0 24px 60px rgba(31,31,31,0.06)" },
  previewHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" },
  previewPlatformTabs: { display: "flex", gap: "6px", background: "var(--asa-bg)", border: "0.5px solid var(--asa-border-strong)", borderRadius: "999px", padding: "4px" },
  platformTabBtn: { background: "transparent", border: "none", borderRadius: "999px", padding: "0.4rem 1rem", fontSize: "12px", fontWeight: 600, color: "var(--asa-text-muted)", transition: "all 0.18s" },
  platformTabBtnActive: { background: "#fff", color: "var(--asa-text-primary)", boxShadow: "0 2px 8px rgba(31,31,31,0.08)" },
  previewContainer: { display: "flex", justifyContent: "center" },
  section: {},
  sectionTitle: { fontSize: "14px", fontWeight: 700, color: "var(--asa-text-secondary)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "1.25rem" },
  captionsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" },
  captionCard: { background: "var(--asa-bg-card)", borderRadius: "var(--asa-radius-lg)", padding: "1.4rem", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(31,31,31,0.06)", border: "0.5px solid var(--asa-border)", transition: "transform 0.22s ease, box-shadow 0.22s ease" },
  captionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem", gap: "0.75rem" },
  captionMeta: { fontSize: "11px", color: "var(--asa-text-faint)", textTransform: "uppercase", letterSpacing: "0.12em" },
  captionText: { fontSize: "14px", color: "var(--asa-text-primary)", lineHeight: 1.75, flex: 1 },
  copyBtn: { background: "#fff", border: "0.5px solid var(--asa-border-strong)", color: "var(--asa-text-secondary)", fontSize: "11px", padding: "0.4rem 0.9rem", borderRadius: "999px", flexShrink: 0, boxShadow: "0 18px 34px rgba(31,31,31,0.06)", transition: "all 0.2s", cursor: "pointer" },
  hashtagCard: { background: "var(--asa-bg-card)", border: "0.5px solid var(--asa-border)", borderRadius: "var(--asa-radius-lg)", padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem", boxShadow: "0 24px 60px rgba(31,31,31,0.06)" },
  hashtagRow: { display: "flex", flexDirection: "column", gap: "0.6rem" },
  hashtagLabel: { fontSize: "11px", color: "var(--asa-text-muted)", textTransform: "uppercase", letterSpacing: "0.12em" },
  hashtagList: { display: "flex", flexWrap: "wrap", gap: "8px" },
  hashtagPillPrimary: { background: "#fff3eb", color: "var(--asa-orange)", fontSize: "12px", padding: "6px 14px", borderRadius: "999px", border: "0.5px solid var(--asa-orange-border)" },
  hashtagPillSecondary: { background: "transparent", color: "var(--asa-text-secondary)", fontSize: "12px", padding: "6px 14px", borderRadius: "999px", border: "0.5px solid var(--asa-border)" },
  hookCard: { background: "var(--asa-bg-card)", border: "0.5px solid var(--asa-border)", borderRadius: "var(--asa-radius-lg)", padding: "1.4rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", boxShadow: "0 24px 60px rgba(31,31,31,0.06)" },
  hookText: { fontSize: "14px", color: "var(--asa-text-primary)", lineHeight: 1.8, fontStyle: "italic", flex: 1 },
  ctaList: { display: "flex", flexDirection: "column", gap: "10px" },
  ctaItem: { background: "var(--asa-bg-card)", border: "0.5px solid var(--asa-border)", borderRadius: "999px", padding: "0.9rem 1.1rem", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 18px 42px rgba(31,31,31,0.05)" },
  ctaDot: { width: "6px", height: "6px", borderRadius: "50%", background: "var(--asa-orange)", flexShrink: 0 },
  ctaText: { fontSize: "14px", color: "var(--asa-text-primary)", flex: 1 },
};
