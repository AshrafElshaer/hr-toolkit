create type task_status as enum ('to_do', 'in_progress', 'in_review', 'completed');

create type task_priority as enum ('low', 'medium', 'high');

create table public.tasks(
    id uuid not null default uuid_generate_v4() primary key,
    project_id uuid not null references projects(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    name text not null,
    description text not null,
    assigned_to uuid not null references users(id) on delete cascade,
    status task_status not null default 'to_do',
    priority task_priority not null default 'low',
    due_date timestamp with time zone not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
) tablespace pg_default;

create unique index tasks_id_index on public.tasks (project_id, organization_id, assigned_to);

create table public.task_comments(
    task_id uuid not null references tasks(id) on delete cascade,
    user_id uuid not null references users(id) on delete cascade,
    comment text not null,
    created_at timestamp with time zone default current_timestamp
) tablespace pg_default;

create unique index task_comment_id_index on public.task_comments (task_id, user_id);
