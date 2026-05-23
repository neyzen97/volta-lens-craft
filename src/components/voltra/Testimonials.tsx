import { motion } from "motion/react";

const quotes = [
  {
    body: "The curation was surgical. We didn't browse — we simply chose from perfection. Voltra returned to us a year of memories we'd otherwise have lost in a thousand bad searches.",
    name: "Elias Thorne",
    meta: "Private Estate Wedding, Tuscany — June 2024",
  },
  {
    body: "Voltra understands light the way few houses understand silk. Our campaign felt produced by a major studio. The photographer they selected became part of our family.",
    name: "Clara Voss",
    meta: "Creative Director, Maison L'Aube",
  },
  {
    body: "I was given three names. Each one would have been the right answer. That is, I think, the highest compliment one can pay a curator.",
    name: "Henri Marchand",
    meta: "Corporate Portraiture, Paris",
  },
  {
    body: "Forty-eight hours after my brief, I had three portfolios in my inbox. Every one of them moved me. The whole experience felt deeply, almost embarrassingly, considered.",
    name: "Amaia Sorensen",
    meta: "Editorial Lifestyle, Copenhagen",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-44 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            — Voices of Voltra
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-24">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, delay: (i % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? "md:mt-20" : ""}
            >
              <blockquote className="font-serif text-xl md:text-2xl italic leading-snug text-foreground/85 text-balance mb-8">
                <span className="text-accent text-3xl mr-1 align-top leading-none">“</span>
                {q.body}
                <span className="text-accent text-3xl ml-1 align-top leading-none">”</span>
              </blockquote>
              <figcaption>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent mb-1">
                  {q.name}
                </p>
                <p className="font-sans text-[11px] text-foreground/40 tracking-wide">
                  {q.meta}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
