import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function FinalCta() {
  return (
    <section className="relative py-32 md:py-56 px-6 md:px-10 overflow-hidden bg-[#0D0C0A]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-accent/[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,146,58,0.06)_0%,_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 block">
          Experts Voltra disponibles
        </span>

        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-white mb-10">
          Votre evenement
          <br />
          <span className="italic font-normal text-white/40">merite mieux</span>
          <br />
          <span className="text-accent">que le hasard.</span>
        </h2>

        <p className="text-white/40 max-w-md mx-auto mb-5 leading-relaxed text-[15px]">
          Decrivez votre moment. Nos experts trouvent le photographe parfait.
          Reponse personnelle sous 48h, sans engagement.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/8 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
            56 photographes assignes en avril
          </span>
        </div>

        <div className="block">
          <Link
            to="/inquiry"
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-accent text-[#0D0C0A] font-mono text-[10px] uppercase tracking-[0.3em] overflow-hidden font-semibold"
          >
            <span className="relative z-10">Trouver mon photographe</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-500">→</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-[#0D0C0A] font-mono text-[10px] uppercase tracking-[0.3em] font-semibold gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Trouver mon photographe →
            </span>
          </Link>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
            Gratuit · Sans engagement · Reponse sous 48h
          </p>
        </div>
      </motion.div>
    </section>
  );
}
