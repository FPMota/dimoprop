-- Políticas de acesso para os dados principais do dashboard.
-- Cada utilizador só vê e altera os seus próprios registos.

alter table public.clients enable row level security;
alter table public.works enable row level security;
alter table public.invoices enable row level security;
alter table public.work_payments enable row level security;

drop policy if exists "clients are only visible to the owner" on public.clients;
create policy "clients are only visible to the owner"
  on public.clients for select
  using (auth.uid() = owner_id);

drop policy if exists "clients are only created by the owner" on public.clients;
create policy "clients are only created by the owner"
  on public.clients for insert
  with check (auth.uid() = owner_id);

drop policy if exists "clients are only updated by the owner" on public.clients;
create policy "clients are only updated by the owner"
  on public.clients for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "clients are only deleted by the owner" on public.clients;
create policy "clients are only deleted by the owner"
  on public.clients for delete
  using (auth.uid() = owner_id);

drop policy if exists "works are only visible to the owner" on public.works;
create policy "works are only visible to the owner"
  on public.works for select
  using (auth.uid() = owner_id);

drop policy if exists "works are only created by the owner" on public.works;
create policy "works are only created by the owner"
  on public.works for insert
  with check (auth.uid() = owner_id);

drop policy if exists "works are only updated by the owner" on public.works;
create policy "works are only updated by the owner"
  on public.works for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "works are only deleted by the owner" on public.works;
create policy "works are only deleted by the owner"
  on public.works for delete
  using (auth.uid() = owner_id);

drop policy if exists "invoices are only visible to the owner" on public.invoices;
create policy "invoices are only visible to the owner"
  on public.invoices for select
  using (auth.uid() = owner_id);

drop policy if exists "invoices are only created by the owner" on public.invoices;
create policy "invoices are only created by the owner"
  on public.invoices for insert
  with check (auth.uid() = owner_id);

drop policy if exists "invoices are only updated by the owner" on public.invoices;
create policy "invoices are only updated by the owner"
  on public.invoices for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "invoices are only deleted by the owner" on public.invoices;
create policy "invoices are only deleted by the owner"
  on public.invoices for delete
  using (auth.uid() = owner_id);

drop policy if exists "work payments are only visible to the owner" on public.work_payments;
create policy "work payments are only visible to the owner"
  on public.work_payments for select
  using (auth.uid() = owner_id);

drop policy if exists "work payments are only created by the owner" on public.work_payments;
create policy "work payments are only created by the owner"
  on public.work_payments for insert
  with check (auth.uid() = owner_id);

drop policy if exists "work payments are only updated by the owner" on public.work_payments;
create policy "work payments are only updated by the owner"
  on public.work_payments for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "work payments are only deleted by the owner" on public.work_payments;
create policy "work payments are only deleted by the owner"
  on public.work_payments for delete
  using (auth.uid() = owner_id);
