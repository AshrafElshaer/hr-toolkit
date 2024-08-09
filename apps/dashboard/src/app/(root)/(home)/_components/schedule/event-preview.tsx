import React from "react";
import type { EventSelect } from "@hr-toolkit/supabase/types";
import moment from "moment";
import { Badge } from "@hr-toolkit/ui/badge";
import { capitalize } from "lodash";
import { Avatar, AvatarImage, AvatarFallback } from "@hr-toolkit/ui/avatar";
import UserAvatar from "@/components/user-avatar";

type Props = {
	event: EventSelect;
};

export default function EventPreview({ event }: Props) {
	return (
		<div className="w-full p-2 pr-3">
			<div className="flex justify-between">
				<h3>{event.name}</h3>
				<p className="text-sm text-muted-foreground">
					{moment(event.start_time).format("LT")} -{" "}
					{moment(event.end_time).format("LT")}
				</p>
			</div>
			<p className="text-sm text-muted-foreground mt-2">{event.description}</p>

			<div className="flex items-center justify-between">
				<div className="flex flex-row-reverse justify-end -space-x-1 space-x-reverse *:ring-1 *:ring-border  *:h-6 *:w-6">
					<UserAvatar
						firstName="Ashraf"
						lastName="Elshaer"
						fallbackSize="text-xs"
					/>
					<UserAvatar
						firstName="Ashraf"
						lastName="Elshaer"
						fallbackSize="text-xs"
					/>
					<UserAvatar
						firstName="Ashraf"
						lastName="Elshaer"
						fallbackSize="text-xs"
					/>
				</div>

				<Badge
					variant="outline"
					className="font-light text-xs border-primary rounded-full mt-4 px-2 py-[0.075]"
				>
					{capitalize(event.type)}
				</Badge>
			</div>
		</div>
	);
}
