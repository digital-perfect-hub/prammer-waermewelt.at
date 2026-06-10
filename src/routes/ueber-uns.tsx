import { createFileRoute } from "@tanstack/react-router";
import { Award, HeartHandshake, Shield, Target } from "lucide-react";
import { useSeo } from "@/hooks/useSiteSettings";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über Prammer & Prammer GmbH | Installateur Linz" },
      { name: "description", content: "Prammer & Prammer GmbH aus Linz: Installationen, Sanitär, Heizung, Klima- und Sanitärbedarf sowie Wärme- und Solartechnik." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Award, t: "Fachliche Ausführung", d: "Installationsarbeiten brauchen saubere Planung, präzise Umsetzung und verlässliche Abstimmung." },
  { icon: HeartHandshake, t: "Persönlicher Kontakt", d: "Klare Kommunikation statt anonymer Massenabwicklung – besonders wichtig bei Bad, Heizung und Service." },
  { icon: Shield, t: "Verlässlichkeit", d: "Wir setzen auf nachvollziehbare Angebote, saubere Dokumentation und lösungsorientierte Arbeit." },
  { icon: Target, t: "Regional verwurzelt", d: "Sitz in Linz, kurze Wege im Zentralraum Oberösterreich und ein realistischer Blick auf jedes Projekt." },
];

function AboutPage() {
  useSeo("/ueber-uns");
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Prammer & Prammer GmbH – Installateur aus Linz"
        description="Ein regionaler Fachbetrieb für Installationen, Sanitär, Heizung, Bad sowie Wärme- und Solartechnik."
      />

      <section className="container-tight py-20 grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Unternehmen</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight">
            Wasser, Wärme und Sanitär mit klarem Qualitätsanspruch.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Prammer & Prammer GmbH ist in Linz ansässig und im Bereich Installationen sowie Handel mit Heizung-, Klima- und Sanitärbedarf tätig.
            </p>
            <p>
              Der Fokus der Website liegt bewusst auf den Themen, die Kundinnen und Kunden schnell verstehen: Sanitärinstallation, Badsanierung, Heizungstechnik, Wärmelösungen und Service.
            </p>
            <p>
              Statt großer Werbeversprechen zählt ein seriöser Auftritt: klare Leistungen, direkte Kontaktwege, regionale Nähe und ein professioneller erster Eindruck.
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
          {[["Linz", "Standort"], ["4040", "Postleitzahl"], ["Sanitär", "Kernleistung"], ["Heizung", "Wärmetechnik"]].map(([n, l]) => (
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
