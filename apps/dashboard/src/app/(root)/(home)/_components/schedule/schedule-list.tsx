"use client";
import { useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { Button } from "@hr-toolkit/ui/button";
import { TiMessages } from "react-icons/ti";
import { CalendarCheck } from "lucide-react";
import { cn } from "@hr-toolkit/ui/utils";
import type { EventSelect } from "@hr-toolkit/supabase/types";
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
	const [activeTab, setActiveTab] = useState(tabs[0]);

	const handleClick = (tab: Tab) => {
		setActiveTab(tab);
	};

	const isSelected = (tab: Tab) => activeTab.label === tab.label;

	return (
		<div className="w-full min-h-96 sm:min-h-80 max-h-[27rem]  overflow-hidden flex flex-col flex-grow gap-2 ">
			<div className="h-full p-4 overflow-y-scroll ">
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
								>
									<p>
										{event.name} - {event.type}
									</p>
								</motion.div>
							))
						: null}
				</AnimatePresence>
			</div>
		</div>
	);
}
