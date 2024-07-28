create table departments (
    id uuid not null default uuid_generate_v4 () primary key,
    organization_id uuid not null references organizations (id) on delete cascade,
    manager_id uuid null references users (id) on delete
    set
        null,
        name text not null,
        description text not null,
        employees_count integer not null default 0,
        created_at timestamp with time zone default current_timestamp,
        updated_at timestamp with time zone default current_timestamp
);

create unique index departments_id_index on public.departments (id, organization_id);

alter table
    users
add
    column department_id uuid null references departments (id) on delete
set
    null;