import type {SupabaseClient,EventInsert} from "../types"


function create(supabase: SupabaseClient,newEvent: EventInsert){
        return supabase.from("events").insert(newEvent).select("*").single()
}

export default { create }