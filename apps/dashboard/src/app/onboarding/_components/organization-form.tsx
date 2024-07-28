"use client";

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
import { toast } from "sonner";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { createOrganizationSchema } from "@/lib/validations/organizations";

export function OrganizationOnboarding() {
	const [count, { startCountdown }] = useCountdown({
		countStart: 5,
		intervalMs: 1000,
	});
	useEffect(() => {
		startCountdown();
	}, [startCountdown]);

	return (
		<AnimatePresence mode="wait">
			{count !== 0 ? (
				<motion.div
					key={"welcome-message"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.4 }}
					className="flex-grow grid place-content-center p-4 w-full"
				>
					<TextGenerateEffect
						words="Welcome to HR Toolkit! We're thrilled to have you onboard. Next, we need more information to set you up for success."
						className="w-full"
					/>
				</motion.div>
			) : (
				<motion.div
					className="w-full"
					key={"onboarding-form"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.4 }}
				>
					<OrganizationForm />
				</motion.div>
			)}
		</AnimatePresence>
	);
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type * as RPNInput from "react-phone-number-input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@hr-toolkit/ui/select";
import { capitalize } from "lodash";
import { CountrySelector } from "@/components/selectors/country-selector";
import { COUNTRIES } from "@/constants/countries";
import { PhoneInputSimple } from "@/components/phone-input";
import { createOrganizationAction } from "../actions";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { currentTimezone } from "@/lib/date";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@hr-toolkit/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@hr-toolkit/ui/command";
import { cn } from "@hr-toolkit/ui/utils";
import { useRouter } from "next/navigation";

const organizationTypes = ["private", "public", "non-profit"] as const;
const timezonesOptions = Intl.supportedValuesOf("timeZone");

export function OrganizationForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof createOrganizationSchema>>({
		resolver: zodResolver(createOrganizationSchema),
		defaultValues: {
			name: "",
			type: "private",
			address_1: "",
			address_2: null,
			city: "",
			state: "",
			zip_code: "",
			country: "US",
			contact_name: "",
			contact_email: "",
			contact_number: "",
			payroll_pattern: "monthly",
			payroll_start_day: 1,
			time_zone: currentTimezone(),
			website: null,
			employees_count: 1,
			logo_url: null,
		},
	});

	async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
		const result = await createOrganizationAction(data);
		if (result?.serverError) {
			toast.error(result.serverError, {
				position: "top-center",
			});
			return;
		}

		if (!result?.serverError || !result?.validationErrors) {
			router.push("/onboarding/user");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="full space-y-4">
				<h3 className="text-lg font-semibold text-center text-muted-foreground">
					Organization Information
				</h3>
				<div className="w-full flex flex-col sm:flex-row gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Organization Name</FormLabel>
								<FormControl>
									<Input placeholder="Space X" {...field} />
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
								<FormLabel>Organization Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{organizationTypes.map((type) => (
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
				<div className="w-full flex flex-col sm:flex-row gap-4">
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Website
									<span className="text-muted-foreground"> (optional)</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="example.com"
										{...field}
										value={field.value ?? ""}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="time_zone"
						render={({ field }) => (
							<FormItem className=" w-full">
								<FormLabel>Timezone</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"w-full justify-between",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value
													? timezonesOptions.find(
															(timezone) => timezone === field.value,
														)
													: "Select a timezone"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-full p-0" align="start">
										<Command>
											<CommandInput placeholder="Search time zone..." />
											<CommandList>
												<CommandEmpty>No time zone found.</CommandEmpty>
												<CommandGroup>
													{timezonesOptions.map((timezone) => (
														<CommandItem
															value={timezone}
															key={timezone}
															onSelect={() => {
																form.setValue("time_zone", timezone);
															}}
														>
															{timezone}
															<Check
																className={cn(
																	"ml-auto h-4 w-4",
																	timezone === field.value
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<h3 className="text-lg font-semibold text-muted-foreground text-center">
					Mailing Address
				</h3>
				<FormField
					control={form.control}
					name="address_1"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Street Address</FormLabel>
							<FormControl>
								<Input placeholder="123 Main st" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address_2"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								Street Address 2
								<span className="text-muted-foreground"> (optional)</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Suit 112"
									value={field.value || ""}
									onChange={field.onChange}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="w-full flex flex-col sm:flex-row gap-4">
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder="San Francisco" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input placeholder="CA" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full flex flex-col sm:flex-row gap-4">
					<FormField
						control={form.control}
						name="zip_code"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Zip</FormLabel>
								<FormControl>
									<Input placeholder="94107" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Country</FormLabel>

								<CountrySelector
									onChange={(value: string) => {
										form.setValue("country", value);
									}}
									value={field.value as RPNInput.Country}
									options={COUNTRIES}
								/>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full flex flex-col sm:flex-row gap-4">
					<FormField
						control={form.control}
						name="contact_name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Contact Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contact_email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Contact Email</FormLabel>
								<FormControl>
									<Input placeholder="example@domain.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contact_number"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Contact Number</FormLabel>

								<PhoneInputSimple
									onChange={(value: RPNInput.Value) => {
										field.onChange(value);
									}}
									value={field.value as RPNInput.Value}
									defaultCountry={form.watch("country") as RPNInput.Country}
									placeholder="(214) 876-7876"
									disabled={!form.getValues().country}
								/>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full flex flex-col sm:flex-row gap-4">
					<FormField
						control={form.control}
						name="payroll_pattern"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Payroll Pattern</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a pattern" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="biweekly">Bi Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="payroll_start_day"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Payroll Start Day</FormLabel>
								<Select
									value={field.value.toString()}
									onValueChange={(value) => field.onChange(Number(value))}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a day" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="max-h-40 ">
										{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
											<SelectItem key={day} value={day.toString()}>
												{day}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full grid place-content-e">
					<Button
						type="submit"
						className="ml-auto"
						disabled={form.formState.isSubmitting || !form.formState.isValid}
					>
						{form.formState.isSubmitting ? (
							<Loader className="size-4 animate-spin mr-2" />
						) : null}
						Next
					</Button>
				</div>
			</form>
		</Form>
	);
}
