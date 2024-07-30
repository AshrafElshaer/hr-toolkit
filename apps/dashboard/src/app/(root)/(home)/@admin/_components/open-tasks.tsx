import React from "react";
import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@hr-toolkit/ui/card";
import { BiTask } from "react-icons/bi";

export default function OpenTasks() {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0   ">
				<CardTitle className="text-base font-medium">Open Tasks</CardTitle>
				<BiTask className="size-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="p-4 pt-0 flex items-center justify-between">
				<span className="text-xl font-bold">17</span>

				<span className="text-muted-foreground text-sm"> 5 Over due </span>
			</CardContent>
		</Card>
	);
}
