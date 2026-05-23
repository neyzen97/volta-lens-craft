import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function FinalCta() {
  return (
    <section className="relative py-32 md:py-56 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,146,58,0.07)_0%,_transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(92,122,94,0.05)_0%,_transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 block">
          — Commissions 2026 ouvertes
        </span>

        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-10">
          Votre histoire
          <br />
          <span className="italic font-normal text-foreground/70">mérite l'excellence.</span>
        </h2>

        <p className="text-foreground/50 max-w-lg mx-auto mb-14 leading-relaxed text-[15px]">
          Partagez votre brief. Nous vous répondons, nominalement,
          sous quarante-huit heures avec la sélection parfaite.
        </p>

        <Link
          to="/inquiry"
          className="group relative inline-flex items-center px-12 py-5 bg-accent text-[#F7F4EE] font-mono text-[10px] uppercase tracking-[0.3em] overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-700 group-hover:-translate-x-2">
            Soumettre mon brief
          </span>
          <span className="relative z-10 ml-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
            →
          </span>
          <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
        </Link>
      </motion.div>
    </section>
  );
}
