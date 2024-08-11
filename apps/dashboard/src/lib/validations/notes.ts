import { z } from "zod";

export const noteSchema = z.object({
	id: z.string(),
	user_id: z.string(),
	title: z.string().min(1, { message: "Title is required" }),
	content: z.string().optional(),
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
	is_completed: z.boolean().default(false),
    tag:z.string().min(1, { message: "Tags are required" }),
});

export const updateNoteSchema = noteSchema.partial();
