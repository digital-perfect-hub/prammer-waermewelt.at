import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

const FIELDS: { key: keyof Tables<"site_settings">; label: string; type?: string; rows?: number }[] = [
  { key: "company_name", label: "Firmenname" },
  { key: "logo_url", label: "Logo URL" },
  { key: "phone", label: "Telefon" },
  { key: "email", label: "E-Mail", type: "email" },
  { key: "address", label: "Adresse" },
  { key: "hero_headline", label: "Hero Headline" },
  { key: "hero_subheadline", label: "Hero Subheadline", rows: 3 },
  { key: "hero_image_url", label: "Hero Bild URL" },
  { key: "cta_text", label: "CTA Text" },
  { key: "primary_color", label: "Primärfarbe (z. B. #1a2332)" },
  { key: "accent_color", label: "Akzentfarbe (z. B. #e58a2d)" },
];

function SettingsAdmin() {
  const [data, setData] = useState<Tables<"site_settings"> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").order("created_at").limit(1).maybeSingle()
      .then(({ data }) => setData(data));
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const { id, created_at, updated_at, ...rest } = data;
    const { error } = await supabase.from("site_settings").update(rest).eq("id", id);
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Gespeichert");
  }

  if (!data) return <p className="text-muted-foreground">Lädt…</p>;

  return (
    <div className="max-w-3xl space-y-5">
      {FIELDS.map((f) => (
        <label key={f.key as string} className="block">
          <span className="block text-sm font-medium mb-2">{f.label}</span>
          {f.rows ? (
            <textarea
              rows={f.rows}
              value={(data[f.key] as string) ?? ""}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
            />
          ) : (
            <input
              type={f.type ?? "text"}
              value={(data[f.key] as string) ?? ""}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
            />
          )}
        </label>
      ))}
      <button onClick={save} disabled={saving}
        className="rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground disabled:opacity-50">
        {saving ? "Speichert…" : "Speichern"}
      </button>
    </div>
  );
}
