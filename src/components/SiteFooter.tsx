import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function SiteFooter() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();
  const phone = settings?.phone || "+43 732 282028";
  const email = settings?.email?.trim();
  const address = settings?.address || "Reindlstraße 21, 4040 Linz";

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="premium-grid absolute inset-0 opacity-55" />
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="container-tight relative py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary font-display text-xl font-black shadow-blue-glow">
            P
          </div>
          <p className="font-display text-xl font-extrabold">
            {settings?.company_name ?? "Prammer & Prammer GmbH"}
          </p>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-xs">
            Ihr Installateur in Linz für Sanitär, Heizung, Bad, Service und Wärme-/Solartechnik.
          </p>
        </div>

        <div>
          <p className="font-bold mb-4 text-sm uppercase tracking-widest text-white">
            Kontakt
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-accent transition-colors">{phone}</a>
            </li>
            {email && (
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
              </li>
            )}
            <li className="flex gap-3"><MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />{address}</li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-4 text-sm uppercase tracking-widest text-white">
            Leistungen
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Sanitärinstallation</Link></li>
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Heizungstechnik</Link></li>
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Badsanierung</Link></li>
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Solar- & Wärmetechnik</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-4 text-sm uppercase tracking-widest text-white">
            Unternehmen
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/ueber-uns" className="hover:text-accent transition-colors">Über uns</Link></li>
            <li><Link to="/referenzen" className="hover:text-accent transition-colors">Referenzen</Link></li>
            <li><Link to="/einsatzgebiete" className="hover:text-accent transition-colors">Einsatzgebiete</Link></li>
            <li><Link to="/kontakt" className="hover:text-accent transition-colors">Kontakt</Link></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10">
        <div className="container-tight flex flex-col sm:flex-row justify-between gap-3 py-6 text-xs text-primary-foreground/60">
          <p>© {year} {settings?.company_name ?? "Prammer & Prammer GmbH"}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-5">
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link to="/admin" className="opacity-60 hover:opacity-100">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
