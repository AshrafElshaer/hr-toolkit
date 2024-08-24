import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";
import { getEventsByDateRange } from "@hr-toolkit/supabase/events-queries";
import { calendarSearchParamsCache } from "../calendar/calendar-search-params";

export default async function WelcomeMessage() {
	const { from, to } = calendarSearchParamsCache.all();
	const supabase = createServerClient();

	const userPromise = getCurrentUser(supabase);
	const eventsPromise = getEventsByDateRange(supabase, {
		from,
		to,
	});

	const [{ user }, { data: events }] = await Promise.all([
		userPromise,
		eventsPromise,
	]);

	const eventsCount = events?.length ?? 0;

	return (
		<div className="flex flex-col gap-2 justify-center lg:col-span-3">
			<h1 className="text-xl md:text-2xl font-semibold">
				Welcome back, {user?.first_name} 👋
			</h1>
			<p className="text-sm text-secondary-foreground/70">
				You have {eventsCount} upcoming events , 0 pending requests, and 5
				unread messages.
			</p>
		</div>
	);
}
