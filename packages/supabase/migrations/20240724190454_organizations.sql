grant usage on schema "public" to anon;

grant usage on schema "public" to authenticated;

GRANT
SELECT
,
INSERT
,
UPDATE
  ON ALL TABLES IN SCHEMA "public" TO authenticated;

GRANT
SELECT
,
INSERT
,
UPDATE
  ON ALL TABLES IN SCHEMA "public" TO anon;

grant usage on schema public to postgres,
anon,
authenticated,
service_role;

grant usage on schema extensions to postgres,
anon,
authenticated,
service_role;

grant all privileges on all tables in schema public to postgres,
anon,
authenticated,
service_role;

grant all privileges on all functions in schema public to postgres,
anon,
authenticated,
service_role;

grant all privileges on all sequences in schema public to postgres,
anon,
authenticated,
service_role;

create type organization_type_enum as enum('public', 'private', 'non-profit');

create type payroll_pattern_enum as enum('weekly', 'biweekly', 'monthly');

create table public.organizations (
    id uuid not null default uuid_generate_v4 () primary key,
    name text not null,
    type organization_type_enum not null,
    employees_count integer not null default 1,
    logo_url text null,
    time_zone text not null,
    website text null,
    contact_name text not null,
    contact_email text not null,
    contact_number text not null,
    payroll_pattern payroll_pattern_enum not null,
    payroll_start_day integer not null,
    address_1 text not null,
    address_2 text null,
    city text not null,
    state text not null,
    country text not null,
    zip_code text not null,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp
) tablespace pg_default;

create unique index organizations_id_index on public.organizations (id);