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
  MapPin,
  Phone,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Sun,
  Thermometer,
  Users,
  Wrench,
} from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import {
  COMPANY,
  DEFAULT_HERO_IMAGE,
  FALLBACK_FAQS,
  FALLBACK_LOCATIONS,
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  isSeededFaqContent,
  isSeededLocationContent,
  isSeededProjectContent,
  isSeededServiceContent,
} from "@/data/siteContent";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Installateur Linz | Prammer & Prammer GmbH" },
      {
        name: "description",
        content:
          "Sanitär, Heizung, Bad, Klima und Service in Linz sowie rund 50 km Umgebung. Prammer & Prammer GmbH in 4040 Linz.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useSeo("/");
  const { settings } = useSiteSettings();
  const [services, setServices] = useState<Tables<"services">[]>(FALLBACK_SERVICES);
  const [projects, setProjects] = useState<Tables<"projects">[]>(FALLBACK_PROJECTS);
  const [locations, setLocations] = useState<Tables<"locations">[]>(FALLBACK_LOCATIONS);
  const [faqs, setFaqs] = useState<Tables<"faqs">[]>(FALLBACK_FAQS);
  const [usingStockProjects, setUsingStockProjects] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      supabase.from("services").select("*").eq("is_published", true).order("sort_order"),
      supabase.from("projects").select("*").eq("is_published", true).order("sort_order").limit(6),
      supabase.from("locations").select("*").eq("is_published", true).order("sort_order"),
      supabase.from("faqs").select("*").eq("is_published", true).order("sort_order"),
    ]).then(([serviceResult, projectResult, locationResult, faqResult]) => {
      if (cancelled) return;

      if (serviceResult.data?.length && !isSeededServiceContent(serviceResult.data)) {
        setServices(serviceResult.data);
      }
      if (projectResult.data?.length && !isSeededProjectContent(projectResult.data)) {
        setProjects(projectResult.data);
        setUsingStockProjects(false);
      }
      if (locationResult.data?.length && !isSeededLocationContent(locationResult.data)) {
        setLocations(locationResult.data);
      }
      if (faqResult.data?.length && !isSeededFaqContent(faqResult.data)) {
        setFaqs(faqResult.data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const phoneHref = settings.phone.replace(/[^+\d]/g, "");
  const heroImageUrl = settings.hero_image_url || DEFAULT_HERO_IMAGE;

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "Plumber"],
        name: settings.company_name,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Reindlstraße 21",
          postalCode: "4040",
          addressLocality: "Linz",
          addressRegion: "Oberösterreich",
          addressCountry: "AT",
        },
        telephone: settings.phone,
        email: settings.email,
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            addressLocality: "Linz",
            addressCountry: "AT",
          },
          geoRadius: "50000",
        },
        description:
          "Installateurbetrieb für Sanitär, Heizung, Bad, Klima, Service sowie Wärme- und Solartechnik in Linz und rund 50 Kilometern Umgebung.",
      }),
    [settings],
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section className="relative isolate overflow-hidden border-b border-border bg-background text-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImageUrl}
            alt="Installateur bei Sanitärarbeiten in einem Badezimmer"
            className="h-full w-full object-cover object-right opacity-[0.16]"
            width={1920}
            height={1280}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,251,251,0.97)_0%,rgba(247,251,251,0.95)_42%,rgba(244,249,249,0.82)_70%,rgba(232,242,239,0.72)_100%)]" />
        </div>
        <div className="premium-grid pointer-events-none absolute inset-0 opacity-[0.22]" />
        <div className="pointer-events-none absolute -right-28 -top-44 h-[640px] w-[640px] rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-primary/8 blur-3xl" />

        <div className="container-tight relative grid items-center gap-12 py-16 md:py-24 lg:min-h-[720px] lg:grid-cols-[minmax(0,1.14fr)_minmax(560px,0.86fr)] lg:py-20 xl:grid-cols-[minmax(0,1.18fr)_minmax(590px,0.82fr)]">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-primary/12 bg-white/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-800 shadow-card backdrop-blur">
              <span className="accent-rule" />
              Prammer & Prammer · Installateur aus Linz
            </div>
            <h1 className="text-balance font-display text-[clamp(2.55rem,5.6vw,4.9rem)] font-extrabold leading-[0.94] tracking-tight text-[#1f2937]">
              {settings.hero_headline}
            </h1>
            <p className="text-pretty mt-6 max-w-[660px] text-lg leading-relaxed text-[#334155] md:text-xl">
              {settings.hero_subheadline}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/kontakt"
                className="premium-shine premium-pulse group inline-flex items-center gap-3 rounded-xl bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/95"
              >
                {settings.cta_text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${phoneHref}`}
                className="inline-flex items-center gap-3 rounded-xl border border-primary/12 bg-white px-7 py-4 text-base font-bold text-[#334155] shadow-card transition hover:-translate-y-0.5 hover:border-accent/35 hover:bg-white"
              >
                <Phone className="h-4 w-4 text-primary" />
                {settings.phone}
              </a>
            </div>

            <dl className="mt-12 grid max-w-[720px] grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "50 km", label: "Einsatzradius", valueClass: "text-[1.8rem] md:text-[2.15rem]" },
                { value: "Bad", label: "Sanitär", valueClass: "text-[1.8rem] md:text-[2.1rem]" },
                { value: "Heizung", label: "Wärme", valueClass: "text-[1.35rem] md:text-[1.75rem]" },
                { value: "Klima", label: "Service", valueClass: "text-[1.65rem] md:text-[2rem]" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-primary/10 bg-white/94 p-4 shadow-card transition hover:-translate-y-1"
                >
                  <dt className={`font-display font-extrabold leading-[0.95] tracking-tight text-[#1f2937] ${item.valueClass}`}>
                    {item.value}
                  </dt>
                  <dd className="mt-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="border-b border-border bg-white/[0.88] backdrop-blur">
        <div className="container-tight grid grid-cols-2 gap-5 py-9 md:grid-cols-4">
          {[
            { icon: Award, title: "Regionaler Fachbetrieb", text: "Wärme- & Sanitärtechnik" },
            { icon: MapPin, title: "Direkt aus 4040 Linz", text: "Reindlstraße 21" },
            { icon: Users, title: "Privat & Gewerbe", text: "Persönlich abgestimmt" },
            { icon: Wrench, title: "Installation & Service", text: "Sanierung bis Reparatur" },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-card hover:shadow-card"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white group-hover:shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl" />
        <div className="absolute bottom-12 right-0 h-80 w-80 rounded-full bg-accent/[0.08] blur-3xl" />
        <div className="container-tight relative">
          <SectionHeader
            eyebrow="Leistungen"
            title="Sanitär, Heizung, Bad und Haustechnik aus einer Hand"
            description="Ob Neuinstallation, Modernisierung, Wartung oder Reparatur: Wir planen nachvollziehbar, arbeiten sauber und betreuen Projekte in Linz sowie rund 50 Kilometer Umgebung."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary shadow-card transition hover:gap-3 hover:border-accent/40 hover:text-accent"
            >
              Alle Leistungen ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 md:py-24">
        <div className="container-tight grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-elegant">
            <img
              src={FALLBACK_PROJECTS[0].image_url || DEFAULT_HERO_IMAGE}
              alt="Modernes Badezimmer als Beispiel für eine Badsanierung"
              className="aspect-[4/3] h-full w-full object-cover"
              loading="lazy"
              width={1200}
              height={900}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-7 pt-24 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                Regional & persönlich
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold">Prammer & Prammer GmbH</p>
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Unternehmen
            </span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">
              Wärme- und Sanitärtechnik mit direktem Ansprechpartner.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Prammer & Prammer GmbH betreibt Installationen sowie den Handel mit Heizungs-,
                Klima- und Sanitärbedarf. Seit Mai 2018 wird außerdem die Tätigkeit des früheren
                Unternehmens Senbad Sanitär e.U. fortgeführt.
              </p>
              <p>
                Unser Anspruch: technische Lösungen verständlich erklären, Leistungen sauber
                abstimmen und Projekte vom Standort in Linz verlässlich begleiten.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ueber-uns"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white shadow-card transition hover:-translate-y-0.5"
              >
                Mehr über uns <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/einsatzgebiete"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 font-bold text-primary transition hover:border-accent/40 hover:text-accent"
              >
                50-km-Einsatzgebiet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader eyebrow="Ablauf" title="Vier klare Schritte bis zur Umsetzung" />
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Anfrage", "Sie schildern Ihr Anliegen telefonisch oder über das Formular."],
              [
                "02",
                "Abstimmung",
                "Wir klären Umfang, Dringlichkeit und die technischen Eckdaten.",
              ],
              [
                "03",
                "Besichtigung",
                "Bei Bedarf prüfen wir die Situation direkt bei Ihnen vor Ort.",
              ],
              [
                "04",
                "Umsetzung",
                "Die vereinbarten Arbeiten werden fachgerecht und sauber ausgeführt.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="premium-lift relative overflow-hidden rounded-2xl border border-border bg-white p-8 md:p-9"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-10 -translate-y-10 rounded-full bg-accent/10 blur-2xl" />
                <p className="font-display text-4xl font-extrabold text-accent">{number}</p>
                <h3 className="mt-6 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-20 md:py-28">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Leistungsbeispiele"
            title="Ein klarer Eindruck von unseren Arbeitsbereichen"
            description="Bad, Sanitär, Heizung und Solartechnik – visuell aufbereitet für eine schnelle Orientierung."
          />
          {usingStockProjects && (
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-muted-foreground">
              Die gezeigten Stockmotive veranschaulichen das Leistungsspektrum. Eigene Projektfotos
              können nach Freigabe jederzeit ergänzt werden.
            </p>
          )}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/referenzen"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary shadow-card transition hover:gap-3 hover:border-accent/40 hover:text-accent"
            >
              Alle Beispiele ansehen <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-24">
        <div className="premium-grid absolute inset-0 opacity-65" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container-tight relative grid items-start gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Einsatzgebiet
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              In Linz und rund 50 Kilometer Umgebung für Sie da.
            </h2>
            <p className="mt-5 max-w-md text-primary-foreground/[0.74]">
              Kurze Wege, persönliche Ansprechpartner und klare Kommunikation für private und
              gewerbliche Projekte.
            </p>
            <Link
              to="/einsatzgebiete"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-accent decoration-2 underline-offset-8"
            >
              Gesamtes Einsatzgebiet <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {locations.slice(0, 9).map((location) => (
              <li
                key={location.id}
                className="rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.13]"
              >
                <p className="font-semibold">{location.name}</p>
                {location.postal_code && (
                  <p className="mt-0.5 text-xs text-primary-foreground/60">
                    PLZ {location.postal_code}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-tight grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              FAQ
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Häufige Fragen
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ihr Anliegen ist nicht dabei?{" "}
              <Link
                to="/kontakt"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Sprechen Sie uns direkt an.
              </Link>
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-4 shadow-card">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-white py-20">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-tight relative max-w-3xl text-center">
          <h2 className="text-balance font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Sie planen eine Installation, Sanierung oder Reparatur?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Schreiben Sie uns kurz, worum es geht. Wir melden uns persönlich und klären den
            passenden nächsten Schritt.
          </p>
          <Link
            to="/kontakt"
            className="premium-shine mt-10 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/95"
          >
            {settings.cta_text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function HeroVisual() {
  const mainImage = FALLBACK_PROJECTS[2].image_url || DEFAULT_HERO_IMAGE;
  const secondImage = FALLBACK_PROJECTS[0].image_url || DEFAULT_HERO_IMAGE;
  const thirdImage = FALLBACK_PROJECTS[4].image_url || DEFAULT_HERO_IMAGE;

  return (
    <div className="relative hidden lg:block">
      <div className="rounded-[2rem] border border-primary/10 bg-white/84 p-5 shadow-elegant backdrop-blur-sm">
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary px-5 py-3 shadow-card">
          <MapPin className="h-4 w-4 text-accent" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Regional erreichbar</p>
            <p className="mt-1 font-display text-xl font-extrabold text-white">Linz · 50 km Umkreis</p>
          </div>
        </div>

        <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.02fr)_minmax(270px,0.98fr)]">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[1.6rem] border border-primary/8 bg-surface shadow-card">
              <img
                src={mainImage}
                alt="Installateur bei Sanitärarbeiten"
                className="h-[335px] w-full object-cover"
                width={960}
                height={720}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-[1.25rem] border border-primary/8 bg-surface shadow-card">
                <img
                  src={secondImage}
                  alt="Modernes Badezimmer"
                  className="h-34 w-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-primary/8 bg-surface shadow-card">
                <img
                  src={thirdImage}
                  alt="Montage einer Solaranlage"
                  className="h-34 w-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[1.9rem] border border-primary/10 bg-white p-6 text-primary shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Leistungsprofil
                </p>
                <h2 className="mt-1 font-display text-[2rem] font-extrabold leading-[1.02] text-primary">
                  Wasser & Wärme
                </h2>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground shadow-glow">
                <Droplets className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sanitär, Heizung, Bad, Klima, Solar und Service – sauber geplant und persönlich betreut.
            </p>
            <div className="mt-5 grid gap-2.5">
              {[
                { icon: ShowerHead, label: "Sanitär" },
                { icon: Flame, label: "Heizung" },
                { icon: Bath, label: "Bad" },
                { icon: Snowflake, label: "Klima" },
                { icon: Sun, label: "Solar" },
                { icon: Thermometer, label: "Service" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-primary/8 bg-surface px-3 py-3"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/[0.08] text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-primary">{label}</span>
                  <CheckCircle2 className="ml-auto h-4 w-4 text-accent" />
                </div>
              ))}
            </div>
          </div>
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
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      )}
      <h2 className="text-balance mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-pretty mt-5 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
