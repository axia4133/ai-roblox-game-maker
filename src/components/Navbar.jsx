function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <a className="brand" href="#top">
          AI Roblox Game Generator
        </a>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#dashboard" className="btn btn-small">
            Open App
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
