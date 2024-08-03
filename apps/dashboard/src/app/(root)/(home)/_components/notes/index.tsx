import { Button } from "@hr-toolkit/ui/button";
import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { NotebookPen, PlusIcon } from "lucide-react";
import React from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import SingleNote from "./single-note";
import { ScrollArea } from "@hr-toolkit/ui/scroll-area";

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	dueDate: string;
	isCompleted: boolean;
};

const notes: Note[] = [
	{
		id: "1",
		title: "Project Kickoff Meeting",
		content: "Discuss project scope and milestones with the team.",
		createdAt: "2021-07-01T09:00:00Z",
		updatedAt: "2021-07-01T09:30:00Z",
		dueDate: "2021-07-01T10:00:00Z",
		isCompleted: true,
	},
	{
		id: "2",
		title: "Client Feedback",
		content: "Review and incorporate feedback from the client.",
		createdAt: "2021-07-02T11:15:00Z",
		updatedAt: "2021-07-02T11:45:00Z",
		dueDate: "2021-07-03T17:00:00Z",
		isCompleted: true,
	},
	{
		id: "3",
		title: "Design Mockups",
		content: "Create initial design mockups for the new website.",
		createdAt: "2021-07-03T08:00:00Z",
		updatedAt: "2021-07-03T08:45:00Z",
		dueDate: "2021-07-05T12:00:00Z",
		isCompleted: true,
	},
	{
		id: "4",
		title: "Team Lunch",
		content: "Organize a team lunch for Friday.",
		createdAt: "2021-07-04T10:30:00Z",
		updatedAt: "2021-07-04T11:00:00Z",
		dueDate: "2021-07-06T13:00:00Z",
		isCompleted: false,
	},
	{
		id: "5",
		title: "Budget Review",
		content: "Review the budget for Q3 with the finance team.",
		createdAt: "2021-07-05T09:45:00Z",
		updatedAt: "2021-07-05T10:15:00Z",
		dueDate: "2021-07-10T16:00:00Z",
		isCompleted: true,
	},
	{
		id: "6",
		title: "Code Review",
		content: "Conduct a code review for the new feature branch.",
		createdAt: "2021-07-06T14:00:00Z",
		updatedAt: "2021-07-06T14:30:00Z",
		dueDate: "2021-07-06T17:00:00Z",
		isCompleted: true,
	},
	{
		id: "7",
		title: "Marketing Strategy",
		content:
			"Develop a new marketing strategy for the upcoming product launch.",
		createdAt: "2021-07-07T13:00:00Z",
		updatedAt: "2021-07-07T13:45:00Z",
		dueDate: "2021-07-14T09:00:00Z",
		isCompleted: false,
	},
	{
		id: "8",
		title: "Performance Review",
		content: "Prepare for the annual performance review meetings.",
		createdAt: "2021-07-08T10:00:00Z",
		updatedAt: "2021-07-08T10:30:00Z",
		dueDate: "2021-07-12T15:00:00Z",
		isCompleted: true,
	},
	{
		id: "9",
		title: "Website Launch",
		content: "Finalize and launch the new company website.",
		createdAt: "2021-07-09T08:30:00Z",
		updatedAt: "2021-07-09T09:00:00Z",
		dueDate: "2021-07-15T10:00:00Z",
		isCompleted: false,
	},
	{
		id: "10",
		title: "Team Building Activity",
		content: "Plan a team building activity for the end of the month.",
		createdAt: "2021-07-10T12:00:00Z",
		updatedAt: "2021-07-10T12:30:00Z",
		dueDate: "2021-07-30T14:00:00Z",
		isCompleted: false,
	},
];

export default function Notes() {
	return (
		<Card className="w-full  p-0 ">
			<div className="flex gap-2 items-center p-2">
				<FaRegNoteSticky className="size-4" />
				<span className="font-semibold">Notes</span>
				<Button size="xs" variant="secondary" className="ml-auto">
					<PlusIcon className="size-3 mr-2" />
					New Note
				</Button>
			</div>

			<Separator className="w-full " />
			<CardContent className="p-0">
				{notes.length !== 0 ? (
					<NotesEmptyState />
				) : (
					<ScrollArea className="h-80  ">
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
		<div className="relative p-2 text-center h-80 flex flex-col justify-center items-center text-muted-foreground tex-sm ">
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
