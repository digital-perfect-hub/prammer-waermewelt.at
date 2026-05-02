import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/locations")({ component: () => (
  <CrudList
    table="locations"
    title="Einsatzgebiete"
    defaultRow={{ name: "", postal_code: "", description: "", sort_order: 0, is_published: true }}
    fields={[
      { key: "name", label: "Name" },
      { key: "postal_code", label: "PLZ" },
      { key: "description", label: "Beschreibung", type: "textarea" },
      { key: "sort_order", label: "Reihenfolge", type: "number" },
      { key: "is_published", label: "Veröffentlicht", type: "boolean" },
    ]}
  />
)});
