import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteSettings = Tables<"site_settings">;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setSettings(data as SiteSettings | null);
        setLoading(false);
      });
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

function upsert(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}
