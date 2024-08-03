import React from "react";
import Notes from "./_components/notes";

export default function HomePageBase() {
	return (
		<section className="gap-4 grid grid-cols-4 grid-rows-1">
			<Notes />

		</section>
	);
}
