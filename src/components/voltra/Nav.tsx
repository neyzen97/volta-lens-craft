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
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(13,12,10,0.92) 0%, rgba(13,12,10,0) 100%)", backdropFilter: "blur(12px)" }}
      >
        <Link to="/" className="font-serif text-lg md:text-xl tracking-tight text-white hover:text-accent transition-colors duration-500">
          VOLTRA
        </Link>

        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
          <a href="/#methode" className="hover:text-accent transition-colors duration-500">La Methode</a>
          <a href="/#voix" className="hover:text-accent transition-colors duration-500">Temoignages</a>
          <a href="/#faq" className="hover:text-accent transition-colors duration-500">FAQ</a>
          <Link to="/mon-espace" className="hover:text-accent transition-colors duration-500">Mon espace</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/inquiry"
            className="hidden md:block px-5 py-2.5 bg-accent text-[#0D0C0A] text-[10px] font-mono uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-500"
          >
            Immortaliser ce moment
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[#0D0C0A] flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {[
            { label: "La Methode", href: "/#methode" },
            { label: "Temoignages", href: "/#voix" },
            { label: "FAQ", href: "/#faq" },
            { label: "Mon espace", href: "/mon-espace" },
          ].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl italic text-white hover:text-accent transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <Link to="/inquiry" onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-accent text-[#0D0C0A] font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
            Immortaliser ce moment
          </Link>
        </motion.div>
      )}
    </>
  );
}
