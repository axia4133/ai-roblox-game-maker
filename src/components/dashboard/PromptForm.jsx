const gameTypes = ["Obby", "Tycoon", "Simulator", "Survival", "Shooter", "Horror", "Custom"];
const complexities = ["Simple", "Medium", "Advanced"];

const quickPrompts = [
  "Zombie survival tycoon with wave-based enemies and weapon shop",
  "Sci-fi obby with moving hazards and checkpoint upgrades",
  "Pet simulator with egg hatching and rebirth progression"
];

function PromptForm({
  prompt,
  gameType,
  complexity,
  onPromptChange,
  onGameTypeChange,
  onComplexityChange,
  onSubmit,
  loading
}) {
  return (
    <form className="prompt-form card" onSubmit={onSubmit}>
      <div className="form-row">
        <label htmlFor="prompt">Describe your Roblox game idea</label>
        <textarea
          id="prompt"
          rows={7}
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Example: Make me a zombie survival tycoon with wave-based enemies, weapons, coin pickups, and a shop system."
          required
        />
        <p className="meta-text">{prompt.length} characters</p>
      </div>

      <div className="quick-prompts">
        {quickPrompts.map((quickPrompt) => (
          <button
            key={quickPrompt}
            type="button"
            className="chip-btn"
            onClick={() => onPromptChange(quickPrompt)}
          >
            {quickPrompt}
          </button>
        ))}
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="gameType">Game Type</label>
          <select
            id="gameType"
            value={gameType}
            onChange={(event) => onGameTypeChange(event.target.value)}
          >
            {gameTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="complexity">Complexity</label>
          <select
            id="complexity"
            value={complexity}
            onChange={(event) => onComplexityChange(event.target.value)}
          >
            {complexities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn btn-large" type="submit" disabled={loading || !prompt.trim()}>
        {loading ? "Generating..." : "Generate Game Blueprint"}
      </button>
    </form>
  );
}

export default PromptForm;
