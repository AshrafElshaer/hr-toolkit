"use client";
import { useState, type ReactNode } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@hr-toolkit/ui/dialog";
import type { NoteSelect } from "@hr-toolkit/supabase/types";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@hr-toolkit/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@hr-toolkit/ui/form";
import { Input } from "@hr-toolkit/ui/input";
import { Textarea } from "@hr-toolkit/ui/textarea";
import {
	createNoteAction,
	deleteNoteAction,
	updateNoteAction,
} from "../../actions";
import { toast } from "sonner";
import { Loader, Trash, Trash2 } from "lucide-react";
import { noteSchema } from "@/lib/validations/notes";
import { AnimatePresence, motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@hr-toolkit/ui/select";
import { useAction } from "next-safe-action/hooks";

type Props = {
	children?: ReactNode;
	note?: NoteSelect;
	open?: boolean;
	setOpen?: (open: boolean) => void;
};

const noteTags = [
	"Task",
	"Reminder",
	"Event",
	"Deadline",
	"Idea",
	"Follow-up",
	"Action Item",
	"Decision",
	"Discussion",
	"Note",
	"Feedback",
	"Brainstorm",
	"Review",
	"Agenda",
	"Question",
	"Issue",
	"Update",
	"Research",
	"Plan",
	"To-Do",
];

export default function NoteDialog({
	children: trigger,
	note,
	open,
	setOpen,
}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const deleteNote = useAction(deleteNoteAction, {
		onSuccess: () => {
			toast.success("Note is deleted");
			setIsOpen(false);
			setOpen?.(false);
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});
	const form = useForm<z.infer<typeof noteSchema>>({
		resolver: zodResolver(noteSchema),
		defaultValues: {
			id: note?.id || "",
			user_id: note?.user_id || "",
			title: note?.title || "",
			content: note?.content || "",
			created_at: note?.created_at || "",
			updated_at: note?.updated_at || "",
			is_completed: note?.is_completed || false,
			tag: note?.tag || "",
		},
	});

	async function createNote(values: z.infer<typeof noteSchema>) {
		const result = await createNoteAction(values);

		if (result?.serverError) {
			toast.error(result.serverError);
			return;
		}

		if (result?.data) {
			toast.success("Note created successfully!");
			form.reset();
			setIsOpen(false);
			setOpen?.(false);
		}
	}

	async function updateNote(values: z.infer<typeof noteSchema>) {
		const result = await updateNoteAction(values);
		if (result?.serverError) {
			toast.error(result.serverError);
			return;
		}

		if (result?.data) {
			toast.success("Note is saved !");
			form.reset();
			setIsOpen(false);
			setOpen?.(false);
		}
	}

	async function onSubmit(values: z.infer<typeof noteSchema>) {
		if (values.id.length === 0) {
			return await createNote(values);
		}
		return await updateNote(values);
	}

	return (
		<Dialog open={isOpen || open} onOpenChange={setOpen ? setOpen : setIsOpen}>
			<DialogTrigger asChild>{trigger ? trigger : null}</DialogTrigger>
			<DialogContent>
				{/* <DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader> */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex gap-4 items-center">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="text-muted-foreground">
											Title
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Untitled note..."
												{...field}
												autoComplete="off"
												// autoFocus={false}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tag"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="text-muted-foreground">Tag</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a tag" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="h-40">
												{noteTags.map((tag) => (
													<SelectItem key={tag} value={tag}>
														{tag}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-muted-foreground">
										Your thoughts ...
									</FormLabel>
									<FormControl>
										<Textarea
											rows={7}
											placeholder="Write what you want to remember..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-end gap-2">
							{form.getValues("id").length !== 0 ? (
								<Button
									variant="destructive"
									size="icon"
									className="mr-auto"
									type="button"
									onClick={() =>
										deleteNote.execute({
											id: form.getValues("id"),
										})
									}
									disabled={deleteNote.isExecuting}
								>
									<Trash2 size={20} />
								</Button>
							) : null}

							<DialogClose asChild>
								<Button variant="outline" onClick={() => form.reset()}>
									Cancel
								</Button>
							</DialogClose>

							<Button
								type="submit"
								disabled={form.formState.isSubmitting || deleteNote.isExecuting}
								className="transition-all"
							>
								{form.formState.isSubmitting ? (
									<Loader className="mr-2 size-4 animate-spin" />
								) : null}
								save
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
