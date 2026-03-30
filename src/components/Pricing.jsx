const plans = [
  {
    name: "Starter",
    price: "$0",
    detail: "For solo creators testing ideas",
    perks: ["5 generations/day", "Basic script suggestions", "TXT export"]
  },
  {
    name: "Pro",
    price: "$29",
    detail: "For active indie Roblox teams",
    perks: ["Unlimited generations", "Advanced prompt tuning", "Priority outputs"]
  },
  {
    name: "Studio",
    price: "$99",
    detail: "For startup studios and agencies",
    perks: ["Team seats", "Shared history", "API and pipeline access"]
  }
];

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2>Simple pricing to scale your game ideas</h2>
        <div className="card-grid">
          {plans.map((plan) => (
            <article key={plan.name} className="card pricing-card">
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <p>{plan.detail}</p>
              <ul>
                {plan.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
