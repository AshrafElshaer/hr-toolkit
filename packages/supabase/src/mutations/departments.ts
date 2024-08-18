import type { SupabaseClient ,DepartmentInsert,DepartmentUpdate} from "../types";

export async function create(
  supabase: SupabaseClient,
  newDepartment: DepartmentInsert,
) {
  return await supabase.from("departments").insert(newDepartment)
    .select().single();
}

export async function update(supabase: SupabaseClient, department: DepartmentUpdate) {
  return supabase.from("departments").update(department).eq("id", department.id as string).select().single();

}

export async function remove(supabase: SupabaseClient, id: string) {
  return supabase.from("departments").delete().eq("id", id)
}


export default {
    create,
    update,
    delete:remove
}