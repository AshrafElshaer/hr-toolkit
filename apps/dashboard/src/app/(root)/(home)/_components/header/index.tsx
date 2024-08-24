import React from "react";
import WelcomeMessage from "./welcome";
import ClockInOutServer from "./clock-in-out.server";


export default async function HomeHeader() {

	return (
		<section className="grid gap-4 grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 ">
			<WelcomeMessage />
			<ClockInOutServer />
		</section>
	);
}
