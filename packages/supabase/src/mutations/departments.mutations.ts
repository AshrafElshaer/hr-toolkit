import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export async function createDepartment(
  supabase: SupabaseInstance,
  data: TablesInsert<"departments">,
) {
  return await supabase.from("departments").insert(data).select().single();
}

export async function updateDepartment(
  supabase: SupabaseInstance,
  data: TablesUpdate<"departments">,
) {
  return await supabase
    .from("departments")
    .update(data)
    .eq("id", data.id as string)
    .select()
    .single();
}

export async function deleteDepartment(supabase: SupabaseInstance, id: string) {
  return await supabase.from("departments").delete().eq("id", id);
}
