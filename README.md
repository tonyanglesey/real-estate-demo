# LeadFlow Real Estate Demo

Full-stack lead management demo for real estate teams, with a React dashboard client and an Express/Postgres API server.

## Project Structure

```text
.
├── client/   # React + TypeScript + Vite dashboard
└── server/   # Express API + PostgreSQL + Claude-powered AI actions
```

## What The Client Does

- Displays and filters leads by status.
- Sorts by `created_at`, `ai_score`, `budget_min`, or `budget_max`.
- Lets users update lead status, trigger AI lead scoring, and generate AI follow-up email drafts.
- Talks to the API through `client/src/lib/api.ts`.

## What The Server Does

- Exposes REST endpoints under `/api`.
- Reads/writes leads in PostgreSQL.
- Supports AI actions for scoring lead quality (`1-100`) and drafting follow-up email copy.
- Includes migration and seed scripts for local setup.

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL (local or remote)
- Anthropic API key (for AI endpoints)

## Environment Variables

### `server/.env`

```env
PORT=5001
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://localhost:5432/leadflow_re
ANTHROPIC_API_KEY=your_anthropic_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

### `client/.env` (optional but recommended)

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Note: client fallback points to port `5001`, while the server fallback in code is `5000`. Set `PORT=5001` on the server (or update `VITE_API_BASE_URL`) so they match.

## Local Setup

### 1) Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2) Prepare database

```bash
cd server
npm run migrate
npm run seed
```

### 3) Run both apps

Server:

```bash
cd server
npm run dev
```

Client:

```bash
cd client
npm run dev
```

## API Overview

Base URL: `http://localhost:5001/api`

- `GET /health` - health check
- `GET /leads` - list leads (supports `status`, `sortBy`, `sortOrder`)
- `GET /leads/:id` - fetch one lead
- `POST /leads` - create lead
- `PATCH /leads/:id` - update lead status
- `POST /leads/:id/score` - score lead with Claude
- `POST /leads/:id/draft` - generate follow-up email with Claude

## Typical Workflow

1. Seed data in PostgreSQL.
2. Open dashboard in browser (`http://localhost:5173` by default).
3. Filter/sort leads and inspect details.
4. Score a lead to populate `ai_score` and `ai_reasoning`.
5. Draft a follow-up to populate `ai_draft`.

## Tech Stack

- Client: React 19, TypeScript, Vite, Tailwind, Radix UI
- Server: Node.js, Express, PostgreSQL (`pg`), Anthropic SDK
