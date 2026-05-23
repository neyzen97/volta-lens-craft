import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

// Hero uses a premium outdoor/lifestyle Unsplash image (no auth required, free to use)
const HERO_URL =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=2400&q=85&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] flex flex-col justify-center items-center overflow-hidden">
      {/* Aperture mask reveal */}
      <div className="absolute inset-0 z-0 animate-aperture">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src={HERO_URL}
            alt="Lumière naturelle dorée dans un jardin verdoyant"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
        {/* Voile cinématique naturel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(26,24,20,0.55)_80%,_rgba(26,24,20,0.75)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,24,20,0.3)] via-transparent to-[rgba(26,24,20,0.5)]" />
        {/* Lumière chaude naturelle */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[rgba(184,146,58,0.08)] blur-[200px] animate-leak" />
        {/* Touche verte — verdure */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[rgba(92,122,94,0.06)] blur-[180px]" />
      </div>

      {/* Aperture blades */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-blades flex items-center justify-center">
        <div className="absolute inset-0 bg-[#F7F4EE]" style={{
          clipPath: "polygon(50% 50%, 0 0, 0 100%, 50% 50%, 100% 100%, 100% 0, 50% 50%)",
        }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#F7F4EE]/70 mb-8 block"
        >
          — Photographes d'exception, sélectionnés pour vous —
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.02em] text-balance text-[#F7F4EE]"
        >
          L'image
          <br />
          <span className="italic font-normal text-[#F7F4EE]/85">qui restera.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-sans text-base md:text-lg text-[#F7F4EE]/60 max-w-md mx-auto leading-relaxed"
        >
          Voltra identifie le photographe idéal pour votre événement.
          Une sélection unique. Sur mesure. Irréprochable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <Link
            to="/inquiry"
            className="group relative px-10 py-5 bg-[#B8923A] text-[#F7F4EE] font-mono text-[10px] uppercase tracking-[0.25em] overflow-hidden"
          >
            <span className="relative z-10">Soumettre mon brief</span>
            <span className="absolute inset-0 bg-[#1A1814] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-[#F7F4EE] opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono text-[10px] uppercase tracking-[0.25em]">
              Commencer →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[rgba(184,146,58,0.4)] to-[rgba(184,146,58,0.8)] origin-top animate-[shimmer-line_1.4s_var(--ease-out-expo)_3s_both]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F7F4EE]/50">
          Découvrir
        </span>
      </motion.div>

      {/* Marques de cadre cinéma */}
      <div className="absolute top-6 left-6 w-4 h-4 border-l border-t border-[#F7F4EE]/20 z-10" />
      <div className="absolute top-6 right-6 w-4 h-4 border-r border-t border-[#F7F4EE]/20 z-10" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-l border-b border-[#F7F4EE]/20 z-10" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-r border-b border-[#F7F4EE]/20 z-10" />
    </section>
  );
}
