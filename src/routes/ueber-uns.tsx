import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, HeartHandshake, MapPin, ShieldCheck, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { COMPANY, FALLBACK_PROJECTS } from "@/data/siteContent";
import { useSeo } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über Prammer & Prammer | Installateur Linz" },
      {
        name: "description",
        content:
          "Prammer & Prammer GmbH aus Linz: Installationen und Handel mit Heizungs-, Klima- und Sanitärbedarf seit Übernahme von Senbad 2018.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: Award,
    title: "Fachgerechte Planung",
    description:
      "Technische Anforderungen werden vor der Umsetzung verständlich geklärt und auf das jeweilige Gebäude abgestimmt.",
  },
  {
    icon: HeartHandshake,
    title: "Persönliche Abstimmung",
    description:
      "Direkte Kontaktwege, klare Aussagen und ein Ansprechpartner, der das Projekt und die nächsten Schritte kennt.",
  },
  {
    icon: ShieldCheck,
    title: "Saubere Ausführung",
    description:
      "Wir legen Wert auf präzise Anschlüsse, nachvollziehbare Arbeitsschritte und einen ordentlichen Abschluss vor Ort.",
  },
  {
    icon: Target,
    title: "Regional erreichbar",
    description: `Vom Standort in Linz betreuen wir Projekte in einem Umkreis von rund ${COMPANY.radiusKm} Kilometern.`,
  },
];

function AboutPage() {
  useSeo("/ueber-uns");
  const image = FALLBACK_PROJECTS[2].image_url;

  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Prammer & Prammer – Wasser, Wärme und Haustechnik aus Linz"
        description="Ein regionaler Fachbetrieb für Installationen sowie den Handel mit Heizungs-, Klima- und Sanitärbedarf."
      />

      <section className="container-tight grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Unternehmen</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
            Erfahrung aus der Region, Lösungen für moderne Gebäude.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Die Prammer & Prammer GmbH hat ihren Sitz in der Reindlstraße 21 in 4040 Linz.
              Betrieben werden Installationen sowie der Handel mit Heizungs-, Klima- und
              Sanitärbedarf.
            </p>
            <p>
              Im Mai 2018 wurde die Tätigkeit des nahestehenden Unternehmens Senbad Sanitär e.U.
              übernommen. Damit verbindet der Betrieb gewachsene Erfahrung mit einem zeitgemäßen
              Leistungsangebot für Sanitär, Bad, Heizung, Klima, Service und Wärmetechnik.
            </p>
            <p>
              Im Mittelpunkt stehen eine klare technische Abstimmung, realistische Lösungen und eine
              saubere Ausführung – für private Haushalte ebenso wie für gewerbliche Auftraggeber.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white shadow-card transition hover:-translate-y-0.5"
            >
              Leistungen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 font-bold text-primary transition hover:border-accent/40 hover:text-accent"
            >
              Persönlich anfragen
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-elegant">
            {image && (
              <img
                src={image}
                alt="Installateur bei fachgerechten Sanitärarbeiten"
                className="h-[480px] w-full rounded-[1.5rem] object-cover"
                width={1000}
                height={1200}
              />
            )}
            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-primary/90 p-5 text-white shadow-card backdrop-blur">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Standort & Einsatzgebiet
                  </p>
                  <p className="mt-1 font-display text-lg font-extrabold">
                    Linz · rund {COMPANY.radiusKm} km Umgebung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-20">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Unsere Arbeitsweise
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">
              Verlässlich vom ersten Gespräch bis zur Umsetzung
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="premium-lift rounded-2xl border border-border bg-card p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-tight grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            ["4040", "Standort Linz"],
            ["2018", "Senbad übernommen"],
            ["50 km", "Einsatzradius"],
            ["Privat & Gewerbe", "Kundengruppen"],
          ].map(([number, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                {number}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
