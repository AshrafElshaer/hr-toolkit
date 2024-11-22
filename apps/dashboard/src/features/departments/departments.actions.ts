"use server";

import { authActionClient } from "@/lib/safe-action";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "@toolkit/supabase/mutations";
import {
  departmentInsertSchema,
  departmentUpdateSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

export const updateDepartmentAction = authActionClient
  .metadata({
    name: "updateDepartment",
    track: {
      event: "department_updated",
      channel: "departments",
    },
  })
  .schema(departmentUpdateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, user } = ctx;

    const { data, error } = await updateDepartment(supabase, parsedInput);
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization/departments");

    return data;
  });

export const deleteDepartmentAction = authActionClient
  .metadata({
    name: "deleteDepartment",
    track: {
      event: "department_deleted",
      channel: "departments",
    },
  })
  .schema(
    z.object({
      departmentId: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, user } = ctx;

    const { data, error } = await deleteDepartment(
      supabase,
      parsedInput.departmentId,
    );
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization/departments");

    return data;
  });
