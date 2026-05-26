import { motion } from "motion/react";

const temoignages = [
  {
    corps: "J'avais regardé des centaines de portfolios pendant des semaines. Un ami m'a parlé de Voltra. J'ai rempli le formulaire un soir. Deux jours après, ils m'ont envoyé un profil. C'était exactement ce que je cherchais sans savoir vraiment le formuler. Les photos de notre mariage sont au-dessus de tout ce qu'on espérait. Merci beaucoup !",
    nom: "Camille & Romain D.",
    meta: "Mariage — Aix-en-Provence, Septembre 2024",
    initiale: "C",
  },
  {
    corps: "Honnêtement je pensais que c'était un truc marketing de plus. On organise des tournois de padel depuis 5 ans, on a toujours galéré avec les photographes, soit trop chers, soit les photos sont décevantes. Là c'était fluide du début à la fin. Le photographe connaissait le sport, comprenait les angles. On a des images qu'on utilise encore partout. Je n'hesiterai pas a repasser par Voltra si il faut !",
    nom: "Mehdi L.",
    meta: "Directeur sportif — Open de Padel Paris, Juin 2024",
    initiale: "M",
  },
  {
    corps: "Notre campagne printemps devait être tournée en trois semaines. Je n'avais pas le temps de chercher. J'ai envoyé mon brief un lundi matin. Le mardi après-midi j'avais une proposition avec un photographe que je ne connaissais pas mais dont le travail m'a coupé le souffle. C'est rare de tomber juste aussi vite.",
    nom: "Léa T.",
    meta: "Directrice de création — Maison Éclat, Paris",
    initiale: "L",
  },
  {
    corps: "Pour nos annonces immobilières haut de gamme, la photo c'est tout. Avant Voltra on testait des gens au hasard, c'était aléatoire. Maintenant on passe par eux systématiquement. Le processus est court, les résultats sont constants. C'est devenu un réflexe. Je recommande !",
    nom: "Alexandre B.",
    meta: "Agent immobilier de prestige — 7ème arrondissement, Paris",
    initiale: "A",
  },
];

export function Testimonials() {
  return (
    <section id="voix" className="py-28 md:py-44 px-6 md:px-10 bg-[#F0ECE3]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-5 block">
              — Ce qu'ils en disent
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Ils ont fait confiance
              <br />
              <span className="italic text-foreground/45">à Voltra.</span>
            </h2>
          </div>
          <p className="text-foreground/35 text-[11px] font-mono uppercase tracking-[0.2em] max-w-xs text-right hidden md:block leading-relaxed">
            +200 missions
            <br />réalisées en 2024
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {temoignages.map((t, i) => (
            <motion.figure
              key={t.nom}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border pt-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-sm text-foreground/60 italic">{t.initiale}</span>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{t.nom}</p>
                  <p className="font-sans text-[11px] text-foreground/35 mt-0.5">{t.meta}</p>
                </div>
              </div>
              <blockquote className="font-sans text-[15px] leading-[1.75] text-foreground/65 italic">
                "{t.corps}"
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
