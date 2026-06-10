-- Prammer & Prammer GmbH: replace remaining demo content and add safe admin-role RPC.
-- Run only after the base schema exists.

CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role = 'admin'
    )
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_is_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.current_user_is_admin() TO authenticated;

UPDATE public.site_settings
SET
  company_name = 'Prammer & Prammer GmbH',
  phone = '+43 732 282028',
  email = COALESCE(NULLIF(email, 'info@mustermann-bau.de'), ''),
  address = 'Reindlstraße 21, 4040 Linz',
  hero_headline = 'Ihr Installateur in Linz für Bad, Heizung & Sanitär',
  hero_subheadline = 'Sanitärinstallation, Heizungstechnik, Badsanierung und Wärmelösungen für private Haushalte und Betriebe in Linz.',
  hero_image_url = 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82',
  cta_text = 'Anfrage stellen',
  primary_color = '#0B2D5C',
  accent_color = '#D71920',
  updated_at = now()
WHERE id = (SELECT id FROM public.site_settings ORDER BY created_at ASC LIMIT 1);

INSERT INTO public.site_settings (company_name, phone, email, address, hero_headline, hero_subheadline, hero_image_url, cta_text, primary_color, accent_color)
SELECT 'Prammer & Prammer GmbH', '+43 732 282028', '', 'Reindlstraße 21, 4040 Linz', 'Ihr Installateur in Linz für Bad, Heizung & Sanitär', 'Sanitärinstallation, Heizungstechnik, Badsanierung und Wärmelösungen für private Haushalte und Betriebe in Linz.', 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82', 'Anfrage stellen', '#0B2D5C', '#D71920'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

TRUNCATE TABLE public.services RESTART IDENTITY;
INSERT INTO public.services (title, description, icon, image_url, sort_order, is_published) VALUES
('Sanitärinstallation', 'Wasserleitungen, Anschlüsse, Armaturen und Sanitärtechnik für Neubau, Umbau und Sanierung.', 'Droplets', 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=82', 1, true),
('Heizungstechnik', 'Heizungsanlagen, Wärmeverteilung, Modernisierung und verlässliche Abstimmung rund um effiziente Wärmelösungen.', 'Flame', 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82', 2, true),
('Badsanierung', 'Teil- und Komplettsanierungen für Badezimmer – von Dusche, WC und Waschtisch bis zur funktionalen Gesamtlösung.', 'Bath', 'https://images.unsplash.com/photo-1769356814886-abdadde25ea7?auto=format&fit=crop&w=1200&q=82', 3, true),
('Solar- & Wärmetechnik', 'Lösungen für Warmwasser, Solartechnik und zukunftsfähige Wärmekonzepte im Bestand und Neubau.', 'Sun', 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1920&q=82', 4, true),
('Wartung & Service', 'Service, Kontrolle und Instandhaltung von Sanitär- und Heizsystemen mit klarer Rückmeldung.', 'Thermometer', 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=82', 5, true),
('Reparatur & Austausch', 'Schnelle Hilfe bei defekten Armaturen, Leitungen, Anschlüssen und typischen Installateurarbeiten.', 'Wrench', 'https://images.unsplash.com/photo-1769356814886-abdadde25ea7?auto=format&fit=crop&w=1200&q=82', 6, true);

TRUNCATE TABLE public.projects RESTART IDENTITY;
INSERT INTO public.projects (title, description, location, category, image_url, sort_order, is_published) VALUES
('Komplettsanierung Stadtbad', 'Modernes Wellness-Bad mit ebenerdiger Dusche und LED-Lichtkonzept in einer Linzer Altbauwohnung.', 'Linz – Innenstadt', 'Badsanierung', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=84', 1, true),
('Wärmepumpe Einfamilienhaus', 'Umstellung von Ölheizung auf eine Luft-Wasser-Wärmepumpe inklusive Pufferspeicher und Förderabwicklung.', 'Leonding', 'Heizungstechnik', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=84', 2, true),
('Pelletsheizung Mehrparteienhaus', 'Tausch der zentralen Gasheizung gegen eine vollautomatische Pelletsanlage mit Solarunterstützung.', 'Traun', 'Heizungstechnik', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=84', 3, true),
('Barrierefreies Bad', 'Altersgerechter Badumbau mit bodengleicher Dusche, Stützgriffen und rutschhemmenden Fliesen.', 'Linz – Urfahr', 'Badsanierung', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=84', 4, true),
('Sanitärinstallation Neubau', 'Komplette Sanitär- und Heizungsinstallation in einem Doppelhaus mit kontrollierter Wohnraumlüftung.', 'Engerwitzdorf', 'Neubau', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=84', 5, true),
('Solarthermie-Anlage', 'Aufdach-Solarthermie für Warmwasser und Heizungsunterstützung auf einem Reihenhaus.', 'Pasching', 'Solar', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=84', 6, true);

TRUNCATE TABLE public.locations RESTART IDENTITY;
INSERT INTO public.locations (name, postal_code, description, sort_order, is_published) VALUES
('Linz', '4020–4040', 'Installateurleistungen im Linzer Stadtgebiet.', 1, true),
('Urfahr', '4040', 'Kurze Wege im direkten Umfeld des Firmenstandorts.', 2, true),
('Leonding', '4060', 'Sanitär-, Heizungs- und Servicearbeiten westlich von Linz.', 3, true),
('Traun', '4050', 'Installateurarbeiten im Zentralraum Oberösterreich.', 4, true),
('Wels', '4600', 'Service und Projektanfragen nach Abstimmung.', 5, true),
('Oberösterreich Zentralraum', null, 'Regionale Anfragen je nach Projektumfang und Verfügbarkeit.', 6, true);

TRUNCATE TABLE public.faqs RESTART IDENTITY;
INSERT INTO public.faqs (question, answer, sort_order, is_published) VALUES
('Welche Leistungen bietet Prammer & Prammer GmbH an?', 'Der Fokus liegt auf Sanitärinstallation, Heizungstechnik, Badsanierung, Solar- und Wärmetechnik sowie Service- und Reparaturarbeiten.', 1, true),
('Ist Prammer & Prammer GmbH in Linz tätig?', 'Ja. Der Unternehmenssitz befindet sich in der Reindlstraße 21 in 4040 Linz. Anfragen aus Linz und dem Zentralraum Oberösterreich sind möglich.', 2, true),
('Kann ich eine Anfrage online senden?', 'Ja. Über das Kontaktformular können Sie Ihr Anliegen kurz beschreiben. Je genauer die Angaben, desto schneller kann die passende Rückmeldung erfolgen.', 3, true),
('Werden auch kleinere Reparaturen übernommen?', 'Ja, Service- und Reparaturanfragen können über das Formular oder telefonisch geklärt werden. Die konkrete Umsetzung hängt vom Anliegen und der Verfügbarkeit ab.', 4, true),
('Bietet das Unternehmen Badsanierungen an?', 'Ja, Badsanierung ist ein zentraler Leistungsbereich – von einzelnen Sanitärkomponenten bis zu abgestimmten Lösungen im Bestand.', 5, true),
('Welche Informationen helfen bei einer Anfrage?', 'Hilfreich sind Adresse/Ort, Art des Anliegens, Fotos falls vorhanden, gewünschter Zeitraum und eine Telefonnummer für Rückfragen.', 6, true);

INSERT INTO public.seo_settings (page_path, title, description)
VALUES
('/', 'Installateur Linz | Prammer & Prammer GmbH', 'Sanitär, Heizung, Bad & Wärmetechnik in Linz. Prammer & Prammer GmbH – Ihr Installateur in 4040 Linz.'),
('/leistungen', 'Leistungen Installateur Linz | Sanitär, Heizung, Bad', 'Sanitärinstallation, Heizungstechnik, Badsanierung, Solar- und Wärmetechnik sowie Service in Linz und Umgebung.'),
('/referenzen', 'Referenzen Installateur Linz | Prammer & Prammer GmbH', 'Ausgewählte Installateurarbeiten und typische Projekte rund um Sanitär, Bad, Heizung und Wärmetechnik in Linz.'),
('/ueber-uns', 'Über Prammer & Prammer GmbH | Installateur Linz', 'Prammer & Prammer GmbH aus Linz: Installationen, Sanitär, Heizung, Klima- und Sanitärbedarf sowie Wärme- und Solartechnik.'),
('/einsatzgebiete', 'Einsatzgebiete Installateur Linz & Umgebung', 'Prammer & Prammer GmbH ist als Installateur in Linz, Urfahr, Leonding, Traun, Wels und im Zentralraum Oberösterreich tätig.'),
('/kontakt', 'Kontakt Installateur Linz | Prammer & Prammer GmbH', 'Kontakt zu Prammer & Prammer GmbH in Linz: Anfrage für Sanitär, Heizung, Bad, Service und Wärmetechnik stellen.'),
('/impressum', 'Impressum | Prammer & Prammer GmbH', 'Impressum und Anbieterkennzeichnung der Prammer & Prammer GmbH in Linz.'),
('/datenschutz', 'Datenschutz | Prammer & Prammer GmbH', 'Datenschutzerklärung gemäß DSGVO der Prammer & Prammer GmbH.')
ON CONFLICT (page_path) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = now();
