import type { SupabaseClient, NoteInsert ,NoteUpdate} from "../types";

async function create(supabase: SupabaseClient, note: NoteInsert) {
	return await supabase
	.from("notes")
	.insert(note)
	.select("*")
	.single();
}
async function update(supabase: SupabaseClient, note: NoteUpdate) {
	return await supabase
	.from("notes")
	.update(note)
	.eq("id", note.id as string)
	.select("id")
	.single();
}

async function remove(supabase: SupabaseClient, noteId: string) {
	return await supabase
	.from("notes")
	.delete()
	.eq("id", noteId)
	.select("id")
	.single();

}

export default {
	create,
	update,
	delete:remove
};
