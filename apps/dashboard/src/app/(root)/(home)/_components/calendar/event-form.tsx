"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventsSchema } from "@/lib/validations/events";

import type { z } from "zod";
import { EventTypeEnum, type EventSelect } from "@hr-toolkit/supabase/types";
import type { ReactNode } from "react";

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@hr-toolkit/ui/dialog";

import { Button } from "@hr-toolkit/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@hr-toolkit/ui/form";
import { Input } from "@hr-toolkit/ui/input";
import { CalendarPlus } from "lucide-react";
import { MdOutlineEditCalendar } from "react-icons/md";
import moment from "moment";
import { DatePicker } from "@hr-toolkit/ui/date-picker";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@hr-toolkit/ui/select";
import { amPm } from "@/lib/date";
import { Textarea } from "@hr-toolkit/ui/textarea";
import DepartmentSelector from "@/components/selectors/department-selector";

const timesOfDay = Array.from({ length: 48 }, (_, i) => {
	const hour = String(i).padStart(2, "0");
	const minute = i % 2 === 0 ? "00" : "30";

	return `${hour}:${minute} `;
});

type Props = {
	event?: EventSelect;
	children?: ReactNode;
	isOpen?: boolean;
	setIsOpen?: (isOpen: boolean) => void;
};
export default function EventForm({
	isOpen,
	setIsOpen,
	children: trigger,
	event,
}: Props) {
	const form = useForm<z.infer<typeof eventsSchema>>({
		resolver: zodResolver(eventsSchema),
		defaultValues: {
			id: event?.id,
			organizer_id: event?.organizer_id,
			organization_id: event?.organization_id,
			department_id: event?.department_id || null,
			name: event?.name,
			description: event?.description,
			type: event?.type || "meeting",
			location: event?.location,
			start_time: event?.start_time,
			end_time: event?.end_time,
			date: event?.date || moment().toDate().toString(),
		},
	});
	const eventId = event?.id;

	function onSubmit(values: z.infer<typeof eventsSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-4 mb-6">
						{!eventId ? (
							<>
								<CalendarPlus className="size-5 " />
								New Event
							</>
						) : (
							<>
								<MdOutlineEditCalendar className="size-5 " />
								Edit Event
							</>
						)}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex flex-col sm:flex-row items-center gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Untitled" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel> Date</FormLabel>
										<FormControl>
											<DatePicker
												className="w-full"
												date={new Date(field.value)}
												mode="single"
												onSelect={(date) => {
													field.onChange(date?.toString() ?? "");
												}}
												fromDate={new Date()}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex items-center gap-4">
							<FormField
								control={form.control}
								name="start_time"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Start Time</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Event starts at" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-[200px] overflow-scroll scrollbar-muted">
												<SelectGroup>
													{timesOfDay.map((time) => (
														<SelectItem key={time} value={time}>
															{amPm(time)}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_time"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>End Time</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger disabled={!form.watch("start_time")}>
													<SelectValue placeholder="Event ends at" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-[200px] overflow-scroll scrollbar-muted">
												{timesOfDay
													.filter((time) => time > form.watch("start_time"))
													.map((time) => (
														<SelectItem key={time} value={time}>
															{amPm(time)}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Event Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="This our weekly meeting where we discuss about the the project progress "
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-4">
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Event Location</FormLabel>
										<FormControl>
											<Input placeholder="Meeting room/chat" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Event Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Event Type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(EventTypeEnum).map((type) => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="department_id"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>
										Department
										<span className="text-muted-foreground text-xs ml-2">
											{" "}
											(Optional)
										</span>
									</FormLabel>
									<FormControl>
										<DepartmentSelector
											value={field.value ?? ""}
											onChange={field.onChange}
											isOpen={isOpen}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end items-center gap-2">
							<DialogClose asChild>
								<Button variant={"outline"} type="button">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit">Save</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
