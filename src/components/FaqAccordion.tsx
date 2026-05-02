import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Tables } from "@/integrations/supabase/types";

export function FaqAccordion({ items }: { items: Tables<"faqs">[] }) {
  if (!items.length) return null;
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f) => (
        <AccordionItem key={f.id} value={f.id} className="border-b border-border">
          <AccordionTrigger className="text-left font-display text-lg font-semibold tracking-tight py-5 hover:no-underline">
            {f.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
