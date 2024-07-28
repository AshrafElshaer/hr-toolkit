--  ORGANIZATION FUNCTIONS
-- INCREMENT ORGANIZATION EMPLOYEES COUNT ON USER INSERT
create
or replace function public.increment_organization_employees_count() returns trigger language plpgsql security definer as $$ begin
/*
 check if organization with the given id exists if not do nothing
 */
if not exists (
    select
        1
    from
        organizations
    where
        id = new.organization_id
) then return new;

end if;

update
    organizations
set
    employees_count = employees_count + 1
where
    id = new.organization_id;

return new;

end $$;

-- DECREMENT ORGANIZATION EMPLOYEES COUNT ON USER DELETE
create
or replace function public.decrement_organization_employees_count() returns trigger language plpgsql security definer as $$ begin
update
    organizations
set
    employees_count = employees_count - 1
where
    id = old.organization_id;

return old;

end $$;

-- USER FUNCTIONS
create
or REPLACE function public.on_create_user() returns trigger language plpgsql security definer as $$ begin
insert into
    public.users (id, email, created_at, updated_at)
values
    (
        new.id,
        new.email,
        new.created_at,
        new.updated_at
    );

return new;

end $$;

create
or REPLACE function public.get_user_organization_id() returns uuid language plpgsql security invoker as $$ begin return (
    select
        organization_id
    from
        users
    where
        id = auth.uid()
);

end $$;

create
or REPLACE function public.get_user_department_id() returns uuid language plpgsql security invoker as $$ begin return (
    select
        department_id
    from
        users
    where
        id = auth.uid()
);

end $$;

create
or REPLACE function public.get_user_role() returns public.user_roles_enum language plpgsql security invoker as $$ begin return (
    select
        user_role
    from
        users
    where
        id = auth.uid()
);

end $$;

create
or replace function public.is_user_team_member(team_id uuid) returns boolean language plpgsql security definer as $$ begin return exists (
    select
        1
    from
        public.team_members tm
    where
        tm.team_id = team_id
        and tm.user_id = auth.uid()
);

end $$;

create
or replace function public.is_user_team_leader(user_id uuid) returns boolean language plpgsql security definer as $$ begin return exists (
    select
        1
    from
        public.teams
    where
        leader_id = user_id
);

end $$;

create
or replace function public.get_team_leader_id(team_id uuid) returns uuid language plpgsql security definer as $$ begin return (
    select
        leader_id
    from
        public.teams
    where
        id = team_id
);

end $$;

create
or replace function public.is_user_project_member(project_id uuid) returns boolean language plpgsql security invoker as $$ begin return exists (
    select
        1
    from
        public.project_team pt
        join public.team_members tm on pt.team_id = tm.team_id
    where
        pt.project_id = project_id
        and tm.user_id = auth.uid()
);

end $$;

-- DEPARTMENT FUNCTIONS
-- INCREMENT DEPARTMENT EMPLOYEES COUNT ON USER INSERT
CREATE
OR REPLACE FUNCTION public.increment_department_employees_count() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = public AS $$ BEGIN -- Check if the new user's manager_id is the same as any organization's owner_id
    IF EXISTS (
        SELECT
            1
        FROM
            organizations
        WHERE
            owner_id = NEW.manager_id
    ) THEN -- If manager_id is an organization owner_id, do nothing
    RETURN NEW;

END IF;

-- If we've reached here, the manager is not an organization owner
-- So we increment the employees_count for the department
UPDATE
    departments
SET
    employees_count = employees_count + 1
WHERE
    id = NEW.department_id;

RETURN NEW;

END $$;

-- DECREMENT DEPARTMENT EMPLOYEES COUNT ON USER DELETE
CREATE
OR REPLACE FUNCTION public.decrement_department_employees_count() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = public AS $$ BEGIN
UPDATE
    departments
SET
    employees_count = greatest(0, employees_count - 1)
WHERE
    id = OLD.department_id;

RETURN OLD;

END $$;

-- UPDATE DEPARTMENT EMPLOYEES COUNT ON USER DEPARTMENT_ID UPDATE
CREATE
OR REPLACE FUNCTION public.update_department_employees_count() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = public AS $$ BEGIN -- If department_id hasn't changed, do nothing
    IF NEW.department_id = OLD.department_id THEN RETURN NEW;

END IF;

-- Decrement count in the old department
UPDATE
    departments
SET
    employees_count = greatest(0, employees_count - 1)
WHERE
    id = OLD.department_id;

-- Increment count in the new department
UPDATE
    departments
SET
    employees_count = employees_count + 1
WHERE
    id = NEW.department_id;

RETURN NEW;

END;

$$;