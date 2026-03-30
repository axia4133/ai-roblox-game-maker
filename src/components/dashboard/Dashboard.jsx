import { useEffect, useMemo, useState } from "react";
import PromptForm from "./PromptForm";
import OutputTabs from "./OutputTabs";
import HistorySidebar from "./HistorySidebar";
import { generateGameBlueprint } from "../../services/generatorService";

const HISTORY_KEY = "roblox-generator-history";

function Dashboard({ prefillPrompt }) {
  const [prompt, setPrompt] = useState(prefillPrompt || "");
  const [gameType, setGameType] = useState("Custom");
  const [complexity, setComplexity] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (prefillPrompt) {
      setPrompt(prefillPrompt);
    }
  }, [prefillPrompt]);

  useEffect(() => {
    const rawHistory = localStorage.getItem(HISTORY_KEY);
    if (rawHistory) {
      try {
        setHistory(JSON.parse(rawHistory));
      } catch (parseError) {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  const formattedOutput = useMemo(() => {
    if (!result) {
      return "";
    }

    const scriptsText = result.scripts
      .map((script) => `${script.name}\n${script.code}`)
      .join("\n\n-----------------\n\n");

    return [
      result.title,
      "",
      "OVERVIEW",
      result.overview,
      "",
      "SYSTEMS",
      ...result.systems.map((system) => `- ${system}`),
      "",
      "LUA SCRIPTS",
      scriptsText,
      "",
      "ROBLOX STRUCTURE",
      ...result.structure.map((item) => `- ${item}`),
      "",
      "MONETIZATION",
      ...result.monetization.map((idea) => `- ${idea}`)
    ].join("\n");
  }, [result]);

  const handleGenerate = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const generated = await generateGameBlueprint({
        prompt,
        gameType,
        complexity
      });

      setResult(generated);

      const newItem = {
        id: crypto.randomUUID(),
        title: generated.title,
        prompt,
        gameType,
        complexity,
        result: generated,
        createdAt: Date.now()
      };

      setHistory((prevHistory) => [newItem, ...prevHistory].slice(0, 20));
    } catch (generationError) {
      setError("Generation failed. Please retry with a more specific prompt.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOutput = async () => {
    if (!formattedOutput) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedOutput);
      setToast("Output copied to clipboard.");
    } catch (clipboardError) {
      setToast("Clipboard unavailable in this browser.");
    }
  };

  const handleDownload = () => {
    if (!formattedOutput) {
      return;
    }

    const blob = new Blob([formattedOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(result?.title || "roblox_blueprint")
      .toLowerCase()
      .replaceAll(" ", "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectHistory = (item) => {
    setPrompt(item.prompt);
    setGameType(item.gameType);
    setComplexity(item.complexity);
    setResult(item.result);
    setError("");
  };

  return (
    <section id="dashboard" className="section dashboard-section">
      <div className="container">
        <h2>Product Dashboard</h2>
        <p className="dashboard-subtitle">
          Prompt your next Roblox idea and generate a development-ready concept package.
        </p>

        <div className="dashboard-grid">
          <HistorySidebar history={history} onSelect={handleSelectHistory} />
          <div className="dashboard-main">
            <PromptForm
              prompt={prompt}
              gameType={gameType}
              complexity={complexity}
              onPromptChange={setPrompt}
              onGameTypeChange={setGameType}
              onComplexityChange={setComplexity}
              onSubmit={handleGenerate}
              loading={loading}
            />

            {loading && (
              <div className="card loading-card">
                <div className="spinner" />
                <p>Generating your Roblox blueprint...</p>
              </div>
            )}

            {error && <div className="card error-card">{error}</div>}

            <OutputTabs result={result} onCopy={handleCopyOutput} onDownload={handleDownload} />
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default Dashboard;
