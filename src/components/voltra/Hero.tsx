import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const HERO_URL = "https://images.unsplash.com/photo-1519741497674-611481863552?w=2400&q=90&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-[#0D0C0A]">
      {/* Image */}
      <div className="absolute inset-0 z-0 animate-aperture overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img src={HERO_URL} alt="Photographe professionnel" className="w-full h-full object-cover opacity-30" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0C0A]/60 via-[#0D0C0A]/20 to-[#0D0C0A]/80" />
      </div>

      {/* Cercles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(85vw,750px)] h-[min(85vw,750px)] rounded-full border border-white/[0.04] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,520px)] h-[min(60vw,520px)] rounded-full border border-accent/[0.08] z-0" />

      {/* Lumiere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(184,146,58,0.06)] blur-[160px] z-0" />

      {/* Aperture blades */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-blades flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0D0C0A]" style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%, 50% 50%, 100% 100%, 100% 0, 50% 50%)" }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        {/* Trustpilot */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2.5 border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00B67A">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
            4,8/5 · 500+ avis
          </span>
          <span className="font-sans text-[10px] text-[#00B67A] font-semibold">Trustpilot</span>
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] text-white"
        >
          Ne laissez rien
          <br />
          <span className="italic font-normal text-white/50">au hasard.</span>
          <br />
          <span className="text-accent">Nos experts choisissent.</span>
        </motion.h1>

        {/* N1 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent"
        >
          La plateforme n°1 en France pour trouver votre photographe d'exception.
        </motion.p>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-sans text-[15px] text-white/50 max-w-md mx-auto leading-relaxed"
        >
          Decrivez votre evenement en 5 minutes.
          Nos experts selectionnent le photographe parfait. Vous vivez pleinement.
        </motion.p>

        {/* Micro-benefices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.3 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {["Zero stress", "5 minutes", "100% sur-mesure", "Reponse sous 48h", "Experts dedies", "Satisfaction garantie"].map((b) => (
            <span key={b} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              <span className="text-accent">✓</span> {b}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link to="/inquiry" className="group relative px-10 py-5 bg-accent text-[#0D0C0A] font-mono text-[10px] uppercase tracking-[0.28em] overflow-hidden">
            <span className="relative z-10 font-semibold">Trouver mon photographe</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-[#0D0C0A] font-mono text-[10px] uppercase tracking-[0.28em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Trouver mon photographe
            </span>
          </Link>

          {/* Garantie */}
          <p className="font-sans text-[12px] text-white/35 max-w-sm text-center leading-relaxed">
            Si notre selection ne vous convient pas, nous en proposons une nouvelle sous 24h. Gratuitement.
          </p>

          <a href="#methode" className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25 hover:text-white/50 transition-colors duration-500">
            Comment ca marche
          </a>
        </motion.div>

        {/* Badge disponibilite */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3 }}
          className="mt-10 inline-flex items-center gap-3 px-4 py-2.5 border border-white/8 bg-white/5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
            56 photographes assignes en avril
          </span>
        </motion.div>
      </div>

      {/* Corners */}
      <div className="absolute top-8 left-8 w-5 h-5 border-l border-t border-white/10 z-10" />
      <div className="absolute top-8 right-8 w-5 h-5 border-r border-t border-white/10 z-10" />
      <div className="absolute bottom-8 left-8 w-5 h-5 border-l border-b border-white/10 z-10" />
      <div className="absolute bottom-8 right-8 w-5 h-5 border-r border-b border-white/10 z-10" />

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[1px] h-14 bg-gradient-to-b from-transparent to-accent/50" />
      </motion.div>
    </section>
  );
}
