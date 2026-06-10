import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/leistungen", label: "Sanitär" },
  { to: "/leistungen", label: "Heizung" },
  { to: "/referenzen", label: "Referenzen" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const { settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const phoneHref = settings?.phone ? settings.phone.replace(/[^+\d]/g, "") : "+43732282028";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-white/[0.86] shadow-[0_10px_30px_-28px_rgba(8,27,58,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/[0.78]">
      <div className="container-tight flex h-18 items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-3 font-display font-extrabold text-lg tracking-tight">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={settings.company_name} className="h-10 w-auto" />
          ) : (
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-primary text-primary-foreground font-black shadow-blue-glow">
              <span className="absolute right-0 top-0 h-full w-3 bg-accent" />
              <span className="relative">P</span>
            </span>
          )}
          <span className="hidden sm:inline leading-tight">
            <span className="block text-primary">{settings?.company_name ?? "Prammer & Prammer GmbH"}</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Installateur Linz</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border/80 bg-surface/80 p-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={`${item.to}-${item.label}`}
                to={item.to}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-white hover:text-primary ${
                  active ? "bg-white text-primary shadow-card" : "text-ink-soft"
                }`}
              >
                {item.label}
                {active && <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneHref}`}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/[0.12] bg-primary/5 px-4 py-2.5 text-sm font-bold text-primary transition hover:border-accent/25 hover:bg-accent/[0.08] hover:text-accent"
          >
            <Phone className="h-4 w-4" />
            {settings?.phone ?? "+43 732 282028"}
          </a>
          <Link
            to="/kontakt"
            className="premium-shine hidden sm:inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/95"
          >
            Anfrage stellen
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-border bg-white text-primary shadow-card"
            aria-label="Menü"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white/[0.98] shadow-card">
          <nav className="container-tight flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={`${item.to}-${item.label}`}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 font-semibold border-b border-border/50 last:border-0 text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={`tel:${phoneHref}`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 font-bold text-primary"
              >
                Anrufen
              </a>
              <Link
                to="/kontakt"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-3 font-bold text-accent-foreground shadow-glow"
              >
                Anfrage
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
