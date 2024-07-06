import { Card } from "@hr-toolkit/ui/card";

import { Skeleton } from "@hr-toolkit/ui/skeleton";
import UpcomingEventsHeader from "./_components/events/upcoming-events-header";
import { CalendarSkeleton } from "./_components/events";
import { WelcomeMessageSkeleton } from "./_components/loading/welcome-message";
import { ClockInOutSkeleton } from "./_components/loading/clock-in-out";
import Main from "@/components/main";

export default function DashboardLoading() {
	return (
		<Main className="flex flex-col gap-4  ">
			<div className="flex gap-4 flex-col lg:flex-row">
				<WelcomeMessageSkeleton />

				<ClockInOutSkeleton />
			</div>
			<Card className="p-4 w-full flex flex-col gap-4">
				<UpcomingEventsHeader />
				<CalendarSkeleton />
			</Card>
			<div>
				<Card className="flex flex-col p-4 gap-4 w-full sm:w-80 h-fit ">
					<h3 className="text-foreground/70 font-semibold">Todo</h3>
					<Skeleton className="h-8 w-full " />
				</Card>
			</div>
		</Main>
	);
}
