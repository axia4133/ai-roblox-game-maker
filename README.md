# AI Roblox Game Generator

Modern dark SaaS-style MVP that turns plain-English Roblox game ideas into a structured blueprint:

- Game design overview
- Systems/features checklist
- Suggested Roblox Lua scripts
- Roblox Studio folder/module structure
- Monetization ideas

## Run locally (v2 with API)

This repo contains:

- **Frontend**: Create React App (port 3000)
- **Local API**: Express (port 5055)

Open two terminals:

### 1) Start the API server

```bash
npm run server
```

### 2) Start the frontend

```bash
npm start
```

Then open `http://localhost:3000`.

### Optional: enable real OpenAI generation

1. Create a local env file:
   - `cp .env.example .env`
2. Set your key in `.env`:
   - `OPENAI_API_KEY=...`
3. Restart the API server:
   - `npm run server`

When OpenAI is configured, `/api/generate` uses OpenAI.
If not configured (or if OpenAI fails), it automatically falls back to the mock provider.

## API notes

- The frontend calls `POST /api/generate` (proxied to `http://localhost:5055`) when the API is running.
- If the API isn’t running, it falls back to a local mock generator so the UI still works.
- Health check: `GET /api/health`
- Health payload includes `openaiConfigured` so you can verify key setup quickly.

## Version 2 roadmap (recommended next)

- **OpenAI API integration**: server-side prompt templates + JSON schema validation for outputs
- **Roblox Lua export pipeline**: export a zip of scripts/modules and a Studio-ready structure
- **User auth**: accounts + projects
- **Payments**: tiered plans + usage limits
- **Cloud save**: sync history/projects across devices + team workspaces
