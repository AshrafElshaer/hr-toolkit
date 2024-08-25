import { Skeleton } from "@hr-toolkit/ui/skeleton";

export function WelcomeMessageSkeleton() {
	return (
		<div className="flex flex-col gap-2 justify-center h-fit lg:col-span-3">
			<Skeleton className="h-8 w-52 " />
			<Skeleton className="h-3 w-72" />
		</div>
	);
}
