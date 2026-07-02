# Àṣà — culturally-aware AI creative campaign assistant

Built for the **AI Builders Challenge with IBM Bob** — July 2026, "Reimagine Creative Industries with AI" theme.

## Problem statement

Existing AI creative tools (Canva AI, Jasper, Copy.ai, etc.) are built English-first and Western-context-first. African creators — musicians, filmmakers, content creators, brands — get generic, culturally flat output that doesn't reflect Pidgin, Yoruba, Swahili, or the visual language of Ankara, Kente, and Adire. There is no tool today that understands the difference between a Lagos creator's voice and a Nairobi creator's voice.

## Solution description

Àṣà ("culture/tradition" in Yoruba) is an AI creative campaign assistant that generates a **complete campaign** — written content, visual direction, and platform strategy — rooted in the creator's specific cultural context. A creator selects their type, describes their project, picks their cultural context (e.g. Nigeria — Yoruba, Kenya, Ghana) and tone, and àṣà generates:

- **Written content**: caption variations (short/medium/long), hashtag strategy, a script hook, and CTAs — written in the creator's actual cultural voice, including local language blending where natural.
- **Visual concepts**: a mood description, a culturally-rooted color palette with meaning, an AI-generated hero concept image, and a shot list.
- **Strategy**: best-fit platforms, optimal posting windows, audience targeting notes, and a 3-post campaign narrative arc.

## AI approach and architecture

- **Frontend**: React (Vite) — a 3-step onboarding form feeding into a tabbed campaign dashboard.
- **Cultural context engine**: front-end demo data and narrative structure for a standalone creative experience.
- **Text generation**: simulated in the frontend for preview and design validation.
- **Image generation**: placeholder visual concept support in the frontend.

```
asa-creative/
├── client/          React frontend (Vite)
│   └── src/components/   OnboardingForm, CampaignDashboard, WrittenTab, VisualTab, StrategyTab
```

## Selected challenge theme

**July — Reimagine Creative Industries with AI** (Creative ideation platforms / Personalized creative assistants)

## How IBM Bob was used

IBM Bob was used as the primary development tool throughout the build — assisting with component scaffolding and iterative frontend debugging.

## Running locally

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` to preview the frontend.

## Deployment

- Frontend → Vercel
