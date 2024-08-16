import type { SupabaseClient ,DepartmentInsert} from "../types";

export async function create(
  supabase: SupabaseClient,
  newDepartment: DepartmentInsert,
) {
  return await supabase.from("departments").insert(newDepartment)
    .select().single();
}


export default {
    create
}