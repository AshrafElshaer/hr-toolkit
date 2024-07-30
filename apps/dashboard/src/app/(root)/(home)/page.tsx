import React from "react";
import TotalEmployees from "./@admin/_components/total-employees";
import TodayAttendance from "./@admin/_components/today-Attendance";

export default function HomePageBase() {
	return (
		<section className="gap-4 grid">
			<TotalEmployees />
			<TodayAttendance />
		</section>
	);
}
