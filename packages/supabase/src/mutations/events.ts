import type { EventInsert, EventUpdate, SupabaseClient } from "../types";

function create(supabase: SupabaseClient, newEvent: EventInsert) {
  return supabase.from("events").insert(newEvent).select("*").single();
}

function update(supabase: SupabaseClient, event: EventUpdate) {
  return supabase.from("events").update(event).eq("id", event.id as string);
}

function remove(supabase: SupabaseClient, id: string) {
  return supabase.from("events").delete().eq("id", id);
}

export default { create, update ,delete:remove};
