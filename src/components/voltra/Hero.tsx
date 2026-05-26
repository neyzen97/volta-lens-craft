import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const HERO_URL =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=2400&q=90&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-[#F8F6F1]">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0 animate-aperture overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src={HERO_URL}
            alt="Photographe capturant un moment d'exception"
            className="w-full h-full object-cover opacity-25"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F1]/70 via-[#F8F6F1]/20 to-[#F8F6F1]/85" />
      </div>

      {/* Cercles décoratifs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(85vw,750px)] h-[min(85vw,750px)] rounded-full border border-foreground/[0.03] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(65vw,560px)] h-[min(65vw,560px)] rounded-full border border-foreground/[0.05] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(45vw,380px)] h-[min(45vw,380px)] rounded-full border border-accent/[0.08] z-0" />

      {/* Lumières */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(184,146,58,0.05)] blur-[160px] z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[rgba(92,122,94,0.04)] blur-[140px] z-0" />

      {/* Aperture blades */}
      <div className="pointer-events-none absolute inset-0 z-20 animate-blades flex items-center justify-center">
        <div className="absolute inset-0 bg-[#F8F6F1]" style={{
          clipPath: "polygon(50% 50%, 0 0, 0 100%, 50% 50%, 100% 100%, 100% 0, 50% 50%)",
        }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Badge autorité */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2.5 border border-foreground/10 bg-background/80 backdrop-blur-sm mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/50">
            La référence française en sélection photographique
          </span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
        >
          Le meilleur
          <br />
          <span className="italic font-normal text-foreground/45">photographe.</span>
          <br />
          <span className="text-accent">Pour vous.</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-sans text-[15px] md:text-base text-foreground/50 max-w-md mx-auto leading-relaxed"
        >
          Décrivez votre événement en 5 minutes.
          Nous sélectionnons le photographe parfait. Vous vivez pleinement.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/inquiry"
            className="group relative px-10 py-5 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.28em] overflow-hidden"
          >
            <span className="relative z-10">Trouver mon photographe</span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          </Link>
          <a
            href="#methode"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/35 hover:text-foreground transition-colors duration-500"
          >
            Comment ça marche →
          </a>
        </motion.div>

        {/* Badge rareté */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3 }}
          className="mt-14 inline-flex items-center gap-3 px-5 py-3 border border-foreground/8 bg-background/60 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40">
            7 commissions disponibles en juin 2026
          </span>
        </motion.div>
      </div>

      {/* Marques de cadre */}
      <div className="absolute top-8 left-8 w-5 h-5 border-l border-t border-foreground/12 z-10" />
      <div className="absolute top-8 right-8 w-5 h-5 border-r border-t border-foreground/12 z-10" />
      <div className="absolute bottom-8 left-8 w-5 h-5 border-l border-b border-foreground/12 z-10" />
      <div className="absolute bottom-8 right-8 w-5 h-5 border-r border-b border-foreground/12 z-10" />

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-accent/40" />
      </motion.div>
    </section>
  );
}
