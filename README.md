# ProdigyOS – AI Productivity Operating System

Full-stack MVP built with **Next.js + Tailwind CSS** exposing backend APIs for tasks, time logs, dashboard analytics, AI schedule suggestions, and research copilot generation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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
