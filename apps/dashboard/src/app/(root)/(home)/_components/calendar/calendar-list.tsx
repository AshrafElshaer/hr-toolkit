import React from "react";
import { calendarSearchParamsCache } from "./calendar-search-params";
import moment from "moment";

export default function CalendarList() {
	const g = calendarSearchParamsCache.all();

	const dates = getDatesInBetween(new Date(g.from), new Date(g.to));

	return (
		<div>
			{JSON.stringify(g)}
			{dates.map((date) => (
				<div key={date.getTime()}>{moment(date).format("YYYY-MM-DD")}</div>
			))}
		</div>
	);
}

function getDatesInBetween(from: Date, to: Date) {
	const dates: Date[] = [];
	for (
		let currentDate = moment(from).toDate();
		currentDate <= to;
		moment(currentDate).add(1, "day").toDate()
	) {
		dates.push(currentDate);
	}
	return dates;
}
