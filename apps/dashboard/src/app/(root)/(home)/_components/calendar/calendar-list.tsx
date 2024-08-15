import React from "react";
import { calendarSearchParamsCache } from "./calendar-search-params";
import moment from "moment";
import { differenceInCalendarDays } from "date-fns";
import { Separator } from "@hr-toolkit/ui/separator";
import type { EventSelect } from "@hr-toolkit/supabase/types";
import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
import { LuCalendarX } from "react-icons/lu";

export default async function CalendarList() {
	const selectedDates = calendarSearchParamsCache.all();

	const dates = getDatesInBetween(
		new Date(selectedDates.from),
		new Date(selectedDates.to),
	);

	const events = demoEvents.reduce(
		(acc, event) => {
			const date = event.date;
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(event);
			return acc;
		},
		{} as Record<string, EventSelect[]>,
	);

	return (
		<div className="w-full flex divide-x h-full overflow-y-hidden overflow-x-scroll scrollbar-hide">
			{dates.map((date) => (
				<div key={date} className="flex-1 min-w-44">
					<h3 className="text-center py-2 bg-secondary font-medium">
						{moment(date).format("ddd , DD MMM")}
					</h3>
					<Separator className="w-full" />
					<ScrollArea className="p-2 h-[11.65rem] ">
						{!events[date] ? (
							<div className="text-center h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
								<LuCalendarX size={44} />
								<p>
									No events
									<br />
									You're free this day
								</p>
							</div>
						) : (
							events[date]?.map((event) => (
								<div
									key={event.id}
									className="text-sm text-center mb-3 last:mb-0"
								>
									{moment(event.start_time).format("h:mm A")} -{" "}
									{moment(event.end_time).format("h:mm A")}
								</div>
							))
						)}
					</ScrollArea>
				</div>
			))}
		</div>
	);
}

function getDatesInBetween(from: Date, to: Date) {
	const diff = differenceInCalendarDays(to, from);
	const dates = Array.from({ length: diff + 1 }, (_, idx) => {
		return moment(from).add(idx, "day").format("YYYY-MM-DD");
	});
	return dates;
}

const demoEvents: EventSelect[] = [
	{
		id: "uuid-1",
		organizer_id: "organizer-uuid-1",
		organization_id: "organization-uuid-1",
		department_id: "department-uuid-1",
		name: "Team Meeting",
		description: "Discuss project progress and next steps",
		type: "meeting",
		location: "Conference Room A",
		start_time: "2024-08-14T10:00:00Z",
		end_time: "2024-08-14T11:00:00Z",
		created_at: "2024-08-14T00:00:00Z",
		updated_at: "2024-08-14T00:00:00Z",
		date: "2024-08-14",
	},
	{
		id: "uuid-2",
		organizer_id: "organizer-uuid-2",
		organization_id: "organization-uuid-2",
		department_id: "department-uuid-2",
		name: "HR Policy Update",
		description: "Presentation of new HR policies",
		type: "training",
		location: "Conference Room B",
		start_time: "2024-08-15T09:00:00Z",
		end_time: "2024-08-15T10:30:00Z",
		created_at: "2024-08-14T00:00:00Z",
		updated_at: "2024-08-14T00:00:00Z",
		date: "2024-08-15",
	},
	{
		id: "uuid-3",
		organizer_id: "organizer-uuid-3",
		organization_id: "organization-uuid-1",
		department_id: "department-uuid-3",
		name: "Product Launch",
		description: "Launch event for the new product",
		type: "conference",
		location: "Main Auditorium",
		start_time: "2024-08-16T14:00:00Z",
		end_time: "2024-08-16T16:00:00Z",
		created_at: "2024-08-14T00:00:00Z",
		updated_at: "2024-08-14T00:00:00Z",
		date: "2024-08-16",
	},
	{
		id: "uuid-4",
		organizer_id: "organizer-uuid-4",
		organization_id: "organization-uuid-3",
		department_id: "department-uuid-4",
		name: "Quarterly Review",
		description: "Review of the quarterly performance",
		type: "meeting",
		location: "Board Room",
		start_time: "2024-08-18T11:00:00Z",
		end_time: "2024-08-18T13:00:00Z",
		created_at: "2024-08-14T00:00:00Z",
		updated_at: "2024-08-14T00:00:00Z",
		date: "2024-08-18",
	},
	{
		id: "uuid-5",
		organizer_id: "organizer-uuid-5",
		organization_id: "organization-uuid-4",
		department_id: "department-uuid-5",
		name: "Annual Conference",
		description: "Company-wide annual conference",
		type: "conference",
		location: "Main Hall",
		start_time: "2024-08-20T09:00:00Z",
		end_time: "2024-08-20T17:00:00Z",
		created_at: "2024-08-14T00:00:00Z",
		updated_at: "2024-08-14T00:00:00Z",
		date: "2024-08-20",
	},
];
