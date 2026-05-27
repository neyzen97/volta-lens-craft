import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const HERO_URL = "https://images.unsplash.com/photo-1519741497674-611481863552?w=2400&q=90&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-[#F5F0E8]">
      {/* Image fond claire */}
      <div className="absolute inset-0 z-0 animate-aperture overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img src={HERO_URL} alt="Photographe professionnel" className="w-full h-full object-cover opacity-15" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8]/80 via-[#F5F0E8]/40 to-[#F5F0E8]/90" />
      </div>

      {/* Cercles decoratifs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(85vw,750px)] h-[min(85vw,750px)] rounded-full border border-foreground/[0.04] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,520px)] h-[min(60vw,520px)] rounded-full border border-accent/[0.06] z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(184,146,58,0.05)] blur-[160px] z-0" />

      {/* Aperture blades */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-blades flex items-center justify-center">
        <div className="absolute inset-0 bg-[#F5F0E8]" style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%, 50% 50%, 100% 100%, 100% 0, 50% 50%)" }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-4xl w-full">

        {/* Trustpilot */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2.5 border border-foreground/10 bg-white/60 backdrop-blur-sm mb-10"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#00B67A">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/50">
            4,8/5 · 500+ avis
          </span>
          <span className="font-sans text-[10px] font-bold" style={{ color: "#00B67A" }}>Trustpilot</span>
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] text-foreground"
        >
          Ne laissez rien
          <br />
          <span className="italic font-normal text-foreground/40">au hasard.</span>
          <br />
          <span className="text-accent">Nos experts choisissent.</span>
        </motion.h1>

        {/* N1 sans "exception" */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent"
        >
          La plateforme n°1 en France pour trouver votre photographe.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/inquiry" className="group relative px-12 py-5 bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.3em] overflow-hidden font-bold shadow-lg">
            <span className="relative z-10">Immortaliser ce moment</span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-foreground font-mono text-[11px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Immortaliser ce moment →
            </span>
          </Link>
          <a href="#methode" className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30 hover:text-accent transition-colors duration-500">
            Comment ca marche
          </a>
        </motion.div>
      </div>

      {/* Corners */}
      <div className="absolute top-8 left-8 w-5 h-5 border-l border-t border-foreground/10 z-10" />
      <div className="absolute top-8 right-8 w-5 h-5 border-r border-t border-foreground/10 z-10" />
      <div className="absolute bottom-8 left-8 w-5 h-5 border-l border-b border-foreground/10 z-10" />
      <div className="absolute bottom-8 right-8 w-5 h-5 border-r border-b border-foreground/10 z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[1px] h-14 bg-gradient-to-b from-transparent to-accent/40" />
      </motion.div>
    </section>
  );
}
