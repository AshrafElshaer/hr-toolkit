import type { SupabaseInstance } from "../types";

export async function getDepartmentsByOrganizationId(
  supabase: SupabaseInstance,
  organizationId: string,
) {
  return supabase
    .from("departments")
    .select("*")
    .eq("organization_id", organizationId);
}

export async function getDepartmentById(
  supabase: SupabaseInstance,
  departmentId: string,
) {
  return supabase
    .from("departments")
    .select("*")
    .eq("id", departmentId)
    .single();
}
