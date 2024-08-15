import { Card, CardContent } from "@hr-toolkit/ui/card";

import { CalendarCheck } from "lucide-react";

import React from "react";

import CalendarList from "./calendar-list";
import DateSelector from "./date-selector";

export default function Calendar() {
	return (
		<Card className="w-full sm:col-span-2 lg:col-span-4 p-2 flex flex-col gap-4">
			<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center ">
				<div className="flex gap-2 items-center">
					<CalendarCheck className="size-4" />
					<span className="font-semibold">Your Schedule</span>
				</div>
				<DateSelector />
			</div>
			<CardContent className="p-0 border flex flex-grow rounded overflow-hidden">
				<CalendarList />
			</CardContent>
		</Card>
	);
}
