import React from "react";
import Main from "@/components/main";
import { DepartmentDialog } from "./_components/department-form";
import { Button } from "@hr-toolkit/ui/button";
import { PlusIcon } from "lucide-react";
import DepartmentsTable from "./_components/departments-table";

export default function DepartmentsPage() {
	return (
		<Main>
			<section className="w-full flex items-center justify-between">
				<h2 className="md:text-xl">Departments</h2>
				<DepartmentDialog>
					<Button variant={"outline"}>
						<PlusIcon className=" h-4 w-4 mr-2" />
						Add Department
					</Button>
				</DepartmentDialog>
			</section>
			<DepartmentsTable />
		</Main>
	);
}
