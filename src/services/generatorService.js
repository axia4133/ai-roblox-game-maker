const complexityMap = {
  Simple: "minimal viable feature set",
  Medium: "balanced scope with polished progression loops",
  Advanced: "content-rich roadmap with deeper retention systems"
};

const baseSystems = [
  "Player onboarding flow with tutorial messaging",
  "Session-based reward tracking",
  "Core game loop metrics (time played, rounds completed, spend intent)"
];

const byKeyword = {
  zombies: {
    systems: [
      "Wave spawner with escalating enemy health and speed",
      "Weapon unlock tree and ammo economy",
      "Safe-zone timer with risk/reward bonuses"
    ],
    scripts: [
      {
        name: "ZombieWaveManager.server.lua",
        code: `local WaveManager = {}
local currentWave = 0

function WaveManager:StartNextWave()
  currentWave += 1
  -- Spawn zombies based on wave scaling data.
  print("Starting wave", currentWave)
end

return WaveManager`
      }
    ]
  },
  tycoon: {
    systems: [
      "Plot claiming and ownership persistence",
      "Dropper-to-collector cash pipeline",
      "Upgradeable production chain with unlock gates"
    ],
    scripts: [
      {
        name: "TycoonCashFlow.server.lua",
        code: `local TycoonCashFlow = {}

function TycoonCashFlow:Collect(player, amount)
  player.leaderstats.Coins.Value += amount
end

return TycoonCashFlow`
      }
    ]
  },
  obby: {
    systems: [
      "Checkpoint save and respawn logic",
      "Hazard detection with fair recovery rules",
      "Stage unlock and difficulty ramping"
    ],
    scripts: [
      {
        name: "CheckpointHandler.server.lua",
        code: `local CheckpointHandler = {}

function CheckpointHandler:SetCheckpoint(player, stageIndex)
  player:SetAttribute("CheckpointStage", stageIndex)
end

return CheckpointHandler`
      }
    ]
  },
  simulator: {
    systems: [
      "Stat gain loop with rebirth mechanics",
      "Upgradeable tools and multiplier balancing",
      "Pet/companion rarity and passive bonuses"
    ],
    scripts: [
      {
        name: "ProgressionService.server.lua",
        code: `local ProgressionService = {}

function ProgressionService:AddXp(player, amount)
  local currentXp = player:GetAttribute("XP") or 0
  player:SetAttribute("XP", currentXp + amount)
end

return ProgressionService`
      }
    ]
  }
};

function includesKeyword(prompt, keyword) {
  return prompt.toLowerCase().includes(keyword);
}

export async function generateGameBlueprint({ prompt, gameType, complexity }) {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  const normalized = prompt.toLowerCase();
  const systems = [...baseSystems];
  const scripts = [
    {
      name: "GameBootstrap.server.lua",
      code: `local ReplicatedStorage = game:GetService("ReplicatedStorage")
print("Bootstrapping game systems from AI blueprint...")
-- Register remote events, initialize modules, then start game loop.`
    }
  ];

  Object.entries(byKeyword).forEach(([keyword, content]) => {
    if (normalized.includes(keyword)) {
      systems.push(...content.systems);
      scripts.push(...content.scripts);
    }
  });

  if (systems.length === baseSystems.length) {
    systems.push(
      "Objective manager with round goals",
      "Economy tuning for rewards and sinks",
      "Data model for player progression"
    );
  }

  if (includesKeyword(prompt, "shop")) {
    systems.push("In-game shop with rotating featured offers");
  }

  if (includesKeyword(prompt, "weapons")) {
    systems.push("Weapon balancing table with rarity and recoil profiles");
  }

  if (includesKeyword(prompt, "coin")) {
    systems.push("Pickup spawning and anti-farm cooldown controls");
  }

  const title = `${gameType} ${complexity} Blueprint`;
  const overview = `This concept is designed as a ${complexityMap[complexity]} for a ${gameType.toLowerCase()}-style Roblox game. Prompt focus: "${prompt}". The output prioritizes replayability, progression clarity, and monetization hooks that can be layered without breaking early gameplay.`;

  return {
    title,
    overview,
    systems: [...new Set(systems)],
    scripts,
    structure: [
      "ReplicatedStorage/",
      "ReplicatedStorage/Remotes/",
      "ReplicatedStorage/Modules/",
      "ServerScriptService/",
      "ServerScriptService/Systems/",
      "StarterPlayer/StarterPlayerScripts/",
      "StarterGui/GameHUD/"
    ],
    monetization: [
      "Gamepasses: +Inventory Slots, VIP Speed, Premium Starter Pack",
      "Dev Products: Coin bundles, revive tokens, instant wave skip",
      "Retention Loop: Daily streak rewards and rotating limited-time quests"
    ]
  };
}

// TODO(v2): Replace mock logic with OpenAI API integration and prompt templates.
// TODO(v2): Add Roblox Lua export pipeline to generate downloadable script bundles.
// TODO(v2): Add user auth and project ownership for multi-device access.
// TODO(v2): Add payment integration for usage-based premium tiers.
// TODO(v2): Add cloud save and shared team workspaces for studio collaboration.
