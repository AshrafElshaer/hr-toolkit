import React from "react";
import Notes from "./_components/notes";
import Tasks from "./_components/tasks";

export default function HomePageBase() {
	return (
		<section className="gap-4 grid grid-cols-4">
			<Notes />
			<Tasks />
		</section>
	);
}
