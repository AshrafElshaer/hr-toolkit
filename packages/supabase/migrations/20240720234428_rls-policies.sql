-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
-- USERS
alter table
    users enable row level security;

create policy "users are viewable by everyone in the organization." on users for
select
    using (
        get_user_organization_id () = organization_id :: uuid
    );

create policy "admins can insert a user." on users for
insert
    with check (
        (
            select
                auth.role () = 'admin'
        )
        or (
            select
                auth.role () = 'hr_manager'
        )
    );

create policy "Users and admins can update profile." on users for
update
    using (
        (
            select
                auth.uid ()
        ) = id
        or (
            select
                auth.role () = 'admin'
        )
        or (
            select
                auth.role () = 'hr_manager'
        )
    );

-- ORGANIZATIONS
alter table
    organizations enable row level security;

create policy "organizations are viewable by everyone in the organization." on organizations for
select
    using (  ((get_user_organization_id() = id) OR (auth.uid() = owner_id)));

create policy "owner can insert an organization." on organizations for
insert
    with check (
        (
            select
                auth.uid () = owner_id
        )
    );

create policy "owner can update an organization." on organizations for
update
    using (
        (
            select
                auth.role () = 'admin'
        )
    );

create policy "owner can delete an organization." on organizations for delete using (
    (
        select
            auth.role () = 'admin'
    )
);