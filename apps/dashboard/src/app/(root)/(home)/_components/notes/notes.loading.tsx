import { Card, CardContent } from "@hr-toolkit/ui/card";
import { Separator } from "@hr-toolkit/ui/separator";
import { FaRegNoteSticky } from "react-icons/fa6";
import { Skeleton } from "@hr-toolkit/ui/skeleton";
import { Button } from "@hr-toolkit/ui/button";
import { PlusIcon } from "lucide-react";

export default function NotesCardLoading() {
	return (
		<Card className="w-full p-0">
			<div className="flex gap-2 items-center p-2">
				<FaRegNoteSticky className="size-4" />
				<span className="font-semibold">Notes</span>
				<Button size="xs" variant="secondary" className="ml-auto" disabled>
					<PlusIcon className="size-3 mr-2" />
					New Note
				</Button>
			</div>

			<Separator className="w-full" />
			<CardContent className="p-0">
				<div className="h-64 ">
					{[...Array(4)].map((_, index) => (
						<div
							key={index.toString()}
							className="flex items-start p-2 pr-6 w-full hover:bg-secondary transition-all relative border-b last:border-b-0 cursor-pointer"
						>
							<Skeleton className="h-4 w-4 rounded-full mt-0.5" />

							<div className="w-full space-y-2 px-2">
								<div className="flex justify-between gap-2">
									<Skeleton className="h-4 w-1/3" />
									<Skeleton className="h-4 w-16 rounded-full" />
								</div>

								<div className="flex items-center justify-between gap-2">
									<Skeleton className="h-4 w-2/3" />
									<div className="flex items-center gap-2">
										<Skeleton className="h-3 w-3" />
										<Skeleton className="h-3 w-20" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
