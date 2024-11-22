-- Organizations
alter table organizations enable row level security;

create policy "Create Organization" on organizations for insert with check (admin_id = auth.uid());
create policy "Anyone Can View Organization" on organizations for select using (true);

create policy "Organization Admin Can Update Organization" on organizations for update using (is_user_organization_admin(id));
create policy "Organization Admin Can Delete Organization" on organizations for delete using (is_user_organization_admin(id));

-- Organization Members
alter table organization_members enable row level security;


create policy "Organization Members Can View Organization Member" on organization_members for select using (true);
create policy "Organization Admin Can Create Organization Member" on organization_members for insert with check (is_user_organization_admin(organization_id));

create policy "Organization Admin Can Update Organization Member" on organization_members for update using (is_user_organization_admin(organization_id));

create policy "Organization Admin Can Delete Organization Member" on organization_members for delete using (is_user_organization_admin(organization_id));

-- Users
alter table users enable row level security;

create policy "Anyone Can Create User" on users for insert with check (true);

create policy "Anyone Can View User" on users for select using (true);

create policy "Admin Or User Can Update User" on users for update using (is_user_admin() or auth.uid() = id);

create policy "Admin Can Delete User" on users for delete using (is_user_admin());


-- Job Posts
alter table job_posts enable row level security;

create policy "Organization Members Can Create Job Post" on job_posts for insert with check (is_user_organization_member(organization_id) and created_by = auth.uid());


create policy "Anyone Can View Job Post" on job_posts for select using (true);

create policy "Admin Or Creator Can Update Job Post" on job_posts for update using (created_by = auth.uid() and is_user_organization_admin(organization_id));

create policy "Admin Or Creator Can Delete Job Post" on job_posts for delete using (is_user_organization_admin(organization_id) or created_by = auth.uid());

-- Applications
alter table applications enable row level security;

create policy "Organization Members Can View Job Application" on applications for select using (is_user_organization_member(organization_id));

create policy "Anyone Can Create Job Application" on applications for insert with check (true);

create policy "Organization Members Can Update Job Application" on applications for update using (is_user_organization_member(organization_id));

create policy "Organization Members Can Delete Job Application" on applications for delete using (is_user_organization_member(organization_id));


-- Interviews
alter table interviews enable row level security;

create policy "Organization Members Can View Interview" on interviews for select using (is_user_organization_member(organization_id));


create policy "Organization Members Can Create Interview" on interviews for insert with check (is_user_organization_member(organization_id));

create policy "Interviewer Can Update Interview" on interviews for update using (interviewer_id = auth.uid());

create policy "Admin or Interviewer Can Delete Interview" on interviews for delete using (is_user_organization_admin(organization_id) or interviewer_id = auth.uid());

-- Candidates
alter table candidates enable row level security;

create policy "Organization Members Can View Candidate" on candidates for select using (is_user_organization_member(organization_id));

create policy "Organization Members Can Create Candidate" on candidates for insert with check (true);

create policy "Organization Members Can Update Candidate" on candidates for update using (is_user_organization_member(organization_id));

create policy "Organization Members Can Delete Candidate" on candidates for delete using (is_user_organization_member(organization_id));

-- Interview Stages
alter table interview_stages enable row level security;

create policy "Organization Members Can View Interview Stage" on interview_stages for select using (is_user_organization_member(organization_id));

create policy "Organization Admin Can Create Interview Stage" on interview_stages for insert with check (is_user_organization_admin(organization_id));

create policy "Organization Admin Can Update Interview Stage" on interview_stages for update using (is_user_organization_admin(organization_id));

create policy "Organization Admin Can Delete Interview Stage" on interview_stages for delete using (is_user_organization_admin(organization_id));


