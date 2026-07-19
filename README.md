# Àṣà — AI Creative Campaign Assistant

> _"Àṣà" means culture, tradition, and custom in Yoruba. It is what we carry forward._

Built for the IBM AI Builders Challenge: July 2026
Theme: Reimagine Creative Industries with AI

## 1. Problem Statement

Every major AI creative tool: Canva AI, Jasper, Copy.ai, ChatGPT: is built English-first and Western-context-first. When an African creator uses these tools, they get generic, culturally flat output that doesn't reflect how they actually speak, what their audience responds to, or what their visual identity looks like.

A Nigerian musician dropping an Afrobeats single gets the same caption template as a pop artist in Los Angeles. A Yoruba filmmaker gets colour palettes rooted in Scandinavian minimalism. A Ghanaian brand gets posting time recommendations calibrated for US Eastern Time.

The result is content that feels imported, not authentic, not resonant, and not competitive in a landscape where cultural specificity is the difference between being scrolled past and being shared.

No tool today understands the difference between a Lagos creator's voice and a Nairobi creator's voice. àṣà is built to fix that.

## 2. Solution Description

Àṣà is a culturally-aware AI creative campaign assistant built for African creators. A creator fills in a three-step brief: what they create, what they're launching, and their cultural context and àṣà generates a complete creative campaign in under 60 seconds.

### What àṣà generates

Written content tab

- Three caption variations (short for Instagram, medium for Twitter/X, long for TikTok)
- Language toggle captions switch between English, Nigerian Pidgin, Yoruba, and Swahili in real time
- Hashtag strategy (primary and secondary sets)
- Script hook for the first 3 seconds of video content
- Three call-to-action options
- One-click PDF export of the full written campaign

Visual concepts tab

- Culturally-grounded mood description for photographers and videographers
- Colour palette with meaning behind each colour (rooted in Adire, Ankara, Kente traditions)
- AI-generated hero concept image
- Shot list for the campaign shoot

Strategy tab

- Platform recommendations with fit ratings
- Posting windows calibrated to West African Time (WAT)
- Audience targeting notes
- Three-post narrative arc
- "àṣà vs Generic AI" comparison — explains exactly why this campaign differs from generic AI output

Additional features

- Platform previewer — see captions rendered inside a live mock Instagram post, Twitter card, or TikTok screen
- Campaign history — every generated campaign saved locally, restorable anytime
- Creator profile — save preferences, auto-fill the form on next visit
- Share link — encode any campaign into a URL and share with collaborators, no login required

### Supported cultural contexts

Nigeria (Yoruba, Igbo, Hausa, Pidgin), Ghana, Kenya, South Africa, Senegal, Ethiopia, Tanzania with language notes, tone references, visual references, and platform norms specific to each.

## 3. AI Approach and Architecture

### The Cultural Context Engine

The core innovation of àṣà is `server/services/culturalContext.js` — a structured knowledge base that builds a rich cultural prompt block before every LLM call.

For each of the 10+ supported cultural contexts, the engine stores:

- Language notes — how to blend English with Pidgin, Yoruba, Swahili, Twi naturally, not as translation
- Tone references — communal pride, diaspora energy, Afrobeats aesthetic, understated confidence
- Visual references — Adire dye patterns, Ankara fabric colours, Kente symbolism, Lagos street culture
- Platform norms — Nigerian Twitter peak hours (7–9 PM WAT), TikTok Afrobeats culture, Facebook dominance in Senegal and Ethiopia

This block is injected as a system prompt prefix into every LLM call, ensuring the model generates content rooted in the creator's actual cultural reality — not a Western-default interpretation of it.

### Full data flow

```
Creator fills 3-step onboarding form
        ↓
React frontend sends POST /api/campaign
        ↓
Express backend receives formData
        ↓
culturalContext.js builds cultural prompt block
        ↓
llmService.js sends prompt + brief → Anthropic Claude API
        ↓
Claude returns structured JSON (written + visual + strategy)
        ↓
imageService.js sends mood description → Pollinations.ai
        ↓
Backend assembles full campaign object
        ↓
Frontend renders across 3 tabs
```

### Tech stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Frontend         | React + Vite                                |
| Backend          | Node.js + Express                           |
| Text generation  | Anthropic Claude (claude-sonnet-4-6)        |
| Image generation | Pollinations.ai (free, no API key required) |
| Primary dev tool | IBM Bob                                     |

## 4. Selected Challenge Theme

July — Reimagine Creative Industries with AI

àṣà addresses the challenge directly:

"How can AI help people create faster?"
A creator goes from blank page to complete campaign in under 60 seconds captions, hashtags, visual direction, and strategy all at once.

"How can AI unlock entirely new creative experiences?"
àṣà unlocks something no existing tool offers: AI-generated content genuinely rooted in African cultural identity. A Yoruba filmmaker can get a colour palette referencing Adire dye tradition. A Nigerian musician gets captions that sound like they were written by someone from Lagos — because the AI has been given the cultural context to do so.

## 5. How IBM Bob Was Used: From Idea to Finished Product

IBM Bob was used as the primary development tool throughout the entire àṣà project — from the initial brainstorming session through architecture planning, component design, backend implementation, debugging, and final quality assurance. This section tells the complete story of how Bob shaped every phase of the build.

## Phase 1 — Ideation and market research

The project began with a question: what problem in the creative industry has AI not solved yet?

Bob was used to research existing AI creative tools and identify gaps in the market. The research revealed that while tools like Canva AI, Jasper, Midjourney, Suno, and ElevenLabs had captured most of the Western creator market, one gap remained completely unaddressed: African and emerging-market creators were being served generic, Western-default output that felt foreign to their audience.

Bob helped frame the core insight:

> _"Most AI creative tools are built English-first and Western-context-first. African creators musicians, filmmakers, content creators, brands get generic output that doesn't reflect Pidgin, Yoruba, Swahili, or the visual language of Ankara, Kente, and Adire. No tool today understands the difference between a Lagos creator's voice and a Nairobi creator's voice."_

From this, the product concept was born: a culturally-aware AI creative campaign assistant for African creators, generating complete campaigns (written content, visual direction, platform strategy) rooted in the creator's specific cultural identity.

Bob helped validate the concept against the July challenge theme: _"Reimagine Creative Industries with AI"_ confirming this fit under "AI creative partners" and "Personalized creative assistants," and that targeting African creators was a strength, not a limitation, because it demonstrated genuine innovation rather than another generic AI wrapper.

## Phase 2 — Naming and product identity

The product needed a name that carried cultural meaning. Bob was asked to suggest names rooted in African languages that related to creativity, culture, and tradition.

The choice landed on Àṣà the Yoruba word for culture, tradition, and custom. It is what a people carry forward across generations. This became the product's core philosophy: AI that carries African creative culture forward rather than replacing it with Western defaults.

Bob helped develop the tagline in four languages:

- English: Campaigns rooted in your culture.
- Yoruba: Ìpolongo tó wá láti inú àṣà rẹ.
- Pidgin: Campaign wey come from your culture, for real.
- Swahili: Kampeni inayotoka ndani ya utamaduni wako.

## Phase 3 — Architecture planning

With the concept defined, Bob was used to plan the full technical architecture before a single file was created. The key questions were: what does the app need to do, how should it be structured, and what technologies should power it?

Bob helped design the full data flow:

Creator fills 3-step onboarding form
↓
React frontend sends POST /api/campaign
↓
Express backend receives formData
↓
culturalContext.js builds cultural prompt block
↓
llmService.js sends prompt → Anthropic Claude API
↓
Claude returns structured JSON (written + visual + strategy)
↓
imageService.js sends mood description → Pollinations.ai
↓
Backend assembles full campaign object
↓
Frontend renders across 3 tabs

Bob helped define the file structure:

asa-creative/
├── client/ # React + Vite frontend
│ └── src/
│ ├── components/
│ │ ├── OnboardingForm.jsx # 3-step brief intake
│ │ ├── CampaignDashboard.jsx # Results shell + tabs
│ │ ├── WrittenTab.jsx # Captions, hashtags, CTAs
│ │ ├── VisualTab.jsx # Mood, palette, image, shots
│ │ ├── StrategyTab.jsx # Platforms, timing, arc
│ │ ├── CampaignHistory.jsx # localStorage history panel
│ │ └── CreatorProfile.jsx # Saved preferences panel
│ └── styles/globals.css
├── server/ # Node.js + Express backend
│ ├── routes/campaign.js # Main API route
│ └── services/
│ ├── culturalContext.js # Cultural intelligence engine
│ ├── llmService.js # LLM API calls
│ └── imageService.js # Image generation
└── README.md

Bob helped make key technology decisions:

- React + Vite for the frontend — fast dev server, simple build pipeline
- Node.js + Express for the backend — lightweight, fits the team's existing skills
- Anthropic Claude for text generation — best-in-class instruction following for structured JSON output
- Pollinations.ai for image generation — free, no API key required, good fit for a hackathon prototype
- localStorage for campaign history and creator profile — no database needed, works offline

## Phase 4 — The Cultural Context Engine

The most important architectural decision was how to make the AI output genuinely culturally specific rather than generically "African." Bob helped design the solution: a Cultural Context Engine a structured knowledge base that builds a rich prompt block before every LLM call.

Bob helped define what each cultural profile needed to contain:

- Language notes — how to blend English with Pidgin, Yoruba, Igbo, Swahili, Twi naturally
- Tone references — communal pride, diaspora energy, Afrobeats aesthetic, understated confidence
- Visual references — Adire dye patterns, Ankara fabric colours, Kente symbolism, Lagos street culture
- Platform norms — Nigerian Twitter peak hours (7–9 PM WAT), TikTok Afrobeats culture, Facebook's dominance in Senegal and Ethiopia

Bob helped write the `buildCulturalContext()` function that assembles this block into a prompt injection:

```javascript
function buildCulturalContext(culturalContextId, toneId) {
  const profile = CULTURAL_PROFILES[culturalContextId];
  const tone = TONE_GUIDES[toneId];
  return `
CULTURAL CONTEXT: ${profile.name}
- Language: ${profile.languageNotes}
- Tone references: ${profile.toneReferences}
- Visual references: ${profile.visualReferences}
- Platform norms: ${profile.platformNorms}

TONE DIRECTION: ${tone}

IMPORTANT: Do not use generic, Western-default marketing language.
Every output should feel like it was written by someone who genuinely
understands this cultural context — not a tourist's approximation of it.
`.trim();
}
```

This block is injected as a system prompt prefix into every LLM call ensuring that no matter what project the creator describes, the AI responds from inside the culture rather than looking at it from outside.

## Phase 5 — Frontend design and component planning

Before building any components, Bob was used to plan the user experience flow — what screens would a creator see, in what order, and what would each screen need to do?

Bob helped design the three-step onboarding form:

- Step 1: Creator type (Music artist / Filmmaker / Brand / Content creator) — numbered options spread across the screen, editorial full-bleed layout
- Step 2: Project name and description — the creative brief
- Step 3: Cultural context selector and tone selector — chips and pill buttons

Bob helped plan the campaign dashboard:

- A summary card showing the project name and meta tags
- Three tab buttons: Written content / Visual concepts / Strategy
- Each tab rendering a different component with its own layout

Bob helped identify the additional features worth building for judge impact:

- Language toggle on captions (English / Pidgin / Yoruba / Swahili) — the most visually compelling demo moment
- Platform previewer (Instagram / Twitter / TikTok) — judges can see the caption rendered inside a real-looking social post
- PDF export — makes the tool genuinely useful beyond the demo
- Campaign history — every generation saved to localStorage, restorable anytime
- Creator profile — saved preferences that pre-fill the form on next visit
- Share link — campaign encoded into URL, shareable with no login

Bob also helped plan the Competitor Analysis section in the Strategy tab a side-by-side comparison explaining exactly why àṣà's output is different from what any generic AI tool would produce. This was designed specifically to make the "Innovation" and "Real-World Impact" judging criteria self-evident.

## Phase 6 — Building the backend route

When it came time to implement the backend, Bob was given the first prompt:

> _"Write me an Express.js POST route that accepts creatorType, projectName, projectDescription, culturalContext, and tone from the request body and calls an async function called generateCampaign"_

Before writing anything, Bob explored 4 folders and 2 files in 9 seconds and came back with a finding that shaped the rest of the build: the route already existed and was fully implemented.

Bob produced a complete breakdown of `server/routes/campaign.js`:

| Step             | What it does                                     | Location    |
| ---------------- | ------------------------------------------------ | ----------- |
| Destructure      | Pulls all 5 fields from req.body                 | Lines 18–19 |
| Validation       | Returns 400 if any field is missing              | Lines 22–27 |
| Cultural check   | Validates culturalContext against known profiles | Lines 29–33 |
| generateCampaign | Called with all 5 fields                         | Lines 37–43 |
| Hero image       | Generates image from LLM's visual output         | Lines 48–52 |
| Response         | Returns full campaign JSON                       | Line 56     |

Bob's conclusion: _"The route is mounted at /api in server/index.js:22. The full endpoint is POST /api/campaign. No changes needed."_

This saved hours of potential rework. Instead of building something that already existed, development moved straight to testing.

## Phase 7 — Server validation

Bob reviewed `server/index.js` and validated the full Express setup:

- `dotenv` correctly loads environment variables
- `cors()` middleware handles cross-origin requests from the frontend
- `express.json()` parses request bodies
- Health route at `/health` works without any API key
- Campaign routes mounted correctly at `/api`

Bob confirmed: _"The server structure is clean. No changes needed."_

## Phase 8 — Testing strategy

Bob produced a complete, grounded testing strategy based on what the server actually does with real curl commands sourced from the actual code:

Test 1 — Health check

```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","service":"asa-creative-backend"}
```

Test 2 — Validation (invalid cultural context → 400)

```bash
curl -X POST http://localhost:4000/api/campaign \
  -H "Content-Type: application/json" \
  -d '{"creatorType":"musician","projectName":"Test",
       "projectDescription":"Test","culturalContext":"invalid-key","tone":"bold"}'
# Expected: {"error":"Unsupported cultural context: invalid-key"}
```

Test 3 — Full campaign generation
Bob provided the exact valid values from `culturalContext.js` — `nigeria-yoruba`, `ghana`, `kenya`, etc. — and confirmed the expected response shape: `{ written, visual, strategy }`.

## Phase 9 — First crash: MODULE_NOT_FOUND

When `npm run dev` was run for the first time, the server crashed:

```
Error: Cannot find module 'dotenv'
code: 'MODULE_NOT_FOUND'
```

Bob diagnosed immediately:

> _"The dependencies were never installed. dotenv, express, and cors are listed in package.json but node_modules/ doesn't exist yet."_

Bob confirmed by running `ls server/node_modules` — output: missing. Then ran `cd server && npm install`. 17 packages installed. Server started cleanly.

Bob explained why: _"npm install is never run automatically. The node_modules/ folder is excluded from version control via .gitignore, which is why it wasn't present after cloning."_

## Phase 10 — Frontend audit

Before the first live test, Bob audited all frontend files and identified three bugs:

Bug 1 — Dead code in App.jsx
`DEMO_CAMPAIGN_OUTPUT` — a 112-line constant defined but never referenced anywhere. Bob removed it.

Bug 2 — Silent Regenerate button
The Regenerate button in `CampaignDashboard.jsx` had no `onClick` handler. Clicking it did nothing. Bob wired it to the `onRegenerate` prop with a fallback to `onNewCampaign`.

Bug 3 — Wrong fallback image path
`OnboardingForm.jsx` used `/images/fallback.jpg` while the rest of the app used `/image/...`. Bob fixed it to `/image/fallback.jpg`.

Bob applied all three as diffs simultaneously. Final verdict: _"The form-to-backend connection is solid end to end."_

## Phase 11 — API key validation

Bob confirmed the Anthropic API key was loading correctly from `server/.env` without exposing the value:

```bash
node -e "require('dotenv').config(); console.log('Key set:', !!process.env.ANTHROPIC_API_KEY)"
# Output: Key set: true
```

## Phase 12 — Live error: credit balance exhausted

On the first real end-to-end test, the server returned:

```
Campaign generation failed: Error: LLM API error (400):
"Your credit balance is too low to access the Anthropic API."
```

Bob diagnosed precisely:

> _"Your Anthropic account has no credits — the API key is valid but the balance is zero. The LLM call fails with a 400, which throws in llmService.js:108, and the catch block sends back a 500, which bounces you to the form."_

Bob presented two solutions and applied the second — mock mode: a flag in `server/.env` (`MOCK_LLM=true`) that bypasses the API entirely in development and returns realistic, culturally-grounded demo data instantly. This let the full app be demonstrated and tested without any API credits.

## Phase 13 — Network timeout: ETIMEDOUT

When the real API key was later added and credits were available, a new error appeared:

```
Campaign generation failed: [TypeError: fetch failed]
AggregateError [ETIMEDOUT]
```

Bob diagnosed: _"ETIMEDOUT means the server cannot reach api.anthropic.com. This is a network-level block — either your ISP or a local firewall is preventing the outbound connection."_

Bob recommended two solutions: use a VPN to bypass the network restriction, or switch to Google's Gemini API which works without network restrictions in the relevant region. Bob provided the exact steps for both options and offered to rewrite `llmService.js` to use Gemini if needed — with the note that the function signature and JSON output contract would stay identical, requiring no frontend changes.

## Phase 14 — Mobile responsiveness

After the core app was working, Bob was used to audit the entire frontend for mobile responsiveness issues. Bob identified six specific breakage points:

1. CampaignDashboard — `padding: "2rem 3rem 4rem"` too wide on mobile, top bar buttons overflow on small screens
2. OnboardingForm — heading font size hardcoded at `110px`, completely unusable on mobile
3. WrittenTab — 3-column captions grid collapses incorrectly on small screens
4. WrittenTab — Platform previewer cards (360–400px wide) overflow on phone screens
5. StrategyTab — 2-column and 3-column grids break on mobile
6. StrategyTab — Competitor analysis comparison row (3-col grid) becomes unreadable

Bob recommended replacing inline style layout properties with CSS classNames so that media query breakpoints in `globals.css` could actually fire — since inline styles have higher specificity than CSS classes and were overriding all responsive rules.

Bob helped write the full breakpoint system in `globals.css`:

- `@media (max-width: 1024px)` — 3-col grids drop to 2-col
- `@media (max-width: 900px)` — 2-col side-by-side sections stack vertically
- `@media (max-width: 768px)` — dashboard padding reduces, summary card stacks, slide panels go full-width
- `@media (max-width: 640px)` — all grids drop to 1-col, heading font clamped tighter
- `@media (max-width: 400px)` — maximum compression for very small phones

The heading font size was fixed from `110px` hardcoded to `clamp(36px, 8vw, 110px)` scaling smoothly from desktop to the smallest phone.

## Phase 15 — README and documentation

Bob was used to draft the full project README for the GitHub submission, covering all five required sections:

1. Problem statement
2. Solution description
3. AI approach and architecture
4. Selected challenge theme
5. How IBM Bob was used

Bob also helped write the multilingual about section with the product tagline translated into Yoruba, Nigerian Pidgin, and Swahili, signalling cultural authenticity to judges reading the GitHub repo.

Bob's note on the README: _"The cultural context engine (culturalContext.js) is your strongest differentiator — make sure the video shows it generating something that's clearly Nigerian or African, not generic AI output. That's the moment judges will remember."_

## Complete timeline summary

| Phase               | What Bob did                                                   |
| ------------------- | -------------------------------------------------------------- |
| 1 — Ideation        | Market research, gap identification, concept validation        |
| 2 — Naming          | Product name and multilingual taglines                         |
| 3 — Architecture    | Full data flow, file structure, tech stack decisions           |
| 4 — Cultural engine | Designed and implemented culturalContext.js                    |
| 5 — UX planning     | All screens, features, and judging strategy                    |
| 6 — Backend route   | Discovered existing implementation, prevented rework           |
| 7 — Server review   | Validated Express structure, confirmed no changes needed       |
| 8 — Testing         | Grounded test plan with real curl commands                     |
| 9 — Crash fix       | Diagnosed MODULE_NOT_FOUND, ran npm install                    |
| 10 — Frontend audit | Found and fixed 3 bugs across 2 files                          |
| 11 — Key validation | Confirmed .env loading without key exposure                    |
| 12 — Credit error   | Diagnosed 400 error, applied mock mode fix                     |
| 13 — Network error  | Diagnosed ETIMEDOUT, provided two resolution paths             |
| 14 — Mobile         | Full responsive audit, 6 issues fixed, breakpoint system built |
| 15 — Documentation  | README drafted with all 5 required sections                    |

## What IBM Bob contributed that mattered most

Phase 6 saved the most time — discovering the backend route was already fully implemented before any duplicate code was written meant the entire architecture was validated in seconds rather than rebuilt unnecessarily.

Phase 10 caught the most critical bug — a Regenerate button with no handler would have caused a silent failure during the live demo, the worst possible moment to discover a problem.

Phase 12 was the most valuable intervention — correctly distinguishing a billing issue from a code bug, and immediately providing a working alternative (mock mode) that let the complete app be demonstrated and recorded without waiting for payment to process.

Phase 14 had the broadest impact — the responsive audit touched every screen in the app and ensured the product worked on any device a judge or creator might use to evaluate it.

## Running locally

_Built by Abdulquadri Olajide — Computer Science student, Obafemi Awolowo University, Nigeria_
_IBM AI Builders Challenge · July 2026 · Reimagine Creative Industries with AI_
