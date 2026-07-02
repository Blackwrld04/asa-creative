/**
 * imageService.js
 *
 * Generates the hero concept image for the Visual tab using Pollinations.ai —
 * a free, no-API-key-required image generation endpoint. Good fit for a
 * hackathon build since it removes a paid-key dependency.
 *
 * If you have Stability AI credentials, swap generateWithStabilityAI() in
 * as a drop-in replacement — same function signature.
 */

const POLLINATIONS_BASE_URL = "https://image.pollinations.ai/prompt";

/**
 * Builds an image generation prompt rooted in the campaign's mood
 * description and cultural context, so the visual matches the brief.
 */
function buildImagePrompt(moodDescription, culturalContextName, projectName) {
  return [
    moodDescription,
    `Cultural setting: ${culturalContextName}.`,
    `Project: ${projectName}.`,
    "Cinematic lighting, professional campaign photography, high detail, no text overlays.",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Generates a hero image URL via Pollinations.ai.
 * Pollinations works by encoding the prompt directly into the URL —
 * the image is generated on request, so the URL itself is the asset.
 *
 * @param {string} moodDescription
 * @param {string} culturalContextName
 * @param {string} projectName
 * @returns {Promise<string>} image URL
 */
async function generateHeroImage(moodDescription, culturalContextName, projectName) {
  const prompt = buildImagePrompt(moodDescription, culturalContextName, projectName);
  const encodedPrompt = encodeURIComponent(prompt);

  // width/height tuned for a 16:9-ish campaign hero crop
  const imageUrl = `${POLLINATIONS_BASE_URL}/${encodedPrompt}?width=1024&height=640&nologo=true`;

  // Pollinations generates lazily on first fetch — we return the URL directly
  // since the <img> tag in VisualTab will trigger generation on load.
  // Optionally, you could pre-warm it here with a HEAD request:
  try {
    await fetch(imageUrl, { method: "HEAD" });
  } catch (err) {
    console.warn("Image pre-warm failed, URL will still work on render:", err.message);
  }

  return imageUrl;
}

module.exports = { generateHeroImage, buildImagePrompt };
