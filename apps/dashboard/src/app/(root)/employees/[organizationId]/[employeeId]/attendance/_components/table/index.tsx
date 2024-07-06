import React from "react";
import { getAttendanceByDate } from "@hr-toolkit/supabase/attendance-queries";
import { createServerClient } from "@hr-toolkit/supabase/server";
import HoursBreakdown from "../hours-breakdown";

import { endOfWeek, format, startOfWeek, subDays } from "date-fns";
import HoursBreakdownLoading from "../loading/hours-breakdown-loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AttendanceFilter from "../attendance-filter";

type Props = {
	employeeId: string;
	searchParams?: { [key: string]: string | undefined };
};

async function AttendanceTable({ employeeId, searchParams }: Props) {
	const supabase = createServerClient();

	const from =
		searchParams?.from ??
		format(
			startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
			"yyyy-MM-dd",
		);

	const dateRange = {
		startDate: from,
		endDate:
			searchParams?.to ??
			format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"),
	};

	const { data } = await getAttendanceByDate(supabase, employeeId, dateRange);

	const totalHours = data?.reduce((acc, attendance) => {
		return acc + (attendance.total_time ?? 0);
	}, 0);

	return (
		<section className="flex flex-col gap-4 w-full max-h-full ">
			<HoursBreakdown attendances={data} dateRange={dateRange} />
			<AttendanceFilter />
			<DataTable data={data ?? []} columns={columns} />
		</section>
	);
}

export default AttendanceTable;
