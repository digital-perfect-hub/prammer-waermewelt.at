import { createFileRoute } from "@tanstack/react-router";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum | Prammer & Prammer GmbH" }, { name: "description", content: "Impressum und Anbieterkennzeichnung." }] }),
  component: ImpressumPage,
});

function ImpressumPage() {
  useSeo("/impressum");
  const { settings } = useSiteSettings();
  return (
    <>
      <PageHero title="Impressum" />
      <section className="container-tight py-16 max-w-3xl">
        <div className="prose-style space-y-8 text-foreground">
          <Block title="Angaben gemäß § 5 ECG / § 14 UGB">
            <p><strong>{settings?.company_name ?? "Prammer & Prammer GmbH"}</strong></p>
            <p>{settings?.address ?? "Reindlstraße 21, 4040 Linz"}</p>
            <p>Österreich</p>
          </Block>
          <Block title="Vertreten durch">
            <p>Geschäftsführer: Ing. Stefan Prammer</p>
          </Block>
          <Block title="Kontakt">
            <p>Telefon: {settings?.phone ?? "+43 732 123456"}</p>
            <p>E-Mail: {settings?.email ?? "office@prammer-installationen.at"}</p>
          </Block>
          <Block title="Firmenbuch">
            <p>Firmenbuchnummer: FN 123456 a<br />Firmenbuchgericht: Landesgericht Linz</p>
          </Block>
          <Block title="Umsatzsteuer-ID">
            <p>UID-Nummer: ATU12345678</p>
          </Block>
          <Block title="Mitgliedschaften & Behörde">
            <p>Mitglied der Wirtschaftskammer Oberösterreich, Landesinnung der Sanitär-, Heizungs- und Lüftungstechniker.<br />
            Aufsichtsbehörde: Magistrat der Stadt Linz</p>
          </Block>
          <Block title="Berufsbezeichnung & Berufsrechtliche Regelungen">
            <p>Installateur (verliehen in Österreich), tätig nach der Gewerbeordnung 1994 (GewO) – einsehbar auf <a href="https://www.ris.bka.gv.at" className="text-primary underline-offset-4 hover:underline">www.ris.bka.gv.at</a>.</p>
          </Block>
          <Block title="Streitschlichtung">
            <p className="text-muted-foreground">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr" className="text-primary underline-offset-4 hover:underline">https://ec.europa.eu/consumers/odr</a>.
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
      <h2 className="font-display text-xl font-bold mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-1">{children}</div>
    </section>
  );
}
