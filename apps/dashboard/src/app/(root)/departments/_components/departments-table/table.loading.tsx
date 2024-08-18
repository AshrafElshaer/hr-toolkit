import InputLoading from "@/components/loaders/input-loading";
import Main from "@/components/main";
import { Button } from "@hr-toolkit/ui/button";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { cn } from "@hr-toolkit/ui/utils";
import { capitalize } from "lodash";
import { PlusIcon, Search } from "lucide-react";
import React from "react";
const headers = ["name", "description", "manager", "employees", "actions"];

export default function DepartmentsTableLoading() {
	return (
		<Main className="flex flex-col gap-4">
			<section className="w-full flex  gap-2 items-center justify-between ">
				<div className="w-40 sm:w-52 mr-auto">
					<InputLoading placeholder="Filter By Name ..." Icon={Search} />
				</div>

				<Button variant={"outline"} disabled>
					<PlusIcon className=" h-4 w-4 mr-2" />
					Add Department
				</Button>
			</section>
			<div className="w-full overflow-x-scroll">
				<div
					// key={headerGroup.id}
					className="rounded-lg border w-full flex items-center bg-accent text-secondary-foreground min-w-fit"
				>
					{headers.map((header) => (
						<div
							key={header}
							className={cn(
								"w-full h-12 px-4 text-left align-middle font-semibold [&:has([role=checkbox])]:pr-0  flex items-center",
								header === "name" && "min-w-[7.5rem]",
								header === "description" && "min-w-60",
								header === "manager" && "min-w-44",

								header === "actions" && "w-32",
							)}
						>
							{header !== "actions" ? capitalize(header) : ""}
						</div>
					))}
				</div>

				<div className="w-full">
					{Array.from({ length: 10 }).map((_, index) => (
						<Skeleton
							className="w-full rounded-lg h-10 mt-2"
							key={index.toString()}
						/>
					))}
				</div>
			</div>
		</Main>
	);
}
