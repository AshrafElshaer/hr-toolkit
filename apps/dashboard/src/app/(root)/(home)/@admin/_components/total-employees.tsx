import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";

export default function TotalEmployees() {
	return (
		<Card className="w-full ">
			<CardHeader className="flex flex-row items-center justify-between space-y-0  ">
				<CardTitle className="text-base font-medium">Total Employees</CardTitle>
				<Users className="size-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<div className="text-xl font-bold ">1,200</div>
			</CardContent>
		</Card>
	);
}
