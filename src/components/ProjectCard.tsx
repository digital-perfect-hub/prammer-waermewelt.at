import { MapPin } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

const FALLBACKS = [p1, p2, p3, p4, p5, p6];

export function ProjectCard({ project, index = 0 }: { project: Tables<"projects">; index?: number }) {
  const img = project.image_url || FALLBACKS[index % FALLBACKS.length];
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-card transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-surface-strong">
        <img
          src={img}
          alt={project.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        {project.category && (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
            {project.category}
          </span>
        )}
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </p>
      </div>
    </article>
  );
}
