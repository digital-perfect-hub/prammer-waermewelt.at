import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { DEFAULT_SITE_SETTINGS } from "@/data/siteContent";

export type SiteSettings = Tables<"site_settings">;

const BRAND_PRIMARY = "#2D93A5";
const BRAND_ACCENT = "#D9CF36";
const BRAND_PRIMARY_SOFT = "#ECF8FA";
const BRAND_SURFACE = "#F7FBFB";

const LEGACY_THEME_VALUES = new Set(["#1a2332", "#e58a2d", "#0f4c4a", "#f59e5b", "#ff8559", "#0b2d5c", "#d71920"]);

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Sofort setzen, damit der erste Render bereits stabil im finalen Markenlook erscheint.
    applyThemeColors(null);

    supabase
      .from("site_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const nextSettings = mergeSiteSettings(data as SiteSettings | null);
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

function mergeSiteSettings(settings: SiteSettings | null): SiteSettings {
  if (!settings) return DEFAULT_SITE_SETTINGS;

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...settings,
    company_name: settings.company_name?.trim() || DEFAULT_SITE_SETTINGS.company_name,
    phone: settings.phone?.trim() || DEFAULT_SITE_SETTINGS.phone,
    email: settings.email?.trim() || DEFAULT_SITE_SETTINGS.email,
    address: settings.address?.trim() || DEFAULT_SITE_SETTINGS.address,
    cta_text: settings.cta_text?.trim() || DEFAULT_SITE_SETTINGS.cta_text,
    hero_headline: resolveContentValue(
      settings.hero_headline,
      DEFAULT_SITE_SETTINGS.hero_headline,
      LEGACY_HERO_HEADLINES,
    ),
    hero_subheadline: resolveContentValue(
      settings.hero_subheadline,
      DEFAULT_SITE_SETTINGS.hero_subheadline,
      LEGACY_HERO_SUBHEADLINES,
    ),
    hero_image_url: resolveContentValue(
      settings.hero_image_url,
      DEFAULT_SITE_SETTINGS.hero_image_url,
      LEGACY_HERO_IMAGES,
    ),
    logo_url: settings.logo_url?.trim() || null,
  };
}

function resolveContentValue(
  value: string | null | undefined,
  fallback: string | null,
  legacyValues: Set<string>,
) {
  const normalized = value?.trim();
  if (!normalized || legacyValues.has(normalized)) return fallback;
  return normalized;
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
