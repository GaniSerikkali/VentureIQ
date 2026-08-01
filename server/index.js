// Minimal backend proxy for VentureIQ.
//
// The prototype called https://api.anthropic.com/v1/messages directly from
// the browser. That only works inside the Claude.ai artifact sandbox, where
// the API key is injected for you. In a normal deployment, calling the
// Anthropic API straight from client-side JS would mean either the request
// gets blocked by CORS, or you'd have to ship your API key to every visitor's
// browser (never do this). This tiny Express server keeps the key on the
// server and forwards evaluation requests on the frontend's behalf.

import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 8787;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-6";

if (!ANTHROPIC_API_KEY) {
  console.warn(
    "[server] Warning: ANTHROPIC_API_KEY is not set. Requests to /api/evaluate will fail.\n" +
      "         Copy .env.example to .env and add your key."
  );
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/api/evaluate", async (req, res) => {
  try {
    const { system, messages, max_tokens } = req.body || {};
    if (!system || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing 'system' or 'messages' in request body." });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: max_tokens || 1800,
        system,
        messages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      console.error("[server] Anthropic API error:", data);
      return res.status(anthropicRes.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error("[server] /api/evaluate failed:", err);
    res.status(500).json({ error: "Internal server error while contacting Anthropic API." });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`[server] VentureIQ API proxy listening on http://localhost:${PORT}`);
});
