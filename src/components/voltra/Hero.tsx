import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import heroImg from "@/assets/hero-ballroom.jpg";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] flex flex-col justify-center items-center overflow-hidden">
      {/* Aperture mask reveal */}
      <div className="absolute inset-0 z-0 animate-aperture">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src={heroImg}
            alt="Cinematic wedding portrait in a grand ballroom"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(8,8,8,0.85)_85%,_#080808_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        {/* Subtle warm light leak */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[160px] animate-leak" />
      </div>

      {/* Aperture blades closing-then-opening overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-blades flex items-center justify-center">
        <div className="absolute inset-0 bg-background" style={{
          clipPath:
            "polygon(50% 50%, 0 0, 0 100%, 50% 50%, 100% 100%, 100% 0, 50% 50%)",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-accent mb-8 block"
        >
          — Concierge Photographique —
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3.2rem,11vw,9rem)] leading-[0.92] tracking-[-0.02em] text-balance"
        >
          The lens of
          <br />
          <span className="italic font-normal text-foreground/90">the few.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-sans text-base md:text-lg text-foreground/60 max-w-md mx-auto leading-relaxed"
        >
          A private photographic concierge for the most discerning eyes. We curate the
          artist — you keep the legacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <Link
            to="/inquiry"
            className="group relative px-10 py-5 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.25em] overflow-hidden"
          >
            <span className="relative z-10">Begin curation</span>
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono text-[10px] uppercase tracking-[0.25em]">
              Begin curation →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent/40 to-accent/80 origin-top animate-[shimmer-line_1.4s_var(--ease-out-expo)_3s_both]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent/60">
          Scroll to witness
        </span>
      </motion.div>

      {/* Frame markers — cinema reference */}
      <div className="absolute top-6 left-6 w-4 h-4 border-l border-t border-foreground/20 z-10" />
      <div className="absolute top-6 right-6 w-4 h-4 border-r border-t border-foreground/20 z-10" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-l border-b border-foreground/20 z-10" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-r border-b border-foreground/20 z-10" />
    </section>
  );
}
