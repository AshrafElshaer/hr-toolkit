import React, { Suspense } from "react";
import AttendanceFilter from "./_components/attendance-filter";

import EmployeeInfo from "./_components/employee-info";
import AttendanceTable from "./_components/table";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { Card } from "@hr-toolkit/ui/card";
import { InfoLoading } from "./_components/loading/info";

type PageProps = {
	params: {
		organizationId: string;
		employeeId: string;
	};
	searchParams?: { [key: string]: string | undefined };
};

async function EmployeeAttendance({ params, searchParams }: PageProps) {
	return (
		<main className="flex flex-col gap-4 justify-start h-full p-4 ">
			<AttendanceFilter />
			<Suspense fallback={<InfoLoading />}>
				<EmployeeInfo employeeId={params.employeeId} />
			</Suspense>
			<Suspense fallback={<div>Loading table...</div>}>
				<AttendanceTable
					employeeId={params.employeeId}
					searchParams={searchParams}
				/>
			</Suspense>
		</main>
	);
}

export default EmployeeAttendance;
