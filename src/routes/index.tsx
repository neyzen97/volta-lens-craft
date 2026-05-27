import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/voltra/Nav";
import { Hero } from "@/components/voltra/Hero";
import { PhotoStrip } from "@/components/voltra/PhotoStrip";
import { MediaLogos } from "@/components/voltra/MediaLogos";
import { Process } from "@/components/voltra/Process";
import { Benefits } from "@/components/voltra/Benefits";
import { SocialProof } from "@/components/voltra/SocialProof";
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
      <MediaLogos />
      <Process />
      <Benefits />
      <SocialProof />
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
