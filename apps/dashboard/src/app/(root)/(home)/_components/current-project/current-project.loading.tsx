import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { Calendar, Pencil, Zap } from "lucide-react";
import React from "react";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { Button } from "@hr-toolkit/ui/button";

export default function CurrentProjectLoading() {
	return (
		<Card className="w-full p-0">
			<div className="flex gap-2 items-center p-2">
				<Zap className="size-4" />
				<span className="font-semibold">Current Project</span>
				<Button size="xs" variant="secondary" className="ml-auto" disabled>
					Go to project
				</Button>
			</div>

			<Separator className="w-full" />

			<CardContent className="p-2">
				<div className="grid gap-4">
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<Skeleton className="h-6 w-1/3" />
							<Skeleton className="h-6 w-24 rounded-full" />
						</div>
						<div className="flex gap-2 items-center">
							<Pencil size={16} />
							<Skeleton className="h-4 w-full" />
						</div>
					</div>

					<div className="flex gap-2 justify-between">
						<div className="flex items-center gap-2">
							<Calendar size={16} />
							<Skeleton className="h-4 w-20" />
						</div>
						<Skeleton className="h-4 w-32" />
					</div>

					<div className="flex justify-between items-center gap-2">
						<Skeleton className="h-4 w-24" />
						<div className="flex items-center gap-2">
							<Skeleton className="w-8 h-8 rounded-full" />
							<Skeleton className="h-4 w-20" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
