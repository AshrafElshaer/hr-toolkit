-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create table
  public.addresses (
    id uuid primary key default uuid_generate_v4 (),
    owner_id uuid not null,
    address_1 text not null,
    address_2 text null,
    city text not null,
    state text not null,
    country text not null,
    zip_code text not null,
    constraint addresses_users_owner_id_fkey foreign key (owner_id) references public.users (id) on delete cascade,
    constraint addresses_organizations_owner_id_fkey foreign key (owner_id) references public.organizations (id) on delete cascade
  ) tablespace pg_default;

alter table addresses enable row level security;

create policy address_insert on public.addresses for insert
with
  check (true);

create policy address_select on public.addresses for
select
  using (true);

create policy address_update on public.addresses
for update
  using (true);

create policy address_delete on public.addresses for delete using (true);