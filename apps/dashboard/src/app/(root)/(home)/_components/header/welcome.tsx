// import { getEventsByDate } from "@hr-toolkit/supabase/events-queries";
// import { createServerClient } from "@hr-toolkit/supabase/server";
// import { getUser } from "@hr-toolkit/supabase/user-queries";
import UserAvatar from "@/components/user-avatar";
import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";
import { format } from "date-fns";
import React from "react";

export default async function WelcomeMessage() {
	const supabase = createServerClient();
	const { user } = await getCurrentUser(supabase);
	//   const userPromise = getUser(supabase);
	//   const eventsPromise = getEventsByDate(supabase, {
	//     from: format(new Date(), "yyyy-MM-dd"),
	//     to: format(new Date(), "yyyy-MM-dd"),
	//   });

	//   const [{ user }, { data: events }] = await Promise.all([
	//     userPromise,
	//     eventsPromise,
	//   ]);

	//   const eventsCount = events?.length ?? 0;

	return (
		<div className="flex flex-col gap-2 justify-center lg:col-span-3">
			<h1 className="text-xl md:text-2xl font-semibold">
				Welcome back, {user?.first_name} 👋 
			</h1>
			<p className="text-sm text-secondary-foreground/70">
				You have 0 upcoming events , 0 pending requests, and 5 unread messages.
			</p>
		</div>
	);
}
