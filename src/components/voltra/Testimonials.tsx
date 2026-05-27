import { motion } from "motion/react";

const photos = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
];

const t1 = "J'avais regarde des centaines de portfolios pendant des semaines. Un ami m'a parle de Voltra. J'ai rempli le formulaire un soir. Deux jours apres, ils m'ont envoye un profil. Les photos de notre mariage sont au-dessus de tout ce qu'on esperait. Merci beaucoup !";
const t2 = "Je pensais que c'etait un truc marketing de plus. On organise des tournois de padel depuis 5 ans, on a toujours galere avec les photographes. La c'etait fluide du debut a la fin. Le photographe connaissait le sport, comprenait les angles. On a des images qu'on utilise encore partout.";
const t3 = "Notre campagne printemps devait etre tournee en trois semaines. Je n'avais pas le temps de chercher. J'ai envoye mon brief un lundi matin. Le mardi apres-midi j'avais une proposition avec un photographe dont le travail m'a coupe le souffle. C'est rare de tomber juste aussi vite.";
const t4 = "Pour nos annonces immobilieres haut de gamme, la photo c'est tout. Avant Voltra on testait des gens au hasard. Maintenant on passe par eux systematiquement. Le processus est court, les resultats sont constants. C'est devenu un reflexe.";

const temoignages = [
  { corps: t1, nom: "Camille & Romain D.", meta: "Mariage - Aix-en-Provence, Septembre 2024", photo: photos[0] },
  { corps: t2, nom: "Mehdi L.", meta: "Directeur sportif - Open de Padel Paris, Juin 2024", photo: photos[1] },
  { corps: t3, nom: "Lea T.", meta: "Directrice de creation - Maison Eclat, Paris", photo: photos[2] },
  { corps: t4, nom: "Alexandre B.", meta: "Agent immobilier - Paris 7eme", photo: photos[3] },
];

export function Testimonials() {
  return (
    <section id="voix" className="py-28 md:py-44 px-6 md:px-10 bg-[#0D0C0A]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-5 block">
              Ce qu'ils en disent
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-white">
              Ils ont fait confiance
              <br />
              <span className="italic text-white/35">a Voltra.</span>
            </h2>
          </div>
          <p className="text-white/25 text-[11px] font-mono uppercase tracking-[0.2em] max-w-xs text-right hidden md:block leading-relaxed">
            +200 missions
            <br />realisees en 2024
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {temoignages.map((t, i) => (
            <motion.figure
              key={t.nom}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/8 pt-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <img
                  src={t.photo}
                  alt={t.nom}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 grayscale opacity-70"
                />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{t.nom}</p>
                  <p className="font-sans text-[11px] text-white/30 mt-0.5">{t.meta}</p>
                </div>
              </div>
              <blockquote className="font-sans text-[15px] leading-[1.75] text-white/55 italic">
                {t.corps}
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
