import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/mon-espace")({
  head: () => ({ meta: [{ title: "Mon Espace — Voltra" }] }),
  component: MonEspace,
});

function MonEspace() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"choice" | "login">("choice");
  const [role, setRole] = useState<"client" | "photographer" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    detectAndRedirect();
  }, [session]);

  async function detectAndRedirect() {
    // Verifier si photographe
    const { data: photo } = await supabase
      .from("photographers")
      .select("id")
      .eq("profile_id", session.user.id)
      .maybeSingle();

    if (photo) {
      navigate({ to: "/espace-photographe" });
      return;
    }

    // Sinon c'est un client
    navigate({ to: "/espace-client" });
  }

  async function handleLogin() {
    if (!email || !password) { toast.error("Email et mot de passe requis"); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error("Identifiants incorrects");
  }

  if (loading) return <Loader />;

  // Si connecte, on redirige automatiquement
  if (session) return <Loader />;

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-foreground grain flex flex-col">
      {/* Header */}
      <header className="px-6 md:px-10 py-5 flex items-center justify-between border-b border-border">
        <Link to="/" className="font-serif text-xl tracking-tight text-foreground hover:text-accent transition-colors">
          VOLTRA
        </Link>
        <Link to="/" className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/35 hover:text-accent transition-colors">
          ← Retour
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          {mode === "choice" && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg text-center"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">
                Mon espace
              </span>
              <h1 className="font-serif text-4xl italic mb-3">
                Bon retour.
              </h1>
              <p className="text-foreground/45 text-[14px] mb-14">
                Selectionnez votre espace pour continuer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Espace Client */}
                <button
                  onClick={() => { setRole("client"); setMode("login"); }}
                  className="group border border-border p-8 text-left hover:border-accent hover:bg-accent/5 transition-all duration-500"
                >
                  <div className="text-3xl mb-5">📋</div>
                  <p className="font-serif text-xl italic mb-2 group-hover:text-accent transition-colors duration-300">
                    Espace client
                  </p>
                  <p className="text-foreground/45 text-[13px] leading-relaxed">
                    Suivez votre mission, echangez avec votre photographe, gerez vos paiements.
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Connexion →
                  </p>
                </button>

                {/* Espace Photographe */}
                <button
                  onClick={() => { setRole("photographer"); setMode("login"); }}
                  className="group border border-border p-8 text-left hover:border-sage hover:bg-sage-soft transition-all duration-500"
                >
                  <div className="text-3xl mb-5">📸</div>
                  <p className="font-serif text-xl italic mb-2 group-hover:text-[#5C7A5E] transition-colors duration-300">
                    Espace photographe
                  </p>
                  <p className="text-foreground/45 text-[13px] leading-relaxed">
                    Consultez vos missions, communiquez avec vos clients, suivez vos revenus.
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5C7A5E] mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Connexion →
                  </p>
                </button>
              </div>

              <p className="mt-10 text-foreground/30 text-[12px]">
                Pas encore de mission ?{" "}
                <Link to="/inquiry" className="text-accent hover:underline">
                  Soumettre un brief
                </Link>
              </p>
            </motion.div>
          )}

          {mode === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm"
            >
              <button
                onClick={() => setMode("choice")}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30 hover:text-accent transition-colors mb-10 flex items-center gap-2"
              >
                ← Retour
              </button>

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3 block">
                {role === "client" ? "Espace client" : "Espace photographe"}
              </span>
              <h2 className="font-serif text-3xl italic mb-10 text-foreground/80">
                Connexion.
              </h2>

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
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors"
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
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={busy}
                  className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors disabled:opacity-40 mt-4"
                >
                  {busy ? "Connexion..." : "Acceder a mon espace"}
                </button>
              </div>

              {role === "photographer" && (
                <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/25 text-center">
                  Acces sur invitation uniquement
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30 animate-pulse">
        Chargement...
      </span>
    </div>
  );
}
