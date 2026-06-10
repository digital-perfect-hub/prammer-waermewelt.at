import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/einsatzgebiete")({
  head: () => ({
    meta: [
      { title: "Einsatzgebiete Installateur Linz & Umgebung" },
      { name: "description", content: "Prammer & Prammer GmbH ist als Installateur in Linz, Urfahr, Leonding, Traun, Wels und im Zentralraum Oberösterreich tätig." },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  useSeo("/einsatzgebiete");
  const [locations, setLocations] = useState<Tables<"locations">[]>([]);

  useEffect(() => {
    supabase.from("locations").select("*").eq("is_published", true).order("sort_order")
      .then(({ data }) => setLocations(data ?? []));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Einsatzgebiete"
        title="Installateur in Linz und Umgebung"
        description="Kurze Wege, klare Abstimmung und persönliche Ansprechpartner im Zentralraum Oberösterreich."
      />
      <section className="container-tight py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <div key={loc.id} className="rounded-lg border border-border bg-card p-7 hover:border-accent/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{loc.name}</h3>
                  {loc.postal_code && (
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">PLZ {loc.postal_code}</p>
                  )}
                  {loc.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{loc.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
