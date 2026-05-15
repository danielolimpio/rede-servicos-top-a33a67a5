ALTER TABLE public.professionals
  ADD COLUMN IF NOT EXISTS cep TEXT,
  ADD COLUMN IF NOT EXISTS years_experience INTEGER,
  ADD COLUMN IF NOT EXISTS price_range TEXT CHECK (price_range IN ('R$', 'R$$', 'R$$$', 'R$$$$')),
  ADD COLUMN IF NOT EXISTS emergency_24h BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS accepted_terms_at TIMESTAMPTZ;