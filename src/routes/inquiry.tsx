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
      { title: "The Brief — Voltra" },
      {
        name: "description",
        content: "Share your event with Voltra. We respond, by name, within 48 hours.",
      },
    ],
  }),
  component: InquiryPage,
});

const schema = z.object({
  occasion: z.string().min(1).max(80),
  event_date: z.string().optional(),
  location: z.string().max(200).optional(),
  budget: z.string().max(80).optional(),
  style: z.string().max(80).optional(),
  guests: z.string().max(40).optional(),
  vision: z.string().max(2000).optional(),
  full_name: z.string().min(1).max(120),
  email: z.string().email().max(255),
});

type FormState = z.input<typeof schema>;

const OCCASIONS = [
  "Private Wedding",
  "Editorial / Lifestyle",
  "Corporate Portraiture",
  "Family Archive",
  "Event Documentary",
  "Other",
];
const STYLES = ["Cinematic", "Editorial", "Documentary", "Fine Art", "Reportage"];
const BUDGETS = ["< 3 000 €", "3 — 7 000 €", "7 — 15 000 €", "15 — 30 000 €", "30 000 € +"];

const STEPS = [
  { k: "occasion", label: "Occasion" },
  { k: "date", label: "When" },
  { k: "context", label: "Context" },
  { k: "vision", label: "Vision" },
  { k: "contact", label: "Contact" },
] as const;

function InquiryPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    occasion: "",
    event_date: "",
    location: "",
    budget: "",
    style: "",
    guests: "",
    vision: "",
    full_name: "",
    email: "",
  });

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canProceed = () => {
    if (step === 0) return !!form.occasion;
    if (step === 4) return !!form.full_name && !!form.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
    return true;
  };

  const next = async () => {
    if (!canProceed()) return;
    if (step < STEPS.length - 1) return setStep(step + 1);

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please review your details.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      occasion: parsed.data.occasion,
      event_date: parsed.data.event_date || null,
      location: parsed.data.location || null,
      budget: parsed.data.budget || null,
      style: parsed.data.style || null,
      guests: parsed.data.guests || null,
      vision: parsed.data.vision || null,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    navigate({ to: "/confirmation" });
  };

  const prev = () => step > 0 && setStep(step - 1);
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <main className="bg-background text-foreground min-h-screen grain">
      <Nav />

      <section className="pt-32 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Step {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              {STEPS[step].label}
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
              <Step
                eyebrow="The Foundation"
                title="What are we documenting?"
                hint="Choose the occasion closest to your event — we'll refine the rest together."
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OCCASIONS.map((o) => (
                    <Choice
                      key={o}
                      label={o}
                      active={form.occasion === o}
                      onClick={() => update("occasion", o)}
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 1 && (
              <Step
                eyebrow="The Moment"
                title="When does it unfold?"
                hint="Approximate dates are perfectly fine. We work many months in advance."
              >
                <div className="space-y-8">
                  <Field
                    label="Event date"
                    type="date"
                    value={form.event_date || ""}
                    onChange={(v) => update("event_date", v)}
                  />
                  <Field
                    label="Location (city, region, venue)"
                    placeholder="e.g. Villa Cetinale, Tuscany"
                    value={form.location || ""}
                    onChange={(v) => update("location", v)}
                  />
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step
                eyebrow="The Context"
                title="Scope & investment."
                hint="A directional budget helps us match you with photographers whose calendars align."
              >
                <div className="space-y-10">
                  <ChoiceGroup
                    label="Budget"
                    options={BUDGETS}
                    value={form.budget || ""}
                    onChange={(v) => update("budget", v)}
                  />
                  <Field
                    label="Expected guests / scale"
                    placeholder="e.g. 80 guests · 2 days"
                    value={form.guests || ""}
                    onChange={(v) => update("guests", v)}
                  />
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step
                eyebrow="The Vision"
                title="Tell us about the light."
                hint="The mood, the references, what you wish to remember. There is no wrong answer."
              >
                <div className="space-y-10">
                  <ChoiceGroup
                    label="Preferred style"
                    options={STYLES}
                    value={form.style || ""}
                    onChange={(v) => update("style", v)}
                  />
                  <Field
                    label="A note from you"
                    placeholder="The mood, the moments you wish captured, the legacy you have in mind…"
                    value={form.vision || ""}
                    onChange={(v) => update("vision", v)}
                    textarea
                  />
                </div>
              </Step>
            )}

            {step === 4 && (
              <Step
                eyebrow="The Introduction"
                title="Where shall we reach you?"
                hint="A concierge will respond, by name, within 48 hours. We never share your details."
              >
                <div className="space-y-8">
                  <Field
                    label="Your name"
                    placeholder="Full name"
                    value={form.full_name}
                    onChange={(v) => update("full_name", v)}
                  />
                  <Field
                    label="Email"
                    type="email"
                    placeholder="you@domain.com"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                  />
                </div>
              </Step>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <button
            onClick={prev}
            disabled={step === 0}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 hover:text-accent transition-colors disabled:opacity-20"
          >
            ← Back
          </button>
          <button
            onClick={next}
            disabled={!canProceed() || submitting}
            className="group relative px-10 py-4 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.25em] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {submitting ? "Sending…" : step === STEPS.length - 1 ? "Submit brief" : "Continue"}
            </span>
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:not-disabled:translate-y-0 transition-transform duration-700" />
          </button>
        </div>

        <p className="mt-10 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30">
          Prefer email? <Link to="/" className="text-accent hover:underline">concierge@voltra.studio</Link>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

function Step({
  eyebrow,
  title,
  hint,
  children,
}: {
  eyebrow: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">
        — {eyebrow}
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-[1.05] tracking-tight">
        {title}
      </h1>
      <p className="text-foreground/50 mb-12 max-w-md leading-relaxed text-[15px]">{hint}</p>
      {children}
    </div>
  );
}

function Choice({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left p-6 border transition-all duration-500 ${
        active
          ? "border-accent bg-accent/5"
          : "border-border hover:border-foreground/30 hover:bg-foreground/[0.02]"
      }`}
    >
      <span
        className={`font-serif text-lg italic transition-colors ${
          active ? "text-accent" : "text-foreground/80 group-hover:text-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/50 mb-4 block">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`px-4 py-2.5 text-[12px] tracking-wide border transition-all duration-500 ${
              value === o
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-foreground/60 hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/50 mb-3 block">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/25 transition-colors duration-500 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/25 transition-colors duration-500 [color-scheme:dark]"
        />
      )}
    </div>
  );
}
