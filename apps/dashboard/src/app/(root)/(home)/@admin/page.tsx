import Main from "@/components/main";
import React from "react";
import TotalEmployees from "./_components/total-employees";
import TodayAttendance from "./_components/today-Attendance";
import OpenTasks from "./_components/open-tasks";
import ThisMonthPayrolls from "./_components/this-month-payrolls";
import { WorkedHoursChart } from "./_components/worked-hours-chart";

function HomeAdmin() {
	return (
		<section className="grid gap-4  grid-cols-1 grid-rows-[repeat(5,min-content)] md:grid-cols-2 md:grid-rows-[repeat(5,min-content)]  lg:grid-rows-[min-content,355px,1fr] lg:grid-cols-4">
			<TotalEmployees />
			<TodayAttendance />
			<OpenTasks />
			<ThisMonthPayrolls />
			<WorkedHoursChart />
		</section>
	);
}

export default HomeAdmin;
