import React from "react";
import { DepartmentDialog } from "./department-form";
import { Button } from "@hr-toolkit/ui/button";
import { PlusIcon, Search } from "lucide-react";

import type { Table } from "@tanstack/react-table";
import { Input } from "@hr-toolkit/ui/input";

interface DataTableFiltersProps<TData> {
	table: Table<TData>;
}
export default function DepartmentHeader<TData>({
	table,
}: DataTableFiltersProps<TData>) {
	return (
		<section className="w-full flex  gap-2 items-center justify-between ">
			<div className="w-40 sm:w-52 mr-auto">
				<Input
					placeholder="Filter By Name ..."
					startIcon={Search}
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
				/>
			</div>
			<DepartmentDialog>
				<Button variant={"outline"}>
					<PlusIcon className=" h-4 w-4 mr-2" />
					Add Department
				</Button>
			</DepartmentDialog>
		</section>
	);
}
