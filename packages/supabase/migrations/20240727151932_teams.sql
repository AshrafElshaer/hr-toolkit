create table public.teams(
    id uuid not null default uuid_generate_v4() primary key,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid not null references departments(id) on delete cascade,
    leader_id uuid not null references users(id) on delete cascade,
    name text not null,
    description text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) tablespace pg_default;

create unique index teams_id_index on public.teams (organization_id, department_id, leader_id);


-- TEAM MEMBERS TABLE
create table public.team_members(
    team_id uuid not null references teams(id) on delete cascade,
    user_id uuid not null references users(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid not null references departments(id) on delete cascade,
    created_at time without time zone default current_timestamp,
    updated_at time without time zone default current_timestamp,
    primary key (team_id, user_id)
) tablespace pg_default;

create unique index team_members_id_index on public.team_members (team_id, user_id);

