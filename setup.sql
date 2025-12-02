-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create products table
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  afiliado_link text not null,
  titulo text not null,
  categoria text,
  subcategoria text,
  descricao text,
  imagens text[],
  preco numeric,
  estoque int default 0,
  sku text,
  codigo_barras text,
  peso numeric,
  altura numeric,
  largura numeric,
  profundidade numeric,
  marca text,
  modelo text,
  referencia text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create store_config table
create table public.store_config (
  id uuid primary key default uuid_generate_v4(),
  nome_loja text default 'Minha Loja',
  logo_url text,
  banner_principal text,
  banner_promocao text,
  cor_primaria text default '#FFF159',
  cor_secundaria text default '#333333',
  rodape_texto text default 'Todos os direitos reservados.',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.store_config enable row level security;

-- Policies for products
create policy "Public read access for products"
on public.products for select
to anon
using (true);

create policy "Admin full access for products"
on public.products for all
to authenticated
using (true)
with check (true);

-- Policies for store_config
create policy "Public read access for store_config"
on public.store_config for select
to anon
using (true);

create policy "Admin full access for store_config"
on public.store_config for all
to authenticated
using (true)
with check (true);

-- Insert default store config if not exists
insert into public.store_config (nome_loja)
select 'GWN Compras'
where not exists (select 1 from public.store_config);
