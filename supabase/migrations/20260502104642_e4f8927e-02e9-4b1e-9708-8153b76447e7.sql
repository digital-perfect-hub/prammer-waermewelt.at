
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
  company_name text NOT NULL DEFAULT 'Prammer & Prammer GmbH',
  logo_url text,
  phone text NOT NULL DEFAULT '+43 732 282028',
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT 'Reindlstraße 21, 4040 Linz',
  hero_headline text NOT NULL DEFAULT 'Ihr Installateur in Linz für Bad, Heizung & Sanitär',
  hero_subheadline text NOT NULL DEFAULT 'Sanitärinstallation, Heizungstechnik, Badsanierung und Wärmelösungen für private Haushalte und Betriebe in Linz.',
  hero_image_url text,
  cta_text text NOT NULL DEFAULT 'Anfrage stellen',
  primary_color text NOT NULL DEFAULT '#0B2D5C',
  accent_color text NOT NULL DEFAULT '#D71920',
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

-- ============ SEED DATA: PRAMMER & PRAMMER ============
INSERT INTO public.site_settings (company_name, phone, email, address, hero_headline, hero_subheadline, hero_image_url, cta_text, primary_color, accent_color)
VALUES ('Prammer & Prammer GmbH', '+43 732 282028', '', 'Reindlstraße 21, 4040 Linz', 'Ihr Installateur in Linz für Bad, Heizung & Sanitär', 'Sanitärinstallation, Heizungstechnik, Badsanierung und Wärmelösungen für private Haushalte und Betriebe in Linz.', 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82', 'Anfrage stellen', '#0B2D5C', '#D71920');

INSERT INTO public.services (title, description, icon, image_url, sort_order) VALUES
('Sanitärinstallation', 'Wasserleitungen, Anschlüsse, Armaturen und Sanitärtechnik für Neubau, Umbau und Sanierung.', 'Droplets', 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=82', 1),
('Heizungstechnik', 'Heizungsanlagen, Wärmeverteilung, Modernisierung und verlässliche Abstimmung rund um effiziente Wärmelösungen.', 'Flame', 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82', 2),
('Badsanierung', 'Teil- und Komplettsanierungen für Badezimmer – von Dusche, WC und Waschtisch bis zur funktionalen Gesamtlösung.', 'Bath', 'https://images.unsplash.com/photo-1769356814886-abdadde25ea7?auto=format&fit=crop&w=1200&q=82', 3),
('Solar- & Wärmetechnik', 'Lösungen für Warmwasser, Solartechnik und zukunftsfähige Wärmekonzepte im Bestand und Neubau.', 'Sun', 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82', 4),
('Wartung & Service', 'Service, Kontrolle und Instandhaltung von Sanitär- und Heizsystemen mit klarer Rückmeldung.', 'Thermometer', 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=82', 5),
('Reparatur & Austausch', 'Schnelle Hilfe bei defekten Armaturen, Leitungen, Anschlüssen und typischen Installateurarbeiten.', 'Wrench', 'https://images.unsplash.com/photo-1769356814886-abdadde25ea7?auto=format&fit=crop&w=1200&q=82', 6);

INSERT INTO public.projects (title, description, location, category, image_url, sort_order) VALUES
('Komplettsanierung Stadtbad', 'Modernes Wellness-Bad mit ebenerdiger Dusche und LED-Lichtkonzept in einer Linzer Altbauwohnung.', 'Linz – Innenstadt', 'Badsanierung', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=84', 1),
('Wärmepumpe Einfamilienhaus', 'Umstellung von Ölheizung auf eine Luft-Wasser-Wärmepumpe inklusive Pufferspeicher und Förderabwicklung.', 'Leonding', 'Heizungstechnik', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=84', 2),
('Pelletsheizung Mehrparteienhaus', 'Tausch der zentralen Gasheizung gegen eine vollautomatische Pelletsanlage mit Solarunterstützung.', 'Traun', 'Heizungstechnik', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=84', 3),
('Barrierefreies Bad', 'Altersgerechter Badumbau mit bodengleicher Dusche, Stützgriffen und rutschhemmenden Fliesen.', 'Linz – Urfahr', 'Badsanierung', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=84', 4),
('Sanitärinstallation Neubau', 'Komplette Sanitär- und Heizungsinstallation in einem Doppelhaus mit kontrollierter Wohnraumlüftung.', 'Engerwitzdorf', 'Neubau', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=84', 5),
('Solarthermie-Anlage', 'Aufdach-Solarthermie für Warmwasser und Heizungsunterstützung auf einem Reihenhaus.', 'Pasching', 'Solar', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=84', 6);

INSERT INTO public.locations (name, postal_code, description, sort_order) VALUES
('Linz', '4020–4040', 'Installateurleistungen im Linzer Stadtgebiet.', 1),
('Urfahr', '4040', 'Kurze Wege im direkten Umfeld des Firmenstandorts.', 2),
('Leonding', '4060', 'Sanitär-, Heizungs- und Servicearbeiten westlich von Linz.', 3),
('Traun', '4050', 'Installateurarbeiten im Zentralraum Oberösterreich.', 4),
('Wels', '4600', 'Service und Projektanfragen nach Abstimmung.', 5),
('Oberösterreich Zentralraum', null, 'Regionale Anfragen je nach Projektumfang und Verfügbarkeit.', 6);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('Welche Leistungen bietet Prammer & Prammer GmbH an?', 'Der Fokus liegt auf Sanitärinstallation, Heizungstechnik, Badsanierung, Solar- und Wärmetechnik sowie Service- und Reparaturarbeiten.', 1),
('Ist Prammer & Prammer GmbH in Linz tätig?', 'Ja. Der Unternehmenssitz befindet sich in der Reindlstraße 21 in 4040 Linz. Anfragen aus Linz und dem Zentralraum Oberösterreich sind möglich.', 2),
('Kann ich eine Anfrage online senden?', 'Ja. Über das Kontaktformular können Sie Ihr Anliegen kurz beschreiben. Je genauer die Angaben, desto schneller kann die passende Rückmeldung erfolgen.', 3),
('Werden auch kleinere Reparaturen übernommen?', 'Ja, Service- und Reparaturanfragen können über das Formular oder telefonisch geklärt werden. Die konkrete Umsetzung hängt vom Anliegen und der Verfügbarkeit ab.', 4),
('Bietet das Unternehmen Badsanierungen an?', 'Ja, Badsanierung ist ein zentraler Leistungsbereich – von einzelnen Sanitärkomponenten bis zu abgestimmten Lösungen im Bestand.', 5),
('Welche Informationen helfen bei einer Anfrage?', 'Hilfreich sind Adresse/Ort, Art des Anliegens, Fotos falls vorhanden, gewünschter Zeitraum und eine Telefonnummer für Rückfragen.', 6);

INSERT INTO public.seo_settings (page_path, title, description) VALUES
('/', 'Installateur Linz | Prammer & Prammer GmbH', 'Sanitär, Heizung, Bad & Wärmetechnik in Linz. Prammer & Prammer GmbH – Ihr Installateur in 4040 Linz.'),
('/leistungen', 'Leistungen Installateur Linz | Sanitär, Heizung, Bad', 'Sanitärinstallation, Heizungstechnik, Badsanierung, Solar- und Wärmetechnik sowie Service in Linz und Umgebung.'),
('/referenzen', 'Referenzen Installateur Linz | Prammer & Prammer GmbH', 'Ausgewählte Installateurarbeiten und typische Projekte rund um Sanitär, Bad, Heizung und Wärmetechnik in Linz.'),
('/ueber-uns', 'Über Prammer & Prammer GmbH | Installateur Linz', 'Prammer & Prammer GmbH aus Linz: Installationen, Sanitär, Heizung, Klima- und Sanitärbedarf sowie Wärme- und Solartechnik.'),
('/einsatzgebiete', 'Einsatzgebiete Installateur Linz & Umgebung', 'Prammer & Prammer GmbH ist als Installateur in Linz, Urfahr, Leonding, Traun, Wels und im Zentralraum Oberösterreich tätig.'),
('/kontakt', 'Kontakt Installateur Linz | Prammer & Prammer GmbH', 'Kontakt zu Prammer & Prammer GmbH in Linz: Anfrage für Sanitär, Heizung, Bad, Service und Wärmetechnik stellen.'),
('/impressum', 'Impressum | Prammer & Prammer GmbH', 'Impressum und Anbieterkennzeichnung der Prammer & Prammer GmbH in Linz.'),
('/datenschutz', 'Datenschutz | Prammer & Prammer GmbH', 'Datenschutzerklärung gemäß DSGVO der Prammer & Prammer GmbH.');
