import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/seo")({ component: () => (
  <CrudList
    table="seo_settings"
    title="SEO Einstellungen"
    defaultRow={{ page_path: "/", title: "", description: "", og_image_url: "" }}
    fields={[
      { key: "page_path", label: "Pfad (z. B. /, /leistungen)" },
      { key: "title", label: "SEO Title" },
      { key: "description", label: "Meta Description", type: "textarea" },
      { key: "og_image_url", label: "OG Image URL" },
    ]}
  />
)});
