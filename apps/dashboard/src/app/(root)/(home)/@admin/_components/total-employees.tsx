import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";

export default function TotalEmployees() {
	return (
		<Card className="w-full ">
			<CardHeader className="flex flex-row items-center justify-between space-y-0  ">
				<CardTitle>Total Employees</CardTitle>
				<Users className="size-5 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-lg font-bold ">1,200</div>
			</CardContent>
		</Card>
	);
}
