import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import React from "react";

export default function GeneralInfoLoading() {
	return (
		<section className="gap-4 flex flex-col h-full sm:flex-row pb-4 sm:pb-0">
			<Skeleton className="w-full h-full flex-grow sm:w-1/3" />
			<div className="flex flex-col gap-4 w-full flex-grow justify-between">
				<Skeleton className="w-full h-40 sm:h-auto  flex-grow " />
				<Skeleton className="w-full  flex-grow " />
				<Skeleton className="w-full  flex-grow " />
			</div>
		</section>
	);
}
