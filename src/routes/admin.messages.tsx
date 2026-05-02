import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesAdmin,
});

function MessagesAdmin() {
  const [msgs, setMsgs] = useState<Tables<"contact_messages">[]>([]);

  async function load() {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMsgs(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    load();
  }
  async function remove(id: string) {
    if (!confirm("Anfrage löschen?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-6">Kontaktanfragen</h2>
      <div className="space-y-3">
        {msgs.map((m) => (
          <div key={m.id} className={`rounded-lg border p-5 ${m.is_read ? "border-border bg-card" : "border-accent/50 bg-accent/5"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{m.name} {!m.is_read && <span className="ml-2 text-[10px] uppercase tracking-widest text-accent">Neu</span>}</p>
                <p className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("de-DE")}{m.project_type && ` · ${m.project_type}`}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-primary"><Mail className="h-3.5 w-3.5" />{m.email}</a>
                  {m.phone && <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 text-primary"><Phone className="h-3.5 w-3.5" />{m.phone}</a>}
                </div>
              </div>
              <div className="flex gap-2">
                {!m.is_read && (
                  <button onClick={() => markRead(m.id)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm">
                    <Check className="h-3.5 w-3.5" /> Gelesen
                  </button>
                )}
                <button onClick={() => remove(m.id)} className="inline-flex items-center gap-1 rounded-md border border-destructive/30 text-destructive px-3 py-1.5 text-sm">
                  <Trash2 className="h-3.5 w-3.5" /> Löschen
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm whitespace-pre-wrap leading-relaxed">{m.message}</p>
          </div>
        ))}
        {msgs.length === 0 && <p className="text-muted-foreground text-sm">Noch keine Anfragen.</p>}
      </div>
    </div>
  );
}
