import { Link } from "@tanstack/react-router";
import { Bath, Droplets, Flame, Snowflake, Sun, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import type { Tables } from "@/integrations/supabase/types";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Bath,
  Droplets,
  Flame,
  Snowflake,
  Sun,
  Wrench,
};

export function ServiceCard({ service }: { service: Tables<"services"> }) {
  const Icon = ICONS[service.icon || ""] || Wrench;

  return (
    <article className="premium-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-[0_1px_0_rgba(255,255,255,0.7)]">
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-brand" />
      {service.image_url ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-strong">
          <img
            src={service.image_url}
            alt={service.title}
            loading="lazy"
            width={900}
            height={506}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.52] via-transparent to-transparent opacity-75" />
        </div>
      ) : (
        <div className="relative h-2 bg-gradient-brand" />
      )}
      <div className="relative flex flex-1 flex-col p-7">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/[0.08] text-primary ring-1 ring-primary/10 transition group-hover:bg-accent group-hover:text-white group-hover:shadow-glow">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-primary">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <Link
          to="/kontakt"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.16em] text-accent"
          aria-label={`Anfrage zu ${service.title}`}
        >
          Leistung anfragen
          <span className="h-px w-8 bg-accent/50 transition-all group-hover:w-12" />
        </Link>
      </div>
    </article>
  );
}
