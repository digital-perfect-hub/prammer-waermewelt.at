import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/services")({ component: () => (
  <CrudList
    table="services"
    title="Leistungen"
    defaultRow={{ title: "", description: "", icon: "Hammer", sort_order: 0, is_published: true }}
    fields={[
      { key: "title", label: "Titel" },
      { key: "description", label: "Beschreibung", type: "textarea" },
      { key: "icon", label: "Icon (Lucide-Name, z. B. Hammer, Building2, Home)" },
      { key: "sort_order", label: "Reihenfolge", type: "number" },
      { key: "is_published", label: "Veröffentlicht", type: "boolean" },
    ]}
  />
)});
