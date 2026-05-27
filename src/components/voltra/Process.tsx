import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Process() {
  return (
    <section id="methode" className="py-20 md:py-28 px-6 md:px-10 bg-[#FAFAF8] border-b border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">
            Comment ca marche
          </span>
          <h2 className="font-serif text-3xl md:text-4xl italic">Simple. Rapide. Parfait.</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 relative">
          {/* Ligne de connexion */}
          <div className="absolute top-8 left-[16.66%] right-[16.66%] h-[1px] bg-border hidden md:block" />

          {[
            { n: "01", icon: "✍️", label: "Vous decrivez", desc: "5 minutes" },
            { n: "02", icon: "🎯", label: "Nos experts selectionnent", desc: "Sous 48h" },
            { n: "03", icon: "📸", label: "Vous vivez pleinement", desc: "Le resultat parfait" },
          ].map((e, i) => (
            <motion.div
              key={e.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-border flex items-center justify-center mb-4 text-2xl">
                {e.icon}
              </div>
              <p className="font-serif text-base md:text-lg italic mb-1">{e.label}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">{e.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link to="/inquiry" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35 hover:text-accent transition-colors duration-500">
            Immortaliser ce moment <span className="text-accent">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
