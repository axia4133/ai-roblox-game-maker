import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import ExamplePrompts from "./components/ExamplePrompts";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [prefillPrompt, setPrefillPrompt] = useState("");

  const handleUsePrompt = (promptText) => {
    setPrefillPrompt(promptText);
    const dashboardSection = document.getElementById("dashboard");
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Hero onStartClick={() => handleUsePrompt("")} />
        <Features />
        <HowItWorks />
        <ExamplePrompts onUsePrompt={handleUsePrompt} />
        <Pricing />
        <Dashboard prefillPrompt={prefillPrompt} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
