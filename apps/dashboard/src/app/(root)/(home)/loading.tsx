import Main from "@/components/main";
import { ClockInOutSkeleton } from "./_components/header/clock-in-out.loading";
import { WelcomeMessageSkeleton } from "./_components/header/welcome.loading";
import CalendarLoading from "./_components/calendar/calendar.loading";
import NotesCardLoading from "./_components/notes/notes.loading";
import TasksLoading from "./_components/tasks/tasks.loading";
import CurrentProjectLoading from "./_components/current-project/current-project.loading";
import MetricsLoading from "./_components/metrics/metrics.loading";

export default function DashboardLoading() {
	return (
		<Main className="flex-grow flex flex-col gap-4">
			<section className="grid gap-4 grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-4">
				<WelcomeMessageSkeleton />
				<ClockInOutSkeleton />
			</section>
			<section className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2">
				<CalendarLoading />
				<NotesCardLoading />
				<TasksLoading />
				<CurrentProjectLoading />
				<MetricsLoading />
			</section>
		</Main>
	);
}
