
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  occasion text not null,
  event_date date,
  location text,
  budget text,
  style text,
  guests text,
  vision text,
  status text not null default 'new'
);

alter table public.inquiries enable row level security;

create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

create policy "Authenticated users can update inquiries"
  on public.inquiries for update
  to authenticated
  using (true);
