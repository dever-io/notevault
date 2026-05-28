# NoteVault — Frontend

React + TypeScript + Vite app. Auth + notes UI for NoteVault.

## Stack

- React 18 + TypeScript (strict)
- Vite build/dev server
- `react-router-dom` for routing (Home / Login / Register / Notes)
- `zustand` for global state — `authStore` (persisted) and `notesStore`
- Plain CSS (`src/styles/global.css`)

## Folder structure

```
src/
├── api/         API client (fetch wrapper, error normalisation)
├── components/  Reusable UI pieces (forms, dialogs, search bar)
├── pages/       Route-level views (Home, Login, Register, Notes)
├── store/       Zustand stores (auth, notes)
├── styles/      Global CSS
└── types/       Shared TS types (User, Note, ApiError)
```

## Scripts

| Command           | What it does                       |
|-------------------|------------------------------------|
| `npm run dev`     | Vite dev server on :5173           |
| `npm run build`   | TypeScript check + production build|
| `npm run preview` | Serve the built bundle             |
| `npm run typecheck` | Strict type check, no emit       |

## Environment

Copy `.env.example` to `.env` and adjust `VITE_API_URL` (defaults to `/api`,
which works behind the dev-server proxy or a reverse proxy).
