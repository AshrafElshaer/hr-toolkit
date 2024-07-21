-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
create type employment_status_enum as enum('active', 'on_hold', 'terminated');

create type employment_type_enum as enum('full_time', 'part_time', 'contractor');

create type role_enum as enum(
  'admin',
  'department_manager',
  'hr_manager',
  'team- lead',
  'staff'
);

create table
  users (
    id uuid primary key default uuid_generate_v4 (),
    organization_id uuid references organizations (id) on delete cascade,
    email text unique,
    first_name text,
    last_name text,
    avatar_url text null,
    phone_number text,
    date_of_birth timestamp with time zone,
    gender text,
    hire_date timestamp with time zone,
    leave_date timestamp with time zone null,
    job_title text,
    employment_status employment_status_enum default 'active',
    employment_type employment_type_enum default 'full_time',
    work_hours_per_week INTEGER,
    ROLE role_enum default 'staff',
    salary_per_hour DECIMAL,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP
  );

ALTER TABLE organizations
ADD COLUMN owner_id UUID REFERENCES users (id)  on delete cascade;



 

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
-- Set up Storage!
insert into
  storage.buckets (id, name)
values
  ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects for insert
with
  check (bucket_id = 'avatars');
