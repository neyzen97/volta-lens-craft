import { motion } from "motion/react";

const benefices = [
  {
    icon: "⏱",
    titre: "Votre temps vaut mieux que ca.",
    corps: "Des heures de recherche resumees en 5 minutes. Decrivez votre evenement, nos experts font le reste.",
  },
  {
    icon: "💎",
    titre: "Reserves aux exigeants.",
    corps: "Un service pour ceux qui refusent de laisser leurs moments importants au hasard. L'excellence n'est pas optionnelle.",
  },
  {
    icon: "🤝",
    titre: "Nos experts selectionnent pour vous.",
    corps: "Une equipe humaine analyse votre brief et choisit le photographe ideal. Pas un algorithme. Une decision eclairee.",
  },
  {
    icon: "📸",
    titre: "Des photos dont vous serez fiers dans 10 ans.",
    corps: "C'est ca l'enjeu. Un moment capte par le bon regard, ca dure toute une vie.",
  },
  {
    icon: "✨",
    titre: "Luxueux ne veut pas dire complique.",
    corps: "Chez Voltra, c'est simple parce que c'est pense pour vous. L'excellence sans la friction.",
  },
];

export function Benefits() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-10 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-xl"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            Pourquoi Voltra
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Ce que vous
            <br />
            <span className="italic text-foreground/40">gagnez vraiment.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {benefices.map((b, i) => (
            <motion.div
              key={b.titre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAF8] p-8 md:p-10 group hover:bg-[#F2EFE8] transition-colors duration-500"
            >
              <span className="text-3xl mb-6 block">{b.icon}</span>
              <h3 className="font-serif text-xl italic leading-snug mb-4 group-hover:text-accent transition-colors duration-500">
                {b.titre}
              </h3>
              <p className="text-foreground/50 text-[14px] leading-relaxed">{b.corps}</p>
            </motion.div>
          ))}
          {/* Cellule CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0D0C0A] p-8 md:p-10 flex flex-col justify-between"
          >
            <p className="font-serif text-2xl italic text-white/80 leading-snug mb-8">
              Pret a immortaliser votre moment ?
            </p>
            <a href="/inquiry" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:gap-4 transition-all duration-500">
              Immortaliser ce moment <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
