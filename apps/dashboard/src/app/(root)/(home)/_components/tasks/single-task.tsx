import React from "react";
import moment from "moment";
import { cn } from "@hr-toolkit/ui/utils";
import { capitalize } from "lodash";

import type { TaskSelect } from "@hr-toolkit/supabase/types";

import { CalendarIcon } from "lucide-react";
import { Badge } from "@hr-toolkit/ui/badge";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@hr-toolkit/ui/hover-card";

type Props = { task: TaskSelect };

export default function SingleTask({ task }: Props) {
	const isOverDue = moment(task.due_date).isBefore(moment());
	let indicatorColor: string;
	if (task.status === "in_progress") {
		indicatorColor = "bg-warning";
	} else if (task.status === "completed") {
		indicatorColor = "bg-success";
	} else if (task.status === "to_do") {
		indicatorColor = "bg-primary";
	} else if (task.status === "in_review") {
		indicatorColor = "bg-blue";
	} else {
		indicatorColor = "bg-muted";
	}

	let priorityVariant: "destructive" | "warning" | "success";
	if (task.priority === "high") {
		priorityVariant = "destructive";
	} else if (task.priority === "medium") {
		priorityVariant = "warning";
	} else {
		priorityVariant = "success";
	}
	return (
		<div className="flex flex-col py-2 pl-3 pr-4 border-b gap-2 text-sm relative last:border-b-0">
			<div className="*:text-ellipsis *:overflow-hidden *:whitespace-nowrap space-y-1">
				<p className="font-semibold ">{task.name}</p>
				<p className="text-muted-foreground">{task.description}</p>
			</div>
			<div className="flex items-center gap-2 text-muted-foreground ">
				<Badge
					variant={priorityVariant}
					className="font-light text-xs   rounded-full px-2 py-[0.075] "
				>
					{capitalize(task.priority)}
				</Badge>
				<CalendarIcon
					className={cn("size-3 ml-auto", isOverDue ? "text-destructive" : "")}
				/>

				<p className={cn("text-xs", isOverDue ? "text-destructive" : "")}>
					{moment(task.due_date).format("DD MMM , YYYY")}
				</p>
			</div>

			<HoverCard openDelay={0} closeDelay={0}>
				<HoverCardTrigger asChild>
					<div
						className={cn(
							"absolute left-0 top-2.5 h-4  w-1.5 rounded-r ",
							indicatorColor,
						)}
					/>
				</HoverCardTrigger>
				<HoverCardContent
					side="right"
					align="center"
					className="text-sm w-fit p-2"
				>
					{task.status
						.split("_")
						.map((word) => capitalize(word))
						.join(" ")}
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}
