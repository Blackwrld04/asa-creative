/**
 * routes/campaign.js
 *
 * POST /api/campaign
 * Takes the onboarding form data and returns a complete generated
 * campaign: written content, visual direction (incl. hero image),
 * and strategy — ready to render in CampaignDashboard.
 */

const express = require("express");
const router = express.Router();

const { generateCampaign } = require("../services/llmService");
const { generateHeroImage } = require("../services/imageService");
const { CULTURAL_PROFILES } = require("../services/culturalContext");

router.post("/campaign", async (req, res) => {
  const { creatorType, projectName, projectDescription, culturalContext, tone } =
    req.body;

  // Basic validation — fail fast with a clear message
  if (!creatorType || !projectName || !projectDescription || !culturalContext || !tone) {
    return res.status(400).json({
      error:
        "Missing required fields. Expected: creatorType, projectName, projectDescription, culturalContext, tone.",
    });
  }

  if (!CULTURAL_PROFILES[culturalContext]) {
    return res.status(400).json({
      error: `Unsupported cultural context: ${culturalContext}`,
    });
  }

  try {
    // Step 1: generate written + visual direction + strategy via LLM
    const campaign = await generateCampaign({
      creatorType,
      projectName,
      projectDescription,
      culturalContext,
      tone,
    });

    // Step 2: generate the hero concept image based on the mood description
    // the LLM produced, so visuals stay consistent with the written brief
    const culturalContextName = CULTURAL_PROFILES[culturalContext].name;
    const heroImageUrl = await generateHeroImage(
      campaign.visual?.moodDescription || projectDescription,
      culturalContextName,
      projectName
    );

    campaign.visual.heroImageUrl = heroImageUrl;

    res.json(campaign);
  } catch (err) {
    console.error("Campaign generation failed:", err);
    res.status(500).json({
      error: "Failed to generate campaign. Please try again.",
      detail: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

module.exports = router;
