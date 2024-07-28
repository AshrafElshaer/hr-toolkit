create type employment_status_enum as enum('active', 'on_hold', 'terminated');

create type employment_type_enum as enum('full_time', 'part_time', 'contractor');

create type user_roles_enum as enum('admin', 'manager', 'team_leader', 'staff');

create table users (
  id uuid references auth.users on delete cascade not null primary key,
  organization_id uuid null references organizations (id) on delete cascade,
  email text unique not null,
  first_name text not null default '',
  last_name text not null default '',
  avatar_url text not null default '',
  phone_number text not null default '',
  date_of_birth date not null default current_date - interval '18 year',
  gender text not null default '',
  hire_date date not null default current_date,
  leave_date date null,
  job_title text not null default '',
  employment_status public.employment_status_enum default 'active',
  employment_type public.employment_type_enum default 'full_time',
  work_hours_per_week integer default 40,
  user_role user_roles_enum default 'staff',
  salary_per_hour numeric default 0,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
) TABLESPACE pg_default;

create unique index users_id_index on public.users (id);

alter table
  organizations
add
  column owner_id uuid not NULL references users (id) on delete cascade;

-- Set up Storage!
insert into
  storage.buckets (id, name)
values
  ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects for
insert
  with check (bucket_id = 'avatars');