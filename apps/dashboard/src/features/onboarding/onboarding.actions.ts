"use server";
import { authActionClient } from "@/lib/safe-action";
import { createUser } from "@toolkit/supabase/mutations";
import { userInsertSchema } from "@toolkit/supabase/validations";
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
