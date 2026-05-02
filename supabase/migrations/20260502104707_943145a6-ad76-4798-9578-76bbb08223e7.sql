
-- Restrict SECURITY DEFINER functions to server roles only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- set_updated_at search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Tighten public bucket: don't allow listing, only direct file reads via public URL
DROP POLICY "Public read site-images" ON storage.objects;
-- (no SELECT policy for anon = no listing; public bucket still serves files via public URL)
CREATE POLICY "Auth read site-images" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'site-images' AND public.is_admin());

-- Tighten contact_messages insert: enforce reasonable limits
DROP POLICY "Anyone can submit contact" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact" ON public.contact_messages FOR INSERT
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 254
  AND length(message) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(phone) <= 50)
  AND (project_type IS NULL OR length(project_type) <= 100)
  AND is_read = false
);
