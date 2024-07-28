create table public.projects(
    id uuid not null default uuid_generate_v4() primary key,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid not null references departments(id) on delete cascade,
    name text not null,
    description text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) tablespace pg_default;

create unique index projects_id_index on public.projects (organization_id, department_id);

create table public.project_team(
    project_id uuid not null references projects(id) on delete cascade,
    team_id uuid not null references teams(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid null references departments (id) on delete
    set
        null,
        created_at time without time zone default current_timestamp,
        updated_at time without time zone default current_timestamp,
        primary key (project_id, team_id)
) tablespace pg_default;

create unique index project_team_id_index on public.project_team (project_id, team_id);