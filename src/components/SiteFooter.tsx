import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Radius } from "lucide-react";
import { COMPANY } from "@/data/siteContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function SiteFooter() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();
  const phone = settings.phone || COMPANY.phone;
  const email = settings.email?.trim() || COMPANY.email;
  const address = settings.address || COMPANY.address;

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="premium-grid absolute inset-0 opacity-55" />
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="container-tight relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white font-display text-xl font-black text-primary shadow-blue-glow">
            P
          </div>
          <p className="font-display text-xl font-extrabold">
            {settings.company_name || COMPANY.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Ihr regionaler Fachbetrieb für Sanitär, Heizung, Bad, Klima, Service sowie Wärme- und
            Solartechnik.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-2 text-xs font-bold text-white/85">
            <Radius className="h-4 w-4 text-accent" />
            Linz und rund {COMPANY.radiusKm} km Umgebung
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Kontakt</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="transition-colors hover:text-accent"
              >
                {phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${email}`} className="break-all transition-colors hover:text-accent">
                {email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{address}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Leistungen</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/leistungen" className="transition-colors hover:text-accent">
                Sanitärinstallationen
              </Link>
            </li>
            <li>
              <Link to="/leistungen" className="transition-colors hover:text-accent">
                Heizung & Wärmetechnik
              </Link>
            </li>
            <li>
              <Link to="/leistungen" className="transition-colors hover:text-accent">
                Badsanierungen
              </Link>
            </li>
            <li>
              <Link to="/leistungen" className="transition-colors hover:text-accent">
                Klima, Solar & Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Unternehmen</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/ueber-uns" className="transition-colors hover:text-accent">
                Über uns
              </Link>
            </li>
            <li>
              <Link to="/referenzen" className="transition-colors hover:text-accent">
                Leistungsbeispiele
              </Link>
            </li>
            <li>
              <Link to="/einsatzgebiete" className="transition-colors hover:text-accent">
                Einsatzgebiet
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="transition-colors hover:text-accent">
                Kontakt & Anfrage
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10">
        <div className="container-tight flex flex-col justify-between gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {year} {settings.company_name || COMPANY.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-5">
            <Link to="/impressum" className="transition-colors hover:text-white">
              Impressum
            </Link>
            <Link to="/datenschutz" className="transition-colors hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
