create type payroll_pattern_enum as enum('weekly', 'biweekly', 'monthly');

create type organization_type_enum as enum('public', 'private', 'non-profit');

create table public.organizations (
    id uuid not null default uuid_generate_v4 (),
    name text not null,
    type text not null,
    employees_count integer not null default 0,
    contact_name text not null,
    contact_email text not null,
    contact_number text not null,
    payroll_pattern public.payroll_pattern_enum not null,
    payroll_start_day integer not null,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    owner_id uuid not null,
    constraint organizations_pkey primary key (id),
    constraint organizations_owner_id_fkey foreign key (owner_id) references users (id) on delete cascade
) tablespace pg_default;