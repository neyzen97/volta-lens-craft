import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/voltra/Nav";
import { SiteFooter } from "@/components/voltra/SiteFooter";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Brief received — Voltra" },
      { name: "description", content: "Your brief has reached the concierge." },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  return (
    <main className="bg-background text-foreground min-h-screen grain flex flex-col">
      <Nav />

      <section className="flex-1 flex items-center justify-center px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.07)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 mx-auto mb-12 rounded-full border border-accent flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
          </motion.div>

          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6 block">
            — The lens is focused
          </span>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1] tracking-tight mb-10">
            Your brief
            <br />
            <span className="italic font-normal text-foreground/80">has arrived.</span>
          </h1>

          <p className="text-foreground/55 max-w-md mx-auto leading-relaxed text-[15px] mb-14">
            A concierge is now reading your story. Within forty-eight hours you will receive a
            private letter with three photographers selected, by hand, for your event.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="px-10 py-4 border border-foreground/25 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-all duration-700"
            >
              Return to Voltra
            </Link>
          </div>

          <div className="mt-20 pt-10 border-t border-border max-w-sm mx-auto">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40">
              Reference · {Date.now().toString(36).toUpperCase().slice(-6)}
            </p>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
