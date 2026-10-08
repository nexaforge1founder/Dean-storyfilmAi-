# Dean StoryFilm AI — Complete Frontend

This frontend is designed against the current Dean StoryFilm AI production backend contract.

## Backend

Default API: `https://dean-storyfilmai-backend.onrender.com`

Override with Render environment variable:

`NEXT_PUBLIC_API_BASE_URL=https://dean-storyfilmai-backend.onrender.com`

## Backend contract used by this frontend

- `GET /health`
- `POST /jobs/movie`
- `POST /jobs/novel`
- `GET /jobs?limit=...`
- `GET /jobs/{job_id}`
- `GET /jobs/{job_id}/events`
- `GET /jobs/{job_id}/video`
- `GET /movies?limit=...`
- `GET /movies/{movie_id}`
- `GET /movies/{movie_id}/video`
- `POST /audio/assets`
- `GET /audio/assets`
- `POST /analyze/story`

Requests automatically include the locally persisted `X-User-ID` workspace header used by the current backend.

## Render deployment

For a Next.js Web Service:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Publish directory: leave blank
- Environment: `NEXT_PUBLIC_API_BASE_URL=https://dean-storyfilmai-backend.onrender.com`

Do not configure this as a static-site `out` deployment; the project runs with Next.js.

## Route compatibility

The following legacy/public routes redirect to the canonical pages:

- `/register` → `/auth/register`
- `/signup` → `/auth/register`
- `/sign-up` → `/auth/register`
- `/login` → `/auth/login`
- `/forgot-password` → `/auth/forget-password`
- `/forget-password` → `/auth/forget-password`
- `/auth/forgot-password` → `/auth/forget-password`
