import { MapPin } from "lucide-react";
import { FALLBACK_PROJECTS } from "@/data/siteContent";
import type { Tables } from "@/integrations/supabase/types";

const DEFAULT_PREVIEW_IMAGES = FALLBACK_PROJECTS.map((project) => project.image_url).filter(
  (image): image is string => Boolean(image),
);

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Tables<"projects">;
  index?: number;
}) {
  const img = project.image_url || DEFAULT_PREVIEW_IMAGES[index % DEFAULT_PREVIEW_IMAGES.length];

  return (
    <article className="premium-lift group relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-card">
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-brand opacity-90" />
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
        {img && (
          <img
            src={img}
            alt={project.title}
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent opacity-80" />
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary shadow-card backdrop-blur">
            {project.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-primary">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.location && (
          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {project.location}
          </p>
        )}
      </div>
    </article>
  );
}
