create extension if not exists vector
with
  schema extensions;

create type user_role_enum as enum ('admin', 'member');

create table users (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    first_name text not null,
    last_name text not null,
    avatar_url text,
    timezone text not null,
    user_role user_role_enum not null default 'member',


    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_users_id on users(id);
create index idx_users_email on users(email);

create table organizations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text not null,
    logo_url text not null,
    website text not null,
    admin_id uuid references users(id) on delete set null,
    location text not null,
    industry text not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_organizations_id on organizations(id);
create index idx_organizations_admin on organizations(admin_id);


create table organization_members (
    organization_id uuid references organizations(id) on delete cascade,
    user_id uuid references users(id) on delete cascade,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_organization_members_org on organization_members(organization_id);
create index idx_organization_members_user on organization_members(user_id);

create type employment_type_enum as enum ('full_time', 'part_time', 'contract', 'internship');
create type experience_level_enum as enum ('entry', 'mid', 'senior', 'lead', 'executive');

create table job_posts (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id)  on delete cascade,
    created_by uuid references users(id)  on delete set null,
    title text not null,
    content jsonb not null,
    employment_type employment_type_enum not null,
    salary_range text ,
    is_published boolean not null default false,
    is_active boolean not null default true,
    experience_level experience_level_enum not null,
    embedding vector(384),

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_job_posts_organization on job_posts(organization_id);
create index idx_job_posts_created_by on job_posts(created_by);


create table candidates (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) on delete cascade,
    avatar_url text,
    name text not null,
    email text not null ,
    phone_number text,
    time_zone text not null,
    resume_url text not null,
    linkedin_url text,
    embedding vector(384),

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_candidates_organization on candidates(organization_id);
create index idx_candidates_email on candidates(email);

create table interview_stages (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) on delete cascade,
    name text not null,
    description text,
    stage_order numeric not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_interview_stages_organization on interview_stages(organization_id);




create table applications (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id)  on delete cascade,
    candidate_id uuid references candidates(id)  on delete cascade,
    job_id uuid references job_posts(id)  on delete cascade,
    stage_id uuid references interview_stages(id)  on delete set null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_applications_organization on applications(organization_id);
create index idx_applications_candidate on applications(candidate_id); 
create index idx_applications_job on applications(job_id);
create index idx_applications_stage on applications(stage_id);


create type interview_status as enum ('Scheduled', 'Completed', 'Canceled');

create table interviews (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id) not null,
    application_id uuid references applications(id)  on delete cascade,
    interviewer_id uuid references users(id)  on delete set null,
    date timestamp with time zone not null,
    location text,
    status interview_status not null default 'Scheduled',
    feedback text,
    embedding vector(384),

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_interviews_organization on interviews(organization_id);
create index idx_interviews_application on interviews(application_id);
create index idx_interviews_interviewer on interviews(interviewer_id);




