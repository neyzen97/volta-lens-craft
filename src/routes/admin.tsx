import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Concierge — Voltra" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
      if (data) loadInquiries();
    })();
  }, [session]);

  async function loadInquiries() {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setInquiries(data ?? []);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
          Loading…
        </span>
      </div>
    );
  }

  if (!session) return <AuthGate />;
  if (!isAdmin) return <NotAdmin email={session.user.email ?? ""} />;

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 grain">
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-16 pb-8 border-b border-border">
        <div>
          <Link to="/" className="font-serif text-2xl tracking-tight">
            VOLTRA
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mt-2">
            — Concierge Desk
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            {session.user.email}
          </span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 hover:text-accent transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            Active <span className="italic">briefs</span>
          </h1>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/40">
            {inquiries.length} total
          </span>
        </div>

        {inquiries.length === 0 ? (
          <p className="font-serif italic text-foreground/40 text-xl py-20 text-center">
            No briefs yet. The desk is quiet.
          </p>
        ) : (
          <div className="space-y-px bg-border">
            {inquiries.map((i) => (
              <article
                key={i.id}
                className="bg-background p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 hover:bg-foreground/[0.02] transition-colors"
              >
                <div className="md:col-span-3">
                  <p className="font-serif text-xl italic mb-1">{i.full_name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {i.email}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/40 mt-2">
                    {new Date(i.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="md:col-span-3 space-y-1">
                  <Meta label="Occasion" v={i.occasion} />
                  <Meta label="Date" v={i.event_date ?? "—"} />
                  <Meta label="Location" v={i.location ?? "—"} />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <Meta label="Budget" v={i.budget ?? "—"} />
                  <Meta label="Style" v={i.style ?? "—"} />
                  <Meta label="Guests" v={i.guests ?? "—"} />
                </div>
                <div className="md:col-span-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/40 mb-2">
                    Vision
                  </p>
                  <p className="text-[13px] text-foreground/70 leading-relaxed italic font-serif line-clamp-5">
                    {i.vision || "—"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Meta({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex gap-2 text-[12px]">
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/40 w-16 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-foreground/80">{v}</span>
    </div>
  );
}

function AuthGate() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
    else if (mode === "signup")
      toast.success("Account created. Ask an admin to grant you access.");
  }

  return (
    <main className="min-h-screen bg-background text-foreground grain flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm border border-border p-10 bg-[#0a0a0a]"
      >
        <Link to="/" className="font-serif text-2xl tracking-tight block mb-2">
          VOLTRA
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-10">
          — Concierge access
        </p>

        <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/50 block mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 mb-6 text-[14px]"
        />

        <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/50 block mb-2">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 mb-10 text-[14px]"
        />

        <button
          type="submit"
          disabled={busy}
          className="w-full py-4 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.25em] disabled:opacity-50"
        >
          {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors"
        >
          {mode === "signin" ? "Create concierge account" : "I already have an account"}
        </button>
      </form>
    </main>
  );
}

function NotAdmin({ email }: { email: string }) {
  return (
    <main className="min-h-screen bg-background text-foreground grain flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
        — Restricted
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mb-6 italic">Access pending.</h1>
      <p className="text-foreground/55 max-w-md mb-10 text-[14px]">
        Your account <span className="text-accent">{email}</span> is not yet a Voltra
        concierge. Ask an administrator to grant the <code className="font-mono text-accent">admin</code> role
        from the backend dashboard.
      </p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 hover:text-accent"
      >
        Sign out
      </button>
    </main>
  );
}
