import { motion } from "motion/react";
import brief from "@/assets/process-brief.jpg";
import curation from "@/assets/process-curation.jpg";
import handoff from "@/assets/process-handoff.jpg";

const steps = [
  {
    n: "01",
    label: "The Intent",
    title: "Submit your brief.",
    body: "Every detail matters — from the trajectory of the sun to the emotional resonance of the venue. A few minutes is all we ask.",
    img: brief,
    alt: "Hand writing on cream stationery with a fountain pen",
  },
  {
    n: "02",
    label: "The Curation",
    title: "The Chosen Three.",
    body: "Our directors review your brief and hand-select three artists whose visual language aligns with the legacy you wish to leave.",
    img: curation,
    alt: "Three photographic prints displayed on a dark oak table",
  },
  {
    n: "03",
    label: "The Frame",
    title: "Choose your eye.",
    body: "Review intimate portfolios. Speak with the concierge. Confirm your photographer in a single, frictionless gesture.",
    img: handoff,
    alt: "Close up of a vintage camera lens with dramatic rim lighting",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 md:py-44 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-4 md:sticky md:top-32 h-fit">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            — The Method
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-8">
            Precision <span className="italic">curation.</span>
          </h2>
          <p className="font-sans text-foreground/55 leading-relaxed text-[15px] max-w-sm">
            Marketplaces are noisy. Voltra is silent. We filter the world's most elite
            photographic talent to present only the three perfect matches for your vision.
          </p>
        </div>

        <div className="md:col-start-6 md:col-span-7 space-y-24 md:space-y-40">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-border pt-10"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-accent text-[10px] uppercase tracking-[0.3em]">
                  {s.n} — {s.label}
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-6 italic font-normal">
                {s.title}
              </h3>
              <p className="text-foreground/55 max-w-md mb-10 leading-relaxed text-[15px]">
                {s.body}
              </p>
              <div className="overflow-hidden">
                <motion.img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
