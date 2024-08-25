import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export default function TotalEmployeesLoading() {
	return (
		<Card className="w-full ">
			<CardHeader className="flex flex-row items-center justify-between space-y-0  ">
				<CardTitle>Total Employees</CardTitle>
				<Users className="size-5 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-6 w-2/5" />
			</CardContent>
		</Card>
	);
}
