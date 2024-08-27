import React, { Suspense } from "react";

import Tasks from "./_components/tasks";
import Metrics from "./_components/metrics";

import CurrentProject from "./_components/current-project";
import Notes from "./_components/notes";
import Calendar from "./_components/calendar";
import { calendarSearchParamsCache } from "./_components/calendar/calendar-search-params";
import NotesCardLoading from "./_components/notes/notes.loading";
import TasksLoading from "./_components/tasks/tasks.loading";
import CurrentProjectLoading from "./_components/current-project/current-project.loading";
import MetricsLoading from "./_components/metrics/metrics.loading";
import CalendarLoading from "./_components/calendar/calendar.loading";

type Props = {
	searchParams: Record<string, string | string[] | undefined>;
};
export default function HomePageBase({ searchParams }: Props) {
	calendarSearchParamsCache.parse(searchParams);

	return (
		<section className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2">
			<Calendar />
			{/* <CalendarLoading /> */}
			<Suspense fallback={<NotesCardLoading />}>
				<Notes />
			</Suspense>

			<Suspense fallback={<TasksLoading />}>
				<Tasks />
			</Suspense>
			<Suspense fallback={<CurrentProjectLoading />}>
				<CurrentProject />
			</Suspense>
			<Suspense fallback={<MetricsLoading />}>
				<Metrics />
			</Suspense>
		</section>
	);
}
