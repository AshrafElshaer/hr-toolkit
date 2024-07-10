import Main from "@/components/main";
import React from "react";
import InputLoading from "@/components/loaders/input-loading";

import { Search } from "lucide-react";
import PaginationLoader from "@/components/loaders/pagination-loader";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import AttendanceFilter from "../employees/[organizationId]/[employeeId]/attendance/_components/attendance-filter";

export default function AttendancePageLoading() {
	return (
		<Main className=" flex-grow flex flex-col gap-4" maxHeight>
			<div className="flex items-start flex-col-reverse sm:flex-row gap-4 w-full justify-between">
				<div className="w-full sm:max-w-52">
					<InputLoading Icon={Search} />
				</div>
				<AttendanceFilter className="ml-auto"  />
			</div>
			<Skeleton className="w-full flex-grow " />
			<PaginationLoader />
		</Main>
	);
}
