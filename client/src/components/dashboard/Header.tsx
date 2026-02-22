export function Header() {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-logo">
          <span className="nav-logo-mark">LR</span>
          LeadFlow RE
        </div>

        <div className="nav-right">
          <span className="nav-badge">AI-Powered</span>
          <span className="nav-divider" aria-hidden="true" />
          <div className="nav-user">
            <span className="nav-avatar" aria-hidden="true">PM</span>
            Property Manager
          </div>
        </div>
      </nav>

      <header className="hero">
        <div>
          <p className="eyebrow">Lead Pipeline</p>
          <h1>AI-Tuned Lead Pipeline</h1>
          <p className="subtitle">
            Rank, qualify, and follow up on high-intent real estate leads in one flow.
          </p>
        </div>
      </header>
    </>
  );
}
