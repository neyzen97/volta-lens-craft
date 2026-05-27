import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/voltra/Nav";
import { SiteFooter } from "@/components/voltra/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Trouver mon photographe - Voltra" },
      { name: "description", content: "Decrivez votre evenement. Nos experts selectionnent votre photographe. Reponse sous 48h." },
    ],
  }),
  component: InquiryPage,
});

const schema = z.object({
  occasion: z.string().min(1).max(80),
  occasion_detail: z.string().max(300).optional(),
  event_date: z.string().optional(),
  location: z.string().max(200).optional(),
  budget: z.string().max(80).optional(),
  style: z.string().max(80).optional(),
  guests: z.string().max(40).optional(),
  vision: z.string().max(2000).optional(),
  full_name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  password: z.string().min(6).max(100),
});

type FormState = z.input<typeof schema>;

const OCCASIONS = ["Mariage", "Shooting", "Sport", "Immobilier", "Corporate", "Evenement", "Autre"];

const OCCASION_DETAILS: Record<string, string> = {
  Sport: "Quel sport, quel evenement ?",
  Immobilier: "Type de bien, surface, localisation ?",
  Corporate: "Type d'entreprise, quelle occasion ?",
  Evenement: "Quel type d'evenement ?",
  Autre: "Decrivez votre projet...",
};

const OCCASION_GUESTS: Record<string, string> = {
  Mariage: "Nombre d'invites",
  Sport: "Nombre de participants / spectateurs",
  Corporate: "Nombre de personnes",
  Evenement: "Nombre de participants",
  Autre: "Nombre de personnes (si applicable)",
};

const NO_GUESTS = ["Shooting", "Immobilier"];

const STYLES = ["Cinematique", "Editorial", "Documentaire", "Beaux-arts", "Reportage"];
const BUDGETS_BY_OCCASION: Record<string, string[]> = {
  Mariage: ["500 - 1 000", "1 000 - 3 000", "3 000 - 6 000", "6 000 - 10 000", "+10 000"],
  Shooting: ["100 - 300", "300 - 700", "700 - 1 500", "1 500 - 3 000", "+3 000"],
  Sport: ["150 - 400", "400 - 1 000", "1 000 - 3 000", "3 000 - 10 000", "+10 000"],
  Immobilier: ["150 - 300", "300 - 700", "700 - 1 500", "1 500 - 5 000", "+5 000"],
  Corporate: ["300 - 700", "700 - 2 000", "2 000 - 5 000", "5 000 - 10 000", "+10 000"],
  Evenement: ["200 - 500", "500 - 1 500", "1 500 - 4 000", "4 000 - 10 000", "+10 000"],
  Autre: ["Moins de 1 000", "1 000 - 3 000", "3 000 - 7 000", "7 000 - 15 000", "+15 000"],
};
const DEFAULT_BUDGETS = ["Moins de 1 000", "1 000 - 3 000", "3 000 - 7 000", "7 000 - 15 000", "+15 000"];

const ETAPES = [
  { k: "occasion", label: "L'Occasion" },
  { k: "date", label: "Le Moment" },
  { k: "contexte", label: "Le Contexte" },
  { k: "vision", label: "La Vision" },
  { k: "contact", label: "Votre compte" },
] as const;

function InquiryPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormState>({
    occasion: "",
    occasion_detail: "",
    event_date: "",
    location: "",
    budget: "",
    style: "",
    guests: "",
    vision: "",
    full_name: "",
    email: "",
    password: "",
  });

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canProceed = () => {
    if (step === 0) return !!form.occasion;
    if (step === 4) return !!form.full_name && !!form.email && form.password.length >= 6 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
    return true;
  };

  const next = async () => {
    if (!canProceed()) return;
    if (step < ETAPES.length - 1) return setStep(step + 1);

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Verifiez vos informations.");
      return;
    }
    setSubmitting(true);

    // Creer le compte
    const { data: authData } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { data: { full_name: parsed.data.full_name } }
    });

    const userId = authData?.user?.id;

    // Inserer le brief
    const { error } = await supabase.from("briefs").insert({
      client_id: userId ?? null,
      occasion: parsed.data.occasion,
      event_date: parsed.data.event_date || null,
      location: parsed.data.location || null,
      budget: parsed.data.budget || null,
      style: parsed.data.style || null,
      guests: parsed.data.guests || null,
      vision: parsed.data.vision || null,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      status: "pending",
    });

    setSubmitting(false);
    if (error) {
      toast.error("Une erreur est survenue.");
      return;
    }

    // Emails
    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "brief_received",
        to: parsed.data.email,
        data: { name: parsed.data.full_name, occasion: parsed.data.occasion, event_date: parsed.data.event_date || null, location: parsed.data.location || null },
      }),
    });

    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "admin_new_brief",
        to: "nolann2103@icloud.com",
        data: { name: parsed.data.full_name, email: parsed.data.email, occasion: parsed.data.occasion, event_date: parsed.data.event_date || null, budget: parsed.data.budget || null, vision: parsed.data.vision || null },
      }),
    });

    navigate({ to: "/confirmation" });
  };

  const prev = () => step > 0 && setStep(step - 1);
  const progress = ((step + 1) / ETAPES.length) * 100;
  const needsDetail = OCCASION_DETAILS[form.occasion];
  const guestLabel = OCCASION_GUESTS[form.occasion];
  const showGuests = guestLabel && !NO_GUESTS.includes(form.occasion);

  return (
    <main className="bg-[#FAFAF8] text-foreground min-h-screen grain">
      <Nav />

      <section className="pt-32 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
        {/* Retour */}
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30 hover:text-accent transition-colors mb-10">
          ← Retour
        </Link>

        {/* Progression */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Etape {String(step + 1).padStart(2, "0")} / {String(ETAPES.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
              {ETAPES[step].label}
            </span>
          </div>
          <div className="h-[1px] w-full bg-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[420px]"
          >
            {step === 0 && (
              <Etape label="Le Point de Depart" titre="Que souhaitez-vous immortaliser ?" indice="Choisissez l'occasion la plus proche de votre projet.">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {OCCASIONS.map((o) => (
                    <Choix key={o} label={o} actif={form.occasion === o} onClick={() => { update("occasion", o); update("occasion_detail", ""); update("guests", ""); }} />
                  ))}
                </div>
                {needsDetail && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <Champ label={needsDetail} placeholder="Preciser..." value={form.occasion_detail || ""} onChange={(v) => update("occasion_detail", v)} />
                  </motion.div>
                )}
              </Etape>
            )}

            {step === 1 && (
              <Etape label="Le Moment" titre="Quand cela se deroule-t-il ?" indice="Une date approximative convient parfaitement.">
                <div className="space-y-8">
                  <Champ label="Date de l'evenement" type="date" value={form.event_date || ""} onChange={(v) => update("event_date", v)} />
                  <Champ label="Lieu" placeholder="Ville, region, lieu..." value={form.location || ""} onChange={(v) => update("location", v)} />
                </div>
              </Etape>
            )}

            {step === 2 && (
              <Etape label="Le Contexte" titre="Budget et envergure." indice="Une fourchette indicative nous aide a trouver le bon photographe.">
                <div className="space-y-10">
                  <GroupeChoix label="Budget (en euros)" options={BUDGETS_BY_OCCASION[form.occasion] || DEFAULT_BUDGETS} value={form.budget || ""} onChange={(v) => update("budget", v)} />
                  {showGuests && (
                    <Champ label={guestLabel} placeholder="Ex: 80 personnes" value={form.guests || ""} onChange={(v) => update("guests", v)} />
                  )}
                </div>
              </Etape>
            )}

            {step === 3 && (
              <Etape label="La Vision" titre="Parlez-nous de l'ambiance." indice="L'atmosphere, vos references, ce que vous voulez garder.">
                <div className="space-y-10">
                  <GroupeChoix label="Style souhaite" options={STYLES} value={form.style || ""} onChange={(v) => update("style", v)} />
                  <Champ label="Un mot de votre part" placeholder="L'ambiance, les instants a capturer..." value={form.vision || ""} onChange={(v) => update("vision", v)} textarea />
                </div>
              </Etape>
            )}

            {step === 4 && (
              <Etape label="Votre compte Voltra" titre="Creez votre espace." indice="Suivez votre mission en temps reel. Vos informations sont confidentielles.">
                <div className="space-y-8">
                  <Champ label="Votre nom" placeholder="Prenom et nom" value={form.full_name} onChange={(v) => update("full_name", v)} />
                  <Champ label="Adresse e-mail" type="email" placeholder="vous@domaine.com" value={form.email} onChange={(v) => update("email", v)} />
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-3">
                      Mot de passe (min. 6 caracteres)
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        placeholder="Votre mot de passe..."
                        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/25 transition-colors duration-500 pr-10"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30 hover:text-accent transition-colors">
                        {showPassword ? "Masquer" : "Voir"}
                      </button>
                    </div>
                  </div>
                </div>
              </Etape>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <button onClick={prev} disabled={step === 0}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors disabled:opacity-20">
            ← Retour
          </button>
          <button onClick={next} disabled={!canProceed() || submitting}
            className="group relative px-10 py-4 bg-accent text-[#0D0C0A] font-mono text-[10px] uppercase tracking-[0.25em] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed font-semibold">
            <span className="relative z-10">{submitting ? "Envoi..." : step === ETAPES.length - 1 ? "Trouver mon photographe" : "Continuer"}</span>
            <span className="absolute inset-0 bg-[#0D0C0A] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-white font-mono text-[10px] uppercase tracking-[0.25em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {step === ETAPES.length - 1 ? "Trouver mon photographe" : "Continuer"}
            </span>
          </button>
        </div>

        <div className="mt-8 text-center space-y-3">
          <p className="font-sans text-[13px] text-foreground/40 max-w-sm mx-auto leading-relaxed italic">
            Si notre selection ne vous convient pas, nous en proposons une nouvelle sous 24h. Gratuitement.
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/25">
            Gratuit · Sans engagement · Reponse sous 48h
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Etape({ label, titre, indice, children }: { label: string; titre: string; indice: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">— {label}</span>
      <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-[1.05] tracking-tight italic">{titre}</h1>
      <p className="text-foreground/45 mb-12 max-w-md leading-relaxed text-[15px]">{indice}</p>
      {children}
    </div>
  );
}

function Choix({ label, actif, onClick }: { label: string; actif: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`group text-left p-5 border transition-all duration-500 ${actif ? "border-accent bg-accent/5" : "border-border hover:border-foreground/20"}`}>
      <span className={`font-serif text-base italic transition-colors ${actif ? "text-accent" : "text-foreground/70 group-hover:text-foreground"}`}>{label}</span>
    </button>
  );
}

function GroupeChoix({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)}
            className={`px-4 py-2.5 text-[12px] tracking-wide border transition-all duration-500 ${value === o ? "border-accent text-accent bg-accent/5" : "border-border text-foreground/50 hover:border-foreground/25 hover:text-foreground"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Champ({ label, value, onChange, placeholder, type = "text", textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; textarea?: boolean; }) {
  return (
    <div>
      <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-3 block">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={5}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/25 transition-colors duration-500 resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/25 transition-colors duration-500 [color-scheme:light]" />
      )}
    </div>
  );
}
