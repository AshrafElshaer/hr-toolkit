"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { DepartmentWithManager } from "@hr-toolkit/supabase/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@hr-toolkit/ui/dropdown-menu";
import { Button } from "@hr-toolkit/ui/button";
import { MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import UserAvatar from "@/components/user-avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<DepartmentWithManager>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorFn: (row) =>
			`${row.manager?.first_name} ${row.manager?.last_name}` || "",

		header: "Manager",

		cell: ({ row }) => {
			const manager = row.original.manager;
			return (
				<div className="w-full flex gap-2 items-center">
					<UserAvatar
						firstName={manager?.first_name}
						lastName={manager?.last_name}
						url={manager?.avatar_url}
						className="w-6 h-6"
						fallbackSize="text-xs"
					/>
					<span>
						{manager?.first_name} {manager?.last_name}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "employees_count",
		header: () => {
			return (
				<div className="text-center w-full">
					<span>Employees</span>
				</div>
			);
		},

		cell: ({ row }) => {
			return (
				<div className="text-center w-full">
					<span>{row.getValue("employees_count")}</span>
				</div>
			);
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
						<DropdownMenuItem>
							<PencilIcon className="mr-2 size-3.5" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Trash className="mr-2 size-3.5" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
