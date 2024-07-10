import { Button } from "@hr-toolkit/ui/button";
import {
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsUpDown,
} from "lucide-react";
import React from "react";

export default function PaginationLoader() {
	return (
		<div className="flex items-center  justify-end gap-2 p-2 mt-auto ">
			<div className="flex flex-col sm:flex-row gap-2 items-center ">
				<p className="text-sm font-medium">Rows per page</p>
				<Button variant="outline" size="sm" disabled>
					10 <ChevronsUpDown size={14} className="ml-2" />
				</Button>
			</div>
			<div className="flex flex-col sm:flex-row items-center gap-2 ">
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page 1 of 1
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						disabled
					>
						<span className="sr-only">Go to first page</span>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" disabled>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" disabled>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						disabled
					>
						<span className="sr-only">Go to last page</span>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
