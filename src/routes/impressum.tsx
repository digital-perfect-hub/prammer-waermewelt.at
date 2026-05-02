import { createFileRoute } from "@tanstack/react-router";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum" }, { name: "description", content: "Impressum und Anbieterkennzeichnung." }] }),
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
          <Block title="Angaben gemäß § 5 TMG">
            <p><strong>{settings?.company_name ?? "Mustermann Bau & Sanierung GmbH"}</strong></p>
            <p>{settings?.address ?? "Industriestraße 12, 10115 Berlin"}</p>
          </Block>
          <Block title="Vertreten durch">
            <p>Geschäftsführer: Max Mustermann</p>
          </Block>
          <Block title="Kontakt">
            <p>Telefon: {settings?.phone ?? "+49 30 1234 5678"}</p>
            <p>E-Mail: {settings?.email ?? "info@mustermann-bau.de"}</p>
          </Block>
          <Block title="Registereintrag">
            <p>Eintragung im Handelsregister<br />Registergericht: Amtsgericht Berlin-Charlottenburg<br />Registernummer: HRB 123456</p>
          </Block>
          <Block title="Umsatzsteuer-ID">
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE123456789</p>
          </Block>
          <Block title="Berufshaftpflichtversicherung">
            <p>Musterversicherung AG, Musterstraße 1, 10115 Berlin<br />Geltungsraum: Deutschland</p>
          </Block>
          <Block title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
            <p>Max Mustermann, Anschrift wie oben</p>
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
