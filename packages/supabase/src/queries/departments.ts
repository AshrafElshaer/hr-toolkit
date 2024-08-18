import type {SupabaseClient} from "../types";


export async function getDepartments(supabase: SupabaseClient) {
    return supabase.from('departments').select('*,manager:manager_id(*)');
}
