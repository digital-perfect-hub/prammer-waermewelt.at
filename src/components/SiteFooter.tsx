import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function SiteFooter() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-extrabold">
            {settings?.company_name ?? "Prammer & Prammer GmbH"}
          </p>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-xs">
            Ihr Installateur-Meisterbetrieb für Sanitär, Heizung und Bad in Linz und ganz Oberösterreich – seit über 25 Jahren.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-4 text-sm uppercase tracking-widest text-accent">
            Kontakt
          </p>
          <ul className="space-y-3 text-sm">
            {settings?.phone && (
              <li className="flex gap-3"><Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />{settings.phone}</li>
            )}
            {settings?.email && (
              <li className="flex gap-3"><Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />{settings.email}</li>
            )}
            {settings?.address && (
              <li className="flex gap-3"><MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />{settings.address}</li>
            )}
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-4 text-sm uppercase tracking-widest text-accent">
            Leistungen
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/leistungen">Sanitärinstallation</Link></li>
            <li><Link to="/leistungen">Badsanierung</Link></li>
            <li><Link to="/leistungen">Heizungstechnik</Link></li>
            <li><Link to="/leistungen">Wärmepumpen</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-4 text-sm uppercase tracking-widest text-accent">
            Unternehmen
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/ueber-uns">Über uns</Link></li>
            <li><Link to="/referenzen">Referenzen</Link></li>
            <li><Link to="/einsatzgebiete">Einsatzgebiete</Link></li>
            <li><Link to="/kontakt">Kontakt</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-tight flex flex-col sm:flex-row justify-between gap-3 py-6 text-xs text-primary-foreground/60">
          <p>© {year} {settings?.company_name ?? "Prammer & Prammer GmbH"}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-5">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
            <Link to="/admin" className="opacity-60 hover:opacity-100">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
