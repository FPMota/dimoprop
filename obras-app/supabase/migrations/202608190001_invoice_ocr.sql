-- Dados necessários para faturas, extras e leitura automática.
alter table public.invoices
  add column if not exists type text not null default 'normal'
    check (type in ('normal', 'extra', 'labor')),
  add column if not exists ocr_status text not null default 'manual'
    check (ocr_status in ('manual', 'pending', 'extracted', 'failed')),
  add column if not exists ocr_extracted_at timestamptz,
  add column if not exists ocr_data jsonb;

create table if not exists public.invoice_payments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric(12, 2) not null check (amount > 0),
  payment_date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.invoice_payments enable row level security;

create policy "invoice payments are only visible to the owner"
  on public.invoice_payments for select
  using (auth.uid() = owner_id);

create policy "invoice payments are only created by the owner"
  on public.invoice_payments for insert
  with check (auth.uid() = owner_id);

create policy "invoice payments are only updated by the owner"
  on public.invoice_payments for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "invoice payments are only deleted by the owner"
  on public.invoice_payments for delete
  using (auth.uid() = owner_id);
