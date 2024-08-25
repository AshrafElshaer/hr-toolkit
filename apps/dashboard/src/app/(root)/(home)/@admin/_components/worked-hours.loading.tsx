import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@hr-toolkit/ui/card";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export default function WorkedHoursLoading() {
	return (
		<Card className="row-span-4 md:col-span-2 lg:md:col-span-4 flex flex-col w-full h-[355px] md:h-auto">
			<CardHeader className="flex flex-col-reverse lg:flex-row gap-2 items-start justify-between">
				<div className="flex flex-col sm:flex-row items-start md:items-center sm:gap-4">
					<CardTitle className="min-w-fit">Total Worked Hours</CardTitle>
					<CardDescription className="flex flex-wrap gap-4">
						<Skeleton className="h-4 w-36" />
						<Skeleton className="h-4 w-36" />
						<Skeleton className="h-4 w-36" />
					</CardDescription>
				</div>
				<Skeleton className="h-8 w-[240px]" />
			</CardHeader>
			<CardContent className="flex-grow">
				<Skeleton className="w-full h-full" />
			</CardContent>
		</Card>
	);
}
