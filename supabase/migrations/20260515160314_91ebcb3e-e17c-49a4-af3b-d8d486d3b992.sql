
-- 1. Restrict public access to professionals table (hide cnpj_cpf)
DROP POLICY IF EXISTS "Anyone can view approved professionals" ON public.professionals;

-- Create a public view excluding sensitive columns
CREATE OR REPLACE VIEW public.professionals_public
WITH (security_invoker = true) AS
SELECT
  id, user_id, business_name, slug, description,
  phone, whatsapp, email,
  state_code, city, neighborhood, address,
  service_radius_km, photo_url,
  rating, review_count,
  is_active, is_approved,
  created_at, updated_at
FROM public.professionals
WHERE is_active = true AND is_approved = true;

-- Re-add a row policy so the view (security_invoker) can read approved rows
CREATE POLICY "Public can view approved professionals (no sensitive cols)"
ON public.professionals
FOR SELECT
TO anon, authenticated
USING (is_active = true AND is_approved = true);

-- Revoke direct table SELECT on sensitive column from anon/authenticated, keep view access
REVOKE SELECT ON public.professionals FROM anon, authenticated;
GRANT SELECT (
  id, user_id, business_name, slug, description,
  phone, whatsapp, email,
  state_code, city, neighborhood, address,
  service_radius_km, photo_url,
  rating, review_count, is_active, is_approved,
  created_at, updated_at
) ON public.professionals TO anon, authenticated;
-- Owners and admins still get full access (including cnpj_cpf) via service role / explicit owner queries
GRANT SELECT (cnpj_cpf), UPDATE, INSERT, DELETE ON public.professionals TO authenticated;

GRANT SELECT ON public.professionals_public TO anon, authenticated;

-- 2. Explicit restrictive policy to prevent non-admin INSERT/UPDATE/DELETE on user_roles
CREATE POLICY "Only admins can modify roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. Storage: enforce per-user folder for uploads
DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;

CREATE POLICY "Users can upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'professional-photos'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);
