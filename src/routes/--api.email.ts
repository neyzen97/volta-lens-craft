import { createAPIFileRoute } from "@tanstack/react-start/api";

const RESEND_API_KEY = "re_EGy9hp7K_48XUkJgCWRHth6Pv7m8nV1E3";
const FROM = "Voltra <concierge@voltra.studio>";

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  return res.json();
}

function emailBase(content: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #F8F6F1; font-family: Georgia, serif; color: #1A1814; }
        .container { max-width: 560px; margin: 0 auto; padding: 48px 32px; }
        .logo { font-size: 22px; letter-spacing: 0.05em; margin-bottom: 48px; }
        .divider { height: 1px; background: rgba(26,24,20,0.08); margin: 32px 0; }
        .label { font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(26,24,20,0.4); margin-bottom: 8px; }
        .title { font-size: 28px; font-style: italic; line-height: 1.2; margin-bottom: 16px; }
        .body { font-size: 15px; line-height: 1.7; color: rgba(26,24,20,0.65); margin-bottom: 24px; }
        .accent { color: #B8923A; }
        .button { display: inline-block; background: #1A1814; color: #F8F6F1; text-decoration: none; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; padding: 16px 32px; margin: 24px 0; }
        .footer { margin-top: 48px; font-family: monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(26,24,20,0.3); }
        .info-block { background: #F0ECE3; border-left: 2px solid #B8923A; padding: 16px 20px; margin: 24px 0; }
        .info-label { font-family: monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(26,24,20,0.4); margin-bottom: 6px; }
        .info-value { font-size: 15px; color: #1A1814; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">VOLTRA</div>
        ${content}
        <div class="divider"></div>
        <div class="footer">
          © MMXXVI Voltra · Tous droits réservés<br>
          <span style="color: rgba(26,24,20,0.2)">concierge@voltra.studio</span>
        </div>
      </div>
    </body>
    </html>
  `;
}

const EMAILS: Record<string, (data: any) => { subject: string; html: string }> = {

  // 1. Client — Brief reçu
  brief_received: (d) => ({
    subject: "Votre brief est entre nos mains — Voltra",
    html: emailBase(`
      <div class="label">— Brief reçu</div>
      <div class="title">Bienvenue, ${d.name}.</div>
      <div class="body">
        Votre brief pour <span class="accent">${d.occasion}</span> est bien arrivé. 
        Nos directeurs artistiques l'analysent en ce moment.
        <br><br>
        Vous recevrez une proposition personnelle sous <strong>48 heures</strong>.
      </div>
      <div class="info-block">
        <div class="info-label">Votre occasion</div>
        <div class="info-value">${d.occasion}</div>
        ${d.event_date ? `<div class="info-label" style="margin-top:12px">Date</div><div class="info-value">${d.event_date}</div>` : ""}
        ${d.location ? `<div class="info-label" style="margin-top:12px">Lieu</div><div class="info-value">${d.location}</div>` : ""}
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/mon-espace" class="button">
        Accéder à mon espace
      </a>
      <div class="body" style="font-size:13px">
        Des questions ? Répondez directement à cet email.
      </div>
    `),
  }),

  // 2. Client — Photographe assigné
  photographer_matched: (d) => ({
    subject: "Votre photographe a été sélectionné — Voltra",
    html: emailBase(`
      <div class="label">— Sélection effectuée</div>
      <div class="title">L'évidence est là.</div>
      <div class="body">
        Nous avons identifié le photographe parfait pour votre <span class="accent">${d.occasion}</span>.
        <br><br>
        Connectez-vous à votre espace pour découvrir la proposition — et confirmer la mission.
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/mon-espace" class="button">
        Voir la proposition
      </a>
    `),
  }),

  // 3. Client — Photos livrées
  photos_delivered: (d) => ({
    subject: "Vos photos sont prêtes — Voltra",
    html: emailBase(`
      <div class="label">— Livraison</div>
      <div class="title">Vos photos vous attendent.</div>
      <div class="body">
        Votre photographe vient de livrer les images de votre <span class="accent">${d.occasion}</span>.
        <br><br>
        Vous avez <strong>7 jours</strong> pour les consulter et confirmer votre satisfaction. 
        Passé ce délai, la mission sera automatiquement validée.
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/mon-espace" class="button">
        Accéder à mes photos
      </a>
      <div class="info-block">
        <div class="info-label">Date limite de confirmation</div>
        <div class="info-value">${d.deadline}</div>
      </div>
    `),
  }),

  // 4. Photographe — Nouvelle mission
  photographer_new_mission: (d) => ({
    subject: "Une nouvelle mission vous a été assignée — Voltra",
    html: emailBase(`
      <div class="label">— Nouvelle mission</div>
      <div class="title">Une mission vous attend.</div>
      <div class="body">
        Voltra vous a sélectionné pour une nouvelle mission.
      </div>
      <div class="info-block">
        <div class="info-label">Occasion</div>
        <div class="info-value">${d.occasion}</div>
        ${d.event_date ? `<div class="info-label" style="margin-top:12px">Date</div><div class="info-value">${d.event_date}</div>` : ""}
        ${d.location ? `<div class="info-label" style="margin-top:12px">Lieu</div><div class="info-value">${d.location}</div>` : ""}
        ${d.budget ? `<div class="info-label" style="margin-top:12px">Budget client</div><div class="info-value">${d.budget}</div>` : ""}
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/espace-photographe" class="button">
        Voir le brief complet
      </a>
    `),
  }),

  // 5. Admin — Nouveau brief
  admin_new_brief: (d) => ({
    subject: `⚡ Nouveau brief — ${d.occasion}`,
    html: emailBase(`
      <div class="label">— Nouveau brief reçu</div>
      <div class="title">${d.name}</div>
      <div class="body">Un nouveau brief vient d'être soumis sur Voltra.</div>
      <div class="info-block">
        <div class="info-label">Occasion</div><div class="info-value">${d.occasion}</div>
        <div class="info-label" style="margin-top:12px">Email</div><div class="info-value">${d.email}</div>
        ${d.event_date ? `<div class="info-label" style="margin-top:12px">Date</div><div class="info-value">${d.event_date}</div>` : ""}
        ${d.budget ? `<div class="info-label" style="margin-top:12px">Budget</div><div class="info-value">${d.budget}</div>` : ""}
        ${d.vision ? `<div class="info-label" style="margin-top:12px">Vision</div><div class="info-value" style="font-style:italic">"${d.vision}"</div>` : ""}
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/vx7k2-concierge-9f4m" class="button">
        Ouvrir le desk concierge
      </a>
    `),
  }),

  // 6. Admin — Litige signalé
  admin_dispute: (d) => ({
    subject: `⚠️ Litige signalé — ${d.occasion}`,
    html: emailBase(`
      <div class="label" style="color:#dc2626">— Litige urgent</div>
      <div class="title" style="color:#dc2626">Un litige a été signalé.</div>
      <div class="body">Le client <span class="accent">${d.name}</span> a signalé un problème sur sa mission.</div>
      <div class="info-block" style="border-left-color:#dc2626">
        <div class="info-label">Occasion</div><div class="info-value">${d.occasion}</div>
        <div class="info-label" style="margin-top:12px">Motif du litige</div>
        <div class="info-value" style="font-style:italic">"${d.reason}"</div>
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/vx7k2-concierge-9f4m" class="button" style="background:#dc2626">
        Gérer le litige
      </a>
    `),
  }),

  // 7. Photographe — Paiement libéré
  photographer_paid: (d) => ({
    subject: "Votre paiement a été libéré — Voltra",
    html: emailBase(`
      <div class="label">— Paiement</div>
      <div class="title">Votre paiement est en route.</div>
      <div class="body">
        Le client a confirmé sa satisfaction pour la mission <span class="accent">${d.occasion}</span>.
        <br><br>
        Voltra va procéder au virement de votre rémunération sous <strong>3-5 jours ouvrés</strong>.
      </div>
      <div class="info-block">
        <div class="info-label">Montant net (après commission Voltra 15%)</div>
        <div class="info-value" style="font-size:24px">${d.amount} €</div>
      </div>
      <a href="https://volta-lens-craft.nolann2103.workers.dev/espace-photographe" class="button">
        Voir mes revenus
      </a>
    `),
  }),
};

export const APIRoute = createAPIFileRoute("/api/email")({
  POST: async ({ request }) => {
    try {
      const { type, to, data } = await request.json();
      const emailFn = EMAILS[type];
      if (!emailFn) return Response.json({ error: "Type inconnu" }, { status: 400 });
      const { subject, html } = emailFn(data);
      const result = await sendEmail(to, subject, html);
      return Response.json(result);
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  },
});
