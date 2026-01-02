-- Create profiles table for all users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger on user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create professionals table
CREATE TABLE public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  business_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cnpj_cpf TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT NOT NULL,
  service_radius_km INTEGER NOT NULL DEFAULT 10,
  photo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  state_code TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved active professionals
CREATE POLICY "Anyone can view approved professionals"
ON public.professionals FOR SELECT
USING (is_active = true AND is_approved = true);

-- Users can view their own professional profile
CREATE POLICY "Users can view own professional"
ON public.professionals FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own professional profile
CREATE POLICY "Users can insert own professional"
ON public.professionals FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own professional profile
CREATE POLICY "Users can update own professional"
ON public.professionals FOR UPDATE
USING (auth.uid() = user_id);

-- Create professional specialties junction table
CREATE TABLE public.professional_specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  category_name TEXT NOT NULL,
  subcategory_id TEXT NOT NULL,
  subcategory_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.professional_specialties ENABLE ROW LEVEL SECURITY;

-- Anyone can view specialties of approved professionals
CREATE POLICY "Anyone can view approved professional specialties"
ON public.professional_specialties FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id 
    AND (p.is_active = true AND p.is_approved = true OR p.user_id = auth.uid())
  )
);

-- Users can manage their own specialties
CREATE POLICY "Users can insert own specialties"
ON public.professional_specialties FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own specialties"
ON public.professional_specialties FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id AND p.user_id = auth.uid()
  )
);

-- Create professional gallery table
CREATE TABLE public.professional_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.professional_gallery ENABLE ROW LEVEL SECURITY;

-- Anyone can view gallery of approved professionals
CREATE POLICY "Anyone can view approved professional gallery"
ON public.professional_gallery FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id 
    AND (p.is_active = true AND p.is_approved = true OR p.user_id = auth.uid())
  )
);

-- Users can manage their own gallery
CREATE POLICY "Users can insert own gallery"
ON public.professional_gallery FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own gallery"
ON public.professional_gallery FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own gallery"
ON public.professional_gallery FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.professionals p 
    WHERE p.id = professional_id AND p.user_id = auth.uid()
  )
);

-- Create storage bucket for professional photos
INSERT INTO storage.buckets (id, name, public) VALUES ('professional-photos', 'professional-photos', true);

-- Storage policies
CREATE POLICY "Anyone can view professional photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'professional-photos');

CREATE POLICY "Authenticated users can upload photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'professional-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'professional-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'professional-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_professionals_updated_at
BEFORE UPDATE ON public.professionals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();