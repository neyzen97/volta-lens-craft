import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/espace-client")({
  head: () => ({ meta: [{ title: "Mon Espace Client — Voltra" }] }),
  component: ClientSpace,
});

// Re-export the existing client space logic
// This is the same as the previous mon-espace.tsx client logic
type Brief = {
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
  photographer_id: string | null;
  total_amount: number | null;
  payment_status: string | null;
  paid_at: string | null;
  deposit_paid: boolean;
  final_paid: boolean;
  photos_delivered_at: string | null;
  confirmation_deadline: string | null;
  dispute_reason: string | null;
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
  pending:   { label: "Brief recu", desc: "Votre brief est entre nos mains. Nos experts l'analysent.", color: "text-amber-600", step: 1 },
  in_review: { label: "En selection", desc: "Nos experts identifient votre photographe ideal.", color: "text-blue-600", step: 2 },
  matched:   { label: "Photographe selectionne", desc: "Nous avons trouve votre photographe. Decouvrez la proposition.", color: "text-[#5C7A5E]", step: 3 },
  confirmed: { label: "Mission confirmee", desc: "Votre photographe est reserve.", color: "text-green-600", step: 4 },
  completed: { label: "Photos livrees", desc: "Vos photos sont pretes. Confirmez votre satisfaction.", color: "text-accent", step: 5 },
  validated: { label: "Mission validee", desc: "Merci pour votre confiance.", color: "text-accent", step: 6 },
  disputed:  { label: "Litige en cours", desc: "Nos experts examinent votre situation.", color: "text-red-500", step: 0 },
  cancelled: { label: "Annule", desc: "Cette mission a ete annulee.", color: "text-foreground/30", step: 0 },
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
    else if (!loading) navigate({ to: "/mon-espace" });
  }, [session, loading]);

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

    supabase
      .channel("messages:" + briefId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `brief_id=eq.${briefId}` },
        (payload) => setMessages(prev => [...prev, payload.new as Message]))
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
      content: `Fichier: ${file.name}`,
      file_url: publicUrl,
      file_name: file.name,
    });
    toast.success("Fichier envoye");
  }

  async function confirmSatisfaction() {
    if (!brief) return;
    const { error } = await supabase.from("briefs").update({
      status: "validated",
      confirmed_at: new Date().toISOString(),
    }).eq("id", brief.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Mission validee !");
    loadBrief();
  }

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-foreground grain">
      <header className="sticky top-0 z-40 border-b border-border bg-[#F5F0E8]/95 backdrop-blur-sm px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight text-foreground hover:text-accent transition-colors">VOLTRA</Link>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-foreground/40 hidden md:block">{session?.user?.email}</span>
          <button onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/" }))}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-accent transition-colors">
            Deconnexion
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {!brief ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">Aucun brief</span>
            <h2 className="font-serif text-4xl italic mb-4">Vous n'avez pas encore de mission.</h2>
            <p className="text-foreground/45 max-w-sm mb-10 text-[15px]">Soumettez votre premier brief et nos experts trouveront votre photographe ideal.</p>
            <Link to="/inquiry" className="px-10 py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors">
              Immortaliser ce moment
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3 block">Mon espace Voltra</span>
              <h1 className="font-serif text-4xl italic mb-2">{brief.occasion}</h1>
              {brief.event_date && (
                <p className="font-mono text-[11px] text-foreground/40 uppercase tracking-[0.25em]">
                  {new Date(brief.event_date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                  {brief.location ? ` · ${brief.location}` : ""}
                </p>
              )}
            </div>

            {/* Status bar */}
            <StatusBar status={brief.status} />

            {/* Tabs */}
            <div className="flex gap-0 border-b border-border mt-10 mb-8">
              {(["status", "messages", "payment"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] border-b-2 transition-all duration-300 ${activeTab === tab ? "border-accent text-accent" : "border-transparent text-foreground/40 hover:text-foreground/70"}`}>
                  {tab === "status" ? "Statut" : tab === "messages" ? "Messages" : "Paiement"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "status" && (
                <motion.div key="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
                    {brief.status === "completed" && (
                      <div className="border border-accent/20 bg-accent/5 p-8 text-center">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">Vos photos sont pretes</p>
                        <p className="font-serif text-xl italic mb-2">Tout s'est bien passe ?</p>
                        <p className="text-foreground/50 text-[14px] mb-8 max-w-sm mx-auto">Confirmez votre satisfaction pour finaliser la mission.</p>
                        <button onClick={confirmSatisfaction}
                          className="px-10 py-4 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-foreground transition-colors">
                          Confirmer ma satisfaction
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "messages" && (
                <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <div className="flex flex-col h-[500px]">
                    <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                          <p className="font-serif italic text-foreground/30">Aucun message pour l'instant.</p>
                        </div>
                      ) : messages.map((m: Message) => (
                        <div key={m.id} className={`flex ${m.sender_id === session.user.id ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] px-5 py-3 ${m.sender_id === session.user.id ? "bg-foreground text-background" : "bg-white border border-border"}`}>
                            {m.file_url ? (
                              <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] underline">
                                Fichier: {m.file_name}
                              </a>
                            ) : (
                              <p className="text-[14px] leading-relaxed">{m.content}</p>
                            )}
                            <p className={`font-mono text-[8px] mt-1 ${m.sender_id === session.user.id ? "text-background/40" : "text-foreground/30"}`}>
                              {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="border-t border-border pt-4 flex gap-3">
                      <button onClick={() => fileInputRef.current?.click()} className="px-3 py-3 border border-border text-foreground/40 hover:border-accent hover:text-accent transition-colors">📎</button>
                      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Votre message..."
                        className="flex-1 bg-transparent border border-border focus:border-accent outline-none px-4 py-3 text-[14px] placeholder:text-foreground/25 transition-colors" />
                      <button onClick={sendMessage} disabled={sending || !newMessage.trim()}
                        className="px-6 py-3 bg-accent text-background font-mono text-[10px] uppercase tracking-[0.2em] disabled:opacity-40 hover:bg-foreground transition-colors">
                        {sending ? "..." : "Envoyer"}
                      </button>
                    </div>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={uploadFile} />
                  </div>
                </motion.div>
              )}

              {activeTab === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <PaymentTab brief={brief} userId={session.user.id} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </main>
  );
}

function StatusBar({ status }: { status: string }) {
  const info = STATUS_INFO[status];
  const steps = ["Brief recu", "En selection", "Photographe trouve", "Confirme", "Photos livrees", "Valide"];
  const currentStep = info?.step ?? 0;

  return (
    <div className="border border-border p-8 bg-white">
      <div className="flex items-center gap-4 mb-4">
        <span className={`font-mono text-[11px] uppercase tracking-[0.3em] ${info?.color ?? "text-foreground/50"}`}>
          {info?.label ?? status}
        </span>
      </div>
      <p className="text-foreground/55 text-[14px] mb-8">{info?.desc}</p>
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500 ${i + 1 <= currentStep ? "bg-accent" : "bg-border"}`} />
            {i < steps.length - 1 && (
              <div className={`h-[1px] flex-1 transition-all duration-500 ${i + 1 < currentStep ? "bg-accent" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentTab({ brief, userId }: { brief: Brief; userId: string }) {
  const [paying, setPaying] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [submittingDispute, setSubmittingDispute] = useState(false);

  const isPaid = brief.payment_status === "held" || brief.payment_status === "released";
  const isReleased = brief.payment_status === "released";
  const isDisputed = brief.payment_status === "disputed";

  async function handlePayment() {
    if (!brief.total_amount) return;
    setPaying(true);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: brief.total_amount, briefId: brief.id, type: "full", description: brief.occasion }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else toast.error("Erreur lors du paiement");
    } catch { toast.error("Erreur lors du paiement"); }
    setPaying(false);
  }

  async function submitDispute() {
    if (!disputeReason.trim()) { toast.error("Decrivez le probleme"); return; }
    setSubmittingDispute(true);
    const { error } = await supabase.from("disputes").insert({ brief_id: brief.id, client_id: userId, reason: disputeReason });
    if (!error) {
      await supabase.from("briefs").update({ status: "disputed", payment_status: "disputed", dispute_reason: disputeReason, dispute_at: new Date().toISOString() }).eq("id", brief.id);
      toast.success("Litige signale — nos experts vous contactent sous 24h");
      setShowDispute(false);
    } else { toast.error(error.message); }
    setSubmittingDispute(false);
  }

  if (!brief.total_amount) return (
    <div className="border border-border p-10 text-center bg-white">
      <p className="font-serif italic text-foreground/40 text-lg">Le montant sera disponible une fois votre photographe selectionne.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className={`border p-8 bg-white ${isPaid ? "border-green-200" : isDisputed ? "border-red-200" : "border-border"}`}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35 mb-3">Total mission</p>
            <p className="font-serif text-5xl">{brief.total_amount.toLocaleString("fr-FR")} €</p>
          </div>
          {isPaid && !isReleased && <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-600 border border-amber-200 bg-amber-50 px-3 py-1.5">En attente</span>}
          {isReleased && <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-600 border border-green-200 bg-green-50 px-3 py-1.5">Valide</span>}
          {isDisputed && <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-500 border border-red-200 bg-red-50 px-3 py-1.5">Litige</span>}
        </div>

        {!isPaid && !isDisputed && (
          <>
            <p className="text-foreground/50 text-[14px] mb-6 leading-relaxed">Votre paiement est securise chez Voltra jusqu'a votre confirmation. Le photographe ne sera paye qu'apres votre validation.</p>
            <button onClick={handlePayment} disabled={paying}
              className="w-full py-5 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors disabled:opacity-40">
              {paying ? "Redirection..." : `Payer ${brief.total_amount.toLocaleString("fr-FR")} en securite`}
            </button>
          </>
        )}
      </div>

      {isPaid && !isReleased && !isDisputed && brief.status === "completed" && (
        <div className="border border-border p-6 bg-white">
          {!showDispute ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Un probleme ?</p>
                <p className="text-[13px] text-foreground/50">Les photos ne correspondent pas a vos attentes ?</p>
              </div>
              <button onClick={() => setShowDispute(true)}
                className="px-5 py-2.5 border border-red-200 text-red-500 font-mono text-[9px] uppercase tracking-[0.2em] hover:bg-red-50 transition-colors flex-shrink-0">
                Signaler un probleme
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-500 mb-3">Decrire le probleme</p>
              <textarea value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="Expliquez precisement le probleme..." rows={4}
                className="w-full bg-transparent border border-border focus:border-red-300 outline-none p-3 text-[14px] resize-none transition-colors" />
              <div className="flex gap-3">
                <button onClick={submitDispute} disabled={submittingDispute}
                  className="flex-1 py-3 bg-red-500 text-white font-mono text-[9px] uppercase tracking-[0.2em] hover:bg-red-600 transition-colors disabled:opacity-40">
                  {submittingDispute ? "Envoi..." : "Soumettre le litige"}
                </button>
                <button onClick={() => setShowDispute(false)}
                  className="px-5 py-3 border border-border font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors">
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="font-mono text-[9px] text-foreground/30 text-center uppercase tracking-[0.2em]">
        Paiement securise · Stripe · Fonds bloques jusqu'a validation
      </p>
    </div>
  );
}

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30 animate-pulse">Chargement...</span>
    </div>
  );
}
