import { motion } from "motion/react";

const AVANT = [
  "Des heures à parcourir des portfolios",
  "Des dizaines de devis incomparables",
  "L'incertitude du choix final",
  "La peur de se tromper",
  "Le stress des relances sans réponse",
];

const APRES = [
  "Un brief de 5 minutes",
  "Une seule proposition, parfaitement adaptée",
  "La certitude d'un choix expert",
  "La sérénité du jour J",
  "Un Expert Voltra disponible de A à Z",
];

export function AvantApres() {
  return (
    <section className="py-28 md:py-44 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            — La différence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-lg">
            Ce que Voltra
            <br />
            <span className="italic text-foreground/50">change vraiment.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 md:gap-px bg-border">
          {/* AVANT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F8F6F1] p-10 md:p-16"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center">
                <span className="text-[10px] font-mono text-foreground/40">✕</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                Sans Voltra
              </span>
            </div>
            <ul className="space-y-5">
              {AVANT.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-foreground/20 flex-shrink-0" />
                  <span className="font-sans text-[15px] text-foreground/40 leading-snug line-through decoration-foreground/20">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* APRÈS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-foreground p-10 md:p-16"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-6 rounded-full border border-[#F8F6F1]/20 flex items-center justify-center">
                <span className="text-[10px] font-mono text-accent">✓</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F8F6F1]/50">
                Avec Voltra
              </span>
            </div>
            <ul className="space-y-5">
              {APRES.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-serif text-lg italic text-[#F8F6F1]/85 leading-snug">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
