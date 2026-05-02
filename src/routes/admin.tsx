import { createFileRoute, Outlet, Link, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const TABS: { to: string; label: string; exact?: boolean }[] = [
  { to: "/admin", label: "Übersicht", exact: true },
  { to: "/admin/settings", label: "Einstellungen" },
  { to: "/admin/services", label: "Leistungen" },
  { to: "/admin/projects", label: "Referenzen" },
  { to: "/admin/locations", label: "Einsatzgebiete" },
  { to: "/admin/faqs", label: "FAQ" },
  { to: "/admin/seo", label: "SEO" },
  { to: "/admin/messages", label: "Anfragen" },
];

function AdminLayout() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
      setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="container-tight py-20 text-muted-foreground">Lädt…</div>;

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="container-tight py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl font-extrabold">Admin-Bereich</h1>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.invalidate(); }}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <LogOut className="h-4 w-4" /> Abmelden
        </button>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8 border-b border-border pb-3">
        {TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to as any}
            activeOptions={{ exact: !!t.exact }}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    onSuccess();
  }

  return (
    <div className="container-tight py-20 max-w-md">
      <h1 className="font-display text-3xl font-extrabold">Admin-Login</h1>
      <p className="mt-2 text-sm text-muted-foreground">Nur für berechtigte Mitarbeiter.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <label className="block">
          <span className="block text-sm font-medium mb-2">E-Mail</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Passwort</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm" />
        </label>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button disabled={loading} className="w-full rounded-md bg-primary text-primary-foreground py-3 font-semibold disabled:opacity-50">
          {loading ? "Anmelden…" : "Anmelden"}
        </button>
        <p className="text-xs text-muted-foreground">
          Hinweis: Registrierung ist deaktiviert. Admins werden manuell vom Betreiber angelegt.
        </p>
      </form>
    </div>
  );
}
