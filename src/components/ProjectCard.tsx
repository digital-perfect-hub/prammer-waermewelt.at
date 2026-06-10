import { MapPin } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const PROJECT_PREVIEW_IMAGES = [
  {
    terms: ["komplettsanierung", "stadtbad", "wellness"],
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=84",
  },
  {
    terms: ["wärmepumpe", "luft-wasser", "pufferspeicher"],
    url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=84",
  },
  {
    terms: ["pellets", "mehrparteienhaus", "zentral", "gasheizung"],
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=84",
  },
  {
    terms: ["barrierefrei", "altersgerecht", "bodengleich"],
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=84",
  },
  {
    terms: ["neubau", "doppelhaus", "wohnraumlüftung", "sanitärinstallation"],
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=84",
  },
  {
    terms: ["solar", "solarthermie", "warmwasser", "heizungsunterstützung"],
    url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=84",
  },
];

const DEFAULT_PREVIEW_IMAGES = PROJECT_PREVIEW_IMAGES.map((item) => item.url);

export function ProjectCard({ project, index = 0 }: { project: Tables<"projects">; index?: number }) {
  const matchedPreviewImage = getProjectPreviewImage(project);
  const img = matchedPreviewImage || project.image_url || DEFAULT_PREVIEW_IMAGES[index % DEFAULT_PREVIEW_IMAGES.length];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card premium-lift">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-90" />
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
        <img
          src={img}
          alt={project.title}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/72 via-primary/8 to-transparent opacity-80" />
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary shadow-card backdrop-blur">
            {project.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-primary">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          {project.location}
        </p>
      </div>
    </article>
  );
}

function getProjectPreviewImage(project: Tables<"projects">) {
  const haystack = `${project.title ?? ""} ${project.description ?? ""} ${project.category ?? ""} ${project.location ?? ""}`.toLowerCase();
  const matched = PROJECT_PREVIEW_IMAGES.find((item) => item.terms.some((term) => haystack.includes(term)));
  return matched?.url ?? null;
}
