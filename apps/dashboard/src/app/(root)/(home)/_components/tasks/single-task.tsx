import React from "react";
import moment from "moment";
import { cn } from "@hr-toolkit/ui/utils";
import { capitalize } from "lodash";

import type { TaskSelect } from "@hr-toolkit/supabase/types";

import { Badge } from "@hr-toolkit/ui/badge";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@hr-toolkit/ui/hover-card";
import { Icons, IconName } from "@/components/icons";

type Props = { task: TaskSelect };

export default function SingleTask({ task }: Props) {
	const isOverDue = moment(task.due_date).isBefore(moment());
	
	let statusIndicatorColor: string;
	if (task.status === "in_progress") {
		statusIndicatorColor = "bg-warning";
	} else if (task.status === "completed") {
		statusIndicatorColor = "bg-success";
	} else if (task.status === "to_do") {
		statusIndicatorColor = "bg-primary";
	} else if (task.status === "in_review") {
		statusIndicatorColor = "bg-blue";
	} else {
		statusIndicatorColor = "bg-muted";
	}

	return (
		<div className="flex flex-col py-2 pl-3 pr-4 border-b gap-2 text-sm relative last:border-b-0">
			<div className="*:text-ellipsis *:overflow-hidden *:whitespace-nowrap space-y-1">
				<div className="flex justify-between w-full">
					<p className="font-semibold ">{task.name}</p>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger asChild className="size-4 text-muted-foreground">
							{task.priority === "low" ? (
								<Icons.PriorityLow />
							) : task.priority === "medium" ? (
								<Icons.PriorityMedium />
							) : (
								<Icons.PriorityHigh />
							)}
						</HoverCardTrigger>
						<HoverCardContent
							side="top"
							align="end"
							className="text-sm p-2 w-fit"
						>
							{capitalize(task.priority)} Priority
						</HoverCardContent>
					</HoverCard>
				</div>

				<p className="text-muted-foreground">{task.description}</p>
			</div>
			<div className="flex items-center gap-2 text-muted-foreground ">
				<p
					className={cn(
						"text-xs ml-auto",
						isOverDue ? "text-destructive" : "text-foreground",
					)}
				>
					{isOverDue ? "Overdue" : "Due at"}
				</p>

				<p
					className={cn(
						"text-xs",
						isOverDue ? "text-destructive" : "text-foreground",
					)}
				>
					{moment(task.due_date).format("DD MMM , YYYY")}
				</p>
			</div>

			<HoverCard openDelay={0} closeDelay={0}>
				<HoverCardTrigger asChild>
					<div
						className={cn(
							"absolute left-0 top-2.5 h-4  w-1.5 rounded-r ",
							statusIndicatorColor,
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
