# Stackread — GitHub Repository Analyzer

**Understand any public GitHub repository in minutes.**

## Problem

I wanted to start contributing to open source, but understanding large unfamiliar repositories was taking too much time. Before contributing, I had to manually figure out the project purpose, technologies used, folder structure, and where to begin reading the code.

Stackread solves this by generating a structured overview of any public GitHub repository so developers can understand a project much faster before diving into the code.

> **Note:** Stackread provides a high-level overview based on repository metadata, README content, languages, and top-level directory structure. It is not a full codebase analysis.

---

## Architecture

```
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
```

**Request flow:**

1. User pastes a GitHub repository URL
2. Backend parses the URL and checks Redis cache
3. If cached → return immediately with `fromCache: true`
4. If not cached → fetch data from GitHub, send to Gemini, cache the result, return response

---

## Features

- GitHub URL parsing with validation
- Repository metadata display (stars, forks, issues, language, license)
- AI-generated analysis (purpose, tech stack, architecture, reading order, difficulty)
- Language breakdown bar
- Loading states with progress indicators
- Meaningful error messages for all failure cases

---

## Tech Stack

| Layer    | Technology                   |
|----------|------------------------------|
| Frontend | React, Vite, TailwindCSS     |
| Backend  | Node.js, Express             |
| AI       | Google Gemini API             |
| Cache    | Upstash Redis (REST)         |
| APIs     | GitHub REST API v3            |

---

## System Design Decisions

### Concurrent Requests with Promise.all

The backend fetches four independent pieces of data from GitHub:
- Repository metadata
- Languages
- README content
- Root directory contents

Since these requests don't depend on each other, they run concurrently using `Promise.all`. This reduces total response time from ~1.5s (sequential) to ~400ms (parallel).

```javascript
const [metadata, languages, readme, contents] = await Promise.all([
  fetchMetadata(owner, repo),
  fetchLanguages(owner, repo),
  fetchReadme(owner, repo),
  fetchRootContents(owner, repo),
]);
```

### Redis Caching (Upstash)

Analysis results are cached with a 24-hour TTL using the key pattern `analysis:{owner}:{repo}`.

**Why cache?**
- GitHub API has rate limits (60/hour unauthenticated, 5000/hour with token)
- Gemini API calls add 3-8 seconds of latency
- The same repository doesn't change significantly within 24 hours

**Graceful degradation:** If Redis is unavailable, the application continues without caching. This is handled in `cacheService.js` with try/catch around all Redis operations.

### Centralized Error Handling

Instead of handling errors in every route, a single error handler middleware maps known error types to meaningful HTTP responses:

| Error | Response |
|-------|----------|
| Invalid GitHub URL | 400 with validation message |
| Repository not found | 404 |
| GitHub rate limit | 429 |
| Gemini failure | 502 with fallback analysis |
| Unknown error | 500 |

---

## Project Structure

```
stackread/
├── backend/
│   ├── server.js                    # Express app entry point
│   ├── controllers/
│   │   └── analyzeController.js     # Request handler for /api/analyze
│   ├── services/
│   │   ├── githubService.js         # GitHub API calls (Promise.all)
│   │   ├── geminiService.js         # Gemini prompt + response parsing
│   │   └── cacheService.js          # Redis get/set with TTL
│   ├── middleware/
│   │   ├── errorHandler.js          # Centralized error handler
│   │   ├── rateLimiter.js           # 15 requests/min per IP
│   │   └── validateUrl.js           # GitHub URL validation
│   └── utils/
│       ├── repoParser.js            # URL → { owner, repo }
│       └── logger.js                # Timestamped logging
├── frontend/
│   └── src/
│       ├── App.jsx                  # Root component
│       ├── hooks/
│       │   └── useAnalyze.js        # Analysis state management
│       ├── components/
│       │   ├── Hero.jsx             # Header + tagline
│       │   ├── SearchInput.jsx      # URL input + analyze button
│       │   ├── LoadingState.jsx     # Spinner + progress text
│       │   ├── ErrorMessage.jsx     # Error display
│       │   ├── RepoOverview.jsx     # Metadata card
│       │   ├── AiInsights.jsx       # AI analysis sections
│       │   └── Footer.jsx           # Footer
│       └── utils/
│           └── api.js               # Axios instance
└── README.md
```

---

## Setup

### Prerequisites

- Node.js 18+
- GitHub personal access token ([create one](https://github.com/settings/tokens))
- Gemini API key ([get one](https://aistudio.google.com/apikey))
- Upstash Redis database ([create free](https://upstash.com))

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your API keys in .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## Deployment

### Backend → Render

1. Push the repository to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables from `.env.example`

### Frontend → Vercel

1. Import the repository on [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub personal access token for API access |
| `GEMINI_API_KEY` | Google Gemini API key |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token |
| `PORT` | Server port (default: 5000) |
| `VITE_API_URL` | Backend URL for the frontend (frontend only) |

---

## Future Improvements

- Analyze nested directory structures beyond root level
- Support branch selection
- Add rate limit status indicator in the UI
- Generate contribution-specific suggestions based on issue labels
- Compare two repositories side by side
