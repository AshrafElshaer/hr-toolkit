"use server";
import { authActionClient } from "@/lib/safe-action";
import { updateOrganization } from "@toolkit/supabase/mutations";

import { organizationUpdateSchema } from "@toolkit/supabase/validations";

export const updateOrganizationAction = authActionClient
  .metadata({
    name: "updateOrganization",
    track: {
      event: "update-organization",
      channel: "organization",
    },
  })
  .schema(organizationUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { supabase } = ctx;
    const { data, error } = await updateOrganization(supabase, {
      ...parsedInput,
      profile: JSON.stringify(parsedInput.profile),
    });

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return data;
  });
