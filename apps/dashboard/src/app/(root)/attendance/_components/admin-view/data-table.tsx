"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@hr-toolkit/ui/table";
import { DataTablePagination } from "@/components/table-pagination";
import { useState } from "react";
import { Input } from "@hr-toolkit/ui/input";
import AttendanceFilter from "../../../employees/[organizationId]/[employeeId]/attendance/_components/attendance-filter";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AttendanceWithUser } from "@hr-toolkit/supabase/types";
import { cn } from "@hr-toolkit/ui/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
	dateRange,
}: DataTableProps<TData, TValue> & {
	dateRange: { startDate: string; endDate: string };
}) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const router = useRouter();
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			columnFilters,
			rowSelection,
		},
		meta: {
			dateRange,
		},
	});

	function navigateToEmployeeAttendance(employee: AttendanceWithUser) {
		router.push(
			`/employees/${employee.user.organization_id}/${employee.user.id}/attendance?from=${dateRange.startDate}&to=${dateRange.endDate}`,
		);
	}

	return (
		<section className="w-full flex-grow flex flex-col gap-4">
			<div className="flex items-center w-full justify-between">
				<div className=" max-w-sm">
					<Input
						placeholder="Filter By Name ..."
						startIcon={Search}
						value={
							(table.getColumn("first_name")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn("first_name")?.setFilterValue(event.target.value)
						}
					/>
				</div>
				<AttendanceFilter />
			</div>
			<div className=" flex-grow overflow-scroll scrollbar-muted">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="bg-accent ">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className={
												header.id === "actions" || header.id === "select"
													? "w-8 p-1 "
													: undefined
											}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="h-8 cursor-pointer"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={cn(
												"py-1 cursor-pointer",
												cell.id.includes("select") && " w-8 p-0",
												cell.id.includes("actions") && "w-8 ",
											)}
											onClick={() => {
												if (
													cell.id.includes("select") ||
													cell.id.includes("actions")
												)
													return;
												navigateToEmployeeAttendance(
													(row.original as AttendanceWithUser[])[0],
												);
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</section>
	);
}
