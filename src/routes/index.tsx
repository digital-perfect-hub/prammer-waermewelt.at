import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Bath,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  Flame,
  Phone,
  ShieldCheck,
  ShowerHead,
  Sun,
  Thermometer,
  Wrench,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { FaqAccordion } from "@/components/FaqAccordion";

const DEFAULT_HERO_IMAGE_URL = "https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82";
const HERO_WATER_IMAGE_URL = "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=82";
const HERO_BATH_IMAGE_URL = "https://images.unsplash.com/photo-1769356814886-abdadde25ea7?auto=format&fit=crop&w=1200&q=82";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Installateur Linz | Prammer & Prammer GmbH" },
      { name: "description", content: "Sanitär, Heizung, Bad & Wärmetechnik in Linz. Prammer & Prammer GmbH – Ihr Installateur in 4040 Linz." },
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

  const phone = settings?.phone || "+43 732 282028";
  const heroImageUrl = settings?.hero_image_url?.trim() || DEFAULT_HERO_IMAGE_URL;

  const jsonLd = useMemo(() => {
    const base = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Plumber"],
      name: settings?.company_name || "Prammer & Prammer GmbH",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Reindlstraße 21",
        postalCode: "4040",
        addressLocality: "Linz",
        addressRegion: "Oberösterreich",
        addressCountry: "AT",
      },
      telephone: phone,
      areaServed: ["Linz", "Urfahr", "Leonding", "Traun", "Wels", "Oberösterreich"],
      description: "Installateurbetrieb für Sanitär, Heizung, Bad, Service sowie Wärme- und Solartechnik in Linz.",
    };

    return JSON.stringify(base);
  }, [settings?.company_name, phone]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImageUrl}
            alt="Installateurarbeit im modernen Bad"
            className="h-full w-full object-cover opacity-55"
            width={1920}
            height={1080}
          />
          <div className="premium-hero-overlay absolute inset-0" />
        </div>
        <div className="premium-grid absolute inset-0 pointer-events-none" />
        <div className="premium-noise absolute inset-0 pointer-events-none" />
        <div className="absolute -top-44 -right-28 h-[640px] w-[640px] rounded-full bg-accent/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-52 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-primary-foreground/15" />

        <div className="container-tight relative grid items-center gap-14 py-16 md:py-24 lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/90 backdrop-blur">
              <span className="accent-rule" />
              Installateur in Linz · Blau Rot Weiß Premium
            </div>
            <h1 className="font-display font-extrabold text-balance leading-[0.96] tracking-tight text-[clamp(2.45rem,6vw,5.35rem)] drop-shadow-[0_12px_35px_rgba(0,0,0,0.25)]">
              {settings?.hero_headline ?? "Ihr Installateur in Linz für Bad, Heizung & Sanitär"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-primary-foreground/[0.84] text-pretty leading-relaxed">
              {settings?.hero_subheadline ?? "Prammer & Prammer GmbH unterstützt private Haushalte und Betriebe in Linz bei Sanitärinstallationen, Heiztechnik, Badsanierung und Wärmelösungen."}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/kontakt"
                className="premium-shine premium-pulse group inline-flex items-center gap-3 rounded-xl bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/95"
              >
                {settings?.cta_text ?? "Anfrage stellen"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.16]"
              >
                <Phone className="h-4 w-4" />
                Jetzt anrufen
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
              {[
                ["4040", "Linz"],
                ["Bad", "Sanitär"],
                ["Heizung", "Wärme"],
                ["Service", "Reparatur"],
              ].map(([n, l]) => (
                <div key={l} className="premium-card rounded-2xl p-4 transition hover:-translate-y-1">
                  <dt className="font-display text-2xl md:text-3xl font-extrabold text-white">{n}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-white/[0.65]">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="border-b border-border bg-white/[0.85] backdrop-blur">
        <div className="container-tight grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[
            { icon: Award, t: "Fachbetrieb", s: "Sanitär, Heizung & Wärme" },
            { icon: ShieldCheck, t: "GmbH aus Linz", s: "Reindlstraße 21, 4040 Linz" },
            { icon: Clock, t: "Kurze Wege", s: "Linz & Zentralraum OÖ" },
            { icon: Wrench, t: "Serviceorientiert", s: "Installation, Wartung, Reparatur" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-card hover:shadow-card">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white group-hover:shadow-glow">
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

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl" />
        <div className="absolute right-0 bottom-12 h-80 w-80 rounded-full bg-accent/[0.08] blur-3xl" />
        <div className="container-tight relative">
          <SectionHeader
            eyebrow="Leistungen"
            title="Sanitär, Heizung, Bad und Wärmetechnik aus einer Hand"
            description="Ob Neuinstallation, Modernisierung, Wartung oder Reparatur: Wir bündeln saubere Planung, verlässliche Ausführung und kurze Wege im Raum Linz."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/leistungen" className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary shadow-card transition hover:gap-3 hover:border-accent/40 hover:text-accent">
              Alle Leistungen ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface border-y border-border py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader eyebrow="Ablauf" title="Vier klare Schritte bis zur Umsetzung" />
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Anfrage", "Sie schildern kurz Ihr Anliegen – telefonisch oder über das Formular."],
              ["02", "Rückmeldung", "Wir klären die wichtigsten Eckdaten und stimmen den nächsten Schritt ab."],
              ["03", "Besichtigung", "Bei Bedarf prüfen wir die Situation vor Ort und beraten praxisnah."],
              ["04", "Umsetzung", "Saubere Ausführung durch Fachkräfte – transparent und verlässlich."],
            ].map(([n, t, d]) => (
              <div key={n} className="premium-lift relative overflow-hidden rounded-2xl border border-border bg-white p-8 md:p-9">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-10 -translate-y-10 rounded-full bg-accent/10 blur-2xl" />
                <p className="font-display text-4xl font-extrabold text-accent">{n}</p>
                <h3 className="mt-6 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Typische Arbeiten"
            title="Installateurarbeiten, die Vertrauen schaffen"
            description="Beispiele für Leistungen, die für private Haushalte, Sanierungen und Betriebe im Raum Linz relevant sind."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/referenzen" className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary shadow-card transition hover:gap-3 hover:border-accent/40 hover:text-accent">
              Referenzen ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 md:py-24">
        <div className="premium-grid absolute inset-0 opacity-65" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container-tight relative grid gap-12 lg:grid-cols-[1fr_1.5fr] items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-semibold">Einsatzgebiet</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-tight">
              In Linz und im Zentralraum Oberösterreich für Sie da.
            </h2>
            <p className="mt-5 text-primary-foreground/[0.74] max-w-md">
              Kurze Wege, persönliche Ansprechpartner und klare Kommunikation – besonders wichtig bei Installations- und Servicearbeiten.
            </p>
            <Link
              to="/einsatzgebiete"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-accent decoration-2 underline-offset-8"
            >
              Alle Gebiete ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <li
                key={loc.id}
                className="rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.13]"
              >
                <p className="font-semibold">{loc.name}</p>
                {loc.postal_code && (
                  <p className="text-xs text-primary-foreground/60 mt-0.5">PLZ {loc.postal_code}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

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
          <div className="rounded-3xl border border-border bg-white p-4 shadow-card">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white border-t border-border py-20">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-tight relative text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight text-balance">
            Sie planen eine Installation, Sanierung oder Reparatur?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Schreiben Sie uns kurz, worum es geht. Wir melden uns persönlich zurück.
          </p>
          <Link
            to="/kontakt"
            className="premium-shine mt-10 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/95"
          >
            {settings?.cta_text ?? "Anfrage stellen"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function HeroVisual() {
  return (
    <div className="relative hidden lg:block premium-float-slow">
      <div className="absolute -left-8 top-16 z-20 rounded-2xl border border-white/15 bg-white/[0.12] px-5 py-4 shadow-elegant backdrop-blur-xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Schnell erreichbar</p>
        <p className="mt-1 font-display text-2xl font-extrabold text-white">Linz 4040</p>
      </div>

      <div className="relative ml-auto max-w-[520px] rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-elegant backdrop-blur-xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-primary/40">
          <img
            src={DEFAULT_HERO_IMAGE_URL}
            alt="Installateur montiert Sanitärtechnik im Badezimmer"
            className="h-[360px] w-full object-cover"
            width={960}
            height={720}
          />
        </div>

        <div className="mt-4 grid grid-cols-[1fr_0.85fr] gap-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08]">
            <img src={HERO_WATER_IMAGE_URL} alt="Wasserarmatur mit fließendem Wasser" className="h-36 w-full object-cover" width={600} height={400} />
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08]">
            <img src={HERO_BATH_IMAGE_URL} alt="Premium Armatur im Badezimmer" className="h-36 w-full object-cover" width={600} height={400} />
          </div>
        </div>
      </div>

      <div className="absolute -right-4 bottom-14 z-20 w-72 rounded-2xl border border-white/15 bg-white/95 p-5 text-primary shadow-elegant">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Leistungsprofil</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">Wasser & Wärme</h2>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white shadow-glow">
            <Droplets className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-5 grid gap-2.5">
          {[
            { icon: ShowerHead, label: "Sanitär" },
            { icon: Flame, label: "Heizung" },
            { icon: Bath, label: "Bad" },
            { icon: Sun, label: "Solar" },
            { icon: Thermometer, label: "Service" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/[0.08] text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold">{label}</span>
              <CheckCircle2 className="ml-auto h-4 w-4 text-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
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
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">{eyebrow}</span>
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
