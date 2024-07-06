import { Skeleton } from "@hr-toolkit/ui/skeleton";
import AttendanceFilter from "../attendance-filter";
import HoursBreakdownLoading from "./hours-breakdown-loading";
import PaginationLoader from "@/app/(root)/employees/components/loaders/pagination-loader";

export default function AttendanceTableLoading() {
	return (
		<section className="flex flex-col gap-4 w-full h-full ">
			<HoursBreakdownLoading />
			<AttendanceFilter />
			<Skeleton className="rounded-md border flex-grow  overflow-scroll scrollbar-muted" />
			<PaginationLoader />
		</section>
	);
}
