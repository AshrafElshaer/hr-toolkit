"use server";

import { authActionClient } from "@/lib/safe-action";
import { createDepartment } from "@toolkit/supabase/mutations";
import { departmentInsertSchema } from "@toolkit/supabase/validations";
import { revalidatePath } from "next/cache";

export const createDepartmentAction = authActionClient
  .metadata({
    name: "createDepartment",
    track: {
      event: "department_created",
      channel: "departments",
    },
  })
  .schema(departmentInsertSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, user } = ctx;


    const payload = {
      ...parsedInput,
      organization_id: user.user_metadata.organization_id,
    };

    const { data, error } = await createDepartment(supabase, payload);
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization/departments");

    return data;
  });
