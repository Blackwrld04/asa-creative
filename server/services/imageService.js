const POLLINATIONS_BASE_URL = "https://image.pollinations.ai/prompt";

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

async function generateHeroImage(moodDescription, culturalContextName, projectName) {
  const prompt = buildImagePrompt(moodDescription, culturalContextName, projectName);
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `${POLLINATIONS_BASE_URL}/${encodedPrompt}?width=1024&height=640&nologo=true`;

  const res = await fetch(imageUrl);
  await res.arrayBuffer();

  return imageUrl;
}

module.exports = { generateHeroImage, buildImagePrompt };
