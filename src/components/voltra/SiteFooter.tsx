import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-border bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-xl tracking-tight italic text-foreground/60">Voltra</div>
        <div className="font-mono text-[9px] text-foreground/30 tracking-[0.25em] uppercase text-center">
          MMXXVI — Voltra. Tous droits reserves.
        </div>
        <div className="flex flex-wrap gap-5 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30 justify-center">
          <Link to="/confidentialite" className="hover:text-accent transition-colors duration-500">Confidentialite</Link>
          <Link to="/cgv" className="hover:text-accent transition-colors duration-500">CGV</Link>
          <Link to="/mentions-legales" className="hover:text-accent transition-colors duration-500">Mentions legales</Link>
          <Link to="/mon-espace" className="hover:text-accent transition-colors duration-500">Mon espace</Link>
          <Link to="/vx7k2-concierge-9f4m" className="hover:text-accent transition-colors duration-500">Expert Voltra</Link>
        </div>
      </div>
    </footer>
  );
}
