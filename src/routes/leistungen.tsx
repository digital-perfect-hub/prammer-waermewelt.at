import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { FALLBACK_SERVICES, isSeededServiceContent } from "@/data/siteContent";
import { useSeo } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen Installateur Linz | Prammer & Prammer" },
      {
        name: "description",
        content:
          "Sanitär, Heizung, Bad, Klima, Solar und Reparatur in Linz sowie rund 50 km Umgebung. Leistungen von Prammer & Prammer.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  useSeo("/leistungen");
  const [services, setServices] = useState<Tables<"services">[]>(FALLBACK_SERVICES);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => {
        if (!cancelled && data?.length && !isSeededServiceContent(data)) setServices(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Sanitär, Heizung und Haustechnik aus einer Hand"
        description="Prammer & Prammer begleitet Installationen, Sanierungen, Reparaturen und technische Modernisierungen in Linz und rund 50 Kilometern Umgebung."
      />

      <section className="container-tight py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Passend zu Ihrem Objekt
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
            Fachgerechte Lösungen für Wasser, Wärme und Raumkomfort
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Ob einzelne Reparatur, komplette Badsanierung oder Modernisierung der Gebäudetechnik:
            Der konkrete Leistungsumfang wird verständlich abgestimmt und auf Bestand, Nutzung und
            Budget ausgerichtet.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white py-16">
        <div className="container-tight grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              So starten wir
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">
              Ihr Anliegen zuerst – die passende Lösung danach.
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Persönliche Erstabstimmung",
                "Besichtigung bei Bedarf",
                "Nachvollziehbarer Leistungsumfang",
                "Umsetzung im vereinbarten Gebiet",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-primary p-8 text-white shadow-elegant">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/65">
              Projekt besprechen
            </p>
            <p className="mt-3 text-2xl font-extrabold">Senden Sie uns die wichtigsten Eckdaten.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Fotos, Objektort und eine kurze Beschreibung helfen bei der ersten Einschätzung.
            </p>
            <Link
              to="/kontakt"
              className="premium-shine mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white shadow-glow"
            >
              Unverbindlich anfragen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
