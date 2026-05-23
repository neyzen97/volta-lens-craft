import { motion } from "motion/react";
import wedding from "@/assets/gallery-wedding.jpg";
import lifestyle from "@/assets/gallery-lifestyle.jpg";
import corporate from "@/assets/gallery-corporate.jpg";

const plates = [
  {
    img: wedding,
    label: "Plate 01 — Weddings",
    title: "The Ceremony of Light",
    body: "From Tuscan vineyards to alpine chapels: the union of two as cinema.",
    aspect: "aspect-[16/9]",
    span: "md:col-span-12",
  },
  {
    img: lifestyle,
    label: "Plate 02 — Lifestyle",
    title: "Quiet Editorial",
    body: "Documentary-grade portraiture for the private collections of public lives.",
    aspect: "aspect-[4/5]",
    span: "md:col-span-7",
  },
  {
    img: corporate,
    label: "Plate 03 — Corporate",
    title: "Atmospheric Authority",
    body: "Leaders shot as subjects of consequence — never as catalogue stock.",
    aspect: "aspect-[3/4]",
    span: "md:col-span-5 md:mt-32",
  },
];

export function Gallery() {
  return (
    <section id="archives" className="py-28 md:py-44 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 md:mb-24 border-b border-border pb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">
              — Archives
            </span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
              Selected <span className="italic">frames.</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
            MMXXIV · No. 03
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {plates.map((p, i) => (
            <motion.figure
              key={p.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`group ${p.span}`}
            >
              <div className={`overflow-hidden ${p.aspect}`}>
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[20%] transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                    {p.label}
                  </p>
                  <h3 className="font-serif text-2xl italic">{p.title}</h3>
                </div>
                <p className="text-foreground/45 text-[13px] max-w-[18ch] text-right leading-snug">
                  {p.body}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
