import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Award, Clock, Users, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";
import heroImage from "@/assets/hero-construction.jpg";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { FaqAccordion } from "@/components/FaqAccordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mustermann Bau & Sanierung – Handwerk mit Substanz | Berlin" },
      { name: "description", content: "Ihr regionaler Meisterbetrieb für Bau, Sanierung, Dachdeckerei und Spenglerei in Berlin und Brandenburg. Kostenlose Anfrage in 24h." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useSeo("/");
  const { settings } = useSiteSettings();
  const [services, setServices] = useState<Tables<"services">[]>([]);
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);
  const [locations, setLocations] = useState<Tables<"locations">[]>([]);
  const [faqs, setFaqs] = useState<Tables<"faqs">[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("services").select("*").eq("is_published", true).order("sort_order"),
      supabase.from("projects").select("*").eq("is_published", true).order("sort_order").limit(6),
      supabase.from("locations").select("*").eq("is_published", true).order("sort_order"),
      supabase.from("faqs").select("*").eq("is_published", true).order("sort_order"),
    ]).then(([s, p, l, f]) => {
      setServices(s.data ?? []);
      setProjects(p.data ?? []);
      setLocations(l.data ?? []);
      setFaqs(f.data ?? []);
    });
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover opacity-35" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
        </div>
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        <div className="container-tight relative py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              <span className="accent-rule" />
              Meisterbetrieb seit 1998
            </div>
            <h1 className="font-display font-extrabold text-balance leading-[0.95] tracking-tight text-[clamp(2.5rem,7vw,5.5rem)]">
              {settings?.hero_headline ?? "Handwerk. Substanz. Vertrauen."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-primary-foreground/80 text-pretty leading-relaxed">
              {settings?.hero_subheadline ?? "Ihr regionaler Meisterbetrieb für Bau, Sanierung und Dachdeckerei."}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/kontakt"
                className="group inline-flex items-center gap-3 rounded-md bg-accent px-7 py-4 text-base font-semibold text-accent-foreground hover:opacity-90 shadow-glow transition"
              >
                {settings?.cta_text ?? "Kostenlose Anfrage stellen"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/referenzen"
                className="inline-flex items-center gap-3 rounded-md border border-primary-foreground/25 px-7 py-4 text-base font-semibold hover:bg-primary-foreground/5"
              >
                Referenzen ansehen
              </Link>
            </div>

            <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                ["25+", "Jahre Erfahrung"],
                ["500+", "Projekte"],
                ["24h", "Rückmeldung"],
                ["5J.", "Garantie"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl md:text-4xl font-extrabold text-accent">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-border bg-surface">
        <div className="container-tight grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {[
            { icon: Award, t: "Meisterbetrieb", s: "Geprüfte Qualität" },
            { icon: ShieldCheck, t: "5 Jahre Garantie", s: "Auf alle Arbeiten" },
            { icon: Clock, t: "24h Rückmeldung", s: "Schnell & zuverlässig" },
            { icon: Users, t: "Eigene Mitarbeiter", s: "Keine Subunternehmer" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Leistungen"
            title="Alles aus einer Meister­hand"
            description="Vom Rohbau bis zum letzten Detail – wir realisieren Ihr Projekt komplett mit eigenen, ausgebildeten Fachkräften."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/leistungen" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Alle Leistungen ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-surface border-y border-border py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader eyebrow="So arbeiten wir" title="Vier Schritte zu Ihrem Projekt" />
          <div className="mt-14 grid gap-px md:grid-cols-4 bg-border rounded-lg overflow-hidden">
            {[
              ["01", "Anfrage", "Kostenlos und unverbindlich – per Formular oder telefonisch."],
              ["02", "Besichtigung", "Wir kommen vorbei, hören zu und beraten ehrlich."],
              ["03", "Festpreis-Angebot", "Transparent, schriftlich, ohne versteckte Kosten."],
              ["04", "Umsetzung", "Termintreu durch eigene Meister & Gesellen."],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-background p-8 md:p-10 hover:bg-card transition-colors">
                <p className="font-display text-3xl font-extrabold text-accent">{n}</p>
                <h3 className="mt-6 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Referenzen"
            title="Projekte, die für sich sprechen"
            description="Eine Auswahl unserer kürzlich abgeschlossenen Bauvorhaben."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/referenzen" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Alle Referenzen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-primary text-primary-foreground py-20 md:py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-[1fr_1.5fr] items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Einsatzgebiete</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-tight">
              Wir sind in Ihrer Region für Sie da.
            </h2>
            <p className="mt-5 text-primary-foreground/70 max-w-md">
              Berlin, Potsdam und das gesamte Berliner Umland – kurze Wege, schnelle Reaktionszeiten.
            </p>
            <Link
              to="/einsatzgebiete"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Alle Gebiete ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <li
                key={loc.id}
                className="rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4"
              >
                <p className="font-semibold">{loc.name}</p>
                {loc.postal_code && (
                  <p className="text-xs text-primary-foreground/55 mt-0.5">PLZ {loc.postal_code}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-tight grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">FAQ</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-tight">
              Häufige Fragen
            </h2>
            <p className="mt-4 text-muted-foreground">
              Nicht das gefunden, was Sie suchen?{" "}
              <Link to="/kontakt" className="text-primary font-semibold underline-offset-4 hover:underline">
                Sprechen Sie uns an.
              </Link>
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-border py-20">
        <div className="container-tight text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight text-balance">
            Bereit für Ihr Projekt?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Erhalten Sie innerhalb von 24 Stunden eine persönliche Rückmeldung.
          </p>
          <Link
            to="/kontakt"
            className="mt-10 inline-flex items-center gap-3 rounded-md bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-glow hover:opacity-90"
          >
            {settings?.cta_text ?? "Kostenlose Anfrage stellen"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl"}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{eyebrow}</span>
      )}
      <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-pretty">{description}</p>
      )}
    </div>
  );
}
