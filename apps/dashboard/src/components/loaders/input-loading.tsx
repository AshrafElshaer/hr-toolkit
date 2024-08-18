import { cn } from "@hr-toolkit/ui/utils";
import type { LucideIcon } from "lucide-react";
import React, { type ComponentPropsWithoutRef } from "react";

type Props = {
	Icon?: LucideIcon;
	placeholder: string;
} & ComponentPropsWithoutRef<"div">;

export default function InputLoading({
	Icon,
	className,
	placeholder,
	...props
}: Props) {
	const Svg = Icon;
	return (
		<div
			className={cn(
				"flex  items-center gap-2 h-9 w-full sm:w-40 mr-auto rounded-md  border bg-transparent px-2 py-1 text-base md:text-sm cursor-not-allowed opacity-50 animate-pulse",
				className,
			)}
			{...props}
		>
			{Svg && <Svg size={18} />}
			{placeholder}
		</div>
	);
}
