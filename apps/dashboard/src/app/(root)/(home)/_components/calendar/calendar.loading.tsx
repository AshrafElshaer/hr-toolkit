import { Card, CardContent } from "@hr-toolkit/ui/card";
import { CalendarCheck } from "lucide-react";
import React from "react";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { Separator } from "@hr-toolkit/ui/separator";
import { DatePicker } from "@hr-toolkit/ui/date-picker";

export default function CalendarLoading() {
	return (
		<Card className="w-full sm:col-span-2 lg:col-span-4 p-2 flex flex-col gap-4">
			<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center ">
				<div className="flex gap-2 items-center">
					<CalendarCheck className="size-4" />
					<span className="font-semibold">Your Schedule</span>
				</div>
				<Skeleton className="h-6 w-32 ml-auto" />

			</div>
			<CardContent className="p-0 border flex flex-grow rounded overflow-hidden">
				<div className="w-full flex divide-x h-full overflow-y-hidden overflow-x-scroll scrollbar-hide">
					{Array.from({ length: 7 }).map((_, index) => (
						<div key={index.toString()} className="flex-1 min-w-44">
							<Skeleton className="h-8 w-full rounded-none" />
							<Separator className="w-full" />
							<div className="p-2 h-[11.65rem]">
								<Skeleton className="h-6 w-full mb-2" />
								<Skeleton className="h-6 w-full mb-2" />
								<Skeleton className="h-6 w-full" />
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
