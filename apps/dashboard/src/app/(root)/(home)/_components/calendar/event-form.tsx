"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventsSchema } from "@/lib/validations/events";
import { useAction } from "next-safe-action/hooks";
import { createEventAction, updateEventAction } from "../../actions";

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
import { CalendarPlus, Loader } from "lucide-react";
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
import { amPm, currentTimezone } from "@/lib/date";
import { Textarea } from "@hr-toolkit/ui/textarea";
import DepartmentSelector from "@/components/selectors/department-selector";
import { capitalize } from "lodash";
import { toast } from "sonner";

const timesOfDay = Array.from({ length: 48 }, (_, i) => {
	const hour = Math.floor(i / 2);
	const minute = i % 2 === 0 ? "00" : "30";

	return `${String(hour).padStart(2, "0")}:${minute}`;
});

type Props = {
	event?: EventSelect;
	children?: ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};
export default function EventForm({
	isOpen,
	setIsOpen,
	children: trigger,
	event,
}: Props) {
	const isNewEvent = !event?.id;
	const now = moment();
	const { execute: createEvent, isExecuting: isCreating } = useAction(
		createEventAction,
		{
			onSuccess: () => {
				toast.success("Event has been created");
				setIsOpen?.(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);
	const { execute: updateEvent, isExecuting: isUpdating } = useAction(
		updateEventAction,
		{
			onSuccess: () => {
				toast.success("Event has been updated");
				setIsOpen?.(false);
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);

	const form = useForm<z.infer<typeof eventsSchema>>({
		resolver: zodResolver(eventsSchema),
		defaultValues: {
			id: event?.id || null,
			organizer_id: event?.organizer_id || null,
			organization_id: event?.organization_id || null,
			department_id: event?.department_id || null,
			name: event?.name,
			description: event?.description,
			type: event?.type || "meeting",
			location: event?.location,
			start_time: event?.start_time,
			end_time: event?.end_time,
			date: event?.date || moment().toString(),
		},
	});

	function onSubmit(values: z.infer<typeof eventsSchema>) {
		const eventPeriod = {
			start_time: moment
				.utc(
					moment(values.date).set({
						hour: Number.parseInt(values.start_time.split(":")[0]),
						minute: Number.parseInt(values.start_time.split(":")[1]),
					}),
				)
				.format("YYYY-MM-DD HH:mm:ss"),
			end_time: moment
				.utc(
					moment(values.date).set({
						hour: Number.parseInt(values.end_time.split(":")[0]),
						minute: Number.parseInt(values.end_time.split(":")[1]),
					}),
				)
				.format("YYYY-MM-DD HH:mm:ss"),
		};

		if (isNewEvent)
			return createEvent({
				...values,
				start_time: eventPeriod.start_time,
				end_time: eventPeriod.end_time,
				date: moment(values.date).format("YYYY-MM-DD"),
			});

		return updateEvent({
			...values,
			start_time: eventPeriod.start_time,
			end_time: eventPeriod.end_time,
			date: moment(values.date).format("YYYY-MM-DD"),
		});
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-4 mb-6">
						{!isNewEvent ? (
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
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
							name="description"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel> Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="This our weekly meeting where we discuss about the the project progress "
											rows={4}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel> Date & Time</FormLabel>
										<FormControl>
											<DatePicker
												className="w-full"
												date={new Date(field.value)}
												mode="single"
												onSelect={(date) => {
													field.onChange(date?.toString() ?? new Date().toString());
												}}
												fromDate={new Date()}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="start_time"
									render={({ field }) => (
										<FormItem className="w-full">
											{/* <FormLabel>Start Time</FormLabel> */}
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Starts at" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="max-h-[200px] overflow-scroll scrollbar-hide">
													<SelectGroup>
														{timesOfDay
															.filter((time) => {
																const selectedDate = moment(
																	form.getValues("date"),
																);

																if (selectedDate.isSame(now, "day")) {
																	return moment(time, "HH:mm").isAfter(now);
																}

																return true;
															})
															.map((time) => (
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
											{/* <FormLabel>End Time</FormLabel> */}
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger disabled={!form.watch("start_time")}>
														<SelectValue placeholder="Ends at" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="max-h-[200px] w-fit overflow-scroll scrollbar-hide">
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
						</div>

						<div className="flex items-center gap-4">
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Location</FormLabel>
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
										<FormLabel>Type</FormLabel>
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
														{capitalize(type)}
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
							<Button type="submit" disabled={isCreating || isUpdating}>
								{isCreating || isUpdating ? (
									<Loader className="size-4 mr-2 animate-spin" />
								) : null}
								Save
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
