import { logger } from "@toolkit/logger";
import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export async function createUser(
  supabase: SupabaseInstance,
  data: TablesInsert<"users">,
) {
  try {
    return await supabase.from("users").insert(data).select().single();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function updateUser(
  supabase: SupabaseInstance,

  data: TablesUpdate<"users">,
) {
  const { id, ...rest } = data;
  if (!id) {
    throw new Error("User ID is required");
  }
  return await supabase
    .from("users")
    .update(rest)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteUser(
  supabase: SupabaseInstance,
  userId: string,
  organization_id: string,
) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const { data: organization } = await supabase
    .from("organizations")
    .select("admin_id")
    .eq("id", organization_id)
    .single();

  if (organization?.admin_id === userId) {
    throw new Error("Cannot delete organization admin");
  }
  return await supabase.auth.admin.deleteUser(userId);
}
