import type {SupabaseClient} from '../types'


export async function getNotes(supabase: SupabaseClient) {
  return supabase.from('notes').select('*').order('is_completed', { ascending: true })
 
}

