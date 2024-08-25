import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export default function TodayAttendanceLoading() {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 ">
				<CardTitle>Today's Attendances</CardTitle>
				<Clock className="size-5 text-muted-foreground " />
			</CardHeader>
			<CardContent className="flex items-center justify-between">
				<div className=" flex items-center gap-1">
					<Skeleton className="h-6 w-12" />
					/
					<Skeleton className="h-6 w-12" />
				</div>

				<Skeleton className="h-6 w-8" />
			</CardContent>
		</Card>
	);
}
