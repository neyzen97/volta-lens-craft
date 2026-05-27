import { motion } from "motion/react";

const stats = [
  { valeur: "200+", label: "Missions realisees" },
  { valeur: "98%", label: "Clients satisfaits" },
  { valeur: "48h", label: "Delai de reponse" },
  { valeur: "15+", label: "Villes couvertes" },
];

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

const photos = [
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600&q=80&auto=format&fit=crop",
];

export function SocialProof() {
  return (
    <section className="bg-[#FAFAF8]">
      {/* Stats */}
      <div className="border-y border-border py-14 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-serif text-4xl md:text-5xl text-accent mb-2">{s.valeur}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Medias */}
      <div className="py-12 px-6 md:px-10 border-b border-border overflow-hidden">
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
                className={`${m.style} cursor-default select-none transition-all duration-500 hover:opacity-80`}
                style={{ color: m.couleur, opacity: 0.6 }}
              >
                {m.nom}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Galerie photos */}
      <div className="py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/25 text-center mb-8">
            Missions realisees
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden aspect-[4/3] group"
              >
                <img
                  src={url}
                  alt={`Mission Voltra ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0D0C0A]/0 group-hover:bg-[#0D0C0A]/20 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
