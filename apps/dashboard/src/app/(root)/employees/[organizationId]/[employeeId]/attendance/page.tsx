import { getAttendanceByDate } from "@hr-toolkit/supabase/attendance-queries";
import { createServerClient } from "@hr-toolkit/supabase/server";
import {
	addDays,
	endOfWeek,
	format,
	formatDate,
	startOfWeek,
	subDays,
} from "date-fns";
import React from "react";
import AttendanceHeader from "./_components/attendance-header";

type PageProps = {
	params: {
		organizationId: string;
		employeeId: string;
	};
	searchParams?: { [key: string]: string | undefined };
};

async function EmployeeAttendance({ params, searchParams }: PageProps) {
	const supabase = createServerClient();

	const from =
		searchParams?.from ??
		format(
			startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
			"yyyy-MM-dd",
		);

	const defaultDateRange = {
		from,
		to:
			searchParams?.to ??
			format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"),
	};

	console.log(defaultDateRange);

	const { data } = await getAttendanceByDate(supabase, params.employeeId, {
		startDate: formatDate(subDays(new Date(), 7), "yyyy-MM-dd"),
		endDate: formatDate(addDays(new Date(), 2), "yyyy-MM-dd"),
	});

	const totalHours = data?.reduce((acc, attendance) => {
		return acc + (attendance.total_time ?? 0);
	}, 0);

	return (
		<main className="flex flex-col gap-4 justify-start h-full p-4 ">
			<AttendanceHeader name="Ashraf Elshaer" />
			<p>{params.employeeId}</p>
			{data?.map((attendance) => (
				<div key={attendance.id}>
					{/* <p>{attendance.status}</p> */}
					<p> Hours worked {getHoursFromMinutes(attendance.total_time ?? 0)}</p>
				</div>
			))}
			total hours: {getHoursFromMinutes(totalHours ?? 0)}
		</main>
	);
}

export default EmployeeAttendance;

function getHoursFromMinutes(minutes: number) {
	return (minutes / 60).toFixed(2);
}
