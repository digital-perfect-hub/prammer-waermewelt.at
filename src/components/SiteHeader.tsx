import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/referenzen", label: "Referenzen" },
  { to: "/einsatzgebiete", label: "Einsatzgebiet" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const { settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const phoneHref = settings.phone.replace(/[^+\d]/g, "");

  const isActive = (to: (typeof NAV)[number]["to"]) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-white/[0.9] shadow-[0_10px_30px_-28px_rgba(8,27,58,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/[0.82]">
      <div className="container-tight flex min-h-[76px] items-center justify-between gap-5 py-3">
        <Link
          to="/"
          className="group flex min-w-0 shrink-0 items-center gap-3"
          aria-label="Prammer & Prammer – Startseite"
        >
          {settings.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.company_name}
              className="h-12 w-auto max-w-[300px] object-contain md:h-14"
            />
          ) : (
            <>
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary text-lg font-black text-primary-foreground shadow-blue-glow">
                <span className="absolute right-0 top-0 h-full w-3 bg-accent" />
                <span className="relative">P</span>
              </span>
              <span className="hidden min-w-0 sm:block leading-tight">
                <span className="block truncate font-display text-[15px] font-extrabold tracking-tight text-primary md:text-base">
                  {settings.company_name}
                </span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.19em] text-muted-foreground">
                  Installateur · Linz
                </span>
              </span>
            </>
          )}
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
          aria-label="Hauptnavigation"
        >
          <div className="flex w-full max-w-[760px] flex-nowrap items-center justify-center gap-1 rounded-full border border-border/80 bg-surface/80 p-1.5">
          {NAV.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] font-semibold transition-all hover:bg-white hover:text-primary ${
                  active ? "bg-white text-[#1f2937] shadow-card" : "text-[#425466]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={`tel:${phoneHref}`}
            className="hidden items-center gap-2 rounded-full border border-primary/[0.12] bg-white px-3.5 py-2.5 text-sm font-bold text-[#334155] transition hover:border-accent/25 hover:bg-accent/[0.08] hover:text-primary lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {settings.phone}
          </a>
          <Link
            to="/kontakt"
            className="premium-shine hidden items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/95 sm:inline-flex"
          >
            Anfrage stellen
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white text-primary shadow-card xl:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-white/[0.98] shadow-card xl:hidden"
        >
          <nav className="container-tight flex flex-col py-4" aria-label="Mobile Navigation">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`border-b border-border/50 py-3 font-semibold last:border-0 ${
                  isActive(item.to) ? "text-accent" : "text-primary"
                }`}
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
