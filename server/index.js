const express = require("express");
const { buildBlueprint } = require("./generator");
const { generateWithOpenAI } = require("./openaiGenerator");
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  const key = process.env.OPENAI_API_KEY || "";
  const looksConfigured =
    key.length > 10 && !key.includes("your_openai_api_key_here");
  res.json({ ok: true, openaiConfigured: looksConfigured });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, gameType, complexity } = req.body || {};

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    try {
      const aiResult = await generateWithOpenAI({ prompt, gameType, complexity });
      return res.json({ ...aiResult, provider: "openai" });
    } catch (openAIError) {
      // If OpenAI is unavailable, return deterministic mock output.
      await new Promise((resolve) => setTimeout(resolve, 450));
      return res.json({
        ...buildBlueprint({
          prompt,
          gameType,
          complexity
        }),
        provider: "mock"
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server generation failed" });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5055;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});

