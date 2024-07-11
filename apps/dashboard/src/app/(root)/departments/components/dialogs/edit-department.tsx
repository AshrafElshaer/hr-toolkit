"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@hr-toolkit/supabase/user-queries";
import { getAllManagers } from "@hr-toolkit/supabase/organization-queries";
import { useForm } from "react-hook-form";
import { departmentSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "usehooks-ts";
import { editDepartment } from "../../actions";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { cn } from "@hr-toolkit/ui/utils";

import type { DepartmentColumn } from "../table/columns";
import type { SupabaseClient } from "@hr-toolkit/supabase/types";
import type { z } from "zod";
import type { User } from "@hr-toolkit/supabase/types";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@hr-toolkit/ui/dialog";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@hr-toolkit/ui/form";

import { Input } from "@hr-toolkit/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@hr-toolkit/ui/select";
import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import { Button } from "@hr-toolkit/ui/button";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@hr-toolkit/ui/avatar";
import { useUser } from "@/hooks/use-user";

type props = {
	department: DepartmentColumn | null;
	onClose: () => void;
	supabase: SupabaseClient;
	isEdit: boolean;
	toggleIsEdit: () => void;
};

export default function EditDepartment({
	department,
	onClose,
	supabase,
	isEdit,
	toggleIsEdit,
}: props) {
	return (
		<Dialog open={isEdit} onOpenChange={toggleIsEdit}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Department</DialogTitle>
				</DialogHeader>

				<UpdateForm
					onClose={onClose}
					department={department}
					supabase={supabase}
				/>
			</DialogContent>
		</Dialog>
	);
}

function UpdateForm({
	department,
	supabase,
	className,
	onClose,
}: {
	department: DepartmentColumn | null;
	supabase: SupabaseClient;
	className?: string;
	onClose: () => void;
}) {
	if (!department || !department.id) {
		return null;
	}

	const { user } = useUser();
	const { data: organizationManagers, error: managersError } = useQuery({
		queryKey: ["managers"],
		queryFn: () => getAllManagers(supabase),
	});
	const form = useForm<z.infer<typeof departmentSchema>>({
		resolver: zodResolver(departmentSchema),
		defaultValues: {
			departmentName: department.name,
			departmentDescription: department?.description ?? "",
			personInCharge: department.person_in_charge_id,
		},
	});

	async function onSubmit(values: z.infer<typeof departmentSchema>) {
		const { data, serverError, validationError } = await editDepartment({
			...values,
			id: department?.id,
		});
		if (serverError) {
			toast.error("An error occurred while updating the department.", {
				description: serverError,
			});
			return;
		}
		if (validationError) {
			toast.error("Validation error", {
				description:
					validationError.departmentDescription ||
					validationError.departmentName,
			});
			return;
		}

		toast.success("Department updated successfully.");
		queryClient.invalidateQueries({
			queryKey: ["departments"],
		});
		onClose();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("space-y-4", className)}
			>
				<FormField
					control={form.control}
					name="departmentName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Department Name</FormLabel>
							<FormControl>
								<Input placeholder="IT" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="departmentDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Department Description</FormLabel>
							<FormControl>
								<Input placeholder="Information Technology" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="personInCharge"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Person in Charge</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue
											placeholder="Select a person in charge"
											className="mx-auto"
										/>
									</SelectTrigger>
									<SelectContent>
										<ScrollArea className="max-h-[195px] w-full">
											<SelectGroup>
												<SelectLabel>Managers</SelectLabel>
												<SelectSeparator />
												{organizationManagers?.map((manager) => (
													<SelectItem
														key={manager.id}
														value={manager.id}
														className=" cursor-pointer"
													>
														<div className="w-full flex items-center gap-2">
															<Avatar className="h-6 w-6">
																<AvatarImage
																	src={manager.avatar_url ?? undefined}
																/>
																<AvatarFallback className="text-xs">
																	{manager.first_name
																		? manager.first_name[0]
																		: ""}
																	{manager.last_name
																		? manager.last_name[0]
																		: ""}
																</AvatarFallback>
															</Avatar>
															<span>
																{manager.first_name} {manager.last_name}{" "}
																{manager.id === user?.id ? "( Me )" : ""}
															</span>
														</div>
													</SelectItem>
												))}
											</SelectGroup>
										</ScrollArea>
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-end gap-2 w-full">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting && (
							<Loader className="h-4 w-4 mr-2 animate-spin" />
						)}
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
}
