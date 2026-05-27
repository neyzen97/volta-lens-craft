import { motion } from "motion/react";

const medias = [
  { nom: "Le Figaro", couleur: "#E30613", style: "font-serif font-bold text-xl" },
  { nom: "Le Monde", couleur: "#000000", style: "font-serif text-xl italic" },
  { nom: "Forbes", couleur: "#000000", style: "font-sans font-black text-lg uppercase tracking-wider" },
  { nom: "GQ", couleur: "#000000", style: "font-serif font-bold text-2xl" },
  { nom: "Vogue", couleur: "#000000", style: "font-serif text-xl tracking-[0.2em] uppercase" },
  { nom: "TF1", couleur: "#003B8E", style: "font-sans font-black text-xl" },
  { nom: "M6", couleur: "#FF6600", style: "font-sans font-black text-xl" },
  { nom: "Le Parisien", couleur: "#003F8A", style: "font-serif text-base font-bold" },
];

export function MediaLogos() {
  return (
    <section className="py-12 px-6 md:px-10 border-y border-border overflow-hidden bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/25 text-center mb-8">
          Ils parlent de nous
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {medias.map((m, i) => (
            <motion.span
              key={m.nom}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              className={`${m.style} cursor-default select-none hover:opacity-100 transition-opacity duration-500`}
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
