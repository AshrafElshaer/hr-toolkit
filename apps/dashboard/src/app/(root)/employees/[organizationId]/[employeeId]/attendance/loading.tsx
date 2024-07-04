import React from "react";
import AttendanceFilter from "./_components/attendance-filter";
import { InfoLoading } from "./_components/loading/info";

export default function EmployeeAttendanceLoading() {
	return (
		<main className="flex flex-col gap-4 justify-start h-full p-4 ">
			<AttendanceFilter />
			<InfoLoading />
			<div>Loading table...</div>
		</main>
	);
}
