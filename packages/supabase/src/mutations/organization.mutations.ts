import type { SupabaseInstance, TablesInsert } from "../types";

type Organization = TablesInsert<"organizations">;

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
