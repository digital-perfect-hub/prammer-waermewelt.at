import { createFileRoute } from "@tanstack/react-router";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({ meta: [{ title: "Datenschutz" }, { name: "description", content: "Datenschutzerklärung gemäß DSGVO." }] }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  useSeo("/datenschutz");
  const { settings } = useSiteSettings();
  return (
    <>
      <PageHero title="Datenschutzerklärung" />
      <section className="container-tight py-16 max-w-3xl space-y-10">
        <Block title="1. Verantwortlicher">
          <p>{settings?.company_name ?? "Mustermann Bau & Sanierung GmbH"}<br />{settings?.address}<br />E-Mail: {settings?.email}</p>
        </Block>
        <Block title="2. Erhebung und Speicherung personenbezogener Daten">
          <p>Bei der Nutzung des Kontaktformulars erheben wir folgende Daten: Name, E-Mail-Adresse, Telefonnummer (optional), Projektart und Nachricht. Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b und f DSGVO.</p>
        </Block>
        <Block title="3. Speicherdauer">
          <p>Ihre Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind, spätestens nach Ablauf gesetzlicher Aufbewahrungsfristen.</p>
        </Block>
        <Block title="4. Ihre Rechte">
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an unsere oben genannten Kontaktdaten.</p>
        </Block>
        <Block title="5. Beschwerderecht bei der Aufsichtsbehörde">
          <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über unsere Verarbeitung Ihrer personenbezogenen Daten zu beschweren.</p>
        </Block>
        <Block title="6. SSL-Verschlüsselung">
          <p>Diese Seite nutzt aus Gründen der Sicherheit eine SSL-Verschlüsselung. Sie erkennen sie an "https://" in der Adresszeile Ihres Browsers.</p>
        </Block>
        <Block title="7. Hosting">
          <p>Das Hosting dieser Website wird durch einen Auftragsverarbeiter bereitgestellt, mit dem ein entsprechender Vertrag gemäß Art. 28 DSGVO besteht.</p>
        </Block>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
