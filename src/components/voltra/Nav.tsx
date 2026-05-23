import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-6 mix-blend-difference"
    >
      <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
        VOLTRA
      </Link>
      <div className="hidden md:flex gap-12 text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/60">
        <a href="/#process" className="hover:text-accent transition-colors duration-500">
          The Process
        </a>
        <a href="/#archives" className="hover:text-accent transition-colors duration-500">
          Archives
        </a>
        <a href="/#testimonials" className="hover:text-accent transition-colors duration-500">
          Voices
        </a>
      </div>
      <Link
        to="/inquiry"
        className="px-5 py-2.5 border border-foreground/25 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
      >
        Inquire
      </Link>
    </motion.nav>
  );
}
