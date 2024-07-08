"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Attendance } from "@hr-toolkit/supabase/types";
import { getHoursFromMinutes } from "@/lib/date";
import { addDays, format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Attendance>[] = [
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => {
			const dateValue = row.original.date;
			const date =
				dateValue && Object.keys(dateValue).length > 0
					? new Date(dateValue)
					: new Date();
			return (
				<div className="min-w-32">
					{format(addDays(date, 1), "dd MMM ,yy ( EEE )")}
				</div>
			);
		},
	},
	{
		accessorKey: "clock_in",
		header: "Clock In",
		cell: ({ row }) => {
			const dateValue = row.original.clock_in;
			const date =
				dateValue && Object.keys(dateValue).length > 0
					? new Date(dateValue)
					: new Date();
			return <div className="min-w-32">{format(date, "hh:mm a")}</div>;
		},
	},
	{
		accessorKey: "clock_out",
		header: "Clock Out",
		cell: ({ row }) => {
			const dateValue = row.original.clock_out;
			const date =
				dateValue && Object.keys(dateValue).length > 0
					? new Date(dateValue)
					: new Date();

			return <div className="min-w-32">{format(date, "hh:mm a")}</div>;
		},
	},
	{
		accessorKey: "total_time",
		header: "Total Hours",
		cell: ({ row }) => {
			const total_time = row.original.total_time;
			return (
				<div className="min-w-32">
					{getHoursFromMinutes(total_time ?? 0)} hours
				</div>
			);
		},
	},
];
