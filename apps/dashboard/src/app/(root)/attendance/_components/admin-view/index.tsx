import { getAllAttendanceByDate } from "@hr-toolkit/supabase/attendance-queries";
import { createServerClient } from "@hr-toolkit/supabase/server";
import { endOfWeek, format, startOfWeek, subDays } from "date-fns";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { AttendanceWithUser } from "@hr-toolkit/supabase/types";
type Props = {
	searchParams?: { [key: string]: string | undefined };
};

export default async function EmployeesAttendance({ searchParams }: Props) {
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

	const { data } = await getAllAttendanceByDate(supabase, dateRange);

	const groupAttendanceByUser = (attendances: AttendanceWithUser[]) => {
		const userAttendanceMap = new Map<string, AttendanceWithUser[]>();

		for (const attendance of attendances) {
			const { user, ...attendanceData } = attendance;
			if (user) {
				const userAttendance = userAttendanceMap.get(user.id) ?? [];
				userAttendanceMap.set(user.id, [
					...userAttendance,
					{ ...attendanceData, user },
				]);
			}
		}

		return Array.from(userAttendanceMap.values());
	};

	const userAttendanceMap = groupAttendanceByUser(
		data as unknown as AttendanceWithUser[],
	);

	return (
		<DataTable
			columns={columns}
			data={userAttendanceMap ?? []}
			dateRange={dateRange}
		/>
	);
}
