CREATE TABLE public.addresses (
    id uuid not null default uuid_generate_v4 () primary key,
    user_id UUID not null references users(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    address_1 text not null,
    address_2 text null,
    city text not null,
    state text not null,
    country text not null,
    zip_code text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) TABLESPACE pg_default;

create unique index addresses_id_index on public.addresses (user_id, organization_id);