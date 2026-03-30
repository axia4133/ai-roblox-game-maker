const OpenAI = require("openai");

const OUTPUT_SCHEMA_GUIDE = `Return JSON only with this exact shape:
{
  "title": "string",
  "overview": "string",
  "systems": ["string"],
  "scripts": [{ "name": "string", "code": "string" }],
  "structure": ["string"],
  "monetization": ["string"]
}`;

function normalizeResult(parsed, gameType, complexity) {
  return {
    title: typeof parsed.title === "string" ? parsed.title : `${gameType} ${complexity} Blueprint`,
    overview: typeof parsed.overview === "string" ? parsed.overview : "Generated overview unavailable.",
    systems: Array.isArray(parsed.systems) ? parsed.systems.filter(Boolean) : [],
    scripts: Array.isArray(parsed.scripts)
      ? parsed.scripts
          .filter((script) => script && typeof script === "object")
          .map((script) => ({
            name: typeof script.name === "string" ? script.name : "Script.server.lua",
            code: typeof script.code === "string" ? script.code : "-- Generated script unavailable"
          }))
      : [],
    structure: Array.isArray(parsed.structure) ? parsed.structure.filter(Boolean) : [],
    monetization: Array.isArray(parsed.monetization) ? parsed.monetization.filter(Boolean) : []
  };
}

async function generateWithOpenAI({ prompt, gameType, complexity }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: "You are an expert Roblox game designer. Produce startup-quality Roblox game blueprints."
          },
          { type: "input_text", text: OUTPUT_SCHEMA_GUIDE }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Prompt: ${prompt}\nGame type: ${gameType}\nComplexity: ${complexity}\nGenerate practical, specific, believable output.`
          }
        ]
      }
    ],
    text: { format: { type: "json_object" } }
  });

  const rawText = response.output_text;
  const parsed = JSON.parse(rawText);
  return normalizeResult(parsed, gameType, complexity);
}

module.exports = {
  generateWithOpenAI
};

