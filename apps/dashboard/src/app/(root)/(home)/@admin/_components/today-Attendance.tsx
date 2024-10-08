import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";

export default function TodayAttendance() {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 ">
				<CardTitle>Today's Attendances</CardTitle>
				<Clock className="size-5 text-muted-foreground " />
			</CardHeader>
			<CardContent className="flex items-center justify-between">
				<div className="font-bold ">
					<span className="text-lg">1100</span>

					<span className="text-muted-foreground text-sm"> / 1200</span>
				</div>

				<span className="text-muted-foreground text-sm">90 %</span>
			</CardContent>
		</Card>
	);
}
