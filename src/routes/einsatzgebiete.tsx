import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Navigation, Radius } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { COMPANY, FALLBACK_LOCATIONS, isSeededLocationContent } from "@/data/siteContent";
import { useSeo } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/einsatzgebiete")({
  head: () => ({
    meta: [
      { title: "Installateur Linz & 50 km Umgebung | Prammer" },
      {
        name: "description",
        content:
          "Prammer & Prammer arbeitet in Linz und rund 50 km Umgebung, etwa in Leonding, Traun, Wels, Perg, Enns und Gallneukirchen.",
      },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  useSeo("/einsatzgebiete");
  const [locations, setLocations] = useState<Tables<"locations">[]>(FALLBACK_LOCATIONS);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("locations")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => {
        if (!cancelled && data?.length && !isSeededLocationContent(data)) setLocations(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Einsatzgebiet"
        title="Von Linz aus rund 50 Kilometer für Sie unterwegs"
        description="Unser Schwerpunkt liegt im Linzer Zentralraum. Abhängig von Projektumfang und Termin betreuen wir auch Objekte im erweiterten Umkreis."
      />

      <section className="container-tight py-20 md:py-24">
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          <Info icon={MapPin} title="Ausgangspunkt" text={COMPANY.address} />
          <Info
            icon={Radius}
            title="Regelmäßiger Radius"
            text={`Linz und rund ${COMPANY.radiusKm} km Umgebung`}
          />
          <Info
            icon={Navigation}
            title="Außerhalb des Radius"
            text="Projektbezogene Prüfung nach Aufwand und Verfügbarkeit"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <article
              key={location.id}
              className="premium-lift rounded-2xl border border-border bg-card p-7 shadow-[0_1px_0_rgba(255,255,255,0.7)]"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">{location.name}</h2>
                  {location.postal_code && (
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      PLZ {location.postal_code}
                    </p>
                  )}
                  {location.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {location.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white py-16">
        <div className="container-tight grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Ihr Ort ist nicht angeführt?</h2>
            <p className="mt-3 text-muted-foreground">
              Senden Sie uns die Adresse und eine kurze Projektbeschreibung. Wir prüfen die Anfahrt
              direkt.
            </p>
          </div>
          <Link
            to="/kontakt"
            className="premium-shine inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white shadow-glow"
          >
            Einsatzort prüfen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon, title, text }: { icon: typeof MapPin; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
      <Icon className="h-6 w-6 text-accent" />
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-2 font-display text-lg font-extrabold text-primary">{text}</p>
    </div>
  );
}
