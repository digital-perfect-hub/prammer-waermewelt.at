import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteSettings = Tables<"site_settings">;

const BRAND_PRIMARY = "#0B2D5C";
const BRAND_ACCENT = "#D71920";
const BRAND_PRIMARY_SOFT = "#E7F0FF";
const BRAND_SURFACE = "#F8FBFF";

const LEGACY_THEME_VALUES = new Set([
  "#1a2332",
  "#e58a2d",
  "#0f4c4a",
  "#f59e5b",
  "#ff8559",
]);

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Sofort setzen, damit der erste Render bereits stabil blau/rot/weiß bleibt.
    applyThemeColors(null);

    supabase
      .from("site_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const nextSettings = data as SiteSettings | null;
        setSettings(nextSettings);
        applyThemeColors(nextSettings);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading };
}

export function useSeo(path: string) {
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("seo_settings")
      .select("title,description,og_image_url")
      .eq("page_path", path)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data || typeof document === "undefined") return;
        document.title = data.title;
        upsert("name", "description", data.description);
        upsert("property", "og:title", data.title);
        upsert("property", "og:description", data.description);
        if (data.og_image_url) upsert("property", "og:image", data.og_image_url);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);
}

function applyThemeColors(settings: SiteSettings | null) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const primary = resolveBrandColor(settings?.primary_color, BRAND_PRIMARY);
  const accent = resolveBrandColor(settings?.accent_color, BRAND_ACCENT);

  root.style.setProperty("--primary", primary);
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--ring", accent);
  root.style.setProperty("--destructive", accent);
  root.style.setProperty("--secondary", BRAND_PRIMARY_SOFT);
  root.style.setProperty("--surface", BRAND_PRIMARY_SOFT);
  root.style.setProperty("--background", BRAND_SURFACE);
}

function resolveBrandColor(value: string | null | undefined, fallback: string) {
  const normalized = normalizeHex(value);
  if (!normalized) return fallback;

  // Wichtig: alte Lovable-/Kupfer-/Teal-Werte dürfen das neue Blau/Rot-Branding
  // nach dem Laden aus Supabase nicht wieder überschreiben.
  if (LEGACY_THEME_VALUES.has(normalized.toLowerCase())) return fallback;

  return normalized;
}

function normalizeHex(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed) ? trimmed : null;
}

function upsert(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}
