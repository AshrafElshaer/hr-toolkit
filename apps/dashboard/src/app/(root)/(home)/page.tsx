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
import HomeHeader from "./_components/header";
import { WelcomeMessageSkeleton } from "./_components/header/welcome.loading";
import WelcomeMessage from "./_components/header/welcome";
import { ClockInOutSkeleton } from "./_components/header/clock-in-out.loading";
import ClockInOutServer from "./_components/header/clock-in-out.server";

type Props = {
	searchParams: Record<string, string | string[] | undefined>;
};
export default function HomePageBase({ searchParams }: Props) {
	calendarSearchParamsCache.parse(searchParams);

	return (
		<>
			<section className="grid gap-4 grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 ">
				<Suspense fallback={<WelcomeMessageSkeleton />}>
					<WelcomeMessage />
				</Suspense>

				<Suspense fallback={<ClockInOutSkeleton />}>
					<ClockInOutServer />
				</Suspense>
			</section>
			<section className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 flex-grow">
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
		</>
	);
}
