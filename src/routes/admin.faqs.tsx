import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/faqs")({ component: () => (
  <CrudList
    table="faqs"
    title="FAQ"
    defaultRow={{ question: "", answer: "", sort_order: 0, is_published: true }}
    fields={[
      { key: "question", label: "Frage" },
      { key: "answer", label: "Antwort", type: "textarea", rows: 5 },
      { key: "sort_order", label: "Reihenfolge", type: "number" },
      { key: "is_published", label: "Veröffentlicht", type: "boolean" },
    ]}
  />
)});
