-- Add parcelas column to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS parcelas integer DEFAULT 12;

-- Update existing products to have 12 installments by default
UPDATE public.products 
SET parcelas = 12 
WHERE parcelas IS NULL;
