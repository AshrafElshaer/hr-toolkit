import Main from "@/components/main";
import React, { Suspense } from "react";

import { InfoLoading } from "../../employees/[organizationId]/[employeeId]/attendance/_components/loading/info";
import EmployeeInfo from "../../employees/[organizationId]/[employeeId]/attendance/_components/employee-info";
import AttendanceTableLoading from "../../employees/[organizationId]/[employeeId]/attendance/_components/loading/table-loading";
import AttendanceTable from "../../employees/[organizationId]/[employeeId]/attendance/_components/table";
import { createServerClient } from "@hr-toolkit/supabase/server";
import { getUser } from "@hr-toolkit/supabase/user-queries";

type Props = {
	searchParams?: { [key: string]: string | undefined };
};
export default async function EmployeeViewPage({ searchParams }: Props) {
	const supabase = createServerClient();
	const { user } = await getUser(supabase);

	return (
		<Main className="flex flex-col items-center justify-center gap-4 h-full ">
			<Suspense fallback={<InfoLoading />}>
				<EmployeeInfo employeeId={user?.id ?? ""} />
			</Suspense>
			<Suspense fallback={<AttendanceTableLoading />}>
				<AttendanceTable
					employeeId={user?.id ?? ""}
					searchParams={searchParams}
				/>
			</Suspense>
		</Main>
	);
}
