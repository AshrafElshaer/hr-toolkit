import { type ReactNode, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteDepartmentAction } from "../actions";
import { toast } from "sonner";
import type { DepartmentWithManager } from "@hr-toolkit/supabase/types";
import {
	AlertDialog,
	AlertDialogAction,
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

type DepartmentDeleteProps = {
	department: DepartmentWithManager;
	children: ReactNode;
};

export function DepartmentDelete({
	department,
	children: trigger,
}: DepartmentDeleteProps) {
	const [open, setOpen] = useState(false);

	const { execute: deleteDepartment, isExecuting: isDeleting } = useAction(
		deleteDepartmentAction,
		{
			onSuccess: () => {
				toast.success(`Department ${department.name} deleted`);
				setOpen(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete ({" "}
						{department.name} - {department.description} ) and remove the data
						from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{/* <AlertDialogAction>Continue</AlertDialogAction> */}
					<Button
						variant="destructive"
						onClick={() => deleteDepartment({ id: department.id })}
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
