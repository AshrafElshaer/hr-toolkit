import React from "react";
import { Card } from "@hr-toolkit/ui/card";
import type { Attendance } from "@hr-toolkit/supabase/types";
import { getHoursFromMinutes } from "@/lib/date";
import { differenceInBusinessDays } from "@/lib/date";
import { addDays } from "date-fns";

type Props = {
	attendances: Attendance[] | null;
	dateRange: { startDate: string; endDate: string };
};
export default function HoursBreakdown({ attendances, dateRange }: Props) {
	const totalHours = attendances?.reduce((acc, attendance) => {
		return acc + (attendance.total_time ?? 0);
	}, 0);
	const workDays = differenceInBusinessDays(
		addDays(new Date(dateRange.startDate), 1),
		addDays(new Date(dateRange.endDate), 1),
	);
	const workSchedule = workDays * 8;

	const overtime =
		Number(getHoursFromMinutes(totalHours ?? 0)) - Number(workSchedule);

	return (
		<Card className="px-4 py-2 w-full  flex flex-col items-start sm:flex-row sm:items-center sm:gap-20 justify-between ">
			<div className="flex items-center justify-between w-full sm:w-1/2 *:grid *:gap-2">
				<div>
					<span className="text-sm text-muted-foreground ">Work Schedule</span>
					<div className="flex items-center gap-2">
						<p>{workSchedule} Hours</p>
					</div>
				</div>
				<div>
					<span className="text-sm text-muted-foreground">Logged Time</span>
					<p>{getHoursFromMinutes(totalHours ?? 0)} Hours</p>
				</div>
			</div>

			<div className="grid gap-2">
				<span className="text-sm text-muted-foreground ">Overtime</span>
				<p>{overtime < 0 ? 0 : overtime.toFixed(2)} Hours</p>
			</div>
		</Card>
	);
}
