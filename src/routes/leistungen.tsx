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
      { title: "Unsere Leistungen – Bau, Sanierung, Dach, Fassade" },
      { name: "description", content: "Hochbau, Sanierung, Dachdeckerei, Spenglerei, Fassade und Notdienst – alles aus einer Meisterhand." },
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
        title="Unser komplettes Leistungs­spektrum"
        description="Von der Planung bis zur Übergabe – wir realisieren Ihr Bauprojekt schlüsselfertig mit eigenen Meistern und Gesellen."
      />
      <section className="container-tight py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>
    </>
  );
}
