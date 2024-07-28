-- ORGANIZATION TRIGGERS
create trigger increment_organization_employees_count
after
insert
    on users for each row execute function public.increment_organization_employees_count();

create trigger decrement_organization_employees_count
after
    delete on users for each row execute function public.decrement_organization_employees_count();

-- USER TRIGGERS
create trigger on_create_user
after
insert
    on auth.users for each row execute function public.on_create_user();

CREATE TRIGGER increment_department_employees_count
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION public.increment_department_employees_count();


CREATE TRIGGER decrement_department_employees_count
AFTER DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION public.decrement_department_employees_count();


CREATE TRIGGER update_department_employees_count
AFTER UPDATE OF department_id ON users
FOR EACH ROW
EXECUTE FUNCTION public.update_department_employees_count();