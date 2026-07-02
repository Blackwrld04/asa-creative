import { useState } from "react";
import OnboardingForm from "./components/OnboardingForm";
import CampaignDashboard from "./components/CampaignDashboard";
import "./styles/globals.css";

const DEFAULT_FORM_DATA = {
  creatorType: "",
  projectName: "",
  projectDescription: "",
  culturalContext: "",
  tone: "",
};

export default function App() {
  const [view, setView] = useState("onboarding"); // 'onboarding' | 'loading' | 'dashboard'
  const [campaignData, setCampaignData] = useState(null);
  const [error, setError] = useState(null);
  const [formMemory, setFormMemory] = useState({
    step: 1,
    formData: DEFAULT_FORM_DATA,
  });

  const handleFormStateChange = ({ step, formData }) => {
    setFormMemory({ step, formData });
  };

  const handleOnboardingComplete = async (formData) => {
    setView("loading");
    setError(null);

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

    setCampaignData({
      projectName: formData.projectName,
      creatorType: formData.creatorType,
      culturalContext: formData.culturalContext,
      tone: formData.tone,
      written: result.written,
      visual: result.visual,
      strategy: result.strategy,
    });

    setView("dashboard");
  } catch (err) {
      console.error("Campaign generation failed:", err);
      setError(
        "Something went wrong generating your campaign. Please try again."
      );
      setView("onboarding");
    }
  };

  const handleNewCampaign = () => {
    setCampaignData(null);
    setFormMemory({ step: 1, formData: DEFAULT_FORM_DATA });
    setView("onboarding");
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
      />
    );
  }

  return (
    <>
      {error && (
        <div style={loadingStyles.errorBanner}>
          {error}
        </div>
      )}
      <OnboardingForm
        onComplete={handleOnboardingComplete}
        initialStep={formMemory.step}
        initialFormData={formMemory.formData}
        onFormStateChange={handleFormStateChange}
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
