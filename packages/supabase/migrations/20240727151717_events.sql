create type event_type_enum as enum(
    'meeting',
    'conference',
    'seminar',
    'workshop',
    'webinar',
    'training',
    'social',
    'other'
);

create table public.events(
    id uuid not null default uuid_generate_v4() primary key,
    organizer_id uuid not null references users(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid null references departments(id) on delete cascade,
    name text not null,
    description text not null,
    type event_type_enum not null default 'meeting',
    location text not null,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) tablespace pg_default;

create unique index events_unique_index on public.events (id, organizer_id, organization_id, department_id);
