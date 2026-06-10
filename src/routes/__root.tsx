import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-extrabold text-primary">404</p>
        <h2 className="mt-4 font-display text-2xl font-bold">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Die gewünschte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Installateur Linz | Prammer & Prammer GmbH" },
      { name: "description", content: "Sanitär, Heizung, Bad & Wärmetechnik in Linz. Prammer & Prammer GmbH – Ihr Installateur in 4040 Linz." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_AT" },
      { property: "og:title", content: "Installateur Linz | Prammer & Prammer GmbH" },
      { property: "og:description", content: "Sanitär, Heizung, Bad & Wärmetechnik in Linz. Prammer & Prammer GmbH – Ihr Installateur in 4040 Linz." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Epilogue:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 text-foreground md:pb-0">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <MobileStickyCta />
      <Toaster richColors position="top-center" />
    </div>
  );
}
