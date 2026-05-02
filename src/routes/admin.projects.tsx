import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/projects")({ component: () => (
  <CrudList
    table="projects"
    title="Referenzen"
    defaultRow={{ title: "", description: "", location: "", category: "", image_url: "", sort_order: 0, is_published: true }}
    fields={[
      { key: "title", label: "Titel" },
      { key: "description", label: "Beschreibung", type: "textarea" },
      { key: "location", label: "Ort" },
      { key: "category", label: "Kategorie" },
      { key: "image_url", label: "Bild URL" },
      { key: "sort_order", label: "Reihenfolge", type: "number" },
      { key: "is_published", label: "Veröffentlicht", type: "boolean" },
    ]}
  />
)});
