import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { COMPANY } from "@/data/siteContent";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | Prammer & Prammer GmbH" },
      { name: "description", content: "Datenschutzerklärung der Prammer & Prammer GmbH in Linz." },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  useSeo("/datenschutz");
  const { settings } = useSiteSettings();
  const email = settings.email?.trim() || COMPANY.email;
  const address = settings.address || COMPANY.address;

  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        description="Informationen zur Verarbeitung personenbezogener Daten auf dieser Website."
      />
      <section className="container-tight max-w-3xl py-16 md:py-20">
        <div className="space-y-10 rounded-3xl border border-border bg-white p-7 shadow-card md:p-10">
          <Block title="1. Verantwortlicher">
            <p>
              {settings.company_name || COMPANY.name}
              <br />
              {address}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${email}`} className="text-primary hover:underline">
                {email}
              </a>
            </p>
          </Block>

          <Block title="2. Kontaktformular und Anfragen">
            <p>
              Wenn Sie das Kontaktformular nutzen oder uns per E-Mail beziehungsweise Telefon
              kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten zur Bearbeitung Ihrer
              Anfrage und für mögliche Anschlussfragen. Dazu können Name, E-Mail-Adresse,
              Telefonnummer, Projektart und Nachrichteninhalt gehören.
            </p>
            <p>
              Die Verarbeitung erfolgt je nach Inhalt der Anfrage auf Grundlage von Art. 6 Abs. 1
              lit. b oder lit. f DSGVO.
            </p>
          </Block>

          <Block title="3. Technische Zugriffsdaten">
            <p>
              Beim Aufruf der Website können technisch notwendige Zugriffsdaten verarbeitet werden,
              etwa IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, Browsertyp und
              Betriebssystem. Die Verarbeitung dient der sicheren und stabilen Bereitstellung der
              Website.
            </p>
          </Block>

          <Block title="4. Hosting und Auftragsverarbeitung">
            <p>
              Die Website und ihre technischen Funktionen werden über externe Dienstleister
              bereitgestellt. Soweit diese personenbezogene Daten in unserem Auftrag verarbeiten,
              erfolgt dies auf Grundlage entsprechender Vereinbarungen gemäß Art. 28 DSGVO.
            </p>
          </Block>

          <Block title="5. Speicherdauer">
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Bearbeitung der
              Anfrage, zur Erfüllung gesetzlicher Pflichten oder zur Wahrung berechtigter Interessen
              erforderlich ist. Danach werden sie gelöscht oder anonymisiert.
            </p>
          </Block>

          <Block title="6. Ihre Rechte">
            <p>
              Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft,
              Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
              Widerspruch. Zur Ausübung Ihrer Rechte wenden Sie sich an die oben genannte
              Kontaktadresse.
            </p>
          </Block>

          <Block title="7. Beschwerderecht">
            <p>
              Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren. In Österreich ist
              dies die Österreichische Datenschutzbehörde.
            </p>
          </Block>

          <Block title="8. Verschlüsselte Übertragung">
            <p>
              Diese Website nutzt eine verschlüsselte HTTPS-Verbindung. Dadurch werden übermittelte
              Inhalte während der Übertragung vor dem unbefugten Zugriff Dritter geschützt.
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
      <div className="space-y-2 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
