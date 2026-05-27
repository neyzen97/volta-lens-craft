import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.95) 0%, rgba(245,240,232,0) 100%)", backdropFilter: "blur(12px)" }}
      >
        {/* Logo — typographie originale */}
        <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight text-foreground hover:text-accent transition-colors duration-500">
          VOLTRA
        </Link>

        <div className="hidden md:flex gap-10 text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/40">
          <a href="/#methode" className="hover:text-accent transition-colors duration-500">La Methode</a>
          <a href="/#voix" className="hover:text-accent transition-colors duration-500">Temoignages</a>
          <a href="/#faq" className="font-sans hover:text-accent transition-colors duration-500">FAQ</a>
          <Link to="/mon-espace" className="hover:text-accent transition-colors duration-500">Mon espace</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/inquiry"
            className="hidden md:block px-5 py-2.5 border border-foreground/20 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Immortaliser ce moment
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`w-6 h-[1px] bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`w-6 h-[1px] bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1px] bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-[#F5F0E8] flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {[
            { label: "La Methode", href: "/#methode" },
            { label: "Temoignages", href: "/#voix" },
            { label: "FAQ", href: "/#faq" },
            { label: "Mon espace", href: "/mon-espace" },
          ].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl italic text-foreground hover:text-accent transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <Link to="/inquiry" onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
            Immortaliser ce moment
          </Link>
        </motion.div>
      )}
    </>
  );
}
