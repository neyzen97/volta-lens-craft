export function TrustpilotBadge() {
  return (
    <a
      href="https://trustpilot.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-white border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#00B67A">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-sans font-bold text-[11px]" style={{ color: "#00B67A" }}>Trustpilot</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/40 mt-0.5">4,8/5 · 500+ avis</span>
      </div>
    </a>
  );
}
