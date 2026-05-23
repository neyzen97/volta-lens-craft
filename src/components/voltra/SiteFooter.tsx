export function SiteFooter() {
  return (
    <footer className="py-14 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-xl tracking-tight italic">Voltra</div>
        <div className="font-mono text-[9px] text-foreground/40 tracking-[0.25em] uppercase text-center">
          © MMXXVI — Voltra Archives. All rights reserved.
        </div>
        <div className="flex gap-8 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/40">
          <a href="#" className="hover:text-accent transition-colors duration-500">
            Privacy
          </a>
          <a href="#" className="hover:text-accent transition-colors duration-500">
            Terms
          </a>
          <a href="/admin" className="hover:text-accent transition-colors duration-500">
            Concierge
          </a>
        </div>
      </div>
    </footer>
  );
}
