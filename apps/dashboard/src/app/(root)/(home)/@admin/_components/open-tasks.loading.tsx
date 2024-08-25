import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";
import { BiTask } from "react-icons/bi";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export default function OpenTasksLoading() {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0   ">
				<CardTitle>Open Tasks</CardTitle>
				<BiTask className="size-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex items-center justify-between">
				<Skeleton className="h-6 w-12" />

				<Skeleton className="h-4 w-24" />
			</CardContent>
		</Card>
	);
}
