import { logger } from "@toolkit/logger";
import { createClient } from "@toolkit/supabase/server";
import type { Database, Tables, TablesUpdate } from "../types";

export async function updateUser(userId: string, data: TablesUpdate<"users">) {
  const supabase = await createClient();

  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}
