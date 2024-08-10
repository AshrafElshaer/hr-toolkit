import React from "react";

import Tasks from "./_components/tasks";
import Metrics from "./_components/metrics";
import Schedule from "./_components/schedule";
import CurrentProject from "./_components/current-project";
import NotesServer from "./_components/notes";

export default function HomePageBase() {
	return (
		<section className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2  lg:grid-cols-3 lg:grid-rows-2">
			<NotesServer />
			<Tasks />
			<Schedule />
			<Metrics />
			<CurrentProject />
		</section>
	);
}
