"use client";
import React from "react";
import moment from "moment";

import { updateNoteAction } from "../../actions";
import { toast } from "sonner";
import { cn } from "@hr-toolkit/ui/utils";

import type { Note, NoteSelect } from "@hr-toolkit/supabase/types";

import { Badge } from "@hr-toolkit/ui/badge";
import { Checkbox } from "@hr-toolkit/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import NoteDialog from "./note-dialog";
import { useAction } from "next-safe-action/hooks";

type Props = {
	note: NoteSelect;
};

export default function SingleNote({ note }: Props) {
	const updateNote = useAction(updateNoteAction, {
		onSuccess: () => {
			toast.success(
				`Marked as ${note.is_completed ? "uncompleted" : "completed"} `,
			);
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	function toggleIsCompleted() {
		updateNote.execute({
			id: note.id,
			is_completed: !note.is_completed,
		});
	}
	return (
		<div className="flex items-start p-2 pr-6 w-full hover:bg-muted transition-all relative border-b last:border-b-0 cursor-pointer">
			<Checkbox
				className={cn(
					"data-[state=checked]:bg-success data-[state=checked]:text-primary  rounded-full mt-0.5",
					note.is_completed ? "data-[state=checked]:border-success" : "",
				)}
				checked={note.is_completed}
				onClick={toggleIsCompleted}
				disabled={updateNote.isExecuting}
			/>
			<NoteDialog note={note}>
				<div className="w-full space-y-2 px-2">
					<div className="  *:text-ellipsis *:overflow-hidden *:whitespace-nowrap flex justify-between gap-2">
						<p className="font-semibold ">{note.title}</p>
						<Badge
							variant="outline"
							className="font-light min-w-fit text-xs text-muted-foreground rounded-full px-2 py-[0.075]"
						>
							{note.tag}
						</Badge>
					</div>

					<div className=" flex items-center justify-between gap-2 ">
						<p className="text-muted-foreground truncate text-sm">
							{note.content}
						</p>
						<p className="flex items-center gap-2 text-muted-foreground min-w-fit">
							<CalendarIcon className="size-3 ml-0" />
							<span className="text-xs">
								{moment(note.created_at).format("DD MMM , YYYY")}
							</span>
						</p>
					</div>
				</div>
			</NoteDialog>
		</div>
	);
}
