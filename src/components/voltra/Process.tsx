import { motion } from "motion/react";

const etapes = [
  {
    n: "01",
    label: "Le Brief",
    title: "Parlez-nous de votre vision.",
    body: "En quelques minutes, décrivez votre événement, l'atmosphère souhaitée, vos références. Plus votre brief est sincère, plus notre sélection sera juste.",
  },
  {
    n: "02",
    label: "La Sélection",
    title: "Nous choisissons votre photographe.",
    body: "Nos directeurs artistiques analysent votre brief et identifient le photographe dont le langage visuel correspond exactement à ce que vous cherchez.",
  },
  {
    n: "03",
    label: "La Proposition",
    title: "Une réponse. Personnelle.",
    body: "Sous 48 heures, vous recevez une proposition unique — le profil de votre photographe, sa démarche, son tarif. Pas de catalogue. Juste l'évidence.",
  },
];

export function Process() {
  return (
    <section id="methode" className="py-28 md:py-44 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-32 max-w-xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            — La Méthode
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Un photographe
            <br />
            <span className="italic text-foreground/60">choisi pour vous.</span>
          </h2>
        </div>

        {/* Étapes */}
        <div className="space-y-0 divide-y divide-border">
          {etapes.map((e, i) => (
            <motion.div
              key={e.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16"
            >
              <div className="md:col-span-1 flex md:block items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {e.n}
                </span>
              </div>
              <div className="md:col-span-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/35 mb-3 block">
                  {e.label}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl italic font-normal leading-tight">
                  {e.title}
                </h3>
              </div>
              <div className="md:col-span-6 md:col-start-7 flex items-center">
                <p className="text-foreground/55 leading-relaxed text-[15px] max-w-lg">
                  {e.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
