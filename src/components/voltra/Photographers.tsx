import { motion } from "motion/react";

export function Photographers() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-10"
      >
        <div className="max-w-xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-5 block">
            — Pour les photographes
          </span>
          <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
            Vous êtes photographe&nbsp;?
            <br />
            <span className="italic text-foreground/55">Rejoignez notre réseau d'excellence.</span>
          </h3>
          <p className="text-foreground/45 text-[14px] leading-relaxed max-w-sm">
            Voltra sélectionne des artistes dont le travail parle de lui-même. 
            Si votre approche est singulière et votre exigence sans compromis, nous aimerions vous connaître.
          </p>
        </div>

        <a
          href="mailto:artistes@voltra.studio"
          className="group flex-shrink-0 flex items-center gap-4 px-8 py-4 border border-border hover:border-sage transition-all duration-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 group-hover:text-sage transition-colors duration-500">
            Rejoindre Voltra
          </span>
          <span className="text-foreground/30 group-hover:text-sage transition-colors duration-500">→</span>
        </a>
      </motion.div>
    </section>
  );
}
