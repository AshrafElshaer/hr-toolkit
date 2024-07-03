import React, { Suspense } from "react";
import AttendanceFilter from "./_components/attendance-filter";

import EmployeeInfo from "./_components/employee-info";
import AttendanceTable from "./_components/table";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { Card } from "@hr-toolkit/ui/card";

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

function InfoLoading() {
	return (
		<Card className="p-4 w-full  flex flex-col items-start sm:flex-row sm:items-center sm:gap-20 justify-between ">
			<div className="flex items-center justify-between w-full">
				<div>
					<span className="text-sm text-muted-foreground ml-10">Employee</span>
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 cursor-pointer rounded-full" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
				<div>
					<span className="text-sm text-muted-foreground">Job Title</span>
					<Skeleton className="h-4 w-32" />
				</div>
			</div>

			<div className="flex items-start justify-between w-full">
				<div>
					<span className="text-sm text-muted-foreground">Department</span>
					<div className="flex gap-2 items-center">
						<Skeleton className="h-4 w-12" /> -{" "}
						<Skeleton className="h-4 w-32" />
					</div>
				</div>

				<div>
					<span className="text-sm text-muted-foreground">Status</span>
					<Skeleton className="h-4 w-10" />
				</div>
			</div>
		</Card>
	);
}

export default EmployeeAttendance;
