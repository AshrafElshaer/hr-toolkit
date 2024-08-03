import React from "react";
import { Badge } from "@hr-toolkit/ui/badge";
import { Checkbox } from "@hr-toolkit/ui/checkbox";
import { cn } from "@hr-toolkit/ui/utils";
import { CalendarIcon } from "lucide-react";
import moment from "moment";

type Props = {
	note: {
		id: string;
		title: string;
		content: string;
		createdAt: string;
		updatedAt: string;
		dueDate: string;
		isCompleted: boolean;
	};
};

export default function SingleNote({ note }: Props) {
	return (
		<div className="flex items-start p-2 pr-6 w-full hover:bg-muted transition-all relative border-b last:border-b-0">
			<Checkbox
				className={cn(
					"data-[state=checked]:bg-success data-[state=checked]:text-primary  rounded-full mt-0.5",
					note.isCompleted ? "data-[state=checked]:border-success" : "",
				)}
				checked={note.isCompleted}
			/>
			<div className="w-full space-y-2 px-2">
				<div className=" text-sm *:text-ellipsis *:overflow-hidden *:whitespace-nowrap space-y-1">
					<p className="font-semibold">{note.title}</p>
					<p className="text-muted-foreground">{note.content}</p>
				</div>
				<div className="flex gap-2 items-center text-muted-foreground">
					<Badge
						variant="outline"
						className="font-light text-xs text-muted-foreground  rounded-full px-2 py-[0.075]"
					>
						Meeting
					</Badge>
					<div className=" flex items-center gap-2 absolute right-3">
						<CalendarIcon className="size-3" />
						<span className="text-xs">
							{moment(note.dueDate).format("DD MMM , YYYY")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
