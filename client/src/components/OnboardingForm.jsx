import { useState } from "react";
import "../styles/globals.css";

const CREATOR_TYPES = [
  { id: "music", num: "01", label: "Music artist", desc: "Singles, EPs, drops" },
  { id: "film", num: "02", label: "Filmmaker", desc: "Shorts, features, series" },
  { id: "brand", num: "03", label: "Brand / business", desc: "Launches, identity" },
  { id: "social", num: "04", label: "Content creator", desc: "Reels, audience-building" },
];

const CULTURAL_CONTEXTS = [
  { id: "nigeria-yoruba", label: "Nigeria >> Yoruba" },
  { id: "nigeria-igbo", label: "Nigeria >> Igbo" },
  { id: "nigeria-hausa", label: "Nigeria >> Hausa" },
  { id: "nigeria-pidgin", label: "Nigeria >> Pidgin (general)" },
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

const STEP_CONTENT = {
  1: {
    eyebrow: "Let's get started",
    heading: ["What do", "you create?"],
    sideTitle: "Every craft has a voice.",
    sideSub: "This tells àṣà how to tailor every output to yours.",
  },
  2: {
    eyebrow: "Tell us more",
    heading: ["What's the", "project?"],
    sideTitle: "Detail makes it real.",
    sideSub: "The richer the brief, the sharper the campaign àṣà builds.",
  },
  3: {
    eyebrow: "Final touch",
    heading: ["Your cultural", "voice"],
    sideTitle: "Rooted, not generic.",
    sideSub: "àṣà weaves this into language, visuals, and strategy.",
  },
};

// ── LOCAL IMAGE MAP ────────────────────────────────────────────────────────
// 🔴 CHANGE THESE PATHS TO MATCH YOUR ACTUAL IMAGE FILENAMES
const LOCAL_IMAGES = {
  1: "/image/form-bg-1.jpg",
  2: "/image/form-bg-2.jpg",
  3: "/image/form-bg-3.jpg",
  how: "/image/info-how.jpg",
  about: "/image/info-about.jpg",
  examples: "/image/info-examples.jpg",
};

function getLocalImage(key) {
  return LOCAL_IMAGES[key] || "/image/fallback.jpg";
}

export default function OnboardingForm({
  onComplete,
  initialStep = 1,
  initialFormData = {
    creatorType: "",
    projectName: "",
    projectDescription: "",
    culturalContext: "",
    tone: "",
  },
  onFormStateChange,
}) {
  const [view, setView] = useState("form");
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState(initialFormData);

  const totalSteps = 3;
  const content = STEP_CONTENT[step];

  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      onFormStateChange?.({ step, formData: next });
      return next;
    });
  };

  const setStepAndNotify = (nextStep) => {
    setStep(nextStep);
    onFormStateChange?.({ step: nextStep, formData });
  };

  const canProceed = () => {
    if (step === 1) return formData.creatorType !== "";
    if (step === 2)
      return (
        formData.projectName.trim() !== "" &&
        formData.projectDescription.trim() !== ""
      );
    if (step === 3) return formData.culturalContext !== "" && formData.tone !== "";
    return false;
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStepAndNotify(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStepAndNotify(step - 1);
  };

  const getImageKey = () => {
    if (view === "form") return step;
    return view;
  };

  const infoPages = {
    how: {
      title: "How it works",
      subtitle: "Four steps to a culturally‑aware campaign",
      sections: [
        {
          icon: "🎨",
          title: "1. Tell us your craft",
          desc: "Choose what you create – music, film, brand, or content. This sets the creative direction.",
        },
        {
          icon: "📝",
          title: "2. Describe your project",
          desc: "Give àṣà the brief – the more detail, the sharper the output.",
        },
        {
          icon: "🌍",
          title: "3. Set your cultural voice",
          desc: "Select your cultural context and tone. àṣà uses this to make every word and visual resonate.",
        },
        {
          icon: "🚀",
          title: "4. Launch your campaign",
          desc: "Get a full creative package: strategy, copy, visuals, and more – all tailored to you.",
        },
      ],
    },
    about: {
      title: "About àṣà",
      subtitle: "Creativity rooted in culture",
      paragraphs: [
        "àṣà is an AI creative companion that helps African artists, brands, and storytellers launch campaigns that feel authentic and impactful.",
        "We believe that the best creative work is deeply connected to its cultural roots – language, symbols, rhythm, and identity. àṣà uses advanced language models and image generation to weave these elements into every output.",
        "Whether you're dropping a single, launching a product, or building a movement, àṣà gives you the creative edge to stand out – while staying true to your voice.",
      ],
      stats: [
        { label: "Cultural contexts", value: "12+" },
        { label: "Tones supported", value: "8" },
        { label: "Campaigns launched", value: "350+" },
        { label: "Average time saved", value: "4.5hrs" },
        { label: "Languages supported", value: "7" },
        { label: "Team members", value: "6" },
        { label: "Countries covered", value: "14" },
        { label: "Campaign types", value: "5" },
      ],
    },
    examples: {
      title: "Examples",
      subtitle: "See what àṣà can do",
      items: [
        {
          title: "Aso (music single)",
          context: "Nigeria – Yoruba",
          tone: "Hype / energetic",
          result: "Campaign strategy, press release, social captions, visual moodboard, and tagline.",
        },
        {
          title: "Oja (brand launch)",
          context: "Nigeria – Pidgin",
          tone: "Bold / confident",
          result: "Brand manifesto, product description, website copy, and launch email sequence.",
        },
        {
          title: "Homecoming (film)",
          context: "Ghana",
          tone: "Intimate / personal",
          result: "Film synopsis, director's note, poster concept, and trailer script.",
        },
        {
          title: "Sisi (content series)",
          context: "Kenya",
          tone: "Playful / fun",
          result: "Episode outlines, social media plan, character bios, and visual style guide.",
        },
        {
          title: "Eko (city campaign)",
          context: "Nigeria – Yoruba + Pidgin",
          tone: "Premium / elevated",
          result: "City branding guide, investor deck, tourism tagline, and promotional visuals.",
        },
        {
          title: "Afrobeat (playlist launch)",
          context: "Nigeria – Hausa + Yoruba",
          tone: "Raw / authentic",
          result: "Playlist description, artist interviews, Instagram carousel, and press pitch.",
        },
        {
          title: "Mama (social impact)",
          context: "South Africa",
          tone: "Intimate / personal",
          result: "Story narrative, donation campaign copy, social posts, and impact report.",
        },
        {
          title: "Safari (travel brand)",
          context: "Kenya",
          tone: "Hype / energetic",
          result: "Travel itinerary, Instagram reels script, landing page copy, and email sequence.",
        },
      ],
    },
  };

  const renderInfoPage = (pageKey) => {
    const page = infoPages[pageKey];
    if (!page) return null;

    return (
      <div style={styles.infoContainer} className="asa-fade-in" key={pageKey}>
        <div style={styles.infoHeader}>
          <h1 style={styles.infoTitle}>{page.title}</h1>
          <p style={styles.infoSubtitle}>{page.subtitle}</p>
        </div>

        {pageKey === "how" && (
          <div style={styles.howGrid}>
            {page.sections.map((s, i) => (
              <div key={i} style={styles.howCard}>
                <div style={styles.howIcon}>{s.icon}</div>
                <h3 style={styles.howCardTitle}>{s.title}</h3>
                <p style={styles.howCardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {pageKey === "about" && (
          <>
            <div style={styles.aboutText}>
              {page.paragraphs.map((p, i) => (
                <p key={i} style={styles.aboutParagraph}>{p}</p>
              ))}
            </div>
            <div style={styles.statsGrid}>
              {page.stats.map((stat, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {pageKey === "examples" && (
          <div style={styles.examplesGrid}>
            {page.items.map((item, i) => (
              <div key={i} style={styles.exampleCard}>
                <h3 style={styles.exampleTitle}>{item.title}</h3>
                <div style={styles.exampleMeta}>
                  <span style={styles.exampleTag}>{item.context}</span>
                  <span style={styles.exampleTag}>{item.tone}</span>
                </div>
                <p style={styles.exampleResult}>{item.result}</p>
              </div>
            ))}
          </div>
        )}

        <button style={styles.backToFormBtn} onClick={() => setView("form")}>
          ← Back to the form
        </button>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <img
        src={getLocalImage(getImageKey())}
        alt=""
        style={styles.bgImage}
        key={`img-${getImageKey()}`}
      />
      <div style={styles.overlay} />

      <div style={styles.content}>
        {/* Nav */}
        <div style={styles.nav}>
          <div style={styles.logo}>
            <div style={styles.logoMark}>Àṣà</div>
            <span style={styles.logoText}>àṣà.ai</span>
          </div>
          <div style={styles.navLinks}>
            <span
              style={{
                ...styles.navLink,
                ...(view === "how" ? styles.navLinkActive : {}),
              }}
              onClick={() => setView("how")}
            >
              How it works
            </span>
            <span
              style={{
                ...styles.navLink,
                ...(view === "examples" ? styles.navLinkActive : {}),
              }}
              onClick={() => setView("examples")}
            >
              Examples
            </span>
            <span
              style={{
                ...styles.navLink,
                ...(view === "about" ? styles.navLinkActive : {}),
              }}
              onClick={() => setView("about")}
            >
              About
            </span>
          </div>
          <div style={styles.stepBadge}>
            {view === "form" ? `Step ${step} of ${totalSteps}` : "Info"}
          </div>
        </div>

        {view === "form" ? (
          <>
            <div style={styles.middle} className="asa-fade-in" key={`mid-${step}`}>
              <div style={styles.headlineBlock}>
                <p style={styles.eyebrow}>{content.eyebrow}</p>
                <h1 style={styles.heading}>
                  {content.heading[0]}
                  <br />
                  {content.heading[1]}
                </h1>
              </div>
              <div style={styles.sideCopy}>
                <p style={styles.sideTitle}>{content.sideTitle}</p>
                <p style={styles.sideSub}>{content.sideSub}</p>
              </div>
            </div>

            <div style={styles.footerArea} className="asa-fade-in" key={`form-${step}`}>
              {step === 1 && (
                <div style={styles.footerRow}>
                  {CREATOR_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updateField("creatorType", type.id)}
                      style={{
                        ...styles.footerItem,
                        ...(formData.creatorType === type.id
                          ? styles.footerItemActive
                          : {}),
                      }}
                    >
                      <span style={styles.footerNum}>#{type.num}</span>
                      <span style={styles.footerLabel}>{type.label}</span>
                      <span style={styles.footerDesc}>{type.desc}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div style={styles.formPanel}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Project name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aso (new single drop)"
                      value={formData.projectName}
                      onChange={(e) => updateField("projectName", e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Describe your project</label>
                    <textarea
                      placeholder="What are you launching? Who's it for? What feeling should it carry?"
                      value={formData.projectDescription}
                      onChange={(e) =>
                        updateField("projectDescription", e.target.value)
                      }
                      rows={4}
                      style={styles.textarea}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={styles.formPanel}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Cultural context</label>
                    <div style={styles.chipGrid}>
                      {CULTURAL_CONTEXTS.map((ctx) => (
                        <button
                          key={ctx.id}
                          onClick={() => updateField("culturalContext", ctx.id)}
                          style={{
                            ...styles.chip,
                            ...(formData.culturalContext === ctx.id
                              ? styles.chipActive
                              : {}),
                          }}
                        >
                          {ctx.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Tone / vibe</label>
                    <div style={styles.chipGrid}>
                      {TONES.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => updateField("tone", tone.id)}
                          style={{
                            ...styles.chip,
                            ...(formData.tone === tone.id ? styles.chipActive : {}),
                          }}
                        >
                          {tone.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.bottomRow}>
                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${(step / totalSteps) * 100}%`,
                    }}
                  />
                </div>
                <div style={styles.navButtons}>
                  <button
                    onClick={handleBack}
                    style={{
                      ...styles.navBack,
                      ...(step === 1 ? { visibility: "hidden" } : {}),
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    style={{
                      ...styles.navNext,
                      ...(canProceed() ? {} : styles.navNextDisabled),
                    }}
                  >
                    {step === totalSteps ? "Generate my campaign" : "Continue"} →
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          renderInfoPage(view)
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    background: "#0a0605",
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.55,
    transition: "opacity 0.4s ease",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(115deg, rgba(10,6,5,0.97) 0%, rgba(122,42,16,0.85) 35%, rgba(232,98,42,0.55) 65%, rgba(255,122,51,0.3) 100%)",
  },
  content: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 3rem 2.5rem",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoMark: {
    width: "30px",
    height: "30px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "12px",
    color: "#fff",
  },
  logoText: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    gap: "2.2rem",
  },
  navLink: {
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontSize: "14px",
    transition: "color 0.2s",
    padding: "4px 0",
    borderBottom: "2px solid transparent",
  },
  navLinkActive: {
    color: "#fff",
    borderBottomColor: "#e8622a",
  },
  stepBadge: {
    background: "rgba(255,255,255,0.95)",
    color: "#7a2a10",
    fontSize: "12px",
    fontWeight: 700,
    padding: "0.5rem 1.1rem",
    borderRadius: "999px",
  },
  middle: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "2rem",
    margin: "auto 0 2.5rem",
    flexWrap: "wrap",
  },
  headlineBlock: {
    maxWidth: "520px",
  },
  eyebrow: {
    fontSize: "16px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    marginBottom: "0.6rem",
  },
  heading: {
    fontSize: "110px",
    fontWeight: 700,
    lineHeight: 1.03,
    letterSpacing: "-1.5px",
    color: "#fff",
  },
  sideCopy: {
    maxWidth: "240px",
    textAlign: "right",
    paddingBottom: "0.5rem",
  },
  sideTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "0.5rem",
    lineHeight: 1.3,
  },
  sideSub: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.6,
  },
  footerArea: {
    paddingTop: "1.5rem",
    borderTop: "1px solid rgba(255,255,255,0.15)",
  },
  footerRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.25rem",
    marginBottom: "1.75rem",
  },
  footerItem: {
    background: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
    opacity: 0.75,
    transition: "opacity 0.2s",
    padding: 0,
  },
  footerItemActive: {
    opacity: 1,
  },
  footerNum: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#ffb37a",
  },
  footerLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#fff",
  },
  footerDesc: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.55)",
  },
  formPanel: {
    background: "rgba(10, 6, 5, 0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "16px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    backdropFilter: "blur(6px)",
  },
  fieldGroup: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.6)",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    fontSize: "14px",
    color: "#fff",
    outline: "none",
  },
  textarea: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    fontSize: "14px",
    color: "#fff",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: 1.6,
  },
  chipGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "999px",
    padding: "0.5rem 1rem",
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    transition: "all 0.2s",
  },
  chipActive: {
    borderColor: "#fff",
    background: "rgba(255,255,255,0.18)",
    color: "#fff",
  },
  bottomRow: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  progressTrack: {
    width: "100%",
    height: "3px",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#fff",
    borderRadius: "999px",
    transition: "width 0.35s ease",
  },
  navButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBack: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    fontSize: "13px",
    cursor: "pointer",
  },
  navNext: {
    background: "#fff",
    color: "#7a2a10",
    border: "none",
    padding: "0.8rem 1.7rem",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  navNextDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
  },
  infoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem 0",
    animation: "asa-fade-in 0.5s ease",
  },

  infoHeader: {
    marginBottom: "2.5rem",
  },
  infoTitle: {
    fontSize: "52px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-1px",
    lineHeight: 1.1,
    marginBottom: "0.5rem",
  },
  infoSubtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 300,
  },
  howGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  howCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "1.5rem",
    backdropFilter: "blur(6px)",
    transition: "transform 0.2s",
  },
  howIcon: {
    fontSize: "32px",
    marginBottom: "0.75rem",
  },
  howCardTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#fff",
    marginBottom: "0.5rem",
  },
  howCardDesc: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.6,
  },
  aboutText: {
    maxWidth: "700px",
    marginBottom: "2.5rem",
  },
  aboutParagraph: {
    fontSize: "16px",
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.8)",
    marginBottom: "1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "1.25rem",
    marginBottom: "2rem",
  },
  statCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "1rem",
    textAlign: "center",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#fff",
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    marginTop: "0.2rem",
  },
  examplesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.25rem",
    marginBottom: "2rem",
  },
  exampleCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "1.4rem",
    backdropFilter: "blur(6px)",
  },
  exampleTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "0.5rem",
  },
  exampleMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "0.75rem",
  },
  exampleTag: {
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.8)",
    background: "rgba(255,255,255,0.1)",
    padding: "2px 10px",
    borderRadius: "999px",
  },
  exampleResult: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.6,
  },
  backToFormBtn: {
    background: "rgba(255,255,255,0.95)",
    color: "#7a2a10",
    border: "none",
    padding: "0.8rem 1.7rem",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 700,
    alignSelf: "center",
    marginTop: "1.5rem",
    transition: "transform 0.2s, opacity 0.2s",
    cursor: "pointer",
  },
};