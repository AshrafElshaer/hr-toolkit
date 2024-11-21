alter table candidates drop column embedding;
alter table interviews drop column embedding;
alter table job_posts drop column embedding;

create table departments (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references organizations(id) on delete cascade,
    name text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);
alter table job_posts add column department_id uuid references departments(id) on delete set null;

alter table departments enable row level security;

create policy "Anyone can view departments" on departments for select using (true);
create policy "Admins can create departments" on departments for insert with check (is_user_organization_admin(organization_id));
create policy "Admins can update departments" on departments for update using (is_user_organization_admin(organization_id));
create policy "Admins can delete departments" on departments for delete using (is_user_organization_admin(organization_id));