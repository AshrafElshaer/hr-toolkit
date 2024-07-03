import React from "react";
import { getAttendanceByDate } from "@hr-toolkit/supabase/attendance-queries";
import { createServerClient } from "@hr-toolkit/supabase/server";

import { endOfWeek, format, startOfWeek, subDays } from "date-fns";

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
		<div>
			{dateRange.startDate} - {dateRange.endDate}
			{data?.map((attendance) => (
				<div key={attendance.id}>
					{/* <p>{attendance.status}</p> */}
					<p> Hours worked {getHoursFromMinutes(attendance.total_time ?? 0)}</p>
				</div>
			))}
			total hours: {getHoursFromMinutes(totalHours ?? 0)}
		</div>
	);
}

export default AttendanceTable;

function getHoursFromMinutes(minutes: number) {
	return (minutes / 60).toFixed(2);
}
