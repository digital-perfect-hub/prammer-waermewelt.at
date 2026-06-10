import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

const BRAND_PRIMARY = "#0B2D5C";
const BRAND_ACCENT = "#D71920";
const LEGACY_THEME_VALUES = new Set(["#1a2332", "#e58a2d", "#0f4c4a", "#f59e5b", "#ff8559"]);

const FIELDS: { key: keyof Tables<"site_settings">; label: string; type?: string; rows?: number }[] = [
  { key: "company_name", label: "Firmenname" },
  { key: "logo_url", label: "Logo URL" },
  { key: "phone", label: "Telefon" },
  { key: "email", label: "E-Mail (echte Adresse vor Livegang ergänzen)", type: "email" },
  { key: "address", label: "Adresse" },
  { key: "hero_headline", label: "Hero Headline" },
  { key: "hero_subheadline", label: "Hero Subheadline", rows: 3 },
  { key: "hero_image_url", label: "Hero Bild URL (extern oder eigenes Bild, z. B. Installateur/Bad/Heizung)" },
  { key: "cta_text", label: "CTA Text" },
  { key: "primary_color", label: "Primärfarbe Blau (#0B2D5C)" },
  { key: "accent_color", label: "Akzentfarbe Rot (#D71920)" },
];

function SettingsAdmin() {
  const [data, setData] = useState<Tables<"site_settings"> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").order("created_at").limit(1).maybeSingle()
      .then(({ data }) => setData(data ? sanitizeSettings(data) : data));
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const sanitized = sanitizeSettings(data);
    const { id, created_at, updated_at, ...rest } = sanitized;
    const { error } = await supabase.from("site_settings").update(rest).eq("id", id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      setData(sanitized);
      toast.success("Gespeichert – Blau/Rot/Weiß bleibt stabil aktiv");
    }
  }

  if (!data) return <p className="text-muted-foreground">Lädt…</p>;

  return (
    <div className="max-w-3xl space-y-5">
      <div className="rounded-2xl border border-primary/15 bg-secondary p-5 text-sm text-primary">
        <strong>Branding aktiv:</strong> Die Seite läuft auf Blau / Rot / Weiß. Alte Lovable-Farben werden automatisch auf die neuen Markenfarben korrigiert.
      </div>

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
        className="rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-glow disabled:opacity-50">
        {saving ? "Speichert…" : "Speichern"}
      </button>
    </div>
  );
}

function sanitizeSettings(settings: Tables<"site_settings">): Tables<"site_settings"> {
  return {
    ...settings,
    primary_color: normalizeBrandColor(settings.primary_color, BRAND_PRIMARY),
    accent_color: normalizeBrandColor(settings.accent_color, BRAND_ACCENT),
  };
}

function normalizeBrandColor(value: string | null | undefined, fallback: string) {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(normalized)) return fallback;
  if (LEGACY_THEME_VALUES.has(normalized.toLowerCase())) return fallback;
  return normalized;
}
