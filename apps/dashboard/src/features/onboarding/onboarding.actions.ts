"use server";
import { authActionClient } from "@/lib/safe-action";
import { uploadOrganizationLogo } from "@/lib/supabase/storage/uploads";
import { createOrganization, createUser } from "@toolkit/supabase/mutations";
import {
  organizationInsertSchema,
  userInsertSchema,
} from "@toolkit/supabase/validations";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const onboardUserAction = authActionClient
  .metadata({
    name: "onboard-user",
  })
  .schema(userInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;

    const { data, error } = await createUser(supabase, {
      ...parsedInput,
      id: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });

export const onboardOrganizationAction = authActionClient
  .metadata({
    name: "onboard-organization",
  })
  .schema(
    organizationInsertSchema.merge(
      z.object({
        logo: zfd.file(),
      }),
    ),
  )
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;
    const { logo, ...data } = parsedInput;
    const organizationId = crypto.randomUUID();

    const logoUrl = await uploadOrganizationLogo(
      supabase,
      organizationId,
      logo,
    );

    const { data: organization, error } = await createOrganization(supabase, {
      ...data,
      logo_url: logoUrl,
      admin_id: user.id,
      id: organizationId,
      profile: undefined,
    });

    if (error) {
      throw new Error(error.message);
    }

    await supabase.auth.updateUser({
      data: {
        organization_id: organizationId,
      },
    });

    return organization;
  });
