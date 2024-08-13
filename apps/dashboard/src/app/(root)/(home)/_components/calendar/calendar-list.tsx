import React from "react";
import { calendarSearchParamsCache } from "./calendar-search-params";
import moment from "moment";
import { differenceInCalendarDays } from "date-fns";
import { Separator } from "@hr-toolkit/ui/separator";

export default function CalendarList() {
	const g = calendarSearchParamsCache.all();

	const dates = getDatesInBetween(new Date(g.from), new Date(g.to));

	return (
		<div className="w-full flex divide-x h-full overflow-y-hidden overflow-x-scroll scrollbar-hide">
			{dates.map((date) => (
				<div key={date} className="flex-1 min-w-40">
					<h3 className="text-center py-2 bg-secondary font-medium">
						{moment(date).format("DD MMM")}
					</h3>
					<Separator className="w-full" />
					<div className="w-full h-full  text-sm p-2 border-r last:border-r-0">
						11:00AM - 02:00PM
					</div>
				</div>
			))}
		</div>
	);
}

function getDatesInBetween(from: Date, to: Date) {
	const diff = differenceInCalendarDays(to, from);
	const dates = Array.from({ length: diff + 1 }, (_, i) => {
		return moment(from)
			.add(i + 1, "day")
			.format("YYYY-MM-DD");
	});
	return dates;
}
