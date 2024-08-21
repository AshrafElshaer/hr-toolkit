"use client";
import moment from "moment-timezone";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@hr-toolkit/ui/hover-card";
import type { EventWithOrganizerAndDepartment } from "@hr-toolkit/supabase/types";
import { currentTimezone } from "@/lib/date";
import { useMediaQuery } from "usehooks-ts";
import { Separator } from "@hr-toolkit/ui/separator";
import {
	AlarmClock,
	Calendar,
	Info,
	LayoutTemplate,
	MapPin,
	Pencil,
} from "lucide-react";
import UserAvatar from "@/components/user-avatar";
import EventForm from "./event-form";
import { useUser } from "@/hooks/use-user";
import { Button } from "@hr-toolkit/ui/button";
import { useState } from "react";

type EventCardProps = {
	event: EventWithOrganizerAndDepartment;
};

export default function EventCard({ event }: EventCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const { data: user } = useUser();
	const timezone = currentTimezone();
	const isMobile = useMediaQuery("(max-width: 640px)");
	const start_time = moment(event.start_time).tz(timezone);
	const end_time = moment(event.end_time).tz(timezone);
	return (
		<HoverCard
			openDelay={0}
			closeDelay={0}
			open={isOpen}
			onOpenChange={(bol) => isEdit || setIsOpen(bol)}
		>
			<HoverCardTrigger asChild>
				<p className="text-sm text-center mb-3 last:mb-0 w-full">
					{start_time.format("h:mm A")} - {end_time.format("h:mm A")}
				</p>
			</HoverCardTrigger>
			<HoverCardContent
				className="text-sm px-0 py-2 min-w-72"
				side={isMobile ? "top" : "right"}
				align={isMobile ? "center" : "start"}
				sideOffset={isMobile ? 16 : -8}
			>
				<div className="flex flex-col gap-2 ">
					<div className="px-4 text-base flex items-center justify-between">
						<p className="capitalize">{event.type}</p>
						{event.organizer.id === user?.id ? (
							<div className="flex items-center gap-2">
								<EventForm
									event={{
										...event,
										start_time: start_time.format("HH:mm"),
										end_time: end_time.format("HH:mm"),
									}}
									isOpen={isEdit}
									setIsOpen={setIsEdit}
								>
									<button
										type="button"
										className="ml-auto text-accent-foreground/70 hover:text-accent-foreground transition-colors"
									>
										<Pencil className="size-4" />
									</button>
								</EventForm>

								{/* <DeleteEvent event={event} /> */}
							</div>
						) : null}
					</div>
					<Separator className="w-full my-1" />
					{/* <p className=" px-4 flex items-center gap-2">
						<Calendar className="w-4 h-4" />
						{moment(event.date).tz(timezone).format("EEEE , MMMM dd")}
					</p> */}
					{/* <p className=" px-4 flex items-center gap-2  ">
						<AlarmClock className="w-4 h-4" />
						{amPm(event.start_time)} - {amPm(event.end_time)}
					</p> */}
					<p className=" px-4 flex items-center gap-2 ">
						<Info className="h-4 w-4 " /> {event.name}
					</p>
					<p className="pl-10 pr-4 text-secondary-foreground/70">
						{event.description}
					</p>
					<div className="flex items-center gap-2 px-4">
						<MapPin className="w-4 h-4" />
						<p>{event.location}</p>
					</div>
					{event?.department?.id ? (
						<div className="flex items-center gap-2 px-4">
							<LayoutTemplate className="w-4 h-4" />
							<p>
								{event?.department?.name} - {
									event?.department?.description
								}{" "}
							</p>
						</div>
					) : null}

					<div className="flex items-center gap-2 px-4">
						<UserAvatar
							className="h-4 w-4"
							firstName={event?.organizer?.first_name}
							lastName={event?.organizer?.last_name}
							fallbackSize="text-xs"
						/>
						<p>
							{event.organizer.first_name} {event.organizer.last_name}
						</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
