import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, projects: 0, messages: 0, unread: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
    ]).then(([s, p, m, u]) => setStats({
      services: s.count ?? 0, projects: p.count ?? 0, messages: m.count ?? 0, unread: u.count ?? 0,
    }));
  }, []);

  const cards = [
    { label: "Leistungen", value: stats.services, to: "/admin/services" },
    { label: "Referenzen", value: stats.projects, to: "/admin/projects" },
    { label: "Anfragen gesamt", value: stats.messages, to: "/admin/messages" },
    { label: "Ungelesene Anfragen", value: stats.unread, to: "/admin/messages", highlight: true },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Link key={c.label} to={c.to}
          className={`rounded-lg border border-border bg-card p-6 hover:border-accent/40 transition ${c.highlight && c.value > 0 ? "ring-2 ring-accent" : ""}`}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
          <p className="mt-3 font-display text-4xl font-extrabold">{c.value}</p>
        </Link>
      ))}
    </div>
  );
}
