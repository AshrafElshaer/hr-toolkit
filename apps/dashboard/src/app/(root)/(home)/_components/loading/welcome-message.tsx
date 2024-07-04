import { Skeleton } from "@hr-toolkit/ui/skeleton";

export function WelcomeMessageSkeleton() {
	return (
		<div className="flex flex-col p-4 gap-2 w-full sm:w-80 h-fit ">
			<Skeleton className="h-8 2/3 " />
			<Skeleton className="h-3 w-40" />
		</div>
	);
}
