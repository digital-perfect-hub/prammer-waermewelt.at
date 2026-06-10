import { Link } from "@tanstack/react-router";
import { Phone, Send } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function MobileStickyCta() {
  const { settings } = useSiteSettings();
  const phone = settings?.phone || "+43 732 282028";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-18px_45px_-28px_rgba(8,27,58,0.65)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/[0.18] bg-primary/[0.06] px-4 py-3 text-sm font-extrabold text-primary"
        >
          <Phone className="h-4 w-4" />
          Anrufen
        </a>
        <Link
          to="/kontakt"
          className="premium-shine inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-extrabold text-accent-foreground shadow-glow"
        >
          <Send className="h-4 w-4" />
          Anfrage
        </Link>
      </div>
    </div>
  );
}
