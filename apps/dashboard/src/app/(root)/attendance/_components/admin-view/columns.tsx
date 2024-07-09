"use client";

import type { ColumnDef, TableMeta } from "@tanstack/react-table";
import type { AttendanceWithUser } from "@hr-toolkit/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@hr-toolkit/ui/avatar";
import { addDays } from "date-fns";
import { differenceInBusinessDays, getHoursFromMinutes } from "@/lib/date";
import {
	DropdownMenuSeparator,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@hr-toolkit/ui/dropdown-menu";
import { Button } from "@hr-toolkit/ui/button";
import { Check, MoreHorizontal, X } from "lucide-react";
import { Checkbox } from "@hr-toolkit/ui/checkbox";

type AttendancesColumnMeta = TableMeta<AttendanceWithUser> & {
	dateRange: { startDate: string; endDate: string };
};

export const columns: ColumnDef<AttendanceWithUser[]>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="w-full h-full  grid place-items-center">
				<Checkbox
					className="border-primary"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="w-full h-full  grid place-items-center">
				<Checkbox
					className="border-primary"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "first_name",
		accessorFn: (row) => `${row[0].user.first_name} ${row[0].user.last_name}`,
		header: () => <div className="min-w-32 ">Full Name</div>,
		cell({ row }) {
			const employee = row.original[0].user;
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6 cursor-pointer">
						<AvatarImage src={employee.avatar_url ?? ""} />
						<AvatarFallback>
							{employee.first_name ? employee.first_name[0] : ""}
							{employee.last_name ? employee.last_name[0] : ""}
						</AvatarFallback>
					</Avatar>
					<p>
						{employee.first_name} {employee.last_name}
					</p>
				</div>
			);
		},
	},
	{
		header: "Scheduled / Actual Time",
		cell({ row, table }) {
			const tableMeta = table.options.meta as AttendancesColumnMeta;
			const dateRange = tableMeta.dateRange;

			const attendances = row.original;
			const totalHours = attendances?.reduce((acc, attendance) => {
				return acc + (attendance.total_time ?? 0);
			}, 0);
			const workDays = differenceInBusinessDays(
				addDays(new Date(dateRange.startDate), 1),
				addDays(new Date(dateRange.endDate), 1),
			);
			const workSchedule = workDays * 8;

			return (
				<div className="flex items-center gap-2 min-w-24">
					{workSchedule}h / {getHoursFromMinutes(totalHours)}h
				</div>
			);
		},
	},
	{
		header: "Over Time",
		cell({ row, table }) {
			const tableMeta = table.options.meta as AttendancesColumnMeta;
			const dateRange = tableMeta.dateRange;

			const attendances = row.original;
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

			return <div>{overtime < 0 ? 0 : overtime.toFixed(2)}h</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="flex items-center gap-2">
							<Check size={14} />
							Approve
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-2">
							<X size={14} />
							Reject
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
