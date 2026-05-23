
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

create policy "Users can read their own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

-- Tighten inquiries policies
drop policy "Anyone can submit an inquiry" on public.inquiries;
drop policy "Authenticated users can read inquiries" on public.inquiries;
drop policy "Authenticated users can update inquiries" on public.inquiries;

create policy "Public can submit inquiries with valid data"
  on public.inquiries for insert to anon, authenticated
  with check (
    length(full_name) between 1 and 120
    and length(email) between 3 and 255
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and length(occasion) between 1 and 80
    and (vision is null or length(vision) <= 2000)
  );

create policy "Admins can read inquiries"
  on public.inquiries for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update inquiries"
  on public.inquiries for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
