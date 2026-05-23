import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-6"
      style={{ background: "linear-gradient(to bottom, rgba(247,244,238,0.92) 0%, rgba(247,244,238,0) 100%)", backdropFilter: "blur(8px)" }}
    >
      <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
        VOLTRA
      </Link>
      <div className="hidden md:flex gap-12 text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/50">
        <a href="/#methode" className="hover:text-accent transition-colors duration-500">
          La Méthode
        </a>
        <a href="/#voix" className="hover:text-accent transition-colors duration-500">
          Témoignages
        </a>
      </div>
      <Link
        to="/inquiry"
        className="px-5 py-2.5 border border-foreground/20 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
      >
        Soumettre un brief
      </Link>
    </motion.nav>
  );
}
