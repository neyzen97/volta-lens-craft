import { motion } from "motion/react";

const MEDIAS = [
  { nom: "Le Figaro", style: "font-serif text-xl tracking-tight" },
  { nom: "Le Monde", style: "font-serif text-xl italic" },
  { nom: "Forbes", style: "font-sans font-bold text-xl tracking-widest uppercase text-[13px]" },
  { nom: "GQ", style: "font-serif font-bold text-2xl tracking-widest" },
  { nom: "Vogue", style: "font-serif text-xl tracking-[0.15em] uppercase text-[13px]" },
  { nom: "Le Parisien", style: "font-serif text-base tracking-tight" },
];

export function MediaLogos() {
  return (
    <section className="py-14 md:py-20 px-6 md:px-10 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/30 whitespace-nowrap flex-shrink-0">
            Ils parlent
            <br className="hidden md:block" /> de nous
          </span>
          <div className="w-[1px] h-10 bg-border hidden md:block flex-shrink-0" />
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-10 md:gap-14">
            {MEDIAS.map((m, i) => (
              <motion.span
                key={m.nom}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`${m.style} text-foreground/25 hover:text-foreground/50 transition-colors duration-700 cursor-default select-none`}
              >
                {m.nom}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
