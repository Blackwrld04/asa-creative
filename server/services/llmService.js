const { buildCulturalContext } = require("./culturalContext");

const GROQ_MODEL = "llama-3.3-70b-versatile";

function buildSystemPrompt(culturalContextId, toneId) {
  const culturalBlock = buildCulturalContext(culturalContextId, toneId);

  return `You are àṣà, a culturally-aware AI creative campaign assistant for African creators.

${culturalBlock}

Your job is to generate a complete creative campaign as structured JSON.
Respond with ONLY valid JSON, no markdown fences, no preamble, matching
this exact shape:

{
  "written": {
    "captions": [
      {
        "id": "c1", "length": "short", "platform": "Instagram", "text": "...",
        "translations": { "english": "...", "pidgin": "...", "yoruba": "...", "swahili": "..." }
      },
      {
        "id": "c2", "length": "medium", "platform": "Twitter / X", "text": "...",
        "translations": { "english": "...", "pidgin": "...", "yoruba": "...", "swahili": "..." }
      },
      {
        "id": "c3", "length": "long", "platform": "TikTok", "text": "...",
        "translations": { "english": "...", "pidgin": "...", "yoruba": "...", "swahili": "..." }
      }
    ],
    "hashtags": { "primary": ["...", "...", "..."], "secondary": ["...", "...", "...", "..."] },
    "scriptHook": "...",
    "ctas": ["...", "...", "..."]
  },
  "visual": {
    "moodDescription": "...",
    "colorPalette": [
      { "hex": "#RRGGBB", "name": "...", "meaning": "..." }
    ],
    "shotList": [
      { "title": "...", "description": "..." }
    ]
  },
  "strategy": {
    "platforms": [
      { "name": "...", "fit": "Strongest|Strong|Good", "reason": "..." }
    ],
    "postingTimes": [
      { "day": "...", "window": "...", "note": "..." }
    ],
    "audience": { "description": "...", "interests": ["...", "..."] },
    "narrativeArc": [
      { "step": 1, "title": "...", "description": "..." }
    ]
  }
}

Generate exactly 3 captions (each with all 4 translations: english, pidgin,
yoruba, swahili — the "text" field should match the culturally-appropriate
language based on the selected context), 3-4 primary hashtags, 4 secondary
hashtags, 3 CTAs, 4 colors in the palette, 4 shots, 3 platforms, 3 posting
times, 5 audience interests, and a 3-step narrative arc. Every field must be
filled with real, specific, culturally-grounded content — never placeholder
text. Translations must be genuine — not machine-literal word-for-word, but
natural and idiomatic in each language.`;
}

function mockCampaign(formData) {
  const { projectName, creatorType, culturalContext, tone } = formData;
  return {
    written: {
      captions: [
        {
          id: "c1", length: "short", platform: "Instagram",
          text: `${projectName} is here. Built for the culture, straight from the soul.`,
          translations: {
            english: `${projectName} is here. Built for the culture, straight from the soul.`,
            pidgin: `${projectName} don land. E build for the culture, e come straight from the soul.`,
            yoruba: `${projectName} ti dé. A ṣe é fún àṣà, tó jáde tó jáde lára ọkàn.`,
            swahili: `${projectName} iko hapa. Imejengwa kwa ajili ya utamaduni, moja kwa moja kutoka moyoni.`,
          },
        },
        {
          id: "c2", length: "medium", platform: "Twitter / X",
          text: `${projectName} is more than a project — it's a statement. A ${tone} ${creatorType} campaign rooted in ${culturalContext}. Don't miss it.`,
          translations: {
            english: `${projectName} is more than a project — it's a statement. A ${tone} ${creatorType} campaign rooted in ${culturalContext}. Don't miss it.`,
            pidgin: `${projectName} pass project — na statement. A ${tone} ${creatorType} campaign wey root for ${culturalContext}. No miss am.`,
            yoruba: `${projectName} ju iṣẹ́ àkànṣe lọ — ó jẹ́ ìkéde. Ipolongo ${tone} ${creatorType} tó gbìn sí ${culturalContext}. Má padà.`,
            swahili: `${projectName} ni zaidi ya mradi — ni tamko. Kampeni ya ${tone} ${creatorType} yenye mizizi katika ${culturalContext}. Usikose.`,
          },
        },
        {
          id: "c3", length: "long", platform: "TikTok",
          text: `Everything you've been waiting for is in ${projectName}. This ${creatorType} project was built with intention, with culture, and with you in mind. Watch this space — the full drop is coming and it will move you.`,
          translations: {
            english: `Everything you've been waiting for is in ${projectName}. This ${creatorType} project was built with intention, with culture, and with you in mind. Watch this space — the full drop is coming and it will move you.`,
            pidgin: `Everything wey you don dey wait for dey inside ${projectName}. This ${creatorType} project dem build am with intention, with culture, and they think about you. Watch this space — the full drop dey come and e go move you.`,
            yoruba: `Ohun gbogbo tí o ti ń retí wà nínú ${projectName}. Iṣẹ́ ${creatorType} yìí ni a kọ́ pẹ̀lú ìdásílẹ̀, pẹ̀lú àṣà, a sì rò nípa rẹ. Ṣọ́ àyè yìí — ìdásilẹ̀ kíkún ń bọ̀, yóò mú ọ gbéra.`,
            swahili: `Kila kitu ulichokuwa ukisubiri kiko ndani ya ${projectName}. Mradi huu wa ${creatorType} ulijengwa kwa nia, kwa utamaduni, na ukifikiriwa wewe. Angalia nafasi hii — wimbo kamili unakuja na utakugusa moyoni.`,
          },
        },
      ],
      hashtags: {
        primary: [`#${projectName.replace(/\s+/g, "")}`, "#AfricanCreatives", "#CultureFirst"],
        secondary: ["#NewDrop", "#Storytelling", "#AuthenticVoice", "#CreativeAfrica"],
      },
      scriptHook: `Open on a close-up. No words yet — just the feeling of ${projectName}. Then the beat drops.`,
      ctas: ["Watch now — link in bio", "Share with someone who needs to see this", "Save this for your playlist"],
    },
    visual: {
      moodDescription: `Rich, warm tones rooted in ${culturalContext} aesthetics. Cinematic framing, intentional grain. The visuals should feel lived-in and specific — not generic.`,
      colorPalette: [
        { hex: "#E8622A", name: "Sunset clay", meaning: "Warmth, homecoming" },
        { hex: "#F4A634", name: "Harmattan gold", meaning: "Energy, celebration" },
        { hex: "#1A1208", name: "Deep earth", meaning: "Grounding, depth" },
        { hex: "#C44536", name: "Adire rust", meaning: "Tradition, craft" },
      ],
      shotList: [
        { title: "Opening frame", description: "Extreme close-up on texture — fabric, skin, or an object tied to the project. Slow pull-back." },
        { title: "Environment shot", description: "Wide establishing shot of a culturally specific location. Natural light, minimal staging." },
        { title: "Hero moment", description: "Subject centered, golden-hour backlight, direct camera eye contact." },
        { title: "Closing lockup", description: "Project name reveal on a dark background. Clean, intentional, memorable." },
      ],
    },
    strategy: {
      platforms: [
        { name: "Instagram", fit: "Strongest", reason: "Visual-first format ideal for hero imagery and Reels." },
        { name: "TikTok", fit: "Strong", reason: "Sound and story-driven discovery, perfect for the script hook." },
        { name: "X (Twitter)", fit: "Good", reason: "Real-time cultural conversation — strong for the target audience." },
      ],
      postingTimes: [
        { day: "Thursday", window: "7:00 PM – 9:00 PM", note: "Pre-weekend peak engagement window" },
        { day: "Saturday", window: "11:00 AM – 1:00 PM", note: "Weekend leisure browsing" },
        { day: "Sunday", window: "5:00 PM – 7:00 PM", note: "Evening wind-down scroll" },
      ],
      audience: {
        description: `Young adults 18–29 rooted in ${culturalContext} culture and the global diaspora. They value authenticity and respond to storytelling that reflects their own experience.`,
        interests: ["African music & film", "Streetwear & fashion", "Diaspora identity", "Cultural storytelling", "Digital creativity"],
      },
      narrativeArc: [
        { step: 1, title: "The tease", description: "A single atmospheric clip. No full reveal — just a feeling and a date." },
        { step: 2, title: "The story", description: "Behind-the-scenes context. Why this project, why now, why it matters." },
        { step: 3, title: "The drop", description: "Full reveal with the hero asset and a clear, direct call-to-action." },
      ],
    },
  };
}

async function generateCampaign(formData) {
  if (process.env.MOCK_LLM === "true") {
    return mockCampaign(formData);
  }

  const { creatorType, projectName, projectDescription, culturalContext, tone } =
    formData;

  const systemPrompt = buildSystemPrompt(culturalContext, tone);

  const userPrompt = `Creator type: ${creatorType}
Project name: ${projectName}
Project description: ${projectDescription}

Generate the full campaign JSON now.`;

  const url = `https://api.groq.com/openai/v1/models/${GROQ_MODEL}:generateContent?key=${process.env.GROQ_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { maxOutputTokens: 4000 },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LLM API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const cleaned = rawText.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse LLM response as JSON:", cleaned);
    throw new Error("LLM returned malformed JSON");
  }

  return parsed;
}

module.exports = { generateCampaign };
