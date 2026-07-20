import type { Tables } from "@/integrations/supabase/types";
import heroInstallateur from "@/assets/prammer/hero-installateur.webp";
import badModern from "@/assets/prammer/bad-modern.webp";
import sanitaerRohinstallation from "@/assets/prammer/sanitaer-rohinstallation.webp";
import badPremium from "@/assets/prammer/bad-premium.webp";
import solarMontage from "@/assets/prammer/solar-montage.webp";
import solarHaus from "@/assets/prammer/solar-haus.webp";

const NOW = "2026-07-20T00:00:00.000Z";

export const COMPANY = {
  name: "Prammer & Prammer GmbH",
  phone: "+43 732 282028",
  email: "office@waermewelt.at",
  address: "Reindlstraße 21, 4040 Linz",
  radiusKm: 50,
} as const;

export const DEFAULT_HERO_IMAGE = heroInstallateur;

export const DEFAULT_SITE_SETTINGS: Tables<"site_settings"> = {
  id: "default-site-settings",
  company_name: COMPANY.name,
  phone: COMPANY.phone,
  email: COMPANY.email,
  address: COMPANY.address,
  cta_text: "Unverbindlich anfragen",
  hero_headline: "Sanitär, Heizung & Bad – zuverlässig in Linz und 50 km Umgebung",
  hero_subheadline:
    "Installationen, Sanierungen, Reparaturen sowie Handel mit Heizungs-, Klima- und Sanitärbedarf – persönlich betreut von unserem Standort in 4040 Linz.",
  hero_image_url: DEFAULT_HERO_IMAGE,
  logo_url: "/prammer-prammer-logo.png",
  primary_color: "#2D93A5",
  accent_color: "#D9CF36",
  created_at: NOW,
  updated_at: NOW,
};

export const FALLBACK_SERVICES: Tables<"services">[] = [
  {
    id: "service-sanitaer",
    title: "Sanitärinstallationen",
    description:
      "Neuinstallation, Umbau und fachgerechte Erneuerung von Wasserleitungen, Anschlüssen, Armaturen und Sanitäranlagen für private und gewerbliche Objekte.",
    icon: "Droplets",
    image_url: sanitaerRohinstallation,
    is_published: true,
    sort_order: 1,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "service-bad",
    title: "Badsanierung",
    description:
      "Vom funktionalen Familienbad bis zur modernen, barrierearmen Lösung: Wir übernehmen die Installationsarbeiten und stimmen die technischen Schritte sauber ab.",
    icon: "Bath",
    image_url: badModern,
    is_published: true,
    sort_order: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "service-heizung",
    title: "Heizung & Wärmetechnik",
    description:
      "Installation, Modernisierung und Service rund um Heizsysteme, Wärmeverteilung, Heizkörper und Warmwasser – passend zum Gebäude und zum tatsächlichen Bedarf.",
    icon: "Flame",
    image_url: heroInstallateur,
    is_published: true,
    sort_order: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "service-klima",
    title: "Klima- & Haustechnik",
    description:
      "Technische Lösungen für ein angenehmes Raumklima sowie Handel mit ausgewähltem Heizungs-, Klima- und Sanitärbedarf für Sanierung und Neubau.",
    icon: "Snowflake",
    image_url: badPremium,
    is_published: true,
    sort_order: 4,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "service-service",
    title: "Reparatur & Service",
    description:
      "Unterstützung bei Störungen, undichten Anschlüssen, defekten Armaturen sowie Wartungs- und Instandsetzungsarbeiten – lösungsorientiert und direkt erreichbar.",
    icon: "Wrench",
    image_url: sanitaerRohinstallation,
    is_published: true,
    sort_order: 5,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "service-solar",
    title: "Solar- & Warmwassertechnik",
    description:
      "Planung und Einbindung zeitgemäßer Lösungen zur Warmwasserbereitung und solaren Unterstützung – abgestimmt auf Bestand, Verbrauch und Gebäudetechnik.",
    icon: "Sun",
    image_url: solarMontage,
    is_published: true,
    sort_order: 6,
    created_at: NOW,
    updated_at: NOW,
  },
];

export const FALLBACK_PROJECTS: Tables<"projects">[] = [
  {
    id: "project-bad-modern",
    title: "Modernes Bad mit bodengleicher Dusche",
    description:
      "Beispielmotiv für eine zeitgemäße Badlösung mit klarer Linienführung, komfortabler Dusche und hochwertiger Sanitärtechnik.",
    category: "Badsanierung",
    image_url: badModern,
    location: "Linz & Umgebung",
    is_published: true,
    sort_order: 1,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "project-rohinstallation",
    title: "Sanitär-Rohinstallation bei einer Sanierung",
    description:
      "Beispielmotiv für sauber geplante Leitungswege und die technische Vorbereitung von Wasser- und Sanitäranschlüssen im Bestand.",
    category: "Sanitär",
    image_url: sanitaerRohinstallation,
    location: "Zentralraum Oberösterreich",
    is_published: true,
    sort_order: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "project-installateur",
    title: "Installation und Anschluss im Badezimmer",
    description:
      "Beispielmotiv für fachgerechte Montagearbeiten, präzise Anschlüsse und eine saubere Umsetzung direkt vor Ort.",
    category: "Installation",
    image_url: heroInstallateur,
    location: "Raum Linz",
    is_published: true,
    sort_order: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "project-premiumbad",
    title: "Individuelle Badgestaltung",
    description:
      "Beispielmotiv für die technische Umsetzung eines hochwertigen Badezimmers mit abgestimmten Armaturen, Anschlüssen und Komfortlösungen.",
    category: "Bad",
    image_url: badPremium,
    location: "Linz und 50 km Umkreis",
    is_published: true,
    sort_order: 4,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "project-solar-montage",
    title: "Montage einer Solaranlage",
    description:
      "Beispielmotiv für die fachgerechte Montage von Solartechnik und deren Einbindung in ein modernes Energie- und Warmwasserkonzept.",
    category: "Solartechnik",
    image_url: solarMontage,
    location: "Oberösterreich",
    is_published: true,
    sort_order: 5,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "project-solar-haus",
    title: "Solarlösung am Einfamilienhaus",
    description:
      "Beispielmotiv für eine Solaranlage am Wohngebäude als Bestandteil einer zukunftsorientierten Wärme- und Haustechniklösung.",
    category: "Wärmetechnik",
    image_url: solarHaus,
    location: "Linz & Umgebung",
    is_published: true,
    sort_order: 6,
    created_at: NOW,
    updated_at: NOW,
  },
];

export const FALLBACK_LOCATIONS: Tables<"locations">[] = [
  [
    "Linz & Urfahr",
    "4020 / 4040",
    "Direkte Betreuung vom Standort in der Reindlstraße – kurze Wege in der gesamten Stadt.",
  ],
  ["Leonding", "4060", "Sanitär-, Heizungs- und Servicearbeiten westlich von Linz."],
  ["Traun", "4050", "Installationen, Sanierungen und Reparaturen im Raum Traun."],
  ["Pasching", "4061", "Persönliche Betreuung für private Haushalte und Betriebe."],
  ["Ansfelden", "4052", "Heizung, Sanitär und Bad im südlichen Linzer Zentralraum."],
  ["Steyregg", "4221", "Kurze Anfahrt für Projekte östlich von Linz."],
  ["Gallneukirchen", "4210", "Installateurleistungen im Raum Gallneukirchen und Umgebung."],
  ["Ottensheim", "4100", "Sanitär- und Wärmetechnik entlang der Donau westlich von Linz."],
  ["St. Florian", "4490", "Technische Betreuung für Sanierung, Neubau und Service."],
  ["Enns", "4470", "Installationsarbeiten im östlichen Zentralraum Oberösterreich."],
  ["Wels", "4600", "Projekte im Rahmen des Einsatzradius von rund 50 Kilometern."],
  ["Perg", "4320", "Sanitär-, Heizungs- und Servicelösungen im Raum Perg."],
].map(([name, postalCode, description], index) => ({
  id: `location-${index + 1}`,
  name,
  postal_code: postalCode,
  description,
  is_published: true,
  sort_order: index + 1,
  created_at: NOW,
  updated_at: NOW,
}));

export const FALLBACK_FAQS: Tables<"faqs">[] = [
  {
    id: "faq-radius",
    question: "In welchem Gebiet ist Prammer & Prammer tätig?",
    answer:
      "Unser Schwerpunkt liegt in Linz und in einem Umkreis von rund 50 Kilometern. Dazu zählen unter anderem Leonding, Traun, Pasching, Ansfelden, Steyregg, Gallneukirchen, Ottensheim, Enns, Wels und Perg.",
    is_published: true,
    sort_order: 1,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "faq-anfrage",
    question: "Wie läuft eine Anfrage ab?",
    answer:
      "Sie schildern uns Ihr Anliegen telefonisch oder über das Kontaktformular. Danach klären wir die wichtigsten Eckdaten und vereinbaren bei Bedarf eine Besichtigung vor Ort.",
    is_published: true,
    sort_order: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "faq-privat-gewerbe",
    question: "Arbeiten Sie für Privatkunden und Betriebe?",
    answer:
      "Ja. Wir unterstützen sowohl private Haushalte als auch gewerbliche Kundinnen und Kunden bei Installationen, Sanierungen, Reparaturen und haustechnischen Lösungen.",
    is_published: true,
    sort_order: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "faq-bad",
    question: "Übernehmen Sie auch komplette Badsanierungen?",
    answer:
      "Wir übernehmen die technischen Installationsarbeiten und stimmen die erforderlichen Schritte für Sanitär, Wasser, Anschlüsse und Wärme sauber ab. Der genaue Umfang wird projektbezogen festgelegt.",
    is_published: true,
    sort_order: 4,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "faq-heizung",
    question: "Kann eine bestehende Heizung modernisiert werden?",
    answer:
      "In vielen Fällen ja. Wir prüfen den Bestand, den tatsächlichen Bedarf und die technischen Voraussetzungen. Darauf aufbauend besprechen wir eine passende Lösung für Wärmeverteilung, Warmwasser und Systemkomponenten.",
    is_published: true,
    sort_order: 5,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: "faq-reparatur",
    question: "Kann ich auch wegen einer Reparatur anfragen?",
    answer:
      "Ja. Beschreiben Sie den Defekt möglichst konkret und senden Sie bei Bedarf Fotos mit. So können wir die Dringlichkeit und den voraussichtlichen Aufwand besser einschätzen.",
    is_published: true,
    sort_order: 6,
    created_at: NOW,
    updated_at: NOW,
  },
];

// Bildquellen: frei nutzbare Unsplash-Fotos. Die Website kennzeichnet diese Motive
// bei fehlenden echten Projektbildern transparent als Leistungsbeispiele.
export const STOCK_IMAGE_CREDITS = [
  "https://unsplash.com/photos/jaP5ClBdIyU",
  "https://unsplash.com/photos/Vqv7zw9rBB4",
  "https://unsplash.com/photos/mTOyVgCPzf8",
  "https://unsplash.com/photos/UvcNaD8uRtg",
  "https://unsplash.com/photos/Q8V1EEvnJgk",
  "https://unsplash.com/photos/Ja8t8nJN2I4",
] as const;

const SEEDED_SERVICE_TITLES = new Set([
  "Sanitärinstallation",
  "Heizungstechnik",
  "Badsanierung",
  "Solar- & Wärmetechnik",
  "Wartung & Service",
  "Reparatur & Austausch",
]);

const SEEDED_PROJECT_TITLES = new Set([
  "Komplettsanierung Stadtbad",
  "Wärmepumpe Einfamilienhaus",
  "Pelletsheizung Mehrparteienhaus",
  "Barrierefreies Badezimmer",
  "Sanitärinstallation Neubau",
  "Solarthermie-Anlage",
]);

const SEEDED_LOCATION_NAMES = new Set([
  "Linz",
  "Urfahr",
  "Leonding",
  "Traun",
  "Wels",
  "Oberösterreich Zentralraum",
]);

const SEEDED_FAQ_QUESTIONS = new Set([
  "Welche Leistungen bietet Prammer & Prammer GmbH an?",
  "Ist Prammer & Prammer GmbH in Linz tätig?",
  "Kann ich eine Anfrage online senden?",
  "Übernimmt das Unternehmen auch Badsanierungen?",
  "Welche Heizungsarten werden angeboten?",
  "Gibt es auch Service- und Reparaturleistungen?",
]);

function matchesSeed<T>(items: T[], values: Set<string>, getValue: (item: T) => string) {
  return items.length > 0 && items.every((item) => values.has(getValue(item)));
}

export function isSeededServiceContent(items: Tables<"services">[]) {
  return matchesSeed(items, SEEDED_SERVICE_TITLES, (item) => item.title);
}

export function isSeededProjectContent(items: Tables<"projects">[]) {
  return matchesSeed(items, SEEDED_PROJECT_TITLES, (item) => item.title);
}

export function isSeededLocationContent(items: Tables<"locations">[]) {
  return matchesSeed(items, SEEDED_LOCATION_NAMES, (item) => item.name);
}

export function isSeededFaqContent(items: Tables<"faqs">[]) {
  return matchesSeed(items, SEEDED_FAQ_QUESTIONS, (item) => item.question);
}
