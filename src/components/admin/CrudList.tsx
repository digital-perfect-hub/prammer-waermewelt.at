import { useEffect, useState } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean";
  rows?: number;
};

export function CrudList<T extends { id: string }>({
  table, fields, title, defaultRow,
}: {
  table: "services" | "projects" | "locations" | "faqs" | "seo_settings";
  fields: Field[];
  title: string;
  defaultRow: Record<string, unknown>;
}) {
  const [rows, setRows] = useState<T[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  async function load() {
    const q = supabase.from(table).select("*");
    const ordered = "sort_order" in defaultRow ? q.order("sort_order") : q.order("created_at", { ascending: false });
    const { data } = await ordered;
    setRows((data ?? []) as unknown as T[]);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    const { id, created_at, updated_at, ...rest } = editing as any;
    const { error } = id
      ? await supabase.from(table).update(rest).eq("id", id)
      : await supabase.from(table).insert(rest);
    if (error) { toast.error(error.message); return; }
    toast.success("Gespeichert");
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Wirklich löschen?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Gelöscht"); load(); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <button onClick={() => setEditing({ ...defaultRow })}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
          <Plus className="h-4 w-4" /> Neu
        </button>
      </div>

      <div className="space-y-2">
        {rows.map((r: any) => (
          <div key={r.id} className="flex items-center justify-between gap-3 rounded-md border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{r[fields[0].key] as string}</p>
              {fields[1] && <p className="text-sm text-muted-foreground truncate">{r[fields[1].key] as string}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing({ ...r })} className="rounded-md border border-border px-3 py-1.5 text-sm">Bearbeiten</button>
              <button onClick={() => remove(r.id)} className="rounded-md border border-destructive/30 text-destructive px-3 py-1.5 text-sm inline-flex items-center gap-1">
                <Trash2 className="h-3.5 w-3.5" /> Löschen
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-muted-foreground text-sm">Noch keine Einträge.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl rounded-lg bg-card border border-border p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold">{(editing as any).id ? "Bearbeiten" : "Neu anlegen"}</h3>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {fields.map((f) => (
                <label key={f.key} className="block">
                  <span className="block text-sm font-medium mb-2">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea rows={f.rows ?? 3} value={(editing[f.key] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  ) : f.type === "boolean" ? (
                    <input type="checkbox" checked={!!editing[f.key]}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      className="h-4 w-4 accent-[var(--color-accent)]" />
                  ) : (
                    <input type={f.type ?? "text"} value={(editing[f.key] as string | number) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  )}
                </label>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold text-accent-foreground">
                  <Save className="h-4 w-4" /> Speichern
                </button>
                <button onClick={() => setEditing(null)} className="rounded-md border border-border px-5 py-2.5 font-medium">Abbrechen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
