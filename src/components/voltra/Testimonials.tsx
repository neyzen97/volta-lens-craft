import { motion } from "motion/react";

const temoignages = [
  {
    corps: "La sélection était chirurgicale. Nous n'avons pas eu à chercher — on nous a simplement présenté l'évidence. Le photographe choisi a saisi quelque chose que nous n'aurions su décrire.",
    nom: "Elias & Sophie T.",
    meta: "Mariage en Toscane — Juin 2024",
  },
  {
    corps: "Voltra a compris notre direction artistique mieux que nous. Le photographe sélectionné pour notre campagne était exactement ce dont nous avions besoin, sans concession.",
    nom: "Clara Voss",
    meta: "Directrice artistique, Maison L'Aube",
  },
  {
    corps: "Quarante-huit heures après mon brief, une proposition attendait dans ma boîte. Le photographe correspondait à tout ce que j'avais écrit — et à ce que je n'avais pas su formuler.",
    nom: "Henri M.",
    meta: "Portrait corporate, Paris",
  },
];

export function Testimonials() {
  return (
    <section id="voix" className="py-28 md:py-44 px-6 md:px-10" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 md:mb-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            — Ce qu'ils en disent
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
          {temoignages.map((t, i) => (
            <motion.figure
              key={t.nom}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border pt-8"
            >
              <blockquote className="font-serif text-lg md:text-xl italic leading-snug text-foreground/80 mb-8">
                <span className="text-accent text-2xl mr-1 align-top leading-none">"</span>
                {t.corps}
                <span className="text-accent text-2xl ml-1 align-top leading-none">"</span>
              </blockquote>
              <figcaption>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent mb-1">
                  {t.nom}
                </p>
                <p className="font-sans text-[11px] text-foreground/40 tracking-wide">
                  {t.meta}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
