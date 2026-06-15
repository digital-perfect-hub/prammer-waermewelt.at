import type { ReactNode } from "react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function MaintenancePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03172d] text-white">
      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -14px, 0) scale(1.025); }
        }
        @keyframes pulseLine {
          0% { transform: translateX(-55%); opacity: .25; }
          50% { opacity: 1; }
          100% { transform: translateX(55%); opacity: .25; }
        }
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.7); opacity: .45; }
        }
        @keyframes progressGrow {
          from { width: 0%; }
          to { width: 95%; }
        }
        @keyframes shimmerRun {
          from { transform: translateX(-120%); }
          to { transform: translateX(220%); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(84,202,213,0.30),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(219,209,43,0.22),transparent_28%),radial-gradient(circle_at_80%_85%,rgba(84,202,213,0.16),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#54cad5]/20 blur-3xl" style={{ animation: "floatSoft 7s ease-in-out infinite" }} />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-[#dbd12b]/16 blur-3xl" style={{ animation: "floatSoft 8s ease-in-out infinite reverse" }} />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <section className="grid w-full max-w-6xl items-stretch gap-6 lg:grid-cols-[1.02fr_.78fr]">
          <div className="relative overflow-hidden rounded-[2.1rem] border border-white/12 bg-white/[0.08] p-7 shadow-[0_32px_110px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-10 lg:p-12">
            <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#54cad5]/18 blur-3xl" />
            <div className="absolute -bottom-36 left-10 h-72 w-72 rounded-full bg-[#dbd12b]/12 blur-3xl" />

            <div className="relative flex flex-col gap-10">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                <img
                  src="/prammer-prammer-logo.png"
                  alt="Prammer & Prammer GmbH"
                  className="h-auto w-full max-w-[360px] drop-shadow-[0_18px_38px_rgba(0,0,0,.32)] sm:max-w-[410px]"
                />
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#54cad5]/30 bg-[#54cad5]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#c9fbff]">
                  <span className="h-2 w-2 rounded-full bg-[#dbd12b] shadow-[0_0_18px_rgba(219,209,43,.85)]" />
                  Website-Update
                </div>
              </div>

              <div>
                <p className="mb-5 inline-flex rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-white/70">
                  Prammer &amp; Prammer GmbH · Linz
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                  Wir bauen gerade etwas Neues für Sie.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
                  Unsere Website wird aktuell modernisiert. In Kürze sind alle Informationen wieder vollständig erreichbar — frischer, klarer und übersichtlicher.
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.65rem] border border-[#54cad5]/20 bg-[#061d37]/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#54cad5]/24 bg-[#54cad5]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#c9fbff]">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      <span className="absolute h-3 w-3 rounded-full bg-[#dbd12b]" style={{ animation: "livePulse 1.45s ease-in-out infinite" }} />
                      <span className="relative h-2 w-2 rounded-full bg-[#dbd12b] shadow-[0_0_20px_rgba(219,209,43,.9)]" />
                    </span>
                    Live-Umbau läuft
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-black text-white">
                    95% fertig
                  </div>
                </div>
                <div className="relative h-4 overflow-hidden rounded-full bg-black/28 ring-1 ring-white/10">
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-gradient-to-r from-[#54cad5] via-[#b6d96a] to-[#dbd12b] shadow-[0_0_34px_rgba(84,202,213,.34)]"
                    style={{ animation: "progressGrow 1.4s cubic-bezier(.22,1,.36,1) both" }}
                  >
                    <div className="h-full w-1/3 bg-white/35 blur-sm" style={{ animation: "shimmerRun 2.1s ease-in-out infinite" }} />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-white/42">
                  <span>Start</span>
                  <span>Finalisierung</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2.1rem] border border-white/12 bg-[#0a223e]/82 p-7 shadow-[0_32px_110px_rgba(0,0,0,.34)] backdrop-blur-2xl sm:p-9">
            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-gradient-to-br from-[#54cad5]/24 to-[#dbd12b]/18 blur-2xl" style={{ animation: "rotateGlow 18s linear infinite" }} />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#dbd12b]">
                  Erreichbar bleiben wir natürlich
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                  Direkter Kontakt während des Umbaus
                </h2>
                <p className="mt-4 text-base leading-7 text-white/70">
                  Für Anfragen, Termine und dringende Fälle erreichen Sie uns weiterhin telefonisch.
                </p>
              </div>

              <a
                href="tel:+43732282028"
                className="group block rounded-[1.5rem] border border-white/14 bg-white/[0.08] p-6 transition hover:-translate-y-1 hover:border-[#54cad5]/50 hover:bg-white/[0.12]"
              >
                <span className="text-xs font-black uppercase tracking-[0.24em] text-white/48">Telefon</span>
                <span className="mt-2 block text-3xl font-black tracking-[-0.035em] text-white group-hover:text-[#c9fbff]">
                  +43 732 282028
                </span>
              </a>

              <div className="rounded-[1.5rem] border border-[#dbd12b]/18 bg-[#dbd12b]/8 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#dbd12b]">Live-Status</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">Die neue Website befindet sich in der finalen Abstimmung und wird in Kürze vollständig freigeschaltet.</p>
                  </div>
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#54cad5]/30 bg-[#54cad5]/10 text-2xl font-black text-white shadow-[0_0_34px_rgba(84,202,213,.16)]">
                    95%
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wir bauen um für Sie | Prammer & Prammer GmbH" },
      {
        name: "description",
        content:
          "Die Website der Prammer & Prammer GmbH wird aktuell überarbeitet und ist in Kürze wieder erreichbar.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_AT" },
      { property: "og:title", content: "Wir bauen um für Sie | Prammer & Prammer GmbH" },
      {
        property: "og:description",
        content:
          "Die Website der Prammer & Prammer GmbH wird aktuell überarbeitet und ist in Kürze wieder erreichbar.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: MaintenancePage,
  notFoundComponent: MaintenancePage,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de-AT">
      <head>
        <HeadContent />
      </head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
