import React, { type ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@hr-toolkit/ui/avatar";

type Props = {
	firstName: string;
	lastName: string;
	url?: string;
	fallbackSize?: string;
} & ComponentProps<"span">;

export default function UserAvatar({
	firstName,
	lastName,
	className,
	url,
	fallbackSize,
}: Props) {
	return (
		<Avatar className={className}>
			<AvatarImage src={url ?? ""} />
			<AvatarFallback className={fallbackSize}>
				{firstName ? firstName[0] : ""}
				{lastName ? lastName[0] : ""}
			</AvatarFallback>
		</Avatar>
	);
}
