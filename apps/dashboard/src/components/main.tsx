import { cn } from "@hr-toolkit/ui/utils";
import type React from "react";

export default function Main({
	className,
	children,
	...props
}: React.ComponentProps<"main">) {
	return (
		<main
			className={cn(
				"w-full md:w-[calc(100%_-_3.3rem)] p-4 pt-[11px] ml-auto min-h-[calc(100svh_-_50px)]",
				className,
			)}
			{...props}
		>
			{children}
		</main>
	);
}
