import { motion } from "motion/react";

const pillars = [
  {
    n: "I.",
    title: "Hand selection",
    body: "No algorithms. No catalogues. Our directors personally pair you with three photographers — never more.",
  },
  {
    n: "II.",
    title: "Quiet excellence",
    body: "Our network is invitation-only: editorial veterans, atelier visionaries, the quietly extraordinary.",
  },
  {
    n: "III.",
    title: "Time, returned",
    body: "Hours of vetting compressed into a single brief. The concierge handles every logistical thread.",
  },
  {
    n: "IV.",
    title: "Discretion",
    body: "Names, dates, locations — every detail of your event is held with absolute confidentiality.",
  },
];

export function Why() {
  return (
    <section className="relative py-28 md:py-44 border-y border-border bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-20 md:mb-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block">
            — Why Voltra
          </span>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight">
            An audience of one. <br />
            <span className="italic text-foreground/70">An aesthetic of few.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border pt-8"
            >
              <span className="font-serif italic text-accent text-2xl mb-6 block">
                {p.n}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">{p.title}</h3>
              <p className="text-foreground/55 leading-relaxed text-[15px] max-w-sm">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
