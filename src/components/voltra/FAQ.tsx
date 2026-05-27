import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "Comment Voltra selectionne-t-il mon photographe ?",
    r: "Nos experts artistiques analysent votre brief en detail : l'evenement, l'ambiance souhaitee, votre budget, votre region. Ils parcourent notre reseau de photographes verifies et identifient celui dont le style, la disponibilite et l'experience correspondent exactement a vos attentes. C'est une selection humaine, pas algorithmique.",
  },
  {
    q: "Est-ce que je peux refuser le photographe propose ?",
    r: "Oui, absolument. Si la proposition ne vous convient pas, nos experts en selectionnent une nouvelle sous 24h, gratuitement. Notre objectif est que vous soyez certain de votre choix avant de confirmer quoi que ce soit.",
  },
  {
    q: "Est-ce payant de soumettre un brief ?",
    r: "Non. Soumettre votre brief et recevoir une proposition est entierement gratuit. Vous ne payez qu'une fois que vous avez accepte la proposition et confirme la mission.",
  },
  {
    q: "Comment fonctionne le paiement ?",
    r: "Une fois la proposition acceptee, vous reglez la totalite de la mission via notre plateforme securisee (Stripe). Les fonds sont bloques chez Voltra jusqu'a votre confirmation de satisfaction apres livraison des photos — comme Vinted. Le photographe est paye uniquement apres votre validation.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas satisfait ?",
    r: "Vous avez 7 jours apres reception des photos pour confirmer votre satisfaction ou signaler un probleme. En cas de litige, nos experts Voltra examinent la situation et arbitrent sous 5 jours ouvrés. Votre satisfaction est notre priorite.",
  },
  {
    q: "Comment sont selectionnes les photographes Voltra ?",
    r: "Chaque photographe de notre reseau passe par un processus de selection rigoureux : analyse du portfolio, verification des references, entretien avec nos directeurs artistiques. Moins de 20% des candidats sont retenus. Nous privilegions la qualite a la quantite.",
  },
  {
    q: "Est-ce que Voltra couvre toute la France ?",
    r: "Oui. Notre reseau de photographes couvre l'ensemble du territoire francais, des grandes metropoles aux regions les plus rurales. Nous travaillons egalement avec des photographes bases a l'etranger pour les evenements internationaux.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-40 px-6 md:px-10 bg-[#F2EFE8]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            Questions frequentes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Tout ce que vous
            <br />
            <span className="italic text-foreground/40">voulez savoir.</span>
          </h2>
        </motion.div>

        <div className="space-y-0 divide-y divide-border">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className={`font-serif text-lg italic leading-snug transition-colors duration-300 ${open === i ? "text-accent" : "group-hover:text-accent"}`}>
                  {f.q}
                </span>
                <span className={`ml-4 flex-shrink-0 w-6 h-6 border border-border flex items-center justify-center font-mono text-[10px] transition-all duration-300 ${open === i ? "bg-accent border-accent text-background rotate-45" : "text-foreground/40 group-hover:border-accent group-hover:text-accent"}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-foreground/55 text-[15px] leading-relaxed max-w-2xl">
                      {f.r}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
