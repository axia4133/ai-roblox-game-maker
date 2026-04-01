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

function hasMinimumStructure(result) {
  return (
    result &&
    typeof result.title === "string" &&
    typeof result.overview === "string" &&
    Array.isArray(result.systems) &&
    result.systems.length > 0 &&
    Array.isArray(result.scripts) &&
    result.scripts.length > 0 &&
    Array.isArray(result.structure) &&
    result.structure.length > 0 &&
    Array.isArray(result.monetization) &&
    result.monetization.length > 0
  );
}

function buildUserPrompt({ prompt, gameType, complexity }) {
  const focusByType = {
    Obby: "Emphasize checkpoints, hazards, progression pacing, and stage readability.",
    Tycoon: "Emphasize economy loops, unlock chains, and compounding progression.",
    Simulator: "Emphasize stat scaling, rebirth pacing, and retention loops.",
    Survival: "Emphasize enemy scaling, resource scarcity, and mid-run choices.",
    Shooter: "Emphasize combat feel, weapon tiers, and map control loops.",
    Horror: "Emphasize tension pacing, audio/lighting cues, and replay-safe scares.",
    Custom: "Balance structure, scope, and replayability around the concept."
  };

  const complexityGuidance = {
    Simple: "Keep scope lean with 1-2 core loops and few systems.",
    Medium: "Provide balanced scope with clear feature layering and polish targets.",
    Advanced: "Provide deeper roadmap with multiple interlocking systems."
  };

  return [
    `Prompt: ${prompt}`,
    `Game type: ${gameType}`,
    `Complexity: ${complexity}`,
    `Type focus: ${focusByType[gameType] || focusByType.Custom}`,
    `Complexity focus: ${complexityGuidance[complexity] || complexityGuidance.Medium}`,
    "Generate practical, specific, believable output. Avoid generic filler."
  ].join("\n");
}

async function generateWithOpenAI({ prompt, gameType, complexity }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (String(apiKey).includes("sk-...")) {
    throw new Error("OPENAI_API_KEY is placeholder value");
  }

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const client = new OpenAI({ apiKey });

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const response = await client.responses.create({
      model,
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
              text: buildUserPrompt({ prompt, gameType, complexity })
            }
          ]
        }
      ],
      text: { format: { type: "json_object" } }
    });

    const rawText = response.output_text;
    const parsed = JSON.parse(rawText);
    const normalized = normalizeResult(parsed, gameType, complexity);
    if (hasMinimumStructure(normalized)) {
      return { ...normalized, model };
    }
  }

  throw new Error("OpenAI output failed validation after retries");
}

module.exports = {
  generateWithOpenAI
};

