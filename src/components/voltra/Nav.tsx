import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-6"
      style={{ background: "linear-gradient(to bottom, rgba(248,246,241,0.95) 0%, rgba(248,246,241,0) 100%)", backdropFilter: "blur(12px)" }}
    >
      {/* Logo avec détail photographique */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative w-5 h-5 flex-shrink-0">
          {/* Cercle d'ouverture miniature */}
          <div className="absolute inset-0 rounded-full border border-foreground/30 group-hover:border-accent transition-colors duration-500" />
          <div className="absolute inset-[3px] rounded-full border border-foreground/20 group-hover:border-accent/60 transition-colors duration-500" />
          <div className="absolute inset-[7px] rounded-full bg-foreground group-hover:bg-accent transition-colors duration-500" />
        </div>
        <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
          VOLTRA
        </span>
      </Link>

      <div className="hidden md:flex gap-12 text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/45">
        <a href="/#methode" className="hover:text-accent transition-colors duration-500">
          La Méthode
        </a>
        <a href="/#voix" className="hover:text-accent transition-colors duration-500">
          Témoignages
        </a>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/mon-espace"
          className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 hover:text-accent transition-colors duration-500"
        >
          Mon espace
        </Link>
        <Link
          to="/inquiry"
          className="px-5 py-2.5 border border-foreground/20 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
        >
          Soumettre un brief
        </Link>
      </div>
    </motion.nav>
  );
}
