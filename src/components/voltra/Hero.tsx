import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const HERO_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-[#F8F6F1]">
      {/* Fond photographique cinématique */}
      <div className="absolute inset-0 z-0 animate-aperture overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src={HERO_URL}
            alt="Montagne enneigée sous lumière dorée"
            className="w-full h-full object-cover opacity-30"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F1]/60 via-[#F8F6F1]/20 to-[#F8F6F1]/80" />
      </div>

      {/* Cercle d'ouverture décoratif — référence photographique */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,700px)] h-[min(80vw,700px)] rounded-full border border-foreground/[0.04] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(65vw,560px)] h-[min(65vw,560px)] rounded-full border border-foreground/[0.06] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(50vw,420px)] h-[min(50vw,420px)] rounded-full border border-accent/10 z-0" />

      {/* Lumière chaude */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[rgba(184,146,58,0.06)] blur-[180px] z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[rgba(92,122,94,0.04)] blur-[140px] z-0" />

      {/* Aperture blades */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-blades flex items-center justify-center">
        <div className="absolute inset-0 bg-[#F8F6F1]" style={{
          clipPath: "polygon(50% 50%, 0 0, 0 100%, 50% 50%, 100% 100%, 100% 0, 50% 50%)",
        }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.45em] text-foreground/40 mb-10 block"
        >
          — Service de sélection photographique —
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3.2rem,9vw,8rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
        >
          Votre moment
          <br />
          <span className="italic font-normal text-foreground/50">mérite</span>
          <br />
          <span className="text-accent">l'évidence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 font-sans text-[15px] md:text-base text-foreground/50 max-w-lg mx-auto leading-relaxed"
        >
          Finis les heures de recherche, les doutes, les compromis.
          Voltra identifie le photographe fait pour vous — et vous le présente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/inquiry"
            className="group relative px-10 py-5 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.28em] overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-background">
              Soumettre mon brief
            </span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          </Link>
          <a
            href="#methode"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40 hover:text-foreground transition-colors duration-500 flex items-center gap-2"
          >
            Découvrir la méthode <span className="text-accent">↓</span>
          </a>
        </motion.div>

        {/* Badge rareté premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3 }}
          className="mt-16 inline-flex items-center gap-3 px-5 py-3 border border-foreground/10 bg-background/60 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/45">
            7 commissions disponibles en juin 2026
          </span>
        </motion.div>
      </div>

      {/* Marques de cadre */}
      <div className="absolute top-8 left-8 w-5 h-5 border-l border-t border-foreground/15 z-10" />
      <div className="absolute top-8 right-8 w-5 h-5 border-r border-t border-foreground/15 z-10" />
      <div className="absolute bottom-8 left-8 w-5 h-5 border-l border-b border-foreground/15 z-10" />
      <div className="absolute bottom-8 right-8 w-5 h-5 border-r border-b border-foreground/15 z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-accent/50 origin-top animate-[shimmer-line_1.6s_var(--ease-out-expo)_3.2s_both]" />
      </motion.div>
    </section>
  );
}
