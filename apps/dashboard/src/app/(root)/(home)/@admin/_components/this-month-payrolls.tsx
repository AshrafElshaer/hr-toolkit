import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@hr-toolkit/ui/card";
import { FaDollarSign } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@hr-toolkit/ui/hover-card";

export default function ThisMonthPayrolls() {
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center gap-2 ">
				<CardTitle>Payrolls</CardTitle>
				<CardDescription>This Month</CardDescription>
				<FaDollarSign className="size-5 text-muted-foreground ml-auto" />
			</CardHeader>
			<CardContent className=" flex items-center justify-between">
				<span className="text-lg font-bold">$12,234</span>
				<HoverCard openDelay={0} closeDelay={0}>
					<HoverCardTrigger className="flex items-center gap-2 text-sm  text-success">
						45.3% <FaArrowTrendDown />
					</HoverCardTrigger>
					<HoverCardContent
						side="top"
						align="end"
						className=" p-3 text-sm w-fit text-accent-foreground/70"
					>
						Last Month: $22,234
					</HoverCardContent>
				</HoverCard>
			</CardContent>
		</Card>
	);
}
