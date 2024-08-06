import { Button } from "@hr-toolkit/ui/button";
import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { CalendarCheck, ChevronLeft, ChevronRight, PlusIcon } from "lucide-react";
import React from "react";

import DateSelector from "./date-selector";
import ScheduleListServer from "./schedule-list.server";

export default function Schedule() {
	return (
		<Card className="w-full  p-0 row-span-2 flex flex-col">
			<div className="flex gap-2 items-center p-2">
				<CalendarCheck className="size-4" />
				<span className="font-semibold">Schedule</span>
				<Button size="xs" variant="secondary" className="ml-auto">
					<PlusIcon className="size-3 mr-2" />
					New Event 
				</Button>
			</div>

			<Separator className="w-full " />
			<CardContent className="p-0 flex flex-col flex-grow">
				<DateSelector />
				<Separator className="w-full " />
				<ScheduleListServer />
			</CardContent>
		</Card>
	);
}
