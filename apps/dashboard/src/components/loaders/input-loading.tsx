import type { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
	Icon?: LucideIcon;
};

export default function InputLoading({ Icon }: Props) {
	const Svg = Icon;
	return (
		<div className="flex  items-center gap-2 h-9 w-full sm:w-40 mr-auto rounded-md  border bg-transparent px-2 py-1 text-base md:text-sm cursor-not-allowed opacity-50 animate-pulse">
			{Svg && <Svg size={18} />}
			Filter By Name ...
		</div>
	);
}
