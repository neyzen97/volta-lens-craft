import { motion } from "motion/react";

const temoignages = [
  {
    corps: "J'avais organisé des dizaines d'événements sportifs. La recherche d'un photographe était toujours le point de friction. Avec Voltra, j'ai décrit mon tournoi en cinq minutes. Quarante-huit heures après, j'avais exactement ce que je cherchais — sans compromis, sans stress.",
    nom: "Karim B.",
    meta: "Directeur sportif · Tournoi ATP, Roland-Garros 2024",
    initiale: "K",
  },
  {
    corps: "Le photographe sélectionné par Voltra a saisi quelque chose que même nous n'aurions su formuler. L'ambiance, la lumière, l'intimité. Ces images sont devenues notre identité visuelle. Je ne comprends pas encore comment ils ont su.",
    nom: "Inès & Thomas V.",
    meta: "Mariage privé · Domaine de Chantilly, Octobre 2024",
    initiale: "I",
  },
  {
    corps: "En tant que directrice artistique, j'avais des exigences très précises. Voltra ne m'a pas présenté un catalogue — ils m'ont présenté une évidence. Le photographe avait exactement la sensibilité éditoriale que je recherchais depuis des mois.",
    nom: "Clara M.",
    meta: "Directrice artistique · Maison Haute Couture, Paris",
    initiale: "C",
  },
  {
    corps: "Notre levée de fonds Series B nécessitait une couverture photo irréprochable. Voltra a compris les enjeux business derrière l'événement. Le résultat a dépassé nos attentes — et nos investisseurs l'ont remarqué.",
    nom: "Alexis D.",
    meta: "CEO · Scale-up tech, Série B 40M€",
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
              Des moments
              <br />
              <span className="italic text-foreground/50">inoubliables.</span>
            </h2>
          </div>
          <p className="text-foreground/40 text-[13px] font-mono uppercase tracking-[0.2em] max-w-xs text-right hidden md:block">
            98% de nos clients
            <br />nous recommandent
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {temoignages.map((t, i) => (
            <motion.figure
              key={t.nom}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border pt-8 group"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-sm text-background italic">{t.initiale}</span>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                    {t.nom}
                  </p>
                  <p className="font-sans text-[11px] text-foreground/40 mt-0.5">
                    {t.meta}
                  </p>
                </div>
              </div>
              <blockquote className="font-serif text-[17px] italic leading-[1.6] text-foreground/75">
                "{t.corps}"
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
