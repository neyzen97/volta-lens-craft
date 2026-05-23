export function SiteFooter() {
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-xl tracking-tight italic text-foreground/70">Voltra</div>
        <div className="font-mono text-[9px] text-foreground/35 tracking-[0.25em] uppercase text-center">
          © MMXXVI — Voltra. Tous droits réservés.
        </div>
        <div className="flex gap-8 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/35">
          <a href="#" className="hover:text-accent transition-colors duration-500">
            Confidentialité
          </a>
          <a href="#" className="hover:text-accent transition-colors duration-500">
            Conditions
          </a>
          <a href="/admin" className="hover:text-accent transition-colors duration-500">
            Espace concierge
          </a>
        </div>
      </div>
    </footer>
  );
}
