import React from "react";

import type { TaskSelect } from "@hr-toolkit/supabase/types";

import SingleTask from "./single-task";

import { Button } from "@hr-toolkit/ui/button";
import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { FaTasks } from "react-icons/fa";
import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
import { BiTaskX } from "react-icons/bi";

const tasks: TaskSelect[] = [
	{
		id: "1",
		name: "Project Kickoff Meeting",
		description: "Discuss project scope and milestones with the team.",
		priority: "high",
		status: "in_progress",
		created_at: "2021-07-01T09:00:00Z",
		updated_at: "2021-07-01T09:30:00Z",
		due_date: "2021-07-01T10:00:00Z",
		assigned_to: "John Doe",
		organization_id: "1",
		project_id: "1",
	},
	{
		id: "2",
		name: "Project Kickoff Meeting",
		description: "Discuss project scope and milestones with the team.",
		priority: "medium",
		status: "to_do",
		created_at: "2021-07-01T09:00:00Z",
		updated_at: "2021-07-01T09:30:00Z",
		due_date: "2021-07-01T10:00:00Z",
		assigned_to: "John Doe",
		organization_id: "1",
		project_id: "1",
	},
	{
		id: "3",
		name: "Project Kickoff Meeting",
		description: "Discuss project scope and milestones with the team.",
		priority: "low",
		status: "completed",
		created_at: "2021-07-01T09:00:00Z",
		updated_at: "2021-07-01T09:30:00Z",
		due_date: "2021-07-01T10:00:00Z",
		assigned_to: "John Doe",
		organization_id: "1",
		project_id: "1",
	},
	{
		id: "4",
		name: "Project Kickoff Meeting",
		description: "Discuss project scope and milestones with the team.",
		priority: "high",
		status: "in_review",
		created_at: "2021-07-01T09:00:00Z",
		updated_at: "2021-07-01T09:30:00Z",
		due_date: "2021-07-01T10:00:00Z",
		assigned_to: "John Doe",
		organization_id: "1",
		project_id: "1",
	},
];

export default function Tasks() {
	return (
		<Card className="w-full  p-0 ">
			<div className="flex gap-2 items-center p-2">
				<FaTasks className="size-4" />
				<span className="font-semibold">Your Tasks</span>
				<Button size="xs" variant="secondary" className="ml-auto">
					View All
				</Button>
			</div>

			<Separator className="w-full " />
			<CardContent className="p-0">
				{tasks.length !== 0 ? (
					<TasksEmptyState />
				) : (
					<ScrollArea className="h-64  ">
						{tasks.map((task) => (
							<SingleTask key={task.id} task={task} />
						))}
					</ScrollArea>
				)}
			</CardContent>
		</Card>
	);
}

function TasksEmptyState() {
	return (
		<div className="relative p-2 text-center h-64 flex flex-col justify-center items-center text-muted-foreground tex-sm ">
			<BiTaskX size={75} />
			<p className="mt-4">No tasks assigned !</p>
		</div>
	);
}
