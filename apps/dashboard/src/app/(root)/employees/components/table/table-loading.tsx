import { Button } from "@hr-toolkit/ui/button";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import {
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsUpDown,
	Filter,
	Search,
} from "lucide-react";
import PaginationLoader from "../loaders/pagination-loader";

export function TableLoader() {
	return (
		<section className="w-full flex flex-col flex-grow gap-2">
			<div className="flex items-center w-full">
				<div className="flex  items-center gap-2 h-9 w-full sm:w-40 mr-auto rounded-md  border bg-transparent px-2 py-1 text-base md:text-sm cursor-not-allowed opacity-50 animate-pulse">
					<Search size={18} />
					Filter By Name ...
				</div>
				<Button variant="outline" size="icon" disabled>
					<Filter size={16} />
				</Button>
			</div>

			<Skeleton className="w-full flex-grow min-h-[21.5rem] sm:min-h-[30rem]" />
			<PaginationLoader />
		</section>
	);
}
