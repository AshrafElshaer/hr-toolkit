"use server";
import { authActionClient } from "@/lib/safe-action";
import { updateOrganization } from "@toolkit/supabase/mutations";

import { organizationUpdateSchema } from "@toolkit/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

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
    const payload = {
      ...parsedInput,
      profile: JSON.stringify(parsedInput.profile),
    };
    const { data, error } = await updateOrganization(supabase, payload);

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    revalidatePath("/organization");
    revalidateTag(parsedInput.id);

    return data;
  });

export const uploadOrganizationLogoAction = authActionClient
  .metadata({
    name: "uploadOrganizationLogo",
    track: {
      event: "upload-organization-logo",
      channel: "organization",
    },
  })
  .schema(
    z.object({
      organization_id: z.string(),
      logo_url: z.string(),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const { supabase } = ctx;
    const { data, error } = await updateOrganization(supabase, {
      logo_url: parsedInput.logo_url,
      id: parsedInput.organization_id,
    });

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization");
    revalidateTag(parsedInput.organization_id);
    revalidateTag(data?.domain);

    return data;
  });
