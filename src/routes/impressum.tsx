import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { COMPANY } from "@/data/siteContent";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | Prammer & Prammer GmbH" },
      {
        name: "description",
        content: "Impressum und Anbieterkennzeichnung der Prammer & Prammer GmbH in Linz.",
      },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  useSeo("/impressum");
  const { settings } = useSiteSettings();
  const email = settings.email?.trim() || COMPANY.email;
  const phone = settings.phone || COMPANY.phone;
  const address = settings.address || COMPANY.address;

  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        description="Anbieterkennzeichnung der Prammer & Prammer GmbH."
      />
      <section className="container-tight max-w-3xl py-16 md:py-20">
        <div className="space-y-8 rounded-3xl border border-border bg-white p-7 shadow-card md:p-10">
          <Block title="Medieninhaber und Diensteanbieter">
            <p>
              <strong>{settings.company_name || COMPANY.name}</strong>
            </p>
            <p>{address}</p>
            <p>Österreich</p>
          </Block>

          <Block title="Unternehmensgegenstand">
            <p>Installationen sowie Handel mit Heizungs-, Klima- und Sanitärbedarf.</p>
          </Block>

          <Block title="Vertretungsberechtigte Geschäftsführung">
            <p>Rudolf Prammer und Doris Prammer</p>
          </Block>

          <Block title="Kontakt">
            <p>
              Telefon:{" "}
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="text-primary hover:underline"
              >
                {phone}
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${email}`} className="text-primary hover:underline">
                {email}
              </a>
            </p>
          </Block>

          <Block title="Firmenbuch und Umsatzsteuer">
            <p>Firmenbuchnummer: FN 414661 x</p>
            <p>Firmenbuchgericht: Landesgericht Linz</p>
            <p>UID-Nummer: ATU68772937</p>
          </Block>

          <Block title="Mitgliedschaft und Aufsichtsbehörde">
            <p>
              Mitglied der Wirtschaftskammer Oberösterreich, Landesinnung der Sanitär-, Heizungs-
              und Lüftungstechniker.
            </p>
            <p>Aufsichtsbehörde: Magistrat der Stadt Linz</p>
          </Block>

          <Block title="Berufsrecht">
            <p>
              Berufsbezeichnung: Installateur. Anwendbare Rechtsvorschriften sind insbesondere die
              Gewerbeordnung 1994. Diese sind über das Rechtsinformationssystem des Bundes unter{" "}
              <a
                href="https://www.ris.bka.gv.at"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                ris.bka.gv.at
              </a>{" "}
              abrufbar.
            </p>
          </Block>

          <Block title="Alternative Streitbeilegung">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold">{title}</h2>
      <div className="space-y-1 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
