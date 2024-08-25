import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@hr-toolkit/ui/card";
import { FaDollarSign } from "react-icons/fa";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

export default function PayrollsLoading() {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center gap-2 ">
				<CardTitle>Payrolls</CardTitle>
				<CardDescription>This Month</CardDescription>
				<FaDollarSign className="size-5 text-muted-foreground ml-auto" />
			</CardHeader>
			<CardContent className="flex items-center justify-between">
				<Skeleton className="h-6 w-24" />
				<Skeleton className="h-4 w-16" />
			</CardContent>
		</Card>
	);
}
