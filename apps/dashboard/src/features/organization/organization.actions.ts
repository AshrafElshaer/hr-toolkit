"use server";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import {
  createOrganizationMember,
  createUser,
  updateOrganization,
} from "@toolkit/supabase/mutations";

import { resend } from "@/lib/resend";
import { uploadUserAvatar } from "@/lib/supabase/storage/uploads";
import { InvitationEmail } from "@toolkit/email";
import {
  organizationUpdateSchema,
  userInsertSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import React from "react";
import { z } from "zod";
import { zfd } from "zod-form-data";

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

    return data;
  });

export const inviteTeamMemberAction = authActionClient
  .metadata({
    name: "inviteTeamMember",
    track: {
      event: "invite-team-member",
      channel: "organization",
    },
  })
  .schema(
    userInsertSchema.merge(
      z.object({
        avatar: zfd.file(),
      }),
    ),
  )
  .action(async ({ ctx, parsedInput }) => {
    const { user } = ctx;
    const { avatar, ...newUser } = parsedInput;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: parsedInput.email,
        user_metadata: {
          organization_id: user.user_metadata.organization_id,
        },
      });

    if (authError) {
      throw new Error(authError.message);
    }

    const {
      data: { publicUrl },
    } = await uploadUserAvatar(authData.user.id, parsedInput.avatar);

    const { data, error } = await createUser(supabase, {
      ...newUser,
      avatar_url: publicUrl,
      id: authData.user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { data: organizationMemberData } = await createOrganizationMember(
      supabase,
      {
        organization_id: user.user_metadata.organization_id,
        user_id: authData.user.id,
      },
    );

    if (!organizationMemberData?.organization) {
      throw new Error("Failed to create organization member");
    }

    await resend.emails.send({
      from: `${organizationMemberData.organization.name} Access Granted <onboarding@hrtoolkit.app>`,
      to: [parsedInput.email],
      subject: `Invitation to Join ${organizationMemberData.organization.name}`,
      react: InvitationEmail({
        organization: organizationMemberData.organization,
        name: `${data.first_name} ${data.last_name}`,
      }),
    });
    revalidatePath("/organization/team");

    return data;
  });
