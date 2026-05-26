import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cgv")({
  head: () => ({ meta: [{ title: "Conditions Générales de Vente — Voltra" }] }),
  component: CGV,
});

function CGV() {
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
        <h1 className="font-serif text-4xl italic mb-4">Conditions Générales de Vente</h1>
        <p className="font-mono text-[10px] text-foreground/35 uppercase tracking-[0.2em] mb-16">Dernière mise à jour : Mai 2026</p>

        <div className="space-y-12 text-[15px] text-foreground/70 leading-relaxed">

          <Section title="Objet">
            <p>
              Les présentes CGV régissent les conditions dans lesquelles Voltra, service de mise en relation 
              entre clients et photographes professionnels, fournit ses prestations.
            </p>
          </Section>

          <Section title="Le service Voltra">
            <p>Voltra est un service de sélection photographique premium. Voltra :</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Analyse le brief du client",
                "Sélectionne le photographe le mieux adapté",
                "Facilite la relation client-photographe",
                "Sécurise le paiement via un système d'escrow",
                "Arbitre les litiges éventuels",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Commande et paiement">
            <p>
              Après sélection du photographe par Voltra, le client reçoit une proposition. 
              En l'acceptant, il procède au paiement de <strong className="text-foreground">100% du montant total</strong> via Stripe.
            </p>
            <p className="mt-3">
              Les fonds sont bloqués chez Voltra jusqu'à confirmation de satisfaction par le client.
            </p>
          </Section>

          <Section title="Commission Voltra">
            <p>
              Voltra perçoit une commission de <strong className="text-foreground">15%</strong> sur chaque mission, 
              prélevée sur le montant versé par le client. Le photographe reçoit 85% du montant total.
            </p>
          </Section>

          <Section title="Confirmation et libération du paiement">
            <p>
              Après livraison des photos, le client dispose de <strong className="text-foreground">7 jours</strong> pour :
            </p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Confirmer sa satisfaction → le paiement est libéré au photographe",
                "Signaler un problème → un litige est ouvert et Voltra arbitre",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Passé 7 jours sans retour du client, la mission est automatiquement validée 
              et le paiement libéré au photographe.
            </p>
          </Section>

          <Section title="Annulation">
            <p><strong className="text-foreground">Par le client :</strong></p>
            <p className="mt-2">
              En cas d'annulation par le client après confirmation, 
              <strong className="text-foreground"> 25% du montant total</strong> est retenu à titre de dédommagement. 
              Le solde est remboursé sous 5-10 jours ouvrés.
            </p>
            <p className="mt-4"><strong className="text-foreground">Par le photographe :</strong></p>
            <p className="mt-2">
              En cas d'annulation par le photographe, le client est intégralement remboursé. 
              Le photographe peut être suspendu ou exclu du réseau Voltra.
            </p>
          </Section>

          <Section title="Litiges">
            <p>
              En cas de litige, Voltra examine la situation et rend une décision dans un délai de 
              <strong className="text-foreground"> 5 jours ouvrés</strong>. 
              La décision de Voltra est définitive et s'impose aux deux parties.
            </p>
          </Section>

          <Section title="Droit applicable">
            <p>
              Les présentes CGV sont soumises au droit français. 
              Tout litige sera porté devant les tribunaux compétents de France.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question :{" "}
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
