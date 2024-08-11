import { Button } from "@hr-toolkit/ui/button";
import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { NotebookPen, PlusIcon } from "lucide-react";
import React from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import SingleNote from "./single-note";
import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
import type { NoteSelect } from "@hr-toolkit/supabase/types";
import NoteDialog from "./note-dialog";

type Props = {
	notes: NoteSelect[];
};
export default function NotesCard({ notes }: Props) {
	return (
		<Card className="w-full  p-0 ">
			<div className="flex gap-2 items-center p-2">
				<FaRegNoteSticky className="size-4" />
				<span className="font-semibold">Notes</span>
				<NoteDialog>
					<Button size="xs" variant="secondary" className="ml-auto">
						<PlusIcon className="size-3 mr-2" />
						New Note
					</Button>
				</NoteDialog>
			</div>

			<Separator className="w-full " />
			<CardContent className="p-0">
				{notes.length === 0 ? (
					<NotesEmptyState />
				) : (
					<ScrollArea className="h-64  ">
						{notes.map((note) => (
							<SingleNote note={note} key={note.id} />
						))}
					</ScrollArea>
				)}
			</CardContent>
		</Card>
	);
}

function NotesEmptyState() {
	return (
		<div className="relative p-2 text-center h-64 flex flex-col justify-center items-center text-muted-foreground tex-sm ">
			<NotebookPen size={75} />
			<p className="mt-4">No notes found!</p>
			<p>Add a new note to get started.</p>
			<svg
				className="fill-current absolute top-3 right-7 size-10"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<title>new note arrow</title>
				<path d="M205.66,85.66a8,8,0,0,1-11.32,0L160,51.31V128A104.11,104.11,0,0,1,56,232a8,8,0,0,1,0-16,88.1,88.1,0,0,0,88-88V51.31L109.66,85.66A8,8,0,0,1,98.34,74.34l48-48a8,8,0,0,1,11.32,0l48,48A8,8,0,0,1,205.66,85.66Z" />
			</svg>
		</div>
	);
}
