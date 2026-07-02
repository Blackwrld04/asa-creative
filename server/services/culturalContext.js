/**
 * culturalContext.js
 *
 * This is the heart of àṣà. Before any text is generated, this service
 * builds a rich, culturally-specific context block that gets injected
 * into every LLM prompt — so output isn't generic AI content, it's
 * rooted in the creator's actual cultural language and references.
 */

const CULTURAL_PROFILES = {
  "nigeria-yoruba": {
    name: "Nigeria — Yoruba",
    languageNotes:
      "Blend English with light Yoruba expressions where natural (e.g. 'Ę ku ayo', 'Pẹlẹ', 'Sebi'). Use proverbs sparingly for emphasis, not decoration.",
    toneReferences:
      "Respect for elders and tradition, communal pride, storytelling through indirection.",
    visualReferences:
      "Adire textile patterns, aso-ebi color coordination, gele headwraps, Yoruba royal symbolism (beads, staff).",
    platformNorms:
      "Nigerian Twitter (X) is highly active for cultural commentary and humor. Instagram favors visual storytelling with strong captions.",
  },
  "nigeria-igbo": {
    name: "Nigeria — Igbo",
    languageNotes:
      "Blend English with Igbo expressions where natural (e.g. 'Nno', 'Dalu', 'Kedu'). Entrepreneurial spirit and resilience themes resonate strongly.",
    toneReferences:
      "Achievement-oriented, communal support (igwebuike), directness balanced with warmth.",
    visualReferences:
      "Isi agu patterns, red cap and ozo title regalia, kola nut symbolism, masquerade imagery used respectfully.",
    platformNorms:
      "Strong diaspora engagement on Instagram and Facebook; business-oriented audiences respond well on LinkedIn too.",
  },
  "nigeria-hausa": {
    name: "Nigeria — Hausa",
    languageNotes:
      "Blend English with Hausa expressions where appropriate (e.g. 'Sannu', 'Na gode'). Respectful, measured tone preferred over hype-heavy language.",
    toneReferences: "Hospitality, dignity, understated confidence.",
    visualReferences:
      "Hausa architecture motifs, indigo dye patterns, traditional embroidery (babban riga), desert and savanna tones.",
    platformNorms:
      "WhatsApp and Facebook remain dominant; Instagram growing among younger audiences in Kano and Kaduna.",
  },
  "nigeria-pidgin": {
    name: "Nigeria — Pidgin (general)",
    languageNotes:
      "Write primarily in Nigerian Pidgin English for captions and hooks — this is the lingua franca of Nigerian social media. Keep it natural, not forced or stereotyped.",
    toneReferences:
      "Humor, street-smart energy, directness, communal relatability.",
    visualReferences:
      "Danfo bus colors, Lagos street culture, Ankara streetwear fusion, urban grit balanced with vibrancy.",
    platformNorms:
      "Nigerian Twitter and TikTok are the primary cultural battlegrounds — fast-moving, meme-literate, reactive.",
  },
  ghana: {
    name: "Ghana",
    languageNotes:
      "Light Twi or Ga expressions where natural (e.g. 'Akwaaba', 'Medaase'). Calm confidence in tone, less hype-driven than Nigerian content.",
    toneReferences: "Hospitality, pride in heritage, understated cool.",
    visualReferences:
      "Kente cloth patterns and symbolism, Adinkra symbols, Afrobeats-meets-Highlife visual energy.",
    platformNorms:
      "Instagram and TikTok strong among younger creators; strong diaspora ties to UK and US audiences.",
  },
  kenya: {
    name: "Kenya",
    languageNotes:
      "Blend English with Swahili and Sheng (urban slang) where natural (e.g. 'Sasa', 'Poa', 'Niaje'). Sheng signals authenticity to younger audiences.",
    toneReferences: "Wit, resilience, fast-paced urban energy (Nairobi especially).",
    visualReferences:
      "Maasai shuka patterns used respectfully, matatu art culture, vibrant East African textile colors.",
    platformNorms:
      "Twitter (X) Kenya is one of the most active and witty communities in Africa — sharp, fast, meme-driven.",
  },
  "south-africa": {
    name: "South Africa",
    languageNotes:
      "Blend English with Zulu, Xhosa, or Afrikaans expressions depending on regional context (e.g. 'Sawubona', 'Eish', 'Lekker').",
    toneReferences: "Amapiano-era cool, diversity-aware, confident and stylish.",
    visualReferences:
      "Amapiano visual culture, township art and color palettes, Ndebele geometric patterns.",
    platformNorms:
      "TikTok dominant for music and dance trends; Instagram strong for fashion and lifestyle content.",
  },
  senegal: {
    name: "Senegal",
    languageNotes:
      "Blend French and Wolof expressions where natural (e.g. 'Nanga def', 'Jërejëf'). Elegant, measured tone.",
    toneReferences: "Sophistication, Teranga (hospitality), pride in artistic heritage.",
    visualReferences:
      "Boubou and wax print fashion, Dakar street art scene, Mbalax music visual energy.",
    platformNorms:
      "Facebook and Instagram strong; French-language content performs well alongside Wolof.",
  },
  ethiopia: {
    name: "Ethiopia",
    languageNotes:
      "Light Amharic expressions where natural (e.g. 'Selam', 'Ameseginalehu'). Pride in unique heritage (uncolonized history, own calendar/script).",
    toneReferences: "Cultural pride, dignity, historical depth.",
    visualReferences:
      "Habesha kemis textile patterns, coffee ceremony imagery, Ge'ez script aesthetic elements.",
    platformNorms:
      "Facebook remains dominant; Telegram important for community organizing and content sharing.",
  },
  tanzania: {
    name: "Tanzania",
    languageNotes:
      "Primarily Swahili with English blend where natural (e.g. 'Karibu', 'Asante'). Bongo Flava music culture as a reference point.",
    toneReferences: "Community warmth, coastal Swahili sophistication, laid-back confidence.",
    visualReferences:
      "Kanga and kitenge fabric patterns, Zanzibar coastal aesthetics, Bongo Flava visual energy.",
    platformNorms:
      "Instagram and WhatsApp strong; Bongo Flava artists drive significant cultural conversation.",
  },
};

const TONE_GUIDES = {
  hype: "High energy, exclamatory, built for excitement and momentum.",
  intimate: "Personal, vulnerable, first-person, conversational pacing.",
  bold: "Confident, declarative, short punchy sentences, no hedging.",
  playful: "Light, humorous, conversational, not afraid of wit.",
  premium: "Polished, restrained, fewer words doing more work, elevated vocabulary.",
  raw: "Unfiltered, honest, avoids corporate polish, embraces imperfection.",
};

/**
 * Builds the cultural context block injected into every LLM prompt.
 * @param {string} culturalContextId - key from CULTURAL_PROFILES
 * @param {string} toneId - key from TONE_GUIDES
 * @returns {string} formatted context block for prompt injection
 */
function buildCulturalContext(culturalContextId, toneId) {
  const profile = CULTURAL_PROFILES[culturalContextId];
  const tone = TONE_GUIDES[toneId];

  if (!profile) {
    throw new Error(`Unknown cultural context: ${culturalContextId}`);
  }

  return `
CULTURAL CONTEXT: ${profile.name}
- Language: ${profile.languageNotes}
- Tone references: ${profile.toneReferences}
- Visual references: ${profile.visualReferences}
- Platform norms: ${profile.platformNorms}

TONE DIRECTION: ${tone || "Natural, authentic, creator-appropriate."}

IMPORTANT: Do not use generic, Western-default marketing language. Every
output should feel like it was written by someone who genuinely
understands this cultural context — not a tourist's approximation of it.
Avoid stereotypes; aim for authenticity and specificity.
`.trim();
}

/**
 * Returns the list of supported cultural context IDs and labels,
 * useful for populating frontend dropdowns dynamically if needed.
 */
function listSupportedContexts() {
  return Object.entries(CULTURAL_PROFILES).map(([id, profile]) => ({
    id,
    name: profile.name,
  }));
}

module.exports = {
  buildCulturalContext,
  listSupportedContexts,
  CULTURAL_PROFILES,
  TONE_GUIDES,
};
