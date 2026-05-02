import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Shield, Target } from "lucide-react";
import { useSeo } from "@/hooks/useSiteSettings";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns – 25 Jahre Handwerkserfahrung" },
      { name: "description", content: "Lernen Sie unseren Familienbetrieb kennen: Meisterqualifikation, geprüfte Mitarbeiter, regionale Verwurzelung." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Award, t: "Meisterqualität", d: "Jeder Auftrag wird von einem geprüften Handwerksmeister begleitet." },
  { icon: Heart, t: "Familienbetrieb", d: "Inhabergeführt in zweiter Generation – Verantwortung statt Schichtdienst." },
  { icon: Shield, t: "Verlässlichkeit", d: "Festpreise, Termintreue, schriftliche Garantie. Keine Überraschungen." },
  { icon: Target, t: "Regional verwurzelt", d: "Kurze Wege, persönliche Ansprechpartner, dauerhafte Verfügbarkeit." },
];

function AboutPage() {
  useSeo("/ueber-uns");
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Handwerk aus Überzeugung – seit 1998"
        description="Was als kleine Werkstatt begann, ist heute ein Meisterbetrieb mit über 30 Mitarbeitern. Geblieben ist die Haltung: ehrliche Arbeit, ehrliche Preise."
      />

      <section className="container-tight py-20 grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Unsere Geschichte</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight">
            Drei Generationen, ein Anspruch.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              1998 gründete Maurermeister Hans Mustermann unseren Betrieb mit einer einfachen
              Überzeugung: Bauen ist Vertrauenssache. Dieser Grundsatz prägt uns bis heute.
            </p>
            <p>
              Heute realisieren wir mit über 30 festangestellten Mitarbeitern – Meister, Gesellen
              und Auszubildende – jährlich rund 80 Projekte zwischen Berlin und Brandenburg.
            </p>
            <p>
              Unser Versprechen: Wir nehmen nur so viele Aufträge an, wie wir mit eigener Mannschaft
              in Topqualität umsetzen können. Keine Subunternehmer, keine Kompromisse.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {VALUES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-lg border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border-y border-border py-16">
        <div className="container-tight grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["1998", "Gründung"], ["30+", "Mitarbeiter"], ["500+", "Projekte"], ["98%", "Weiterempfehlung"]].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl md:text-5xl font-extrabold text-primary">{n}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
