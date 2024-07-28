create type attendance_status_enum as enum(
    'clocked_in',
    'pending',
    'clocked_out',
    'approved',
    'rejected'
);

create table public.attendances (
    id uuid not null default uuid_generate_v4 () primary key,
    user_id uuid not null references users(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid not null references departments(id) on delete cascade,
    clock_in  time without time zone not null default current_timestamp,
    clock_out  time without time zone null,
    break_start  time without time zone null,
    break_end  time without time zone null,
    date date not null,
    status public.attendance_status_enum null default 'clocked_in',
    payroll_id uuid null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) tablespace pg_default;

create unique index attendances_id_index on public.attendances (user_id, organization_id, date, department_id);
