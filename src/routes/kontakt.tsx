import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Loader2, Mail, MapPin, Phone, Radius, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { COMPANY } from "@/data/siteContent";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt Installateur Linz | Prammer & Prammer" },
      {
        name: "description",
        content:
          "Prammer & Prammer in Linz kontaktieren: Anfrage für Sanitär, Heizung, Bad, Klima und Service im Umkreis von rund 50 km.",
      },
    ],
  }),
  component: ContactPage,
});

const Schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(200),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(254),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  project_type: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Mindestens 10 Zeichen").max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: "Bitte Datenschutz akzeptieren" }) }),
});

const PROJECT_TYPES = [
  "Sanitärinstallation",
  "Badsanierung",
  "Heizung & Wärmetechnik",
  "Klima- & Haustechnik",
  "Solar- & Warmwassertechnik",
  "Wartung / Service",
  "Reparatur",
  "Umbau / Neubau",
  "Material- oder Produktanfrage",
  "Sonstiges",
];

function ContactPage() {
  useSeo("/kontakt");
  const { settings } = useSiteSettings();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const phone = settings.phone || COMPANY.phone;
  const email = settings.email?.trim() || COMPANY.email;
  const address = settings.address || COMPANY.address;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const parsed = Schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      project_type: formData.get("project_type"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on",
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        nextErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    const { consent: _consent, ...payload } = parsed.data;
    const { error } = await supabase.from("contact_messages").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      project_type: payload.project_type || null,
      message: payload.message,
    });
    setSubmitting(false);

    if (error) {
      toast.error(
        "Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns an oder schreiben Sie eine E-Mail.",
      );
      return;
    }

    setDone(true);
    toast.success("Vielen Dank! Ihre Anfrage wurde gesendet.");
  }

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen wir über Ihr Projekt"
        description="Schildern Sie uns kurz Ihr Anliegen, den Objektstandort und den gewünschten Zeitraum. Wir melden uns persönlich bei Ihnen zurück."
      />

      <section className="container-tight grid items-start gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.8fr]">
        <aside className="space-y-5">
          <div className="mb-7">
            <h2 className="font-display text-2xl font-bold">Direkt erreichbar</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Für Sanitär, Heizung, Bad, Klima, Service und Wärmetechnik in Linz und rund{" "}
              {COMPANY.radiusKm} Kilometern Umgebung.
            </p>
          </div>

          <ContactCard
            icon={Phone}
            eyebrow="Telefon"
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            text={phone}
          />
          <ContactCard icon={Mail} eyebrow="E-Mail" href={`mailto:${email}`} text={email} />
          <ContactCard
            icon={MapPin}
            eyebrow="Betriebsadresse"
            href={mapsHref}
            text={address}
            external
          />

          <div className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-secondary/70 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
              <Radius className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Einsatzgebiet
              </p>
              <p className="mt-1 font-semibold text-primary">
                Linz und rund {COMPANY.radiusKm} km Umgebung
              </p>
              <Link
                to="/einsatzgebiete"
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
              >
                Orte ansehen <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="rounded-3xl border border-border bg-white p-7 shadow-card md:p-10">
          {done ? (
            <div className="py-12 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-3xl text-accent">
                ✓
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">
                Vielen Dank für Ihre Anfrage.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Ihre Nachricht ist bei uns eingegangen. Prammer & Prammer meldet sich persönlich bei
                Ihnen zurück.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Projektanfrage
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold">
                  Wobei dürfen wir Sie unterstützen?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Je genauer die Angaben, desto gezielter können wir den nächsten Schritt
                  einschätzen.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name *" error={errors.name}>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Vor- und Nachname"
                  />
                </Field>
                <Field label="E-Mail *" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="name@beispiel.at"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Telefon" error={errors.phone}>
                  <input
                    name="phone"
                    autoComplete="tel"
                    className={inputClass}
                    placeholder="+43 ..."
                  />
                </Field>
                <Field label="Anliegen" error={errors.project_type}>
                  <select name="project_type" className={inputClass} defaultValue="">
                    <option value="">Bitte auswählen</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Ihre Nachricht *" error={errors.message}>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className={inputClass}
                  placeholder="Zum Beispiel: Badsanierung in 4040 Linz, gewünschter Zeitraum, aktueller Zustand und besondere Anforderungen …"
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                />
                <span className="text-muted-foreground">
                  Ich habe die{" "}
                  <Link
                    to="/datenschutz"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung der Anfrage zu.
                </span>
              </label>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="premium-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 font-bold text-accent-foreground shadow-glow hover:opacity-90 disabled:opacity-50 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet …
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Anfrage senden
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  eyebrow,
  href,
  text,
  external = false,
}: {
  icon: typeof Phone;
  eyebrow: string;
  href: string;
  text: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="premium-lift group flex items-start gap-4 rounded-2xl border border-border bg-white p-5"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <p className="mt-1 break-words font-semibold">{text}</p>
      </div>
      {external && <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />}
    </a>
  );
}

const inputClass =
  "w-full rounded-xl border border-input bg-white px-4 py-3 text-sm shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
