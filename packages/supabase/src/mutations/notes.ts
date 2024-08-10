import type { SupabaseClient, NoteInsert } from "../types";

async function create(supabase: SupabaseClient, note: NoteInsert) {
	return await supabase
	.from("notes")
	.insert(note)
	.select("*")
	.single();
}

export default {
	create,
};
