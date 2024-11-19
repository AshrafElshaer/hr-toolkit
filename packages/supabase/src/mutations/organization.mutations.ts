import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

type Organization = TablesInsert<"organizations">;
type OrganizationUpdate = TablesUpdate<"organizations">;

export async function createOrganization(
  supabase: SupabaseInstance,
  organization: Organization,
) {
  const { data, error } = await supabase
    .from("organizations")
    .insert(organization)
    .select()
    .single();

  if (error) return { error, data: null };

  const { error: memberError } = await supabase
    .from("organization_members")
    .insert({
      organization_id: data.id,
      user_id: organization.admin_id,
    });

  if (memberError) return { error: memberError, data };

  return { error: null, data };
}

export async function updateOrganization(
  supabase: SupabaseInstance,
  organization: OrganizationUpdate,
) {
  return supabase
    .from("organizations")
    .update(organization)
    .eq("id", organization.id as string)
    .select();
}
