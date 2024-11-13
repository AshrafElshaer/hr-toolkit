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
  userId: string,
  data: TablesUpdate<"users">,
) {
  try {
    return await supabase
      .from("users")
      .update(data)
      .eq("id", userId)
      .select()
      .single();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function deleteUser(supabase: SupabaseInstance, userId: string) {
  try {
    return await supabase.from("users").delete().eq("id", userId);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
