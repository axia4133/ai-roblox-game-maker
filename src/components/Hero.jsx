function Hero({ onStartClick }) {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div>
          <p className="kicker">Build Roblox concepts in minutes</p>
          <h1>Turn plain-English ideas into Roblox game plans and scripts.</h1>
          <p className="hero-subtitle">
            Describe your game concept and get a startup-grade design summary, systems
            map, Lua script suggestions, and studio-ready project structure.
          </p>
          <button className="btn btn-large" onClick={onStartClick}>
            Generate My First Game
          </button>
        </div>
        <div className="hero-card">
          <h3>Example Output Snapshot</h3>
          <ul>
            <li>Game loop, progression, and content roadmap</li>
            <li>Core system checklist for your chosen genre</li>
            <li>Modular Lua script drafts with clear responsibilities</li>
            <li>Roblox Studio folder/module starter blueprint</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Hero;
