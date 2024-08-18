"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getFilteredRowModel,
} from "@tanstack/react-table";

import { TableCell, TableRow } from "@hr-toolkit/ui/table";
import { cn } from "@hr-toolkit/ui/utils";
import Main from "@/components/main";
import DepartmentHeader from "../department-header";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<Main className="flex flex-col gap-4">
			<DepartmentHeader table={table} />
			<div className="w-full overflow-x-scroll overflow-y-hidden flex-grow">
				{table.getHeaderGroups().map((headerGroup) => (
					<div
						key={headerGroup.id}
						className="rounded-lg border w-full flex items-center bg-accent text-secondary-foreground min-w-fit"
					>
						{headerGroup.headers.map((header) => {
							return (
								<div
									key={header.id}
									className={cn(
										"w-full h-12 px-4 text-left align-middle font-semibold [&:has([role=checkbox])]:pr-0  flex items-center",
										header.id === "name" && "min-w-[7.5rem]",
										header.id === "description" && "min-w-60",
										header.id === "Manager" && "min-w-44",

										header.id === "actions" && "w-32",
									)}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</div>
							);
						})}
					</div>
				))}

				<div className="w-full mt-2">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<div
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className="transition-colors hover:bg-accent flex items-center hover:border rounded-lg min-w-fit"
							>
								{row.getVisibleCells().map((cell) => (
									<div
										key={cell.id}
										className={cn(
											"px-4 py-1  align-middle [&:has([role=checkbox])]:pr-0 w-full",
											cell.column.id === "actions" && "w-auto",
											cell.column.id === "Manager" && "min-w-48",
											cell.column.id === "name" && "min-w-40",
											cell.column.id === "description" && "min-w-60",
											cell.column.id === "employees_count" && "min-w-[7.75rem]",
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</div>
								))}
							</div>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</div>
			</div>
		</Main>
	);
}
