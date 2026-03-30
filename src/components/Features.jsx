const featureItems = [
  {
    title: "AI-Assisted Game Design",
    description: "Transform rough ideas into scoped and shippable Roblox game concepts."
  },
  {
    title: "Genre-Aware Suggestions",
    description: "Systems and scripts adapt to tycoon, obby, survival, simulator, and more."
  },
  {
    title: "Studio-Ready Structure",
    description: "Get clear folder and module organization for Roblox Studio execution."
  },
  {
    title: "Creator Monetization Ideas",
    description: "Receive practical premium, gamepass, and economy strategy suggestions."
  }
];

function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <h2>Features built for indie teams and startup builders</h2>
        <div className="card-grid">
          {featureItems.map((feature) => (
            <article key={feature.title} className="card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
