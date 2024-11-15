import type { SupabaseInstance } from "../types";

export async function getUser(supabase: SupabaseInstance, userId: string) {
  return await supabase.from("users").select("*").eq("id", userId).single();
}

export async function getCurrentUser(supabase: SupabaseInstance) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: new Error("User not authenticated"),
    };
  }

  return await supabase.from("users").select("*").eq("id", user.id).single();
}
