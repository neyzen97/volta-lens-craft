import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({ meta: [{ title: "Politique de confidentialité — Voltra" }] }),
  component: Confidentialite,
});

function Confidentialite() {
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
        <h1 className="font-serif text-4xl italic mb-4">Politique de confidentialité</h1>
        <p className="font-mono text-[10px] text-foreground/35 uppercase tracking-[0.2em] mb-16">Dernière mise à jour : Mai 2026</p>

        <div className="space-y-12 text-[15px] text-foreground/70 leading-relaxed">

          <Section title="Données collectées">
            <p>Lors de l'utilisation de Voltra, nous collectons les données suivantes :</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Nom et prénom",
                "Adresse email",
                "Informations relatives à votre événement (date, lieu, budget, vision)",
                "Données de paiement (traitées par Stripe — nous ne stockons aucune donnée bancaire)",
                "Messages échangés via la plateforme",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Finalités du traitement">
            <p>Vos données sont utilisées pour :</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Traiter votre demande et sélectionner un photographe adapté",
                "Gérer la relation contractuelle entre vous et le photographe",
                "Traiter les paiements via Stripe",
                "Vous envoyer des communications relatives à votre mission",
                "Améliorer nos services",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Base légale">
            <p>
              Le traitement de vos données est fondé sur l'exécution du contrat vous liant à Voltra 
              et sur notre intérêt légitime à améliorer nos services.
            </p>
          </Section>

          <Section title="Conservation des données">
            <p>
              Vos données sont conservées pendant la durée de votre relation avec Voltra, 
              puis archivées pendant <strong className="text-foreground">3 ans</strong> à des fins légales et comptables.
            </p>
          </Section>

          <Section title="Partage des données">
            <p>Vos données peuvent être partagées avec :</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Le photographe sélectionné pour votre mission (uniquement les informations nécessaires)",
                "Stripe (traitement des paiements)",
                "Supabase (hébergement des données)",
                "Resend (envoi des emails transactionnels)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">Vos données ne sont jamais vendues à des tiers.</p>
          </Section>

          <Section title="Vos droits">
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Droit d'accès à vos données",
                "Droit de rectification",
                "Droit à l'effacement (droit à l'oubli)",
                "Droit à la portabilité",
                "Droit d'opposition au traitement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:concierge@voltra.studio" className="text-accent hover:underline">
                concierge@voltra.studio
              </a>
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Voltra utilise uniquement des cookies techniques nécessaires au fonctionnement du site 
              (authentification, session). Aucun cookie publicitaire ou de traçage n'est utilisé.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question relative à vos données personnelles :{" "}
              <a href="mailto:concierge@voltra.studio" className="text-accent hover:underline">
                concierge@voltra.studio
              </a>
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
