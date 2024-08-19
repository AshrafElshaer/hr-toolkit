"use client";
import moment from "moment-timezone";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@hr-toolkit/ui/hover-card";
import type { EventWithOrganizerAndDepartment } from "@hr-toolkit/supabase/types";
import { currentTimezone } from "@/lib/date";

type EventCardProps = {
	event: EventWithOrganizerAndDepartment;
};

export default function EventCard({ event }: EventCardProps) {
	return (
		<HoverCard openDelay={0} closeDelay={0}>
			<HoverCardTrigger asChild>
				<p className="text-sm text-center mb-3 last:mb-0 w-full">
					{moment(event.start_time).tz(currentTimezone()).format("h:mm A")} -{" "}
					{moment(event.end_time).tz(currentTimezone()).format("h:mm A")}
				</p>
			</HoverCardTrigger>
			<HoverCardContent side="right" align="start" sideOffset={-8}>
				The React Framework – created and maintained by @vercel.
			</HoverCardContent>
		</HoverCard>
	);
}
