"use server";

import { authActionClient } from "@/lib/safe-action";
import { updateUser } from "@toolkit/supabase/mutations";
import { updateUserSchema } from "./schema";

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
  .metadata({
    name: "update-user",
  })
  .action(async ({ parsedInput: input, ctx: { user, supabase } }) => {
    const result = await updateUser(supabase, user.id, input);

    return result;
  });
