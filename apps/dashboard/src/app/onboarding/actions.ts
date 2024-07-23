"use server";
import { authAction } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";

import { createOrganizationSchema } from "@/lib/validations/organizations";
import { createUserSchema } from "@/lib/validations/users";
import organizationMutations from "@hr-toolkit/supabase/organization-mutations";
import userMutations from "@hr-toolkit/supabase/user-mutations";

export const createOrganizationAction = authAction
  .schema(createOrganizationSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const supabase = createServerClient();

    const newOrg = await organizationMutations.create(supabase, {
      name: parsedInput.name,
      type: parsedInput.type,
      employees_count: parsedInput.employees_count,
      contact_name: parsedInput.contact_name,
      contact_email: parsedInput.contact_email,
      contact_number: parsedInput.contact_number,
      payroll_pattern: parsedInput.payroll_pattern,
      payroll_start_day: parsedInput.payroll_start_day,
      registration_number: parsedInput.registration_number,
      tax_id: parsedInput.tax_id,
      owner_id: user.id,
      address_1: parsedInput.address_1,
      address_2: parsedInput.address_2,
      city: parsedInput.city,
      state: parsedInput.state,
      country: parsedInput.country,
      zip_code: parsedInput.zip_code,
      
    }, );

    return newOrg;
  });

  const formSchema = createUserSchema.omit({
    department_id: true,
    organization_id: true,
    owner_id: true,
  });
export const createOrganizationOwnerAction = authAction
  .schema(formSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const supabase = createServerClient({
      isAdmin: true,
    });

    const newUser = await userMutations.createOwner(supabase, {
      ...parsedInput,
      organization_id: user.user_metadata.organization_id as string,
      id: user.id,
      date_of_birth: parsedInput.date_of_birth.toISOString(), // Convert date_of_birth to string
      hire_date: parsedInput.hire_date.toISOString(), // Convert hire_date to string
      leave_date: parsedInput.leave_date?.toISOString(), // Convert leave_date to string
    });

    return newUser;
  });
