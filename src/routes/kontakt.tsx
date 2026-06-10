import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSeo, useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt Installateur Linz | Prammer & Prammer GmbH" },
      { name: "description", content: "Kontakt zu Prammer & Prammer GmbH in Linz: Anfrage für Sanitär, Heizung, Bad, Service und Wärmetechnik stellen." },
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
  "Heizungstechnik",
  "Wartung / Service",
  "Solar- & Wärmetechnik",
  "Reparatur",
  "Umbau / Neubau",
  "Sonstiges",
];

function ContactPage() {
  useSeo("/kontakt");
  const { settings } = useSiteSettings();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const phone = settings?.phone || "+43 732 282028";
  const email = settings?.email?.trim();
  const address = settings?.address || "Reindlstraße 21, 4040 Linz";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      project_type: fd.get("project_type"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const { consent: _c, ...payload } = parsed.data;
    const { error } = await supabase.from("contact_messages").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      project_type: payload.project_type || null,
      message: payload.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Anfrage konnte nicht gesendet werden. Bitte telefonisch versuchen.");
      return;
    }
    setDone(true);
    toast.success("Vielen Dank! Ihre Anfrage wurde gesendet.");
  }

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Anfrage an Prammer & Prammer GmbH"
        description="Schreiben Sie kurz, wobei Sie Unterstützung benötigen. Wir melden uns persönlich bei Ihnen zurück."
      />

      <section className="container-tight py-20 grid gap-12 lg:grid-cols-[1fr_2fr] items-start">
        <aside className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Direkt kontaktieren</h2>
            <p className="mt-2 text-muted-foreground text-sm">Für Sanitär, Heizung, Bad, Service und Wärmetechnik in Linz.</p>
          </div>
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="premium-lift flex items-start gap-4 rounded-2xl border border-border bg-white p-5 group">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</p>
              <p className="font-semibold">{phone}</p>
            </div>
          </a>
          {email && (
            <a href={`mailto:${email}`} className="premium-lift flex items-start gap-4 rounded-2xl border border-border bg-white p-5 group">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">E-Mail</p>
                <p className="font-semibold">{email}</p>
              </div>
            </a>
          )}
          <div className="premium-lift flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Adresse</p>
              <p className="font-semibold">{address}</p>
            </div>
          </div>
        </aside>

        <div className="rounded-3xl border border-border bg-white p-7 md:p-10 shadow-card">
          {done ? (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 grid place-items-center rounded-2xl bg-accent/15 text-accent text-3xl">✓</div>
              <h3 className="mt-6 font-display text-2xl font-bold">Vielen Dank!</h3>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Ihre Anfrage ist bei uns eingegangen. Wir melden uns persönlich bei Ihnen zurück.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name *" error={errors.name}>
                  <input name="name" required className={inputCls} placeholder="Ihr Name" />
                </Field>
                <Field label="E-Mail *" error={errors.email}>
                  <input type="email" name="email" required className={inputCls} placeholder="name@example.at" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Telefon" error={errors.phone}>
                  <input name="phone" className={inputCls} placeholder="+43 ..." />
                </Field>
                <Field label="Anliegen" error={errors.project_type}>
                  <select name="project_type" className={inputCls} defaultValue="">
                    <option value="">Bitte wählen</option>
                    {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Ihre Nachricht *" error={errors.message}>
                <textarea name="message" required rows={6} className={inputCls} placeholder="Beschreiben Sie kurz Ihr Anliegen, z. B. Bad, Heizung, Reparatur oder Sanierung…" />
              </Field>

              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
                <span className="text-muted-foreground">
                  Ich habe die <a href="/datenschutz" className="text-primary underline-offset-4 hover:underline">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu Kontaktzwecken zu.
                </span>
              </label>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 premium-shine rounded-xl bg-accent px-7 py-4 font-bold text-accent-foreground hover:opacity-90 disabled:opacity-50 shadow-glow"
              >
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet…</> : <><Send className="h-4 w-4" /> Anfrage senden</>}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-destructive">{error}</span>}
    </label>
  );
}
