import { motion } from "motion/react";

export function MediaLogos() {
  return (
    <section className="py-12 px-6 md:px-10 border-y border-border overflow-hidden bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/25 text-center mb-10">
          Ils parlent de nous
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">

          {/* Le Figaro */}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0 }}
            className="font-serif font-bold text-xl cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ color: "#E30613", opacity: 0.55 }}>
            Le Figaro
          </motion.span>

          {/* Le Monde */}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.06 }}
            className="font-serif text-xl italic cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ color: "#1A1814", opacity: 0.45 }}>
            Le Monde
          </motion.span>

          {/* Forbes */}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.12 }}
            className="font-sans font-black text-[15px] uppercase tracking-[0.15em] cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ color: "#1A1814", opacity: 0.45 }}>
            Forbes
          </motion.span>

          {/* GQ */}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.18 }}
            className="font-serif font-bold text-2xl cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ color: "#1A1814", opacity: 0.45 }}>
            GQ
          </motion.span>

          {/* Vogue */}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.24 }}
            className="font-serif text-xl tracking-[0.2em] uppercase cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ color: "#1A1814", opacity: 0.45 }}>
            Vogue
          </motion.span>

          {/* TF1 */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.30 }}
            className="cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ opacity: 0.6 }}>
            <div className="flex items-center">
              <div className="px-2 py-1 font-sans font-black text-lg text-white" style={{ backgroundColor: "#003B8E" }}>
                TF<span style={{ color: "#E30613" }}>1</span>
              </div>
            </div>
          </motion.div>

          {/* M6 */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.36 }}
            className="cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ opacity: 0.6 }}>
            <div className="px-2.5 py-1 font-sans font-black text-lg text-white rounded-sm" style={{ backgroundColor: "#FF6600" }}>
              M6
            </div>
          </motion.div>

          {/* Le Parisien */}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.42 }}
            className="font-serif text-base font-bold cursor-default select-none hover:opacity-80 transition-opacity duration-500"
            style={{ color: "#003F8A", opacity: 0.55 }}>
            Le Parisien
          </motion.span>

        </div>
      </div>
    </section>
  );
}
