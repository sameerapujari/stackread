# Stackread — GitHub Repository Analyzer

Understand unfamiliar GitHub repositories faster with structured AI-generated insights.

## Problem

Understanding an unfamiliar open-source project can take time. Stackread generates a structured overview to help developers understand a repository's purpose, technologies, architecture, and where to start reading.

> Stackread uses repository metadata, README content, languages, and top-level directory structure. It does not analyze the entire codebase.


---

## Screenshot



## Features

- Repository metadata: stars, forks, language, and license
- AI-generated insights on purpose, tech stack, architecture, and reading order
- Language breakdown visualization
- Concurrent GitHub API requests using `Promise.all`
- Redis caching with a 24-hour TTL
- URL validation, rate limiting, and centralized error handling

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Google Gemini API
- **Caching:** Upstash Redis
- **External API:** GitHub REST API

## Architecture

````
┌─────────────┐     ┌─────────────────────┐     ┌──────────────┐
│   React UI  │────▶│   Express REST API   │────▶│  Redis Cache │
│   (Vite)    │     │                     │     │  (Upstash)   │
└─────────────┘     └──────┬──────────────┘     └──────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
              ┌─────▼─────┐ ┌────▼──────┐
              │ GitHub API │ │ Gemini AI │
              │ (metadata, │ │ (analysis │
              │  README,   │ │  generation)
              │  languages,│ └───────────┘
              │  contents) │
              └────────────┘
````

Redis caches analysis results to reduce repeated API calls and response time.

## Getting Started

### Prerequisites

- Node.js 18+
- GitHub personal access token (if required by your configuration)
- Gemini API key
- Upstash Redis credentials

### 1. Clone the repository

```bash
git clone https://github.com/sameerapujari/stackread.git
cd stackread
```

### 2. Configure the backend

```bash
cd backend
npm install
cp .env.example .env
```

Add your API credentials to `.env`, then start the server:

```bash
npm run dev
```

### 3. Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment Variables

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | GitHub API authentication |
| `GEMINI_API_KEY` | Gemini API access |
| `UPSTASH_REDIS_REST_URL` | Redis endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Redis authentication |
| `PORT` | Backend port (default: 5000) |
| `VITE_API_URL` | Backend URL for the frontend |

## Future Improvements

- Explore nested directories
- Support branch selection
- Suggest contribution opportunities based on issue labels
- Compare repositories side by side
