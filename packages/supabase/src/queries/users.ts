import type { SupabaseClient } from "../types";

export async function getCurrentUser(supabase: SupabaseClient) {
  const {
    data: session,
    error: sessionError,
  } = await supabase.auth.getUser();
  if (sessionError || !session) {
    throw new Error(sessionError?.message);
  }

  const { data: user, error } = await supabase.from("users").select("*").eq(
    "id",
    session.user.id,
  ).single();

  return { user, error };
}
