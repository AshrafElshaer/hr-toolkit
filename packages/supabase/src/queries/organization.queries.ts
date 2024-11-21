import { unstable_cache } from "next/cache";
import type { SupabaseInstance } from "../types";

export async function getOrganizationById(
  supabase: SupabaseInstance,
  id: string,
) {
  return unstable_cache(
    async () => {
      return await supabase
        .from("organizations")
        .select("*")
        .eq("id", id)
        .single();
    },
    ["organization", id],
    {
      revalidate: 3 * 60, // 3 miniutes
      tags: ["organization", id],
    },
  )();
}

export async function getOrganizationByDomain(
  supabase: SupabaseInstance,
  domain: string,
) {
  return unstable_cache(
    async () => {
      return await supabase
        .from("organizations")
        .select("*")
        .eq("domain", domain)
        .single();
    },
    ["organization", domain],
    {
      revalidate: 3 * 60, // 3 miniutes
      tags: ["organization", domain],
    },
  )();
}
