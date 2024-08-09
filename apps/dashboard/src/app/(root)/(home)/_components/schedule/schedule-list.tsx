"use client";
import { useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { Button } from "@hr-toolkit/ui/button";
import { TiMessages } from "react-icons/ti";
import { CalendarCheck } from "lucide-react";
import { cn } from "@hr-toolkit/ui/utils";
import type { EventSelect } from "@hr-toolkit/supabase/types";
import EventPreview from "./event-preview";
import { Separator } from "@hr-toolkit/ui/separator";
import { Dialog, DialogContent } from "@hr-toolkit/ui/dialog";
import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
type Tab = {
	label: string;
	icon?: JSX.Element;
	render: (data: EventSelect[]) => JSX.Element;
};
const tabs: Tab[] = [
	{
		label: "Meetings",
		icon: <TiMessages />,
		render: (events) => {
			return (
				<>
					{events.map((event) => (
						<p key={event.id}>
							{event.name} - {event.type}
						</p>
					))}
				</>
			);
		},
	},
	{
		label: "Events",
		icon: <CalendarCheck size={14} />,
		render: (events) => {
			return (
				<>
					{events.map((event) => (
						<p key={event.id}>
							{event.name} - {event.type}
						</p>
					))}
				</>
			);
		},
	},
];

const eventCardVariants: Variants = {
	initial: {
		x: 10,
		opacity: 0,
	},
	enter: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: -10,
		opacity: 0,
	},
};
type ScheduleListProps = {
	events: EventSelect[];
};
export default function ScheduleList({ events }: ScheduleListProps) {
	const [activeEvent, setActiveEvent] = useState<EventSelect | null>(null);

	return (
		<div className="w-full min-h-96 sm:min-h-80 max-h-[27rem]  overflow-hidden flex flex-col flex-grow gap-2 ">
			<ScrollArea className="h-full  ">
				<AnimatePresence mode="wait">
					{events.length !== 0
						? events.map((event, idx) => (
								<motion.div
									key={event.id}
									variants={eventCardVariants}
									transition={{ duration: 0.2, delay: idx * 0.1 }}
									initial="initial"
									animate="enter"
									exit="exit"
									className="hover:bg-muted cursor-pointer"
									onClick={() => setActiveEvent(event)}
								>
									<EventPreview event={event} />
									<Separator className="w-full " />
								</motion.div>
							))
						: null}
				</AnimatePresence>
			</ScrollArea>
			<Dialog
				open={!!activeEvent}
				onOpenChange={(bol) => (bol === false ? setActiveEvent(null) : null)}
			>
				<DialogContent>dialog</DialogContent>
			</Dialog>
		</div>
	);
}
