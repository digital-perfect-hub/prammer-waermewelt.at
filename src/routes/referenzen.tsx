import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { FALLBACK_PROJECTS, isSeededProjectContent } from "@/data/siteContent";
import { useSeo } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/referenzen")({
  head: () => ({
    meta: [
      { title: "Leistungsbeispiele Installateur Linz | Prammer" },
      {
        name: "description",
        content:
          "Leistungsbeispiele für Bad, Sanitär, Heizung und Solartechnik bei Prammer & Prammer in Linz und Umgebung.",
      },
    ],
  }),
  component: ReferencesPage,
});

function ReferencesPage() {
  useSeo("/referenzen");
  const [projects, setProjects] = useState<Tables<"projects">[]>(FALLBACK_PROJECTS);
  const [usingStockProjects, setUsingStockProjects] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => {
        if (!cancelled && data?.length && !isSeededProjectContent(data)) {
          setProjects(data);
          setUsingStockProjects(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Leistungsbeispiele"
        title="So können moderne Sanitär- und Wärmelösungen aussehen"
        description="Eine visuelle Orientierung zu typischen Arbeitsbereichen von der Badmodernisierung bis zur Solar- und Haustechnik."
      />

      <section className="container-tight py-20 md:py-24">
        {usingStockProjects && (
          <div className="mx-auto mb-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-primary/10 bg-secondary/70 p-5 text-sm leading-relaxed text-muted-foreground">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p>
              Die derzeit gezeigten Bilder sind ausgewählte Stockmotive zur Darstellung des
              Leistungsspektrums. Sie werden nicht als ausgeführte Kundenprojekte von Prammer &
              Prammer ausgegeben. Eigene Referenzfotos können später direkt ersetzt werden.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white py-16">
        <div className="container-tight max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold">
            Sie planen ein ähnliches Vorhaben?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Schildern Sie uns kurz das Projekt, den Objektstandort und den gewünschten Zeitraum.
          </p>
          <Link
            to="/kontakt"
            className="premium-shine mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white shadow-glow"
          >
            Projekt anfragen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
