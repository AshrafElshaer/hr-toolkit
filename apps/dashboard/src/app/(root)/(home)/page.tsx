import React from "react";

import Tasks from "./_components/tasks";
import Metrics from "./_components/metrics";
import Schedule from "./_components/schedule";
import CurrentProject from "./_components/current-project";
import NotesServer from "./_components/notes";
import Calendar from "./_components/calendar";
import { calendarSearchParamsCache } from "./_components/calendar/calendar-search-params";
import CalendarServer from "./_components/calendar/calendar-list";
type Props = {
	searchParams: Record<string, string | string[] | undefined>;
};
export default function HomePageBase({ searchParams }: Props) {
	calendarSearchParamsCache.parse(searchParams);

	return (
		<section className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2">
			<Calendar />

			<NotesServer />
			<Tasks />
			{/* <Schedule /> */}
			<CurrentProject />
			<Metrics />
		</section>
	);
}
