import React from "react";
import Notes from "./_components/notes";
import Tasks from "./_components/tasks";
import Metrics from "./_components/metrics";

export default function HomePageBase() {
	return (
		<section className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<Notes />
			<Tasks />
			<Metrics />
		</section>
	);
}
