import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function FinalCta() {
  return (
    <section className="relative py-32 md:py-56 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-accent/[0.03] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 block">
          — By invitation. By inquiry.
        </span>

        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-10">
          Begin your <br />
          <span className="italic font-normal text-foreground/80">curation.</span>
        </h2>

        <p className="text-foreground/55 max-w-lg mx-auto mb-14 leading-relaxed text-[15px]">
          Commissions for 2026 are open in limited quantity. Share your brief — we will
          respond, by name, within forty-eight hours.
        </p>

        <Link
          to="/inquiry"
          className="group relative inline-flex items-center px-12 py-5 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.3em] overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-700 group-hover:-translate-x-2">
            Request access
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
