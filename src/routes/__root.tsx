import type { ReactNode } from "react";
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Installateur Linz | Prammer & Prammer GmbH" },
      {
        name: "description",
        content:
          "Prammer & Prammer GmbH: Sanitär, Heizung, Bad, Klima und Service in Linz sowie rund 50 km Umgebung.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_AT" },
      { property: "og:title", content: "Installateur Linz | Prammer & Prammer GmbH" },
      {
        property: "og:description",
        content: "Sanitär, Heizung, Bad, Klima und Service in Linz sowie rund 50 km Umgebung.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <MobileStickyCta />
      <Toaster richColors position="top-right" />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container-tight flex min-h-[65vh] flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Fehler 404</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
        Diese Seite wurde nicht gefunden.
      </h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Der aufgerufene Inhalt ist nicht verfügbar. Über die Startseite gelangen Sie zurück zu allen
        Leistungen und Kontaktmöglichkeiten.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5"
      >
        Zur Startseite
      </Link>
    </div>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de-AT">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
