# ProdigyOS – AI Productivity Operating System

Full-stack MVP built with **Next.js + Tailwind CSS** exposing backend APIs for tasks, time logs, dashboard analytics, AI schedule suggestions, and research copilot generation.

## Project location

Everything is generated **inside this repository root**. Run commands from the folder that contains:

- `package.json`
- `app/`
- `components/`
- `lib/`

## Run locally (from repo root)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## One-command bootstrap

### macOS / Linux

```bash
./scripts/bootstrap.sh
```

### Windows PowerShell

```powershell
.\scripts\bootstrap.ps1
```

## Netlify deployment (one-click ready)

This repo includes a `netlify.toml` and Netlify Next.js plugin so you can deploy directly.

### Option A: Import from GitHub (recommended)

1. Push this repo to GitHub.
2. In Netlify, click **Add new project → Import an existing project**.
3. Select this repository.
4. Netlify should auto-detect:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy.

### Option B: Netlify CLI

```bash
npm install
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. In Netlify, add the same keys under **Site configuration → Environment variables**.

- `OPENAI_API_KEY` (optional, for real LLM integration)
- `NEXT_PUBLIC_SUPABASE_URL` (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional)
- `SUPABASE_SERVICE_ROLE_KEY` (optional)
- `DATABASE_URL` (optional)

## Implemented modules

- AI Smart Dashboard
- Smart Task Manager
- AI Schedule Suggestions
- Time Tracking API
- Research Copilot API (keywords, summary, notes, citation draft, podcast script)
- Weekly AI Productivity Report API
- Dark/Light mode

## API surface

- `GET/POST /api/tasks`
- `GET/POST /api/timelogs`
- `GET /api/dashboard`
- `GET /api/weekly-report`
- `POST /api/ai/schedule`
- `POST /api/ai/research`

## Notes

- Data is in-memory (`lib/store.ts`) for demo speed.
- You can replace store implementation with Supabase/PostgreSQL adapters in production.
