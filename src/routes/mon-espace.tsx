import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/mon-espace")({
  head: () => ({ meta: [{ title: "Mon Espace — Voltra" }] }),
  component: ClientSpace,
});

type Brief = {
  id: string;
  occasion: string;
  event_date: string | null;
  location: string | null;
  budget: string | null;
  style: string | null;
  vision: string | null;
  status: string;
  created_at: string;
  photographer_id: string | null;
  total_amount: number | null;
  deposit_paid: boolean;
  final_paid: boolean;
  photos_delivered_at: string | null;
  confirmation_deadline: string | null;
};

type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  file_url?: string | null;
  file_name?: string | null;
};

const STATUS_INFO: Record<string, { label: string; desc: string; color: string; step: number }> = {
  pending:   { label: "Brief reçu", desc: "Votre brief est entre nos mains. Nous l'analysons.", color: "text-amber-600", step: 1 },
  in_review: { label: "En sélection", desc: "Nos directeurs artistiques identifient votre photographe idéal.", color: "text-blue-600", step: 2 },
  matched:   { label: "Photographe sélectionné", desc: "Nous avons trouvé votre photographe. Découvrez la proposition.", color: "text-sage", step: 3 },
  confirmed: { label: "Mission confirmée", desc: "Votre photographe est réservé. L'aventure commence.", color: "text-green-600", step: 4 },
  completed: { label: "Photos livrées", desc: "Vos photos sont prêtes. Confirmez votre satisfaction.", color: "text-accent", step: 5 },
  validated: { label: "Mission validée ✓", desc: "Merci pour votre confiance. À bientôt.", color: "text-accent", step: 6 },
  disputed:  { label: "Litige en cours", desc: "Notre équipe examine votre situation.", color: "text-red-500", step: 0 },
  cancelled: { label: "Annulé", desc: "Cette mission a été annulée.", color: "text-foreground/30", step: 0 },
};

function ClientSpace() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "messages" | "payment">("status");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadBrief();
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadBrief() {
    const { data } = await supabase
      .from("briefs")
      .select("*")
      .eq("client_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) {
      setBrief(data as Brief);
      loadMessages(data.id);
    }
  }

  async function loadMessages(briefId: string) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("brief_id", briefId)
      .order("created_at", { ascending: true });
    setMessages((data ?? []) as Message[]);

    // Realtime
    supabase
      .channel("messages:" + briefId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `brief_id=eq.${briefId}` },
        (payload) => setMessages(prev => [...prev, payload.new as Message])
      )
      .subscribe();
  }

  async function sendMessage() {
    if (!newMessage.trim() || !brief) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      brief_id: brief.id,
      sender_id: session.user.id,
      content: newMessage.trim(),
    });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    setNewMessage("");
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !brief) return;
    const ext = file.name.split(".").pop();
    const path = `${brief.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("mission-files").upload(path, file);
    if (upErr) { toast.error("Erreur upload"); return; }
    const { data: { publicUrl } } = supabase.storage.from("mission-files").getPublicUrl(path);
    await supabase.from("messages").insert({
      brief_id: brief.id,
      sender_id: session.user.id,
      content: `📎 ${file.name}`,
      file_url: publicUrl,
      file_name: file.name,
    });
    toast.success("Fichier envoyé");
  }

  async function confirmSatisfaction() {
    if (!brief) return;
    const { error } = await supabase.from("briefs").update({
      status: "validated",
      confirmed_at: new Date().toISOString(),
    }).eq("id", brief.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Mission validée — merci !");
    loadBrief();
  }

  if (loading) return <Loader />;
  if (!session) return <AuthGateClient />;

  return (
    <main className="min-h-screen bg-background text-foreground grain">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 rounded-full border border-foreground/30" />
            <div className="absolute inset-[3px] rounded-full border border-foreground/20" />
            <div className="absolute inset-[6px] rounded-full bg-foreground" />
          </div>
          <span className="font-serif text-lg tracking-tight">VOLTRA</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-foreground/40 hidden md:block">
            {session.user.email}
          </span>
          <button
            onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/" }))}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {!brief ? (
          <NoBrief onSubmit={() => navigate({ to: "/inquiry" })} />
        ) : (
          <>
            {/* Titre */}
            <div className="mb-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3 block">
                — Mon espace Voltra
              </span>
              <h1 className="font-serif text-4xl md:text-5xl italic mb-2">
                {brief.occasion}
              </h1>
              {brief.event_date && (
                <p className="font-mono text-[11px] text-foreground/40 uppercase tracking-[0.25em]">
                  {new Date(brief.event_date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                  {brief.location ? ` · ${brief.location}` : ""}
                </p>
              )}
            </div>

            {/* Barre de progression */}
            <StatusBar status={brief.status} />

            {/* Tabs */}
            <div className="flex gap-0 border-b border-border mt-10 mb-8">
              {(["status", "messages", "payment"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] border-b-2 transition-all duration-300 ${
                    activeTab === tab
                      ? "border-accent text-accent"
                      : "border-transparent text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {tab === "status" ? "Statut" : tab === "messages" ? "Messages" : "Paiement"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "status" && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  <StatusTab brief={brief} onConfirm={confirmSatisfaction} />
                </motion.div>
              )}
              {activeTab === "messages" && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  <MessagesTab
                    messages={messages}
                    userId={session.user.id}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSend={sendMessage}
                    sending={sending}
                    onFileClick={() => fileInputRef.current?.click()}
                    messagesEndRef={messagesEndRef}
                    briefStatus={brief.status}
                  />
                  <input ref={fileInputRef} type="file" className="hidden" onChange={uploadFile} />
                </motion.div>
              )}
              {activeTab === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  <PaymentTab brief={brief} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </main>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar({ status }: { status: string }) {
  const info = STATUS_INFO[status];
  const steps = ["Brief reçu", "En sélection", "Photographe trouvé", "Confirmé", "Photos livrées", "Validé"];
  const currentStep = info?.step ?? 0;

  return (
    <div className="border border-border p-8">
      <div className="flex items-center gap-4 mb-6">
        <span className={`font-mono text-[11px] uppercase tracking-[0.3em] ${info?.color ?? "text-foreground/50"}`}>
          {info?.label ?? status}
        </span>
      </div>
      <p className="text-foreground/55 text-[14px] mb-8">{info?.desc}</p>
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500 ${
              i + 1 <= currentStep ? "bg-accent" : "bg-border"
            }`} />
            {i < steps.length - 1 && (
              <div className={`h-[1px] flex-1 transition-all duration-500 ${
                i + 1 < currentStep ? "bg-accent" : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((s, i) => (
          <span key={s} className={`font-mono text-[8px] uppercase tracking-[0.15em] ${
            i + 1 <= currentStep ? "text-accent" : "text-foreground/25"
          } ${i === 0 ? "text-left" : i === steps.length - 1 ? "text-right" : "text-center"}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Status Tab ───────────────────────────────────────────────────────────────

function StatusTab({ brief, onConfirm }: { brief: Brief; onConfirm: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Occasion", v: brief.occasion },
          { label: "Budget", v: brief.budget ?? "—" },
          { label: "Style", v: brief.style ?? "—" },
        ].map(({ label, v }) => (
          <div key={label} className="border border-border p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-2">{label}</p>
            <p className="font-serif italic text-lg">{v}</p>
          </div>
        ))}
      </div>

      {brief.vision && (
        <div className="border-l-2 border-accent/30 pl-6 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-3">Votre vision</p>
          <p className="font-serif italic text-[15px] text-foreground/70 leading-relaxed">"{brief.vision}"</p>
        </div>
      )}

      {/* Action confirmation */}
      {brief.status === "completed" && (
        <div className="border border-accent/20 bg-accent/5 p-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
            — Vos photos sont prêtes
          </p>
          <p className="font-serif text-xl italic mb-2">Tout s'est bien passé ?</p>
          <p className="text-foreground/50 text-[14px] mb-8 max-w-sm mx-auto">
            Confirmez votre satisfaction pour finaliser la mission et libérer le paiement au photographe.
          </p>
          {brief.confirmation_deadline && (
            <p className="font-mono text-[9px] text-foreground/35 mb-6">
              Délai de confirmation : {new Date(brief.confirmation_deadline).toLocaleDateString("fr-FR")}
            </p>
          )}
          <button
            onClick={onConfirm}
            className="px-10 py-4 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-foreground transition-colors"
          >
            Confirmer ma satisfaction
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────

function MessagesTab({
  messages, userId, newMessage, setNewMessage, onSend, sending, onFileClick, messagesEndRef, briefStatus
}: any) {
  const canMessage = !["pending", "in_review", "cancelled"].includes(briefStatus);

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {!canMessage ? (
          <div className="flex items-center justify-center h-full">
            <p className="font-serif italic text-foreground/30 text-center">
              La messagerie sera disponible une fois votre photographe assigné.
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="font-serif italic text-foreground/30">Aucun message pour l'instant.</p>
          </div>
        ) : (
          messages.map((m: Message) => (
            <div key={m.id} className={`flex ${m.sender_id === userId ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-5 py-3 ${
                m.sender_id === userId
                  ? "bg-foreground text-background"
                  : "bg-surface border border-border"
              }`}>
                {m.file_url ? (
                  <a href={m.file_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] underline">
                    📎 {m.file_name ?? "Fichier"}
                  </a>
                ) : (
                  <p className="text-[14px] leading-relaxed">{m.content}</p>
                )}
                <p className={`font-mono text-[8px] mt-1 ${m.sender_id === userId ? "text-background/40" : "text-foreground/30"}`}>
                  {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {canMessage && (
        <div className="border-t border-border pt-4 flex gap-3">
          <button
            onClick={onFileClick}
            className="px-3 py-3 border border-border text-foreground/40 hover:border-accent hover:text-accent transition-colors"
          >
            📎
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            placeholder="Votre message…"
            className="flex-1 bg-transparent border border-border focus:border-accent outline-none px-4 py-3 text-[14px] placeholder:text-foreground/25 transition-colors"
          />
          <button
            onClick={onSend}
            disabled={sending || !newMessage.trim()}
            className="px-6 py-3 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.2em] disabled:opacity-40 hover:bg-foreground transition-colors"
          >
            {sending ? "…" : "Envoyer"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Payment Tab ──────────────────────────────────────────────────────────────

function PaymentTab({ brief }: { brief: Brief }) {
  const deposit = brief.total_amount ? brief.total_amount * 0.5 : null;
  const final = brief.total_amount ? brief.total_amount * 0.5 : null;

  return (
    <div className="space-y-6">
      {!brief.total_amount ? (
        <div className="border border-border p-10 text-center">
          <p className="font-serif italic text-foreground/40 text-lg">
            Le montant sera disponible une fois votre photographe sélectionné.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Acompte */}
            <div className={`border p-8 ${brief.deposit_paid ? "border-green-200 bg-green-50/30" : "border-border"}`}>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-3">
                Acompte — Réservation
              </p>
              <p className="font-serif text-3xl mb-2">{deposit?.toLocaleString("fr-FR")} €</p>
              <p className="text-foreground/45 text-[13px] mb-6">50% du montant total — dû à la confirmation</p>
              {brief.deposit_paid ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-green-600">✓ Payé</span>
              ) : (
                <button className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors">
                  Payer l'acompte
                </button>
              )}
            </div>

            {/* Solde */}
            <div className={`border p-8 ${brief.final_paid ? "border-green-200 bg-green-50/30" : "border-border opacity-60"}`}>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-3">
                Solde — Après livraison
              </p>
              <p className="font-serif text-3xl mb-2">{final?.toLocaleString("fr-FR")} €</p>
              <p className="text-foreground/45 text-[13px] mb-6">50% restant — dû après confirmation des photos</p>
              {brief.final_paid ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-green-600">✓ Payé</span>
              ) : brief.deposit_paid ? (
                <button className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors">
                  Payer le solde
                </button>
              ) : (
                <p className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.2em]">
                  Disponible après l'acompte
                </p>
              )}
            </div>
          </div>

          <div className="border border-border p-6 flex justify-between items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">Total mission</span>
            <span className="font-serif text-2xl">{brief.total_amount.toLocaleString("fr-FR")} €</span>
          </div>

          <p className="font-mono text-[9px] text-foreground/30 text-center uppercase tracking-[0.2em]">
            Paiement sécurisé · Stripe · Commission Voltra incluse
          </p>
        </>
      )}
    </div>
  );
}

// ─── Auth Gate Client ─────────────────────────────────────────────────────────

function AuthGateClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  async function handleAuth() {
    if (!email || !password) { toast.error("Email et mot de passe requis"); return; }
    setBusy(true);
    const fn = mode === "login"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    setBusy(false);
    if (error) toast.error(error.message);
    else if (mode === "register") toast.success("Compte créé ! Vérifiez votre email.");
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

        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent mb-3 block">
          — Mon espace
        </span>
        <h1 className="font-serif text-3xl italic mb-10 text-foreground/80">
          {mode === "login" ? "Bon retour." : "Créer mon compte."}
        </h1>

        <div className="space-y-6">
          <div>
            <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors" />
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors" />
          </div>
          <button type="button" onClick={handleAuth} disabled={busy}
            className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors disabled:opacity-40">
            {busy ? "…" : mode === "login" ? "Accéder à mon espace" : "Créer mon compte"}
          </button>
          <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="w-full font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/35 hover:text-accent transition-colors">
            {mode === "login" ? "Pas encore de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </main>
  );
}

// ─── No Brief ─────────────────────────────────────────────────────────────────

function NoBrief({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">— Aucun brief</span>
      <h2 className="font-serif text-4xl italic mb-4">Vous n'avez pas encore de mission.</h2>
      <p className="text-foreground/45 max-w-sm mb-10 text-[15px]">Soumettez votre premier brief et nous trouverons votre photographe idéal.</p>
      <button onClick={onSubmit}
        className="px-10 py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors">
        Soumettre un brief
      </button>
    </div>
  );
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30 animate-pulse">Chargement…</span>
    </div>
  );
}
