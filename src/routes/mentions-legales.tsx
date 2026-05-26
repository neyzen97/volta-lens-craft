import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({ meta: [{ title: "Mentions légales — Voltra" }] }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <main className="min-h-screen bg-background text-foreground grain">
      <header className="px-6 md:px-10 py-6 border-b border-border flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 rounded-full border border-foreground/30" />
            <div className="absolute inset-[3px] rounded-full border border-foreground/20" />
            <div className="absolute inset-[6px] rounded-full bg-foreground" />
          </div>
          <span className="font-serif text-lg tracking-tight">VOLTRA</span>
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">— Légal</span>
        <h1 className="font-serif text-4xl italic mb-16">Mentions légales</h1>

        <div className="space-y-12 text-[15px] text-foreground/70 leading-relaxed">

          <Section title="Éditeur du site">
            <p>Le site Voltra est édité par :</p>
            <p className="mt-3"><strong className="text-foreground">Nolann FOIN</strong></p>
            <p>Statut juridique : en cours de création</p>
            <p>Email : <a href="mailto:concierge@voltra.studio" className="text-accent hover:underline">concierge@voltra.studio</a></p>
          </Section>

          <Section title="Hébergement">
            <p>Ce site est hébergé par :</p>
            <p className="mt-3"><strong className="text-foreground">Cloudflare, Inc.</strong></p>
            <p>101 Townsend St, San Francisco, CA 94107, États-Unis</p>
            <p><a href="https://www.cloudflare.com" className="text-accent hover:underline">www.cloudflare.com</a></p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus présents sur le site Voltra — textes, images, graphismes, logo, icônes — 
              sont la propriété exclusive de Nolann FOIN et sont protégés par les lois françaises et internationales 
              relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification ou exploitation non autorisée de ces contenus, 
              par quelque procédé que ce soit, est strictement interdite.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              Voltra s'efforce de fournir des informations exactes et à jour. Cependant, Voltra ne peut garantir 
              l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site.
            </p>
          </Section>

          <Section title="Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français. 
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </Section>

        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/35 hover:text-accent transition-colors">
            ← Retour
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl italic text-foreground mb-4 pb-3 border-b border-border">{title}</h2>
      {children}
    </div>
  );
}
