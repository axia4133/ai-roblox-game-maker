const steps = [
  "Describe your game concept in plain English.",
  "Choose game type and complexity for tighter generation quality.",
  "Review generated design overview, systems, scripts, and structure.",
  "Copy or download the output and start building in Roblox Studio."
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <h2>How it works</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={step} className="step-card">
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
