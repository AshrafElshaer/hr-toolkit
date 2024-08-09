"use client";
import UserAvatar from "@/components/user-avatar";
import { Badge } from "@hr-toolkit/ui/badge";
import { Button } from "@hr-toolkit/ui/button";
import { Card, CardContent } from "@hr-toolkit/ui/card";

import { Separator } from "@hr-toolkit/ui/separator";
import { Calendar, Pencil, Zap } from "lucide-react";
import React from "react";

export default function CurrentProject() {
	return (
		<Card className="w-full p-0">
			<div className="flex gap-2 items-center p-2">
				<Zap className="size-4" />
				<span className="font-semibold">Current Project</span>
				<Button size="xs" variant="secondary" className="ml-auto">
					Go to project
				</Button>
			</div>

			<Separator className="w-full" />

			<CardContent className="p-2">
				<div className="grid gap-4">
					<div className="flex flex-col gap-2">
						<p className="flex ">
							Monday Redesign
							<Badge variant="warning" className="ml-auto rounded-full">
								In Progress
							</Badge>
						</p>
						<p className="text-muted-foreground text-sm flex gap-2 items-center ">
							<Pencil size={16} />
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						</p>
					</div>

					<div className="flex  gap-2 justify-between">
						<p className="text-muted-foreground flex items-center gap-2">
							<Calendar size={16} />
							Time line
						</p>
						<p>12/12/2022 - 12/12/2023</p>
					</div>

					<div className="flex justify-between items-center gap-2">
						<p className="text-muted-foreground">Project Leader</p>
						<div className="flex items-center gap-2">
							<UserAvatar
								firstName="Ashraf"
								lastName="Elshaer"
								className="w-8 h-8"
							/>
							<p>Ashraf E.</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
