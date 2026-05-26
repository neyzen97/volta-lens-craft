import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const etapes = [
  {
    n: "01",
    emoji: "✍️",
    title: "Vous décrivez.",
    body: "5 minutes. Votre événement, l'ambiance souhaitée, votre budget. Pas de jargon, juste votre vision.",
  },
  {
    n: "02",
    emoji: "🎯",
    title: "Nous sélectionnons.",
    body: "Nos directeurs artistiques analysent votre brief et identifient le photographe fait pour vous. Un seul. Le bon.",
  },
  {
    n: "03",
    emoji: "✨",
    title: "Vous vivez.",
    body: "Sous 48h, vous recevez une proposition personnelle. Vous confirmez, vous profitez. Voltra gère le reste.",
  },
];

export function Process() {
  return (
    <section id="methode" className="py-28 md:py-44 px-6 md:px-10 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32 max-w-xl"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            — Comment ça marche
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Simple pour vous.
            <br />
            <span className="italic text-foreground/45">Exigeant pour nous.</span>
          </h2>
        </motion.div>

        {/* Étapes */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {etapes.map((e, i) => (
            <motion.div
              key={e.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F8F6F1] p-10 md:p-12 group hover:bg-[#F0ECE3] transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{e.n}</span>
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500">{e.emoji}</span>
              </div>
              <h3 className="font-serif text-2xl italic mb-4 leading-tight">{e.title}</h3>
              <p className="text-foreground/55 text-[14px] leading-relaxed">{e.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center"
        >
          <Link
            to="/inquiry"
            className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-accent transition-colors duration-500"
          >
            Commencer maintenant <span className="text-accent">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
