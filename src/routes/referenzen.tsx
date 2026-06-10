import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/referenzen")({
  head: () => ({
    meta: [
      { title: "Referenzen Installateur Linz | Prammer & Prammer GmbH" },
      { name: "description", content: "Ausgewählte Installateurarbeiten und typische Projekte rund um Sanitär, Bad, Heizung und Wärmetechnik in Linz." },
    ],
  }),
  component: ReferencesPage,
});

function ReferencesPage() {
  useSeo("/referenzen");
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);

  useEffect(() => {
    supabase.from("projects").select("*").eq("is_published", true).order("sort_order")
      .then(({ data }) => setProjects(data ?? []));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Referenzen"
        title="Installateurarbeiten, die Vertrauen schaffen"
        description="Eine Auswahl typischer Arbeiten rund um Badsanierung, Heizungstechnik, Neubau, Solarthermie und Sanitär in Linz und Umgebung."
      />
      <section className="container-tight py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </section>
    </>
  );
}
