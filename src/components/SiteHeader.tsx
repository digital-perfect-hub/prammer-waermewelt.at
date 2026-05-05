import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/referenzen", label: "Referenzen" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/einsatzgebiete", label: "Einsatzgebiete" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const { settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-tight flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 font-display font-extrabold text-lg tracking-tight">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={settings.company_name} className="h-9 w-auto" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-black">
              P
            </span>
          )}
          <span className="hidden sm:inline">
            {settings?.company_name ?? "Prammer & Prammer"}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {settings?.phone && (
            <a
              href={`tel:${settings.phone.replace(/\s+/g, "")}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
          )}
          <Link
            to="/kontakt"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 shadow-glow"
          >
            Anfrage stellen
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
            aria-label="Menü"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-tight flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 font-medium border-b border-border/40 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/kontakt"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 font-semibold text-accent-foreground"
            >
              Kostenlose Anfrage
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
