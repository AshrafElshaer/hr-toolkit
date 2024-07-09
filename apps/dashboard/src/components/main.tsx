import { cn } from "@hr-toolkit/ui/utils";
import React, { type HtmlHTMLAttributes } from "react";

export default function Main({
	children,
	className,
	maxHeight,
	...props
}: HtmlHTMLAttributes<HTMLDivElement> & { maxHeight?: boolean }) {
	return (
		<main
			className={cn(
				" w-full md:w-[calc(100%_-_3.3rem)] h-[calc(100%_-_50px)] top-[50px] p-4 relative left-0 md:left-[3.3rem]",
				className,
				maxHeight && "max-h-[calc(100svh_-_50px)]",
			)}
			{...props}
		>
			{children}
		</main>
	);
}
