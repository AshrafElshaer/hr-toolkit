import { logger } from "@toolkit/logger";

import type {
  Database,
  SupabaseInstance,
  Tables,
  TablesUpdate,
} from "../types";

export async function updateUser(
  supabase: SupabaseInstance,
  userId: string,
  data: TablesUpdate<"users">,
) {
  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}
