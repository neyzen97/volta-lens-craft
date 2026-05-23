import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Brief = {
  id: string;
  occasion: string;
  event_date: string | null;
  location: string | null;
  budget: string | null;
  style: string | null;
  guests: string | null;
  vision: string | null;
  full_name: string;
  email: string;
  status: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: "En attente",        color: "text-amber-600 bg-amber-50 border-amber-200" },
  in_review: { label: "En cours d'analyse",color: "text-blue-600 bg-blue-50 border-blue-200" },
  matched:   { label: "Photographe assigné",color: "text-sage bg-[rgba(92,122,94,0.08)] border-[rgba(92,122,94,0.2)]" },
  confirmed: { label: "Confirmé",           color: "text-green-700 bg-green-50 border-green-200" },
  completed: { label: "Terminé",            color: "text-foreground/50 bg-surface border-border" },
  validated: { label: "Validé ✓",           color: "text-accent bg-accent/5 border-accent/20" },
  disputed:  { label: "Litige",             color: "text-red-600 bg-red-50 border-red-200" },
  cancelled: { label: "Annulé",             color: "text-foreground/30 bg-surface border-border" },
};

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/vx7k2-concierge-9f4m")({
  head: () => ({ meta: [{ title: "Concierge — Voltra" }] }),
  component: AdminPage,
});

// ─── Page principale ──────────────────────────────────────────────────────────

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, matched: 0, validated: 0 });
  const [selected, setSelected] = useState<Brief | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(false); return; }
    checkAdmin();
  }, [session]);

  async function checkAdmin() {
    // Vérification par email admin hardcodé + user_roles
    const adminEmail = "nolann2103@icloud.com";
    if (session.user.email === adminEmail) {
      setIsAdmin(true);
      loadBriefs();
      return;
    }
    // Sinon vérifier user_roles
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (data && data.role === "admin") {
      setIsAdmin(true);
      loadBriefs();
    } else {
      setIsAdmin(false);
    }
  }

  async function loadBriefs() {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) { toast.error(error.message); return; }
    const b = (data ?? []) as Brief[];
    setBriefs(b);
    setStats({
      total: b.length,
      pending: b.filter(x => x.status === "pending").length,
      matched: b.filter(x => x.status === "matched").length,
      validated: b.filter(x => x.status === "validated").length,
    });
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Statut mis à jour");
    loadBriefs();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  }

  if (loading) return <Loader />;
  if (!session) return <AuthGate />;
  if (!isAdmin) return <NotAdmin email={session.user.email} onSignOut={() => supabase.auth.signOut()} />;

  const filtered = filterStatus === "all" ? briefs : briefs.filter(b => b.status === filterStatus);

  return (
    <main className="min-h-screen bg-background text-foreground grain">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 rounded-full border border-foreground/30" />
              <div className="absolute inset-[3px] rounded-full border border-foreground/20" />
              <div className="absolute inset-[6px] rounded-full bg-foreground" />
            </div>
            <span className="font-serif text-lg tracking-tight">VOLTRA</span>
          </Link>
          <span className="text-foreground/20">|</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Concierge Desk
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-foreground/40 hidden md:block">
            {session.user.email}
          </span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { label: "Total briefs", value: stats.total },
            { label: "En attente", value: stats.pending, accent: true },
            { label: "Assignés", value: stats.matched },
            { label: "Validés", value: stats.validated },
          ].map((s) => (
            <div key={s.label} className="border border-border p-6 bg-background">
              <p className={`font-serif text-4xl mb-2 ${s.accent ? "text-accent" : ""}`}>
                {s.value}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mr-2">
            Filtrer :
          </span>
          {["all", "pending", "in_review", "matched", "confirmed", "validated", "disputed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                filterStatus === s
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-foreground/40 hover:border-foreground/30 hover:text-foreground/70"
              }`}
            >
              {s === "all" ? "Tous" : STATUS_LABELS[s]?.label ?? s}
            </button>
          ))}
        </div>

        {/* Layout : liste + détail */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Liste des briefs */}
          <div className="md:col-span-5 space-y-px">
            {filtered.length === 0 ? (
              <p className="font-serif italic text-foreground/30 text-lg py-16 text-center">
                Aucun brief pour ce filtre.
              </p>
            ) : (
              filtered.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className={`w-full text-left p-5 border-b border-border hover:bg-foreground/[0.02] transition-all duration-300 ${
                    selected?.id === b.id ? "bg-foreground/[0.04] border-l-2 border-l-accent" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-serif text-base italic">{b.full_name}</p>
                      <p className="font-mono text-[10px] text-accent mt-0.5">{b.occasion}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
                    {new Date(b.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}
                    {b.event_date ? ` · Événement ${b.event_date}` : ""}
                  </p>
                </button>
              ))
            )}
          </div>

          {/* Détail du brief sélectionné */}
          <div className="md:col-span-7">
            {selected ? (
              <BriefDetail
                brief={selected}
                onUpdateStatus={updateStatus}
                onClose={() => setSelected(null)}
              />
            ) : (
              <div className="border border-border/50 border-dashed h-full min-h-[400px] flex items-center justify-center">
                <p className="font-serif italic text-foreground/25 text-lg">
                  Sélectionnez un brief
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Composant : détail d'un brief ───────────────────────────────────────────

function BriefDetail({
  brief, onUpdateStatus, onClose
}: {
  brief: Brief;
  onUpdateStatus: (id: string, status: string) => void;
  onClose: () => void;
}) {
  const [newStatus, setNewStatus] = useState(brief.status);
  const [note, setNote] = useState("");

  return (
    <div className="border border-border bg-background p-8 sticky top-24">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl italic mb-1">{brief.full_name}</h2>
          <p className="font-mono text-[10px] text-accent uppercase tracking-[0.25em]">
            {brief.email}
          </p>
        </div>
        <button onClick={onClose} className="text-foreground/30 hover:text-foreground transition-colors text-xl">
          ✕
        </button>
      </div>

      {/* Infos */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "Occasion", v: brief.occasion },
          { label: "Date", v: brief.event_date ?? "—" },
          { label: "Lieu", v: brief.location ?? "—" },
          { label: "Budget", v: brief.budget ?? "—" },
          { label: "Style", v: brief.style ?? "—" },
          { label: "Invités", v: brief.guests ?? "—" },
        ].map(({ label, v }) => (
          <div key={label}>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-1">{label}</p>
            <p className="text-[14px] text-foreground/80">{v}</p>
          </div>
        ))}
      </div>

      {/* Vision */}
      {brief.vision && (
        <div className="mb-8 p-5 bg-surface border-l-2 border-accent/30">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-3">
            Vision du client
          </p>
          <p className="font-serif italic text-[15px] text-foreground/75 leading-relaxed">
            "{brief.vision}"
          </p>
        </div>
      )}

      {/* Changer statut */}
      <div className="border-t border-border pt-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4">
          Changer le statut
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setNewStatus(key)}
              className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                newStatus === key
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-foreground/40 hover:border-foreground/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Note interne */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note interne (optionnel)…"
          rows={2}
          className="w-full bg-transparent border border-border focus:border-accent outline-none p-3 font-sans text-[13px] text-foreground placeholder:text-foreground/25 transition-colors resize-none mb-4"
        />

        <button
          onClick={() => onUpdateStatus(brief.id, newStatus)}
          disabled={newStatus === brief.status}
          className="w-full py-4 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Confirmer le statut
        </button>
      </div>

      {/* Actions rapides */}
      <div className="border-t border-border pt-5 mt-5 flex gap-3">
        <a
          href={`mailto:${brief.email}?subject=Votre brief Voltra — ${brief.occasion}`}
          className="flex-1 py-3 border border-border text-center font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50 hover:border-accent hover:text-accent transition-all duration-300"
        >
          Écrire au client
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(brief.email);
            toast.success("Email copié");
          }}
          className="px-4 py-3 border border-border font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50 hover:border-accent hover:text-accent transition-all duration-300"
        >
          Copier email
        </button>
      </div>
    </div>
  );
}

// ─── Badge statut ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] ?? { label: status, color: "text-foreground/40 bg-surface border-border" };
  return (
    <span className={`px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] border whitespace-nowrap ${s.color}`}>
      {s.label}
    </span>
  );
}

// ─── Auth Gate ────────────────────────────────────────────────────────────────

function AuthGate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    if (!email || !password) { toast.error("Email et mot de passe requis"); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error("Identifiants incorrects : " + error.message);
  }

  return (
    <main className="min-h-screen bg-background text-foreground grain flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full border border-foreground/30" />
            <div className="absolute inset-[3px] rounded-full border border-foreground/20" />
            <div className="absolute inset-[6px] rounded-full bg-foreground" />
          </div>
          <span className="font-serif text-xl tracking-tight">VOLTRA</span>
        </Link>

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent mb-2">
          — Accès concierge
        </p>
        <h1 className="font-serif text-3xl italic mb-10 text-foreground/80">
          Espace privé.
        </h1>

        <div className="space-y-6">
          <div>
            <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] text-foreground transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] text-foreground transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            disabled={busy}
            className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors disabled:opacity-40 mt-4"
          >
            {busy ? "Connexion…" : "Accéder au desk"}
          </button>
        </div>
      </div>
    </main>
  );
}

// ─── Pas admin ────────────────────────────────────────────────────────────────

function NotAdmin({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  return (
    <main className="min-h-screen bg-background text-foreground grain flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">— Accès refusé</span>
      <h1 className="font-serif text-4xl italic mb-4">Accès non autorisé.</h1>
      <p className="text-foreground/45 max-w-sm mb-10 text-[14px]">
        Le compte <span className="text-accent">{email}</span> n'a pas les droits concierge.
      </p>
      <button
        onClick={onSignOut}
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors"
      >
        Se déconnecter
      </button>
    </main>
  );
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30 animate-pulse">
        Chargement…
      </span>
    </div>
  );
}
