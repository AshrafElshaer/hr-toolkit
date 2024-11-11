import { logger } from "@toolkit/logger";
import type { SupabaseInstance } from "../types";

export async function getUser(supabase: SupabaseInstance) {
  try {
    const result = await supabase.auth.getUser();

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function getPosts(supabase: SupabaseInstance) {
  try {
    const result = await supabase.from("job_posts").select("*");

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
