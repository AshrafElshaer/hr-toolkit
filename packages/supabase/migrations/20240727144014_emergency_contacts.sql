create table public.emergency_contacts (
    id uuid not null default uuid_generate_v4 () primary key,
    organization_id uuid not null references organizations(id) on delete cascade,
    user_id uuid not null references users(id) on delete cascade,
    name text not null,
    email text not null,
    phone_number text not null,
    relation text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) tablespace pg_default;
