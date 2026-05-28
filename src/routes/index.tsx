import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/voltra/Nav";
import { Hero } from "@/components/voltra/Hero";
import { PhotoStrip } from "@/components/voltra/PhotoStrip";
import { Process } from "@/components/voltra/Process";
import { AvantApres } from "@/components/voltra/AvantApres";
import { Testimonials } from "@/components/voltra/Testimonials";
import { FAQ } from "@/components/voltra/FAQ";
import { FinalCta } from "@/components/voltra/FinalCta";
import { Photographers } from "@/components/voltra/Photographers";
import { SiteFooter } from "@/components/voltra/SiteFooter";
import { TrustpilotBadge } from "@/components/voltra/TrustpilotBadge";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <main className="bg-[#FAFAF8] text-foreground grain">
      <Nav />
      <Hero />
      <PhotoStrip />
      <Process />
      <AvantApres />
      <Testimonials />
      <FAQ />
      <FinalCta />
      <Photographers />
      <SiteFooter />
      <TrustpilotBadge />
    </main>
  );
}
