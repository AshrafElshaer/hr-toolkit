/*_____ORGANIZATION RLS POLICIES */
alter table
    organizations enable row level security;

create policy select_organization on organizations for
select
    using (
        public.get_user_organization_id() = id
        or auth.uid() = owner_id
    );

create policy insert_organization on organizations for
insert
    using (auth.uid() = owner_id);

create policy update_organization on organizations for
update
    using (
        public.get_user_organization_id() = id
        and auth.uid() = owner_id
    );

create policy delete_organization on organizations for delete using (
    public.get_user_organization_id() = id
    and auth.uid() = owner_id
);

/*____USER RLS POLICIES*/
alter table
    users enable row level security;

create policy select_user on users for
select
    using (
        auth.uid () = id
        or public.get_user_organization_id () = organization_id
    );

create policy insert_user on users for
insert
    with check (
        case
            -- admins can insert users into organization
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            /* 
             managers can insert users into their department 
             */
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id
            and public.get_user_department_id() = department_id then true
            else false
        end
    );

create policy update_user on users for
update
    using (
        case
            -- admins can update any user
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            /* 
             managers can update users in their department 
             */
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id
            and public.get_user_department_id () = department_id then TRUE
            /* 
             users can update themselves
             */
            when auth.uid () = id then true
            else false
        end
    );

create policy delete_user on users for delete using (
    -- only admins can delete users
    public.get_user_role () = 'admin'
    and public.get_user_organization_id () = organization_id
);

/*_______ DEPARTMENT RLS POLICIES*/
alter table
    departments enable row level security;

create POLICY select_department on departments for
select
    using (
        public.get_user_organization_id() = organization_id
    );

create POLICY insert_department on departments for
insert
    using (
        public.get_user_organization_id() = organization_id
        and public.get_user_role() = 'admin'
    );

create POLICY update_department on departments for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_department_id() = id
            and auth.uid() = manager_id then true
            else false
        end
    );

create POLICY delete_department on departments for delete using (
    public.get_user_role() = 'admin'
    and public.get_user_organization_id() = organization_id
);

/*_______ ADDRESS RLS POLICIES*/
alter table
    addresses enable row level security;

create policy select_addresses on addresses for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy insert_addresses on addresses for
insert
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy update_addresses on addresses for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy delete_addresses on addresses for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id then true
        else false
    end
);

/*_______ EMERGENCY CONTACTS RLS POLICIES*/
alter table
    public.emergency_contacts enable row level security;

create policy select_emergency_contacts on public.emergency_contacts for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy insert_emergency_contacts on public.emergency_contacts for
insert
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy update_emergency_contacts on public.emergency_contacts for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy delete_emergency_contacts on public.emergency_contacts for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id then true
        else false
    end
);

/*_______ ATTENDANCES RLS POLICIES*/
alter table
    public.attendances enable row level security;

create policy select_attendance on attendances for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy insert_attendance on attendances for
insert
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy update_attendance on attendances for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy delete_attendance on attendances for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id
        and public.get_user_department_id() = department_id then true
        else false
    end
)
/*_______ TIME OFFS RLS POLICIES*/
alter table
    time_offs enable row level security;

create policy select_time_off on time_offs for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy insert_time_off on time_offs for
insert
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy update_time_off on time_offs for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy delete_time_off on time_offs for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id
        and public.get_user_department_id() = department_id then true
        else false
    end
);

/*_______ PAYROLLS RLS POLICIES*/
alter table
    public.payrolls enable row level security;

create policy "select_payrolls" on public.payrolls for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when auth.uid() = user_id then true
            else false
        end
    );

create policy "insert_payrolls" on public.payrolls for
insert
    with check (
        using (
            case
                when public.get_user_role() = 'admin'
                and public.get_user_organization_id() = organization_id then true
                when public.get_user_role() = 'manager'
                and public.get_user_organization_id() = organization_id
                and public.get_user_department_id() = department_id then true
                else false
            end
        );

);

create policy "update_payrolls" on public.payrolls for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            else false
        end
    );

create policy "delete_payrolls" on public.payrolls for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id
        and public.get_user_department_id() = department_id then true
        else false
    end
);

/* 
 EVENTS RLS POLICIES
 */
alter table
    events enable row level security;

create policy select_events_policy on public.events for
select
    using (
        case
            when public.get_user_role() = 'admin' then true
            when department_id is null then public.get_user_organization_id() = organization_id
            else public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
        end
    );

CREATE POLICY insert_events_policy ON public.events FOR
INSERT
    WITH CHECK (
        -- If the user is an admin, allow the insert without department restrictions
        public.get_user_role() = 'admin'
        OR (
            -- For managers or team leaders:
            -- Ensure the user belongs to the same organization and department_id is not null
            public.get_user_organization_id() = organization_id
            AND public.get_user_department_id() = department_id
            AND department_id IS NOT NULL
            AND (
                public.get_user_role() = 'manager'
                OR public.get_user_role() = 'team_leader'
            )
        )
    );

create policy update_events_policy on public.events for
update
    using (auth.uid () = organizer_id);

create policy delete_events_policy on public.events for delete using (auth.uid () = organizer_id);

/* 
 TEAM RLS POLICIES
 */
alter table
    teams enable row level security;

create policy "select_teams" on public.teams for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when public.get_user_role() = 'team_leader' then public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
            and auth.uid() = leader_id
            when public.get_user_role() = 'staff'
            and public.is_user_team_member(id) then true
            else false
        end
    );

create policy "insert_teams" on public.teams for
insert
    using (
        (
            public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id
        )
        or (
            public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
        )
    );

create policy "update_teams" on public.teams for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when public.get_user_role() = 'team_leader' then public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
            and auth.uid() = leader_id
            else false
        end
    );

create policy "delete_teams" on public.teams for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id
        and public.get_user_department_id() = department_id then true
        else false
    end
);

/* 
 TEAM MEMBERS RLS POLICIES
 */
alter table
    team_members enable row level security;

create policy "select_team_members" on public.team_members for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when public.get_user_role() = 'team_leader' then public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
            and auth.uid() = user_id
            when public.get_user_role() = 'staff' then public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
            and public.is_user_team_member(team_id)
            else false
        end
    );

create policy "insert_team_members" on public.team_members for
insert
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when public.get_user_role() = 'team_leader' then public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
            and public.get_team_leader_id(team_id) = auth.uid()
            else false
        end
    );

create policy "update_team_members" on public.team_members for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when public.get_user_role() = 'team_leader' then public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id
            and public.get_team_leader_id(team_id) = auth.uid()
            else false
        end
    );

create policy "delete_team_members" on public.team_members for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id
        and public.get_user_department_id() = department_id then true
        else false
    end
);

/* 
 PROJECTS RLS POLICIES
 */
alter table
    public.projects enable row level security;

create policy "select_projects" on public.projects for
select
    using (
        case
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id
            and public.get_user_department_id () = department_id then true
            when public.is_user_project_member (id) then true
            else false
        end
    );

create policy "insert_projects" on public.projects for
insert
    with check (
        case
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id
            and public.get_user_department_id () = department_id then true
            else false
        end
    );

create policy "update_projects" on public.projects for
update
    using (
        case
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id
            and public.get_user_department_id () = department_id then true
            else false
        end
    );

create policy "delete_projects" on public.projects for delete using (
    case
        when public.get_user_role () = 'admin'
        and public.get_user_organization_id () = organization_id then true
        when public.get_user_role () = 'manager'
        and public.get_user_organization_id () = organization_id
        and public.get_user_department_id () = department_id then true
        else false
    end
);

/*
 PROJECT TEAM RLS POLICIES
 */
alter table
    project_team enable row level security;

create policy "select_project_team" on public.project_team for
select
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            when public.is_user_team_member(team_id) then true
            else false
        end
    );

create policy "insert_project_team" on public.project_team for
insert
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            else false
        end
    );

create policy "update_project_team" on public.project_team for
update
    using (
        case
            when public.get_user_role() = 'admin'
            and public.get_user_organization_id() = organization_id then true
            when public.get_user_role() = 'manager'
            and public.get_user_organization_id() = organization_id
            and public.get_user_department_id() = department_id then true
            else false
        end
    );

create policy "delete_project_team" on public.project_team for delete using (
    case
        when public.get_user_role() = 'admin'
        and public.get_user_organization_id() = organization_id then true
        when public.get_user_role() = 'manager'
        and public.get_user_organization_id() = organization_id
        and public.get_user_department_id() = department_id then true
        else false
    end
);

/* 
 TASKS RLS POLICIES
 */
alter table
    public.tasks enable row level security;

create policy "select_tasks" on public.tasks for
select
    using (
        case
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id then true
            when public.is_user_project_member (project_id) then true
            else false
        end
    );

create policy "insert_tasks" on public.tasks for
insert
    with check (
        case
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id then true
            when public.is_user_project_member (project_id) then true
            when public.is_user_team_leader (auth.uid ()) then true
            else false
        end
    );

create policy "update_tasks" on public.tasks for
update
    using (
        case
            when public.get_user_role () = 'admin'
            and public.get_user_organization_id () = organization_id then true
            when public.get_user_role () = 'manager'
            and public.get_user_organization_id () = organization_id then true
            when public.is_user_project_member (project_id) then true
            when public.is_user_team_leader (auth.uid ()) then true
            when auth.uid () = assigned_to then true
            else false
        end
    );

create policy "delete_tasks" on public.tasks for delete using (
    case
        when public.get_user_role () = 'admin'
        and public.get_user_organization_id () = organization_id then true
        when public.get_user_role () = 'manager'
        and public.get_user_organization_id () = organization_id then true
        when public.is_user_project_member (project_id) then true
        when public.is_user_team_leader (auth.uid ()) then true
        else false
    end
);

/* 
 TASK COMMENTS RLS POLICIES
 */
alter table
    public.task_comments enable row level security;

create policy "select_task_comments" on public.task_comments for
select
    using (true);

create policy "insert_task_comments" on public.task_comments for
insert
    with check (auth.uid () = user_id);

create policy "update_task_comments" on public.task_comments for
update
    using (auth.uid () = user_id);

create policy "delete_task_comments" on public.task_comments for delete using (auth.uid () = user_id);