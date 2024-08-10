import React from "react";
import { createServerClient } from "@/lib/supabase/server";
import { getNotes } from "@hr-toolkit/supabase/notes-queries";
import NotesCard from "./notes-card";

export default async function NotesServer() {
	const supabase = createServerClient();
	const { data, error } = await getNotes(supabase);

	return <NotesCard notes={data ?? []} />;
}
