import React from "react";
import AttendanceFilter from "./_components/attendance-filter";
import { InfoLoading } from "./_components/loading/info";
import Main from "@/components/main";
import AttendanceTableLoading from "./_components/loading/table-loading";

export default function EmployeeAttendanceLoading() {
	return (
		<section className="flex flex-col gap-4 justify-start h-full ">
			<InfoLoading />
			<AttendanceTableLoading />
			
		</section>
	);
}
