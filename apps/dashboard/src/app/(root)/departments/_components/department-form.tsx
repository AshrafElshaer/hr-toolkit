"use client";
import * as React from "react";

import { cn } from "@hr-toolkit/ui/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@hr-toolkit/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@hr-toolkit/ui/dialog";

import { Input } from "@hr-toolkit/ui/input";
import { Label } from "@hr-toolkit/ui/label";
import { Loader, PlusIcon } from "lucide-react";

type DepartmentFormProps = {
	children: React.ReactNode;
	department?: DepartmentSelect;
};

export function DepartmentDialog({
	children: trigger,
	department,
}: DepartmentFormProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Department</DialogTitle>
					<DialogDescription>
						Add a new department to your organization.
					</DialogDescription>
				</DialogHeader>
				<NewDepartmentForm setOpen={setOpen} department={department} />
			</DialogContent>
		</Dialog>
	);
}

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@hr-toolkit/ui/form";
import { departmentSchema } from "@/lib/validations/departments";
// import { createNewDepartment } from "../actions";
import { toast } from "sonner";
import type { ReactSetState } from "@/types";

import type { DepartmentSelect } from "@hr-toolkit/supabase/types";
import ManagersSelector from "@/components/selectors/manager-selector";
import { useAction } from "next-safe-action/hooks";
import { cerateDepartmentAction, updateDepartmentAction } from "../actions";

function NewDepartmentForm({
	className,
	setOpen,
	department,
}: React.ComponentProps<"form"> & {
	setOpen: ReactSetState<boolean>;
	department?: DepartmentSelect;
}) {
	const { execute: createDepartment, isExecuting: isCreating } = useAction(
		cerateDepartmentAction,
		{
			onSuccess: ({ data }) => {
				toast.success(`Department ${data ? data.name : ""} created`);
				setOpen(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);
	const { execute: updateDepartment, isExecuting: isUpdating } = useAction(
		updateDepartmentAction,
		{
			onSuccess: ({ data }) => {
				toast.success(`Department ${data ? data.name : ""} updated`);
				setOpen(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);

	const form = useForm<z.infer<typeof departmentSchema>>({
		resolver: zodResolver(departmentSchema),
		defaultValues: {
			id: department?.id || null,
			organization_id: department?.organization_id || null,
			employees_count: department?.employees_count || 0,
			name: department?.name,
			description: department?.description,
			manager_id: department?.manager_id || "",
			created_at: department?.created_at || "",
			updated_at: department?.updated_at || "",
		},
	});

	async function onSubmit(values: z.infer<typeof departmentSchema>) {
		const isNew = !department?.id;

		if (isNew) {
			createDepartment(values);
		} else {
			updateDepartment(values);
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("space-y-4", className)}
			>
				<div className="flex items-center gap-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="IT" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input placeholder="Information Technology" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="manager_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Manager</FormLabel>
							<FormControl>
								<ManagersSelector
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-end gap-2">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" disabled={isCreating || isUpdating}>
						{isCreating || isUpdating ? (
							<Loader className="mr-2 size-4 animate-spin" />
						) : null}
						save
					</Button>
				</div>
			</form>
		</Form>
	);
}
