-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- ORGANIZATIONS
-- Drop the existing trigger if it already exists
drop trigger if exists user_insert_trigger on organizations;



create
or replace function get_organization_employees_count () returns integer as $$
BEGIN
    RETURN (SELECT employees_count FROM organizations WHERE id = org_id);
END;
$$ language plpgsql;

create
or replace function update_organization_count () returns trigger as $$
BEGIN
    UPDATE organizations
    SET employees_count = COALESCE(old.employees_count, 0) + 1
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ language plpgsql;

-- Create a trigger to call the function on insert
create trigger user_insert_trigger before insert on organizations for each row
execute function update_organization_count ();

-- USERS
create
or replace function get_user_organization_id () returns uuid language sql as $$
select organization_id from users where id = auth.uid()
$$;

create
or replace function get_user_department_id () returns tex language sql as $$
select department_id from users where id = auth.uid()
$$;
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.