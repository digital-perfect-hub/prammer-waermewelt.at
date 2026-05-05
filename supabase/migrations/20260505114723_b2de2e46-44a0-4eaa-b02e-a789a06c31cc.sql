
-- Revoke public execute on the SECURITY DEFINER admin check
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated, public;

-- Replace combined policies with split ones so anon SELECTs don't need is_admin()
DROP POLICY IF EXISTS "Public read published services" ON public.services;
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
DROP POLICY IF EXISTS "Public read published locations" ON public.locations;
DROP POLICY IF EXISTS "Public read published faqs" ON public.faqs;

CREATE POLICY "Anyone can read published services"
  ON public.services FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can read published projects"
  ON public.projects FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can read published locations"
  ON public.locations FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can read published faqs"
  ON public.faqs FOR SELECT
  USING (is_published = true);

-- Admin "manage" policies already cover full access including reading unpublished rows
