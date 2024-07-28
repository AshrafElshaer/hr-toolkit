create type time_off_status_enum as enum('pending', 'approved', 'rejected');

create type time_off_type_enum as enum(
    'vacation',
    'sick_leave',
    'personal_leave',
    'maternity_leave',
    'paternity_leave',
    'unpaid_leave'
);

create table public.time_offs (
    id uuid not null default uuid_generate_v4 () primary key,
    user_id uuid not null references users(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid not null references departments(id) on delete cascade,
    start_date date not null,
    end_date date not null,
    type public.time_off_type_enum not null default 'unpaid_leave',
    reason text null,
    status public.time_off_status_enum not null default 'pending',
    created_at  time without time zone default current_timestamp,
    updated_at  time without time zone default current_timestamp
) tablespace pg_default;

create unique index time_offs_id_index on public.time_offs (
    user_id,
    organization_id,
    start_date,
    end_date,
    department_id
);
