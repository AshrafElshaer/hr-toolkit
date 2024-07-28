"use server";
import { authAction } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";

import { createOrganizationSchema } from "@/lib/validations/organizations";
import { createUserSchema } from "@/lib/validations/users";
import organizationMutations from "@hr-toolkit/supabase/organization-mutations";
import userMutations from "@hr-toolkit/supabase/user-mutations";

export const createOrganizationAction = authAction
  .schema(createOrganizationSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient({
      isAdmin: true,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const newOrg = await organizationMutations.create(supabase, {
      name: parsedInput.name,
      type: parsedInput.type,
      employees_count: parsedInput.employees_count,
      contact_name: parsedInput.contact_name,
      contact_email: parsedInput.contact_email,
      contact_number: parsedInput.contact_number,
      payroll_pattern: parsedInput.payroll_pattern,
      payroll_start_day: parsedInput.payroll_start_day,
      time_zone: parsedInput.time_zone,
      owner_id: user.id,
      address_1: parsedInput.address_1,
      address_2: parsedInput.address_2,
      city: parsedInput.city,
      state: parsedInput.state,
      country: parsedInput.country,
      zip_code: parsedInput.zip_code,
    });

    return newOrg;
  });

const formSchema = createUserSchema.omit({
  department_id: true,
  organization_id: true,
});
export const createOrganizationOwnerAction = authAction
  .schema(formSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient({
      isAdmin: true,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const newUser = await userMutations.createOwner(supabase, {
      id: user.id,
      organization_id: user.user_metadata.organization_id,
      email: parsedInput.email,
      first_name: parsedInput.first_name,
      last_name: parsedInput.last_name,
      phone_number: parsedInput.phone_number,
      salary_per_hour: parsedInput.salary_per_hour,
      work_hours_per_week: parsedInput.work_hours_per_week,
      date_of_birth: new Date(parsedInput.date_of_birth).toISOString(),
      hire_date: new Date(parsedInput.hire_date).toISOString(),
      leave_date: parsedInput.leave_date
        ? new Date(parsedInput.leave_date).toISOString()
        : null,
      employment_status: parsedInput.employment_status,
      employment_type: parsedInput.employment_type,
      address_1: parsedInput.address_1,
      address_2: parsedInput.address_2,
      city: parsedInput.city,
      state: parsedInput.state,
      country: parsedInput.country,
      zip_code: parsedInput.zip_code,

      avatar_url: parsedInput?.avatar_url ?? undefined,
      gender: parsedInput.gender,
      job_title: parsedInput.job_title,
    });

    return newUser;
  });
