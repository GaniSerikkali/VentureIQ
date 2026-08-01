# VentureIQ

Investment-readiness evaluator for early-stage startups (KK / RU / EN), built with React + Vite.

## What changed vs. the prototype

The prototype .jsx file was written to run inside a Claude.ai artifact, where
two things are provided for you automatically that don't exist in a normal
browser:

1. **`window.storage`** — a key/value store used here for the evaluation
   history strip. This project ships a drop-in polyfill
   (`src/lib/storage.js`) backed by `localStorage`, so history keeps working
   with zero code changes to `App.jsx`. Swap it for a real backend if you
   want history synced across devices.
2. **A pre-authenticated call to `https://api.anthropic.com/v1/messages`** —
   in a real deployment, calling that endpoint straight from the browser
   would either get blocked by CORS or require shipping your API key to
   every visitor. So this project adds a tiny Express server
   (`server/index.js`) that holds the API key and proxies the request.
   `App.jsx` now calls `fetch("/api/evaluate")` instead of the Anthropic URL
   directly — that's the only line changed in the component itself.

Everything else — all styling, copy, translations, scoring rubric, and UI —
is untouched from the prototype.

## Project structure

```
ventureiq/
├── index.html
├── vite.config.js          # dev proxy: /api -> localhost:8787
├── package.json
├── .env.example
├── server/
│   └── index.js            # Express proxy to the Anthropic API
└── src/
    ├── main.jsx             # entry point, installs the storage polyfill
    ├── index.css
    ├── App.jsx              # the full VentureIQ component (from the prototype)
    └── lib/
        └── storage.js       # localStorage-backed window.storage polyfill
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Anthropic API key:
   ```bash
   cp .env.example .env
   # then edit .env and paste your key
   ```
3. Run both the frontend and the API proxy together:
   ```bash
   npm run dev
   ```
   This starts Vite on `http://localhost:5173` and the API proxy on
   `http://localhost:8787`, wired together by the Vite dev proxy.

Open `http://localhost:5173` in your browser.

## Production build

```bash
npm run build      # outputs static files to dist/
npm start           # runs the Express server (serve dist/ separately,
                     # e.g. behind Nginx, Vercel static hosting, etc.,
                     # and point it at the same host as the API server,
                     # or add express.static('dist') to server/index.js)
```

For a simple single-server deployment, you can add this to
`server/index.js` right before `app.listen`:

```js
import path from "path";
app.use(express.static(path.join(process.cwd(), "dist")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(process.cwd(), "dist", "index.html"))
);
```

Then `npm run build && npm start` serves everything from one process.

## Notes

- Model used: `claude-sonnet-4-6` (set server-side in `server/index.js`).
- Never commit your `.env` file — it's already in `.gitignore`.
