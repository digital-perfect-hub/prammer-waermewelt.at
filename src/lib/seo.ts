import { supabase } from "@/integrations/supabase/client";

export type SeoMeta = {
  title: string;
  description: string;
  og_image_url?: string | null;
};

export async function fetchSeo(path: string): Promise<SeoMeta | null> {
  const { data } = await supabase
    .from("seo_settings")
    .select("title,description,og_image_url")
    .eq("page_path", path)
    .maybeSingle();
  return data as SeoMeta | null;
}

export function applyMeta(meta: SeoMeta) {
  if (typeof document === "undefined") return;
  document.title = meta.title;
  setMeta("name", "description", meta.description);
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  if (meta.og_image_url) setMeta("property", "og:image", meta.og_image_url);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}
