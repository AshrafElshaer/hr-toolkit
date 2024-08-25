import React, { Suspense } from "react";
import TotalEmployees from "./_components/total-employees";
import TodayAttendance from "./_components/today-Attendance";
import OpenTasks from "./_components/open-tasks";
import ThisMonthPayrolls from "./_components/this-month-payrolls";
import { WorkedHoursChart } from "./_components/worked-hours-chart";
import TotalEmployeesLoading from "./_components/total-employees.loading";
import TodayAttendanceLoading from "./_components/today-attendance.loading";
import OpenTasksLoading from "./_components/open-tasks.loading";
import PayrollsLoading from "./_components/payrolls.loading";
import WorkedHoursLoading from "./_components/worked-hours.loading";

function HomeAdmin() {
	return (
		<section className="grid gap-4  grid-cols-1 grid-rows-[repeat(5,min-content)] md:grid-cols-2 md:grid-rows-[repeat(5,min-content)]  lg:grid-rows-[min-content,355px,1fr] lg:grid-cols-4">
			<Suspense fallback={<TotalEmployeesLoading />}>
				<TotalEmployees />
			</Suspense>
			<Suspense fallback={<TodayAttendanceLoading />}>
				<TodayAttendance />
			</Suspense>
			<Suspense fallback={<OpenTasksLoading />}>
				<OpenTasks />
			</Suspense>
			<Suspense fallback={<PayrollsLoading />}>
				<ThisMonthPayrolls />
			</Suspense>
			<Suspense fallback={<WorkedHoursLoading />}>
				<WorkedHoursChart />
			</Suspense>
		</section>
	);
}

export default HomeAdmin;
