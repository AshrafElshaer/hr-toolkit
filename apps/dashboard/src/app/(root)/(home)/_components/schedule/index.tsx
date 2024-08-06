import { Button } from "@hr-toolkit/ui/button";
import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import DateSelector from "./date-selector";
import ScheduleList from "./schedule-list";

export default function Schedule() {
	return (
		<Card className="w-full  p-0 row-span-2">
			<div className="flex gap-2 items-center p-2">
				<CalendarCheck className="size-4" />
				<span className="font-semibold">Schedule</span>
				<Button size="xs" variant="secondary" className="ml-auto">
					View All
				</Button>
			</div>

			<Separator className="w-full " />
			<CardContent className="p-0">
				<DateSelector />
				<Separator className="w-full " />
				<ScheduleList />
			</CardContent>
		</Card>
	);
}
