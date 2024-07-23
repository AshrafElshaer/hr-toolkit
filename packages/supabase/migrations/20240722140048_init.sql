grant usage on schema "public" to anon;

grant usage on schema "public" to authenticated;

GRANT
SELECT
,
  INSERT,
UPDATE ON ALL TABLES IN SCHEMA "public" TO authenticated;

GRANT
SELECT
,
  INSERT,
UPDATE ON ALL TABLES IN SCHEMA "public" TO anon;

CREATE SCHEMA IF NOT EXISTS "auth";

CREATE SCHEMA IF NOT EXISTS "extensions";

create extension if not exists "uuid-ossp"
with
  schema extensions;

create extension if not exists pgcrypto
with
  schema extensions;

create extension if not exists pgjwt
with
  schema extensions;

grant usage on schema public to postgres,
anon,
authenticated,
service_role;

grant usage on schema extensions to postgres,
anon,
authenticated,
service_role;

grant all privileges on all tables in schema public to postgres,
anon,
authenticated,
service_role;

grant all privileges on all functions in schema public to postgres,
anon,
authenticated,
service_role;

grant all privileges on all sequences in schema public to postgres,
anon,
authenticated,
service_role;

alter default privileges in schema public
grant all on tables to postgres,
anon,
authenticated,
service_role;

alter default privileges in schema public
grant all on functions to postgres,
anon,
authenticated,
service_role;

alter default privileges in schema public
grant all on sequences to postgres,
anon,
authenticated,
service_role;

--  ______________________________________________________  Enums   ______________________________________________________
create type roles_enum as enum('admin', 'manager', 'team_leader', 'staff');

create type payroll_pattern_enum as enum('weekly', 'biweekly', 'monthly');

create type organization_type_enum as enum('public', 'private', 'non-profit');

create type employment_status_enum as enum('active', 'on_hold', 'terminated');

create type employment_type_enum as enum('full_time', 'part_time', 'contractor');

CREATE TYPE attendance_status_enum AS ENUM(
  'clocked_in',
  'pending',
  'clocked_out',
  'approved',
  'rejected'
);

create type payroll_status_enum as ENUM('pending', 'paid', 'failed');

create type time_off_status_enum AS ENUM('pending', 'approved', 'rejected');

create type time_off_type_enum AS ENUM(
  'vacation',
  'sick_leave',
  'personal_leave',
  'maternity_leave',
  'paternity_leave',
  'unpaid_leave'
);

-- ___________________________________________________ Organizations Table   ______________________________________________________
CREATE TABLE
  public.organizations (
    id uuid NOT NULL DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name text NOT NULL,
    type organization_type_enum NOT NULL,
    employees_count integer NOT NULL DEFAULT 0,
    contact_name text NOT NULL,
    contact_email text NOT NULL,
    contact_number text NOT NULL,
    payroll_pattern public.payroll_pattern_enum NOT NULL,
    payroll_start_day integer NOT NULL,
    registration_number text NOT NULL,
    tax_id text NOT NULL,
    address_1 text NOT NULL,
    address_2 text NULL,
    city text NOT NULL,
    state text NOT NULL,
    country text NOT NULL,
    zip_code text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp,
    updated_at timestamp with time zone NOT NULL DEFAULT current_timestamp
  ) TABLESPACE pg_default;

-- Users Table
CREATE TABLE
  users (
    id uuid REFERENCES auth.users (id) ON DELETE CASCADE,
    organization_id uuid NULL REFERENCES organizations (id) ON DELETE CASCADE,
    email text NOT NULL,
    first_name text NULL,
    last_name text NULL,
    avatar_url text NULL,
    phone_number text NULL,
    date_of_birth timestamp with time zone NULL,
    gender text NULL,
    hire_date timestamp with time zone NULL,
    leave_date timestamp with time zone NULL,
    job_title text NULL,
    employment_status public.employment_status_enum NULL DEFAULT 'active'::employment_status_enum,
    employment_type public.employment_type_enum NULL DEFAULT 'full_time'::employment_type_enum,
    work_hours_per_week integer NULL,
    role roles_enum DEFAULT 'staff',
    salary_per_hour numeric NULL,
    created_at timestamp with time zone NULL DEFAULT current_timestamp,
    updated_at timestamp with time zone NULL DEFAULT current_timestamp,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
  );

ALTER TABLE organizations
ADD COLUMN owner_id uuid REFERENCES users (id) ON DELETE CASCADE;

-- Departments Table
create table
  departments (
    id uuid not null default uuid_generate_v4 (),
    organization_id uuid not null,
    manager_id uuid not null,
    name text not null,
    description text,
    employees_count integer not null default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    constraint departments_pkey primary key (id),
    constraint departments_organization_id_fkey foreign key (organization_id) references organizations (id) on delete cascade,
    constraint departments_manager_id_fkey foreign key (manager_id) references users (id) on delete set null
  );

alter table users
add column department_id uuid references departments (id) on delete set null;

-- Addresses Table
CREATE TABLE
  public.addresses (
    id uuid not null default uuid_generate_v4 (),
    user_id UUID NULL,
    organization_id uuid not null,
    address_1 TEXT NOT NULL,
    address_2 TEXT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT addresses_owner_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    CONSTRAINT addresses_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations (id)
  ) TABLESPACE pg_default;

-- Emergency Contacts Table
CREATE TABLE
  public.emergency_contacts (
    id uuid not null default uuid_generate_v4 (),
    organization_id uuid not null,
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    relation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT emergency_contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    CONSTRAINT emergency_contacts_org_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations (id) ON DELETE CASCADE
  ) TABLESPACE pg_default;

-- Payrolls Table
CREATE TABLE
  payrolls (
    id uuid not null default uuid_generate_v4 (),
    user_id uuid NOT NULL,
    organization_id uuid NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    hours_worked DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    gross_pay DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    net_pay DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    taxes DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    deductions DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    bonuses DECIMAL(10, 2) DEFAULT 0.00,
    pay_date DATE NOT NULL,
    status payroll_status_enum NOT NULL default 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT payrolls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    CONSTRAINT payrolls_org_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations (id) ON DELETE CASCADE
  );

-- Attendances Table
CREATE TABLE
  public.attendances (
    id uuid not null default uuid_generate_v4 (),
    user_id UUID NOT NULL,
    organization_id uuid not null,
    clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
    clock_out TIMESTAMP WITH TIME ZONE,
    break_start TIMESTAMP WITH TIME ZONE,
    break_end TIMESTAMP WITH TIME ZONE,
    date date NOT NULL,
    status attendance_status_enum default 'clocked_in',
    payroll_id uuid null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT attendances_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    CONSTRAINT attendances_org_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations (id) ON DELETE CASCADE,
    CONSTRAINT attendances_payroll_id_fkey FOREIGN KEY (payroll_id) REFERENCES public.payrolls (id) ON DELETE set null
  ) TABLESPACE pg_default;

-- Time Offs Table
CREATE TABLE
  time_offs (
    id UUID NOT NULL DEFAULT uuid_generate_v4 (),
    user_id UUID NOT NULL,
    organization_id UUID NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type time_off_type_enum NOT NULL default 'unpaid_leave',
    reason TEXT,
    status time_off_status_enum NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT time_offs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    CONSTRAINT time_offs_org_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations (id) ON DELETE CASCADE
  );

-- ___________________________________________________  Organizations Functions   __________________________________________________
CREATE
OR REPLACE FUNCTION public.get_user_organization_owner_id () RETURNS uuid AS $$
DECLARE
    organization_id uuid;
    owner_id uuid;
BEGIN
    -- Get the organization ID for the current user
    SELECT public.get_user_organization_id() INTO organization_id;

    -- Get the owner ID for the retrieved organization ID
    SELECT owner_id INTO owner_id
    FROM public.organizations
    WHERE id = organization_id;

    -- Return the owner ID
    RETURN owner_id;
END;
$$ LANGUAGE plpgsql security definer;

--  ______________________________________________________  Users Functions   __________________________________________________
CREATE FUNCTION public.handle_new_user () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.users (
        id,
        email
    )
    VALUES (
        NEW.id,
       new.email
    );

    RETURN NEW;
END;
$$;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();

CREATE
OR REPLACE FUNCTION public.get_user_organization_id () RETURNS uuid AS $$
DECLARE
    organization_id_uuid uuid;
BEGIN
    -- Select organization ID for the current user from the users table
    SELECT organization_id INTO organization_id_uuid
    FROM public.users
    WHERE id = auth.uid();

    RETURN organization_id_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE
OR REPLACE FUNCTION public.get_user_department_id () RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    department_id uuid;
BEGIN
    SELECT department_id INTO department_id
    FROM public.users
    WHERE id = auth.uid();

    RETURN department_id;
END;
$$;

CREATE
OR REPLACE FUNCTION public.get_user_role () RETURNS text LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    role_name text;
BEGIN
    SELECT role INTO role_name
    FROM public.users
    WHERE id = auth.uid();

    RETURN role_name;
END;
$$;

-- Set up Storage!
insert into
  storage.buckets (id, name)
values
  ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects for insert
with
  check (bucket_id = 'avatars');

--  ___________________________________________________  Organizations Policies   __________________________________________________
alter table organizations enable row level security;

create policy "create organizations" on organizations for insert
with
  check (auth.uid () = owner_id);

create policy "select organizations" on organizations for
select
  using (
    public.get_user_organization_id () = id
    or auth.uid () = owner_id
  );

create policy "update organizations" on organizations
for update
  using (
    auth.uid () = owner_id
    and public.get_user_organization_id () = id
  );

create policy "delete organizations" on organizations for delete using (
  auth.uid () = owner_id
  and public.get_user_organization_id () = id
);

--  ______________________________________________________  Users Policies   __________________________________________________
alter table users enable row level security;

create policy "create users" on users for insert
with
  check (
    (
      public.get_user_role () = 'admin'
      and public.get_user_organization_id () = organization_id
    )
    or auth.uid () = id
  );

create policy "select user" on users for
select
  using (
    (
      (get_user_organization_id () = organization_id)
      OR (auth.uid () = id)
    )
  );

create policy "update user" on users
for update
  using (
    (
      (auth.uid () = id)
      OR (
        (
          (get_user_role () = 'admin')
          OR (get_user_role () = 'manager')
        )
        AND (get_user_organization_id () = organization_id)
      )
    )
  );

create policy "delete user" on users for delete using (
  public.get_user_role () = 'admin'
  and public.get_user_organization_id () = organization_id
);

--  ______________________________________________________  Departments Policies   __________________________________________________
alter table departments enable row level security;

create policy "create departments" on departments for insert
with
  check (
    (
      (
        (get_user_role () = 'admin')
        AND (get_user_organization_id () = organization_id)
      )
      OR (
        (get_user_organization_owner_id () = manager_id)
        AND (get_user_organization_id () = organization_id)
      )
    )
  );

create policy "select departments" on departments for
select
  using (
    public.get_user_organization_id () = organization_id
  );

create policy "update departments" on departments
for update
  using (
    (
      public.get_user_role () = 'admin'
      and public.get_user_organization_id () = organization_id
    )
    or (
      public.get_user_role () = 'manager'
      and public.get_user_organization_id () = organization_id
      and public.get_user_department_id () = id
    )
  );

create policy "delete departments" on departments for delete using (
  public.get_user_role () = 'admin'
  and public.get_user_organization_id () = organization_id
);

--  ______________________________________________________  Addresses Policies   __________________________________________________
alter table addresses enable row level security;

create policy "create addresses" on addresses for insert
with
  check (
    auth.uid () = user_id
    or (
      public.get_user_role () = 'admin'
      and public.get_user_organization_id () = organization_id
    )
    or (
      public.get_user_role () = 'manager'
      and public.get_user_organization_id () = organization_id
    )
  );

create policy "select addresses" on addresses for
select
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or auth.uid () = user_id
  );

create policy "update addresses" on addresses
for update
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or auth.uid () = user_id
  );

create policy "delete addresses" on addresses for delete using (
  (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'admin'
  )
  or (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'manager'
  )
);

--  ______________________________________________  Emergency Contacts Policies   __________________________________________________
alter table public.emergency_contacts enable row level security;

create policy "create emergency_contacts" on emergency_contacts for insert
with
  check (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or auth.uid () = user_id
  );

create policy "select emergency_contacts" on emergency_contacts for
select
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or auth.uid () = user_id
  );

create policy "update emergency_contacts" on emergency_contacts
for update
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or auth.uid () = user_id
  );

create policy "delete emergency_contacts" on emergency_contacts for delete using (
  (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'admin'
  )
  or (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'manager'
  )
);

--  ______________________________________________ Payrolls Policies   __________________________________________________
alter table payrolls enable row level security;

create policy "create payrolls" on payrolls for insert
with
  check (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
  );

create policy "select payrolls" on payrolls for
select
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or user_id = auth.uid ()
  );

create policy "update payrolls" on payrolls
for update
  using (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'admin'
  );

create policy "delete payrolls" on payrolls for delete using (
  public.get_user_organization_id () = organization_id
  and public.get_user_role () = 'admin'
);

--  ______________________________________________ Attendances Policies   __________________________________________________
alter table attendances enable row level security;

create policy "create attendances" on attendances for insert
with
  check (
    user_id = auth.uid ()
    and get_user_department_id () = organization_id
  );

create policy "select attendances" on attendances for
select
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or user_id = auth.uid ()
  );

create policy "update attendances" on attendances
for update
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or user_id = auth.uid ()
  );

create policy "delete attendances" on attendances for delete using (
  (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'admin'
  )
  or (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'manager'
  )
);

--  ______________________________________________ Time Offs Policies   __________________________________________________
alter table time_offs enable row level security;

create policy "create time_offs" on time_offs for insert
with
  check (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or user_id = auth.uid ()
  );

create policy "select time_offs" on time_offs for
select
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or user_id = auth.uid ()
  );

create policy "update time_offs" on time_offs
for update
  using (
    (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'admin'
    )
    or (
      public.get_user_organization_id () = organization_id
      and public.get_user_role () = 'manager'
    )
    or user_id = auth.uid ()
  );

create policy "delete time_offs" on time_offs for delete using (
  (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'admin'
  )
  or (
    public.get_user_organization_id () = organization_id
    and public.get_user_role () = 'manager'
  )
);
