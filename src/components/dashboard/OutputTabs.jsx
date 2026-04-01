import { useMemo, useState } from "react";

const tabConfig = [
  { id: "overview", label: "Overview" },
  { id: "systems", label: "Systems" },
  { id: "scripts", label: "Lua Scripts" },
  { id: "structure", label: "Roblox Structure" },
  { id: "monetization", label: "Monetization" }
];

function OutputTabs({ result, onCopy, onDownload }) {
  const [activeTab, setActiveTab] = useState("overview");
  const generatedAtText = result?.generatedAt
    ? new Date(result.generatedAt).toLocaleString()
    : "n/a";

  const activeContent = useMemo(() => {
    if (!result) {
      return null;
    }

    if (activeTab === "overview") {
      return <p>{result.overview}</p>;
    }

    if (activeTab === "systems") {
      return (
        <ul>
          {result.systems.map((system) => (
            <li key={system}>{system}</li>
          ))}
        </ul>
      );
    }

    if (activeTab === "scripts") {
      return (
        <div className="scripts-list">
          {result.scripts.map((script) => (
            <article key={script.name} className="script-card">
              <h4>{script.name}</h4>
              <pre>{script.code}</pre>
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === "structure") {
      return (
        <ul>
          {result.structure.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <ul>
        {result.monetization.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
    );
  }, [activeTab, result]);

  if (!result) {
    return (
      <section className="card empty-state">
        <h3>No generation yet</h3>
        <p>Submit a prompt to generate your Roblox game blueprint.</p>
      </section>
    );
  }

  return (
    <section className="card output-panel">
      <div className="output-header">
        <div>
          <h3>{result.title}</h3>
          <p className="output-meta">
            Provider: <strong>{result.provider || "unknown"}</strong>
            {"  "} | {"  "}
            Model: <strong>{result.model || "n/a"}</strong>
            {"  "} | {"  "}
            Generated: <strong>{generatedAtText}</strong>
          </p>
          {result.fallbackReason ? (
            <p className="output-warning">Fallback reason: {result.fallbackReason}</p>
          ) : null}
        </div>
        <div className="action-row">
          <button className="btn-secondary" onClick={onCopy}>
            Copy Output
          </button>
          <button className="btn-secondary" onClick={onDownload}>
            Download .txt
          </button>
        </div>
      </div>

      <div className="tab-row">
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">{activeContent}</div>
    </section>
  );
}

export default OutputTabs;
