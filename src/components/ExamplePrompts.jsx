const prompts = [
  "Make me a zombie survival tycoon with wave-based enemies, weapons, coin pickups, and a shop system.",
  "Build an obby where players unlock new biomes, avoid hazards, and buy checkpoints.",
  "Create a pet simulator with egg hatching, rebirth progression, and rarity-based upgrades."
];

function ExamplePrompts({ onUsePrompt }) {
  return (
    <section className="section">
      <div className="container">
        <h2>Try these example prompts</h2>
        <div className="examples-list">
          {prompts.map((prompt) => (
            <button key={prompt} className="example-btn" onClick={() => onUsePrompt(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExamplePrompts;
