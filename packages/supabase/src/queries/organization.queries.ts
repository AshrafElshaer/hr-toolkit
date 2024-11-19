import type { SupabaseInstance } from "../types";

export async function getOrganizationById(
  supabase: SupabaseInstance,
  id: string,
) {
  return await supabase.from("organizations").select("*").eq("id", id).single();
}

export async function getOrganizationByDomain(
  supabase: SupabaseInstance,
  domain: string,
) {
  return await supabase
    .from("organizations")
    .select("*")
    .eq("domain", domain)
    .single();
}
