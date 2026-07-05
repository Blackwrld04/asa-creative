import { useState, useEffect } from "react";
import OnboardingForm from "./components/OnboardingForm";
import CampaignDashboard from "./components/CampaignDashboard";
import { saveToHistory } from "./components/CampaignHistory";
import { loadProfile } from "./components/CreatorProfile";
import "./styles/globals.css";

const DEFAULT_FORM_DATA = {
  creatorType: "",
  projectName: "",
  projectDescription: "",
  culturalContext: "",
  tone: "",
};

export default function App() {
  const [view, setView] = useState("onboarding");
  const [campaignData, setCampaignData] = useState(null);
  const [error, setError] = useState(null);
  const [lastFormData, setLastFormData] = useState(null);

  const savedProfile = loadProfile();
  const initialFormData = savedProfile
    ? {
        ...DEFAULT_FORM_DATA,
        creatorType: savedProfile.creatorType || "",
        culturalContext: savedProfile.culturalContext || "",
        tone: savedProfile.tone || "",
      }
    : DEFAULT_FORM_DATA;

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get("campaign");
      if (encoded) {
        const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
        if (decoded && decoded.written && decoded.visual && decoded.strategy) {
          setCampaignData(decoded);
          setView("dashboard");
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    } catch (err) {
      console.warn("Could not decode shared campaign URL:", err);
    }
  }, []);

  const generateCampaign = async (formData) => {
    setView("loading");
    setError(null);
    setLastFormData(formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/campaign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const result = await response.json();

      const campaign = {
        projectName: formData.projectName,
        creatorType: formData.creatorType,
        culturalContext: formData.culturalContext,
        tone: formData.tone,
        written: result.written,
        visual: result.visual,
        strategy: result.strategy,
      };

      saveToHistory(campaign);
      setCampaignData(campaign);
      setView("dashboard");
    } catch (err) {
      console.error("Campaign generation failed:", err);
      setError("Something went wrong generating your campaign. Please try again.");
      setView("onboarding");
    }
  };

  const handleOnboardingComplete = (formData) => generateCampaign(formData);

  const handleRegenerate = () => {
    if (lastFormData) generateCampaign(lastFormData);
  };

  const handleNewCampaign = () => {
    setCampaignData(null);
    setView("onboarding");
  };

  const handleRestoreFromHistory = (entry) => {
    setCampaignData(entry);
    setView("dashboard");
  };

  if (view === "loading") {
    return (
      <div style={loadingStyles.page}>
        <div style={loadingStyles.spinner} />
        <p style={loadingStyles.text}>Weaving your campaign together...</p>
        <p style={loadingStyles.subtext}>
          Injecting cultural context, generating copy, and building strategy.
        </p>
      </div>
    );
  }

  if (view === "dashboard" && campaignData) {
    return (
      <CampaignDashboard
        campaignData={campaignData}
        onNewCampaign={handleNewCampaign}
        onRegenerate={handleRegenerate}
        onRestoreFromHistory={handleRestoreFromHistory}
      />
    );
  }

  return (
    <>
      {error && (
        <div style={loadingStyles.errorBanner}>{error}</div>
      )}
      <OnboardingForm
        onComplete={handleOnboardingComplete}
        initialFormData={initialFormData}
      />
    </>
  );
}

const loadingStyles = {
  page: {
    minHeight: "100vh",
    background: "var(--asa-bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.25rem",
    padding: "2rem",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(232,98,42,0.15)",
    borderTopColor: "#e8622a",
    borderRadius: "50%",
    animation: "asa-spin 0.8s linear infinite",
  },
  text: {
    fontSize: "16px",
    fontWeight: 500,
    color: "var(--asa-text-primary)",
  },
  subtext: {
    fontSize: "13px",
    color: "var(--asa-text-muted)",
    textAlign: "center",
    maxWidth: "320px",
  },
  errorBanner: {
    position: "fixed",
    top: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(226, 75, 74, 0.12)",
    border: "0.5px solid rgba(226, 75, 74, 0.3)",
    color: "#e24b4a",
    padding: "0.75rem 1.25rem",
    borderRadius: "8px",
    fontSize: "13px",
    zIndex: 100,
  },
};
