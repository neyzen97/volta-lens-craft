import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/voltra/Nav";
import { Hero } from "@/components/voltra/Hero";
import { Process } from "@/components/voltra/Process";
import { Testimonials } from "@/components/voltra/Testimonials";
import { FinalCta } from "@/components/voltra/FinalCta";
import { Photographers } from "@/components/voltra/Photographers";
import { SiteFooter } from "@/components/voltra/SiteFooter";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <main className="bg-background text-foreground grain">
      <Nav />
      <Hero />
      <Process />
      <Testimonials />
      <FinalCta />
      <Photographers />
      <SiteFooter />
    </main>
  );
}
