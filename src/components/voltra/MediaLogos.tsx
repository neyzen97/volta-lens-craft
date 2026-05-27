import { motion } from "motion/react";

const medias = [
  { nom: "Le Figaro", style: "font-serif font-bold text-xl", couleur: "#E30613" },
  { nom: "Le Monde", style: "font-serif text-xl italic", couleur: "#1A1814" },
  { nom: "Forbes", style: "font-sans font-black text-[15px] uppercase tracking-[0.15em]", couleur: "#1A1814" },
  { nom: "GQ", style: "font-serif font-bold text-2xl", couleur: "#1A1814" },
  { nom: "Vogue", style: "font-serif text-xl tracking-[0.2em] uppercase", couleur: "#1A1814" },
  { nom: "Le Parisien", style: "font-serif text-base font-bold", couleur: "#003F8A" },
];

export function MediaLogos() {
  return (
    <section className="py-12 px-6 md:px-10 border-y border-border overflow-hidden bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/25 text-center mb-10">
          Ils parlent de nous
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {medias.map((m, i) => (
            <motion.span
              key={m.nom}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`${m.style} cursor-default select-none hover:opacity-80 transition-opacity duration-500`}
              style={{ color: m.couleur, opacity: 0.5 }}
            >
              {m.nom}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
