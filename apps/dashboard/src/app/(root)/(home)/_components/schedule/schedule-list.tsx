"use client";
import React from "react";

export default function ScheduleList() {
	return (
		<div className="p-2">
			<ChipTabs />
		</div>
	);
}

import { motion } from "framer-motion";
import { useState } from "react";

import { TiMessages } from "react-icons/ti";
import { CalendarCheck } from "lucide-react";

const tabs = [
	{ label: "Meetings", icon: <TiMessages /> },
	{
		label: "Events",
		icon: <CalendarCheck size={14} />,
	},
];

const ChipTabs = () => {
	const [selected, setSelected] = useState(tabs[0].label);

	return (
		<div className="flex items-center flex-wrap gap-4">
			{tabs.map((tab) => (
				<Chip
					text={tab.label}
					icon={tab.icon}
					selected={selected === tab.label}
					setSelected={setSelected}
					key={tab.label}
				/>
			))}
		</div>
	);
};

const Chip = ({
	text,
	icon,
	selected,
	setSelected,
}: {
	text: string;
	icon: React.ReactNode;
	selected: boolean;
	setSelected: (text: string) => void;
}) => {
	return (
		<button
			onClick={() => setSelected(text)}
			type="button"
			className={`${
				selected ? "text-foreground" : "text-foreground/70"
			} text-sm transition-colors py-0.5  relative`}
		>
			<span className="relative z-10 flex items-center gap-2">
				{icon}
				{text}
			</span>
			{selected && (
				<motion.span
					layoutId="pill-tab"
					transition={{ type: "spring", duration: 0.5 }}
					className="absolute inset-0  z-0 border-b  border-primary"
				/>
			)}
		</button>
	);
};
