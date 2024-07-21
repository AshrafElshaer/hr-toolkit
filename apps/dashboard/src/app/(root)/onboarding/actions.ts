"use server";
import { authAction } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";

import { createOrganizationSchema } from "@/lib/validations/organizations";
import { createOrganizationMutation } from "@hr-toolkit/supabase/organizations-mutations";

export const createOrganizationAction = authAction
  .schema(createOrganizationSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const supabase = createServerClient({
      isAdmin: true,
    });
    const newOrg = await createOrganizationMutation(supabase, {
      name: parsedInput.name,
      type: parsedInput.type,
      employees_count: parsedInput.employees_count,
      contact_name: parsedInput.contact_name,
      contact_email: parsedInput.contact_email,
      contact_number: parsedInput.contact_number,
      payroll_pattern: parsedInput.payroll_pattern,
      payroll_start_day: parsedInput.payroll_start_day,
      owner_id: user.id,
    }, {
      address_1: parsedInput.address_1,
      address_2: parsedInput.address_2,
      city: parsedInput.city,
      state: parsedInput.state,
      zip_code: parsedInput.zip_code,
      country: parsedInput.country,
    });

    return newOrg;
  });
