import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { Zap } from "lucide-react";
import React from "react";
import { IoStatsChart } from "react-icons/io5";

export default function CurrentProject() {
	return (
		<Card className="w-full p-0">
			<div className="flex gap-2 items-center p-2">
				<Zap className="size-4" />
				<span className="font-semibold">Current Project</span>
			</div>

			<Separator className="w-full" />

			<CardContent className="p-2">
				<div className="grid gap-4">
					<div className="flex flex-col gap-2">
						<p className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Working Hours</span>
							<span>{/* {workedHours} / {plannedHours} Hrs */}</span>
						</p>
						{/* <Progress value={workedHoursPercentage} className="h-2" /> */}
					</div>

					<div className="flex flex-col gap-2">
						<p className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Completed Tasks</span>
							{/* <span>{completedTasks}</span> */}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
