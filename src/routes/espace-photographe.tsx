import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/espace-photographe")({
  head: () => ({ meta: [{ title: "Espace Photographe — Voltra" }] }),
  component: PhotographerSpace,
});

type Mission = {
  id: string;
  occasion: string;
  event_date: string | null;
  location: string | null;
  budget: string | null;
  style: string | null;
  vision: string | null;
  guests: string | null;
  status: string;
  created_at: string;
  total_amount: number | null;
  photographer_payout: number | null;
  deposit_paid: boolean;
  final_paid: boolean;
  photos_delivered_at: string | null;
  client_id: string | null;
  full_name: string | null;
};

type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  file_url?: string | null;
  file_name?: string | null;
};

type Photographer = {
  id: string;
  bio: string | null;
  style: string | null;
  portfolio_url: string | null;
  instagram_url: string | null;
  status: string;
  commission_rate: number;
  cancellations: number;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: "En attente",          color: "text-amber-600" },
  in_review: { label: "En sélection",        color: "text-blue-600" },
  matched:   { label: "Vous êtes sélectionné", color: "text-sage" },
  confirmed: { label: "Confirmé ✓",          color: "text-green-600" },
  completed: { label: "Terminé",             color: "text-foreground/50" },
  validated: { label: "Validé — Payé",       color: "text-accent" },
  disputed:  { label: "Litige",              color: "text-red-500" },
  cancelled: { label: "Annulé",              color: "text-foreground/30" },
};

function PhotographerSpace() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selected, setSelected] = useState<Mission | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"missions" | "messages" | "revenus" | "profil">("missions");
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
    if (session) loadPhotographer();
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadPhotographer() {
    const { data } = await supabase
      .from("photographers")
      .select("*")
      .eq("profile_id", session.user.id)
      .maybeSingle();
    if (data) {
      setPhotographer(data as Photographer);
      loadMissions(data.id);
    }
  }

  async function loadMissions(photographerId: string) {
    const { data } = await supabase
      .from("briefs")
      .select("*")
      .eq("photographer_id", photographerId)
      .order("created_at", { ascending: false });
    setMissions((data ?? []) as Mission[]);
  }

  async function loadMessages(briefId: string) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("brief_id", briefId)
      .order("created_at", { ascending: true });
    setMessages((data ?? []) as Message[]);

    supabase
      .channel("photo_messages:" + briefId)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages",
        filter: `brief_id=eq.${briefId}`
      }, (payload) => setMessages(prev => [...prev, payload.new as Message]))
      .subscribe();
  }

  async function selectMission(m: Mission) {
    setSelected(m);
    setActiveTab("messages");
    loadMessages(m.id);
  }

  async function sendMessage() {
    if (!newMessage.trim() || !selected) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      brief_id: selected.id,
      sender_id: session.user.id,
      content: newMessage.trim(),
    });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    setNewMessage("");
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !selected) return;
    const ext = file.name.split(".").pop();
    const path = `${selected.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("mission-files").upload(path, file);
    if (upErr) { toast.error("Erreur upload"); return; }
    const { data: { publicUrl } } = supabase.storage.from("mission-files").getPublicUrl(path);
    await supabase.from("messages").insert({
      brief_id: selected.id,
      sender_id: session.user.id,
      content: `📎 ${file.name}`,
      file_url: publicUrl,
      file_name: file.name,
    });
    toast.success("Fichier envoyé");
  }

  async function markPhotosDelivered() {
    if (!selected) return;
    const { error } = await supabase.from("briefs").update({
      status: "completed",
      photos_delivered_at: new Date().toISOString(),
    }).eq("id", selected.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Photos marquées comme livrées !");
    loadMissions(photographer!.id);
    setSelected(prev => prev ? { ...prev, status: "completed" } : null);
  }

  async function updateProfile(updates: Partial<Photographer>) {
    if (!photographer) return;
    const { error } = await supabase.from("photographers").update(updates).eq("id", photographer.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Profil mis à jour");
    setPhotographer(prev => prev ? { ...prev, ...updates } : null);
  }

  const totalGagne = missions
    .filter(m => m.status === "validated" && m.photographer_payout)
    .reduce((sum, m) => sum + (m.photographer_payout ?? 0), 0);

  const enAttente = missions
    .filter(m => m.status === "confirmed" && m.photographer_payout)
    .reduce((sum, m) => sum + (m.photographer_payout ?? 0), 0);

  if (loading) return <Loader />;
  if (!session) return <AuthGatePhotographer />;
  if (!photographer) return <NotRegistered email={session.user.email} />;

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
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 border ${
            photographer.status === "active"
              ? "border-green-200 bg-green-50/50"
              : "border-red-200 bg-red-50/50"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${photographer.status === "active" ? "bg-green-500" : "bg-red-400"}`} />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50">
              {photographer.status === "active" ? "Disponible" : "Indisponible"}
            </span>
          </div>
          <button
            onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/" }))}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        {/* Titre */}
        <div className="mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3 block">
            — Espace photographe
          </span>
          <h1 className="font-serif text-4xl italic">Bienvenue.</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Missions totales", value: missions.length },
            { label: "En cours", value: missions.filter(m => ["matched","confirmed","completed"].includes(m.status)).length, accent: true },
            { label: "Revenus encaissés", value: `${totalGagne.toLocaleString("fr-FR")} €` },
            { label: "En attente paiement", value: `${enAttente.toLocaleString("fr-FR")} €` },
          ].map((s) => (
            <div key={s.label} className="border border-border p-6">
              <p className={`font-serif text-3xl mb-1 ${s.accent ? "text-accent" : ""}`}>{s.value}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/35">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-8">
          {(["missions", "messages", "revenus", "profil"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] border-b-2 transition-all duration-300 ${
                activeTab === tab ? "border-accent text-accent" : "border-transparent text-foreground/40 hover:text-foreground/70"
              }`}>
              {tab === "missions" ? "Missions" : tab === "messages" ? "Messages" : tab === "revenus" ? "Revenus" : "Mon profil"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "missions" && (
            <motion.div key="missions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <MissionsTab missions={missions} onSelect={selectMission} onDelivered={markPhotosDelivered} selected={selected} />
            </motion.div>
          )}
          {activeTab === "messages" && (
            <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <MessagesTab
                missions={missions} selected={selected} onSelect={selectMission}
                messages={messages} userId={session.user.id}
                newMessage={newMessage} setNewMessage={setNewMessage}
                onSend={sendMessage} sending={sending}
                onFileClick={() => fileInputRef.current?.click()}
                messagesEndRef={messagesEndRef}
              />
              <input ref={fileInputRef} type="file" className="hidden" onChange={uploadFile} />
            </motion.div>
          )}
          {activeTab === "revenus" && (
            <motion.div key="revenus" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <RevenusTab missions={missions} commissionRate={photographer.commission_rate} />
            </motion.div>
          )}
          {activeTab === "profil" && (
            <motion.div key="profil" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ProfilTab photographer={photographer} onUpdate={updateProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// ─── Missions Tab ─────────────────────────────────────────────────────────────

function MissionsTab({ missions, onSelect, onDelivered, selected }: any) {
  if (missions.length === 0) return (
    <div className="border border-dashed border-border p-16 text-center">
      <p className="font-serif italic text-foreground/30 text-lg">Aucune mission pour l'instant.</p>
      <p className="text-foreground/30 text-[13px] mt-2">Voltra vous contactera dès qu'un client correspond à votre profil.</p>
    </div>
  );

  return (
    <div className="space-y-px divide-y divide-border">
      {missions.map((m: Mission) => {
        const info = STATUS_LABELS[m.status] ?? { label: m.status, color: "text-foreground/40" };
        return (
          <div key={m.id} className={`p-6 hover:bg-foreground/[0.02] transition-all cursor-pointer ${selected?.id === m.id ? "border-l-2 border-l-accent" : ""}`}
            onClick={() => onSelect(m)}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-serif text-xl italic mb-1">{m.occasion}</p>
                <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-[0.2em]">
                  {m.event_date ? new Date(m.event_date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : "Date non définie"}
                  {m.location ? ` · ${m.location}` : ""}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${info.color}`}>{info.label}</p>
                {m.photographer_payout && (
                  <p className="font-serif text-lg mt-1">{m.photographer_payout.toLocaleString("fr-FR")} €</p>
                )}
              </div>
            </div>
            {m.vision && (
              <p className="text-foreground/45 text-[13px] italic line-clamp-2">"{m.vision}"</p>
            )}
            {m.status === "confirmed" && (
              <button onClick={(e) => { e.stopPropagation(); onDelivered(); }}
                className="mt-4 px-5 py-2 border border-accent text-accent font-mono text-[9px] uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all">
                Marquer photos livrées
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────

function MessagesTab({ missions, selected, onSelect, messages, userId, newMessage, setNewMessage, onSend, sending, onFileClick, messagesEndRef }: any) {
  return (
    <div className="grid md:grid-cols-12 gap-6">
      {/* Liste missions */}
      <div className="md:col-span-4 space-y-px border-r border-border pr-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-4">Sélectionner une mission</p>
        {missions.filter((m: Mission) => ["matched","confirmed","completed","validated"].includes(m.status)).map((m: Mission) => (
          <button key={m.id} onClick={() => onSelect(m)}
            className={`w-full text-left p-4 border-b border-border hover:bg-foreground/[0.02] transition-all ${selected?.id === m.id ? "border-l-2 border-l-accent" : ""}`}>
            <p className="font-serif italic text-[15px]">{m.occasion}</p>
            <p className="font-mono text-[9px] text-foreground/35 mt-1">{m.full_name ?? "Client"}</p>
          </button>
        ))}
        {missions.filter((m: Mission) => ["matched","confirmed","completed","validated"].includes(m.status)).length === 0 && (
          <p className="font-serif italic text-foreground/25 text-[14px] py-8 text-center">Aucune mission active</p>
        )}
      </div>

      {/* Chat */}
      <div className="md:col-span-8 flex flex-col h-[500px]">
        {!selected ? (
          <div className="flex items-center justify-center h-full border border-dashed border-border">
            <p className="font-serif italic text-foreground/25">Sélectionnez une mission</p>
          </div>
        ) : (
          <>
            <div className="border-b border-border pb-4 mb-4">
              <p className="font-serif italic text-lg">{selected.occasion}</p>
              <p className="font-mono text-[9px] text-foreground/35 uppercase tracking-[0.2em]">{selected.full_name ?? "Client"}</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="font-serif italic text-foreground/25">Aucun message. Commencez la conversation.</p>
                </div>
              ) : messages.map((m: Message) => (
                <div key={m.id} className={`flex ${m.sender_id === userId ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-5 py-3 ${m.sender_id === userId ? "bg-foreground text-background" : "bg-surface border border-border"}`}>
                    {m.file_url ? (
                      <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] underline">
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
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-border pt-4 flex gap-3">
              <button onClick={onFileClick} className="px-3 py-3 border border-border text-foreground/40 hover:border-accent hover:text-accent transition-colors">📎</button>
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
                placeholder="Votre message…"
                className="flex-1 bg-transparent border border-border focus:border-accent outline-none px-4 py-3 text-[14px] placeholder:text-foreground/25 transition-colors" />
              <button onClick={onSend} disabled={sending || !newMessage.trim()}
                className="px-6 py-3 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.2em] disabled:opacity-40 hover:bg-foreground transition-colors">
                {sending ? "…" : "Envoyer"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Revenus Tab ──────────────────────────────────────────────────────────────

function RevenusTab({ missions, commissionRate }: { missions: Mission[]; commissionRate: number }) {
  const paidMissions = missions.filter(m => m.status === "validated" && m.photographer_payout);
  const pendingMissions = missions.filter(m => ["confirmed","completed"].includes(m.status) && m.photographer_payout);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-border p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-2">Commission Voltra</p>
          <p className="font-serif text-3xl text-accent">{commissionRate}%</p>
        </div>
        <div className="border border-green-200 bg-green-50/20 p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-2">Total encaissé</p>
          <p className="font-serif text-3xl">
            {paidMissions.reduce((s, m) => s + (m.photographer_payout ?? 0), 0).toLocaleString("fr-FR")} €
          </p>
        </div>
        <div className="border border-amber-200 bg-amber-50/20 p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-2">En attente</p>
          <p className="font-serif text-3xl">
            {pendingMissions.reduce((s, m) => s + (m.photographer_payout ?? 0), 0).toLocaleString("fr-FR")} €
          </p>
        </div>
      </div>

      {/* Historique */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">Historique des missions</p>
        {missions.length === 0 ? (
          <p className="font-serif italic text-foreground/25 py-8 text-center">Aucune mission pour l'instant.</p>
        ) : (
          <div className="divide-y divide-border">
            {missions.map((m) => (
              <div key={m.id} className="py-5 flex items-center justify-between">
                <div>
                  <p className="font-serif italic text-[15px]">{m.occasion}</p>
                  <p className="font-mono text-[9px] text-foreground/35 uppercase tracking-[0.2em] mt-1">
                    {m.event_date ? new Date(m.event_date).toLocaleDateString("fr-FR") : "—"}
                    {m.location ? ` · ${m.location}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-lg">{m.photographer_payout ? `${m.photographer_payout.toLocaleString("fr-FR")} €` : "—"}</p>
                  <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mt-1 ${STATUS_LABELS[m.status]?.color ?? "text-foreground/40"}`}>
                    {STATUS_LABELS[m.status]?.label ?? m.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Profil Tab ───────────────────────────────────────────────────────────────

function ProfilTab({ photographer, onUpdate }: { photographer: Photographer; onUpdate: (u: Partial<Photographer>) => void }) {
  const [bio, setBio] = useState(photographer.bio ?? "");
  const [style, setStyle] = useState(photographer.style ?? "");
  const [portfolio, setPortfolio] = useState(photographer.portfolio_url ?? "");
  const [instagram, setInstagram] = useState(photographer.instagram_url ?? "");
  const [status, setStatus] = useState(photographer.status);

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">Disponibilité</label>
        <div className="flex gap-3">
          {["active", "inactive"].map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-5 py-2.5 border font-mono text-[9px] uppercase tracking-[0.2em] transition-all ${status === s ? "bg-foreground text-background border-foreground" : "border-border text-foreground/40 hover:border-foreground/30"}`}>
              {s === "active" ? "Disponible" : "Indisponible"}
            </button>
          ))}
        </div>
      </div>

      {[
        { label: "Biographie", value: bio, set: setBio, textarea: true },
        { label: "Style photographique", value: style, set: setStyle },
        { label: "URL Portfolio", value: portfolio, set: setPortfolio },
        { label: "Instagram", value: instagram, set: setInstagram },
      ].map(({ label, value, set, textarea }) => (
        <div key={label}>
          <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">{label}</label>
          {textarea ? (
            <textarea value={value} onChange={(e) => set(e.target.value)} rows={4}
              className="w-full bg-transparent border border-border focus:border-accent outline-none p-3 text-[14px] transition-colors resize-none" />
          ) : (
            <input type="text" value={value} onChange={(e) => set(e.target.value)}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors" />
          )}
        </div>
      ))}

      <button onClick={() => onUpdate({ bio, style, portfolio_url: portfolio, instagram_url: instagram, status })}
        className="px-10 py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors">
        Sauvegarder le profil
      </button>
    </div>
  );
}

// ─── Auth Gate ────────────────────────────────────────────────────────────────

function AuthGatePhotographer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    if (!email || !password) { toast.error("Email et mot de passe requis"); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
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
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-sage mb-3 block">— Espace photographe</span>
        <h1 className="font-serif text-3xl italic mb-10 text-foreground/80">Votre tableau de bord.</h1>
        <div className="space-y-6">
          <div>
            <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors" />
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 block mb-2">Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-[14px] transition-colors" />
          </div>
          <button type="button" onClick={handleLogin} disabled={busy}
            className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-sage transition-colors disabled:opacity-40">
            {busy ? "…" : "Accéder à mon espace"}
          </button>
        </div>
        <p className="mt-8 font-mono text-[9px] text-foreground/30 text-center uppercase tracking-[0.2em]">
          Accès sur invitation uniquement
        </p>
      </div>
    </main>
  );
}

// ─── Not Registered ───────────────────────────────────────────────────────────

function NotRegistered({ email }: { email: string }) {
  return (
    <main className="min-h-screen bg-background text-foreground grain flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sage mb-6">— Accès en attente</span>
      <h1 className="font-serif text-4xl italic mb-4">Profil non trouvé.</h1>
      <p className="text-foreground/45 max-w-sm mb-10 text-[14px]">
        Le compte <span className="text-accent">{email}</span> n'est pas encore rattaché à un profil photographe Voltra.
        Contactez notre équipe.
      </p>
      <a href="mailto:artistes@voltra.studio"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage hover:text-accent transition-colors">
        artistes@voltra.studio
      </a>
    </main>
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
