
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ updated_at trigger ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ============ SITE SETTINGS (singleton) ============
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT 'Mustermann Bau GmbH',
  logo_url text,
  phone text NOT NULL DEFAULT '+49 30 1234567',
  email text NOT NULL DEFAULT 'info@mustermann-bau.de',
  address text NOT NULL DEFAULT 'Hauptstraße 1, 10115 Berlin',
  hero_headline text NOT NULL DEFAULT 'Handwerk mit Substanz',
  hero_subheadline text NOT NULL DEFAULT 'Ihr regionaler Partner für Bau, Sanierung und Dachdeckerarbeiten – seit über 25 Jahren.',
  hero_image_url text,
  cta_text text NOT NULL DEFAULT 'Kostenlose Anfrage stellen',
  primary_color text NOT NULL DEFAULT '#1a2332',
  accent_color text NOT NULL DEFAULT '#e58a2d',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ SERVICES ============
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'Hammer',
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read published services" ON public.services FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ PROJECTS ============
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  category text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ LOCATIONS ============
CREATE TABLE public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  postal_code text,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_locations_updated BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read published locations" ON public.locations FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins manage locations" ON public.locations FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ FAQS ============
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read published faqs" ON public.faqs FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ SEO SETTINGS ============
CREATE TABLE public.seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  og_image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_seo_updated BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read seo" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage seo" ON public.seo_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ CONTACT MESSAGES ============
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read contact" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins update contact" ON public.contact_messages FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete contact" ON public.contact_messages FOR DELETE TO authenticated USING (public.is_admin());

-- ============ STORAGE ============
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);
CREATE POLICY "Public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins upload site-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.is_admin());
CREATE POLICY "Admins update site-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.is_admin());
CREATE POLICY "Admins delete site-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.is_admin());

-- ============ SEED DEMO DATA ============
INSERT INTO public.site_settings (company_name, phone, email, address, hero_headline, hero_subheadline, cta_text)
VALUES ('Mustermann Bau & Sanierung', '+49 30 1234 5678', 'info@mustermann-bau.de', 'Industriestraße 12, 10115 Berlin', 'Handwerk. Substanz. Vertrauen.', 'Ihr regionaler Meisterbetrieb für Bau, Sanierung, Dachdeckerei und Spenglerei – seit über 25 Jahren in Berlin und Brandenburg.', 'Kostenlose Anfrage stellen');

INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Hochbau & Massivbau', 'Schlüsselfertige Errichtung von Wohn- und Gewerbeimmobilien in höchster Qualität – vom Fundament bis zum First.', 'Building2', 1),
('Sanierung & Modernisierung', 'Energetische Sanierung, Altbaumodernisierung und denkmalgerechte Restaurierung mit fachkundiger Beratung.', 'Wrench', 2),
('Dachdeckerei', 'Steildach, Flachdach, Dachsanierung und Reparaturen – inklusive Wärmedämmung und Photovoltaik-Integration.', 'Home', 3),
('Spenglerei & Klempnerei', 'Dachrinnen, Fallrohre, Verblechungen und Metallarbeiten in präziser Meisterqualität.', 'Hammer', 4),
('Fassade & Außenanlagen', 'Fassadendämmung, Putzarbeiten und Gestaltung – langlebig, witterungsbeständig und energieeffizient.', 'Layers', 5),
('Notdienst & Reparatur', '24/7 Soforthilfe bei Sturmschäden, Wasserschäden und akuten Bauproblemen in Ihrer Region.', 'AlertTriangle', 6);

INSERT INTO public.projects (title, description, location, category, sort_order) VALUES
('Mehrfamilienhaus Prenzlauer Berg', 'Komplette energetische Sanierung eines Gründerzeitgebäudes mit 18 Wohneinheiten inklusive Dachneueindeckung.', 'Berlin', 'Sanierung', 1),
('Industriehalle Adlershof', 'Neubau einer 2.400 m² Produktionshalle in Stahlbetonbauweise mit Bürotrakt.', 'Berlin', 'Hochbau', 2),
('Reihenhausanlage Potsdam', 'Schlüsselfertige Errichtung von 8 Reihenhäusern in Niedrigenergiebauweise.', 'Potsdam', 'Hochbau', 3),
('Dachsanierung Villa Wannsee', 'Komplette Neueindeckung und Dämmung eines historischen Walmdachs mit Naturschiefer.', 'Berlin', 'Dachdeckerei', 4),
('Fassadensanierung Bürohaus Mitte', 'WDVS-Fassadendämmung und Neugestaltung eines fünfstöckigen Bürogebäudes.', 'Berlin', 'Fassade', 5),
('Spenglerarbeiten Schloss Rheinsberg', 'Denkmalgerechte Kupferarbeiten an Türmen und Dachgauben.', 'Rheinsberg', 'Spenglerei', 6);

INSERT INTO public.locations (name, postal_code, sort_order) VALUES
('Berlin', '10000–14199', 1),
('Potsdam', '14467–14482', 2),
('Brandenburg an der Havel', '14770', 3),
('Oranienburg', '16515', 4),
('Bernau bei Berlin', '16321', 5),
('Falkensee', '14612', 6);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('Wie schnell erhalte ich ein Angebot?', 'Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden zur Terminabstimmung für die kostenlose Vor-Ort-Besichtigung. Das schriftliche Angebot folgt typischerweise innerhalb von 5 Werktagen.', 1),
('Sind Vor-Ort-Besichtigung und Angebot kostenlos?', 'Ja. Erstberatung, Besichtigung und Angebotserstellung sind für Sie vollständig kostenfrei und unverbindlich.', 2),
('In welchen Regionen sind Sie tätig?', 'Wir sind primär in Berlin, Potsdam und im gesamten Berliner Umland aktiv. Bei Großprojekten arbeiten wir auch überregional.', 3),
('Übernehmen Sie auch Versicherungsschäden?', 'Ja, wir wickeln Schäden direkt mit Ihrer Gebäudeversicherung ab und übernehmen die komplette Schadensdokumentation.', 4),
('Bieten Sie Festpreisgarantie?', 'Unsere schriftlichen Angebote sind verbindliche Festpreise. Es gibt keine versteckten Kosten – Sie wissen genau, was auf Sie zukommt.', 5),
('Welche Garantie geben Sie auf Ihre Arbeit?', 'Auf alle Leistungen geben wir die gesetzliche Gewährleistung von 5 Jahren. Auf Dachdeckerarbeiten zusätzlich erweiterte Garantieleistungen.', 6);

INSERT INTO public.seo_settings (page_path, title, description) VALUES
('/', 'Mustermann Bau & Sanierung – Handwerk mit Substanz | Berlin', 'Ihr regionaler Meisterbetrieb für Bau, Sanierung, Dachdeckerei und Spenglerei in Berlin und Brandenburg. Kostenlose Anfrage in 24h.'),
('/leistungen', 'Unsere Leistungen – Bau, Sanierung, Dach, Fassade | Mustermann Bau', 'Hochbau, Sanierung, Dachdeckerei, Spenglerei, Fassade und Notdienst – alles aus einer Hand vom Meisterbetrieb in Berlin.'),
('/referenzen', 'Referenzen & Projekte | Mustermann Bau Berlin', 'Über 500 erfolgreich abgeschlossene Bauprojekte in Berlin und Brandenburg. Sehen Sie Beispiele unserer Arbeit.'),
('/ueber-uns', 'Über uns – 25 Jahre Handwerkserfahrung | Mustermann Bau', 'Lernen Sie unseren Familienbetrieb kennen: Meisterqualifikation, geprüfte Mitarbeiter, regionale Verwurzelung seit 1998.'),
('/einsatzgebiete', 'Einsatzgebiete – Berlin, Potsdam & Brandenburg | Mustermann Bau', 'Wir sind Ihr Handwerksbetrieb für Berlin, Potsdam und das gesamte Berliner Umland. Hier finden Sie alle Einsatzgebiete.'),
('/kontakt', 'Kontakt & Anfrage stellen | Mustermann Bau Berlin', 'Kontaktieren Sie uns für Ihr Bauprojekt. Kostenlose Erstberatung, schnelle Rückmeldung, faire Festpreise.'),
('/impressum', 'Impressum | Mustermann Bau & Sanierung', 'Impressum und Anbieterkennzeichnung der Mustermann Bau & Sanierung GmbH.'),
('/datenschutz', 'Datenschutzerklärung | Mustermann Bau & Sanierung', 'Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten gemäß DSGVO.');
