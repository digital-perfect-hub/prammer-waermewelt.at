import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen Installateur Linz | Sanitär, Heizung, Bad" },
      { name: "description", content: "Sanitärinstallation, Heizungstechnik, Badsanierung, Solar- und Wärmetechnik sowie Service in Linz und Umgebung." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  useSeo("/leistungen");
  const [services, setServices] = useState<Tables<"services">[]>([]);

  useEffect(() => {
    supabase.from("services").select("*").eq("is_published", true).order("sort_order")
      .then(({ data }) => setServices(data ?? []));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Installateur-Leistungen für Linz und Umgebung"
        description="Sanitär, Heizung, Bad, Reparatur und Wärmetechnik: Prammer & Prammer GmbH bündelt verlässliche Installateurarbeit für private Haushalte und Betriebe."
      />
      <section className="container-tight py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>
    </>
  );
}
