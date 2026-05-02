import * as Icons from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export function ServiceCard({ service }: { service: Tables<"services"> }) {
  const Icon = (Icons[service.icon as keyof typeof Icons] ?? Icons.Hammer) as React.ComponentType<{ className?: string }>;
  return (
    <article className="group relative rounded-lg border border-border bg-card p-7 hover:border-accent/40 hover:shadow-card transition-all">
      <div className="grid h-12 w-12 place-items-center rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{service.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </article>
  );
}
