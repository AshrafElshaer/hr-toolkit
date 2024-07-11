import Main from "@/components/main";
import React from "react";
import { InfoLoading } from "../../employees/[organizationId]/[employeeId]/attendance/_components/loading/info";
import AttendanceTableLoading from "../../employees/[organizationId]/[employeeId]/attendance/_components/loading/table-loading";

export default function EmployeeViewLoading() {
	return (
		<Main className="flex flex-col items-center justify-center  gap-4">
			<InfoLoading />
			<AttendanceTableLoading />
		</Main>
	);
}
