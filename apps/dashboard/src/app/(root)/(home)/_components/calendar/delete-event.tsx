import { type ReactNode, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteEventAction } from "../../actions";
import { toast } from "sonner";
import type {
	DepartmentWithManager,
	EventWithOrganizerAndDepartment,
} from "@hr-toolkit/supabase/types";
import {
	AlertDialog,

	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@hr-toolkit/ui/alert-dialog";
import { Button } from "@hr-toolkit/ui/button";
import { Loader } from "lucide-react";

type EventDeleteProps = {
	event: EventWithOrganizerAndDepartment;
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};

export function EventDelete({
	event,
	children: trigger,
	isOpen,
	setIsOpen,
}: EventDeleteProps) {
	const { execute: deleteEvent, isExecuting: isDeleting } = useAction(
		deleteEventAction,
		{
			onSuccess: () => {
				toast.success(`Event ${event.name} deleted`);
				setIsOpen(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete ({" "}
						{event.name} ) and remove the data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<Button
						variant="destructive"
						onClick={() => deleteEvent({ id: event.id })}
						disabled={isDeleting}
					>
						{isDeleting ? (
							<Loader className="mr-2 size-4 animate-spin" />
						) : null}
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
