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

export function OwnerOnboarding() {
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
					className="flex-grow grid place-content-center w-full  p-4"
				>
					<TextGenerateEffect
						words="Awesome! your organization is ready . Next, we need more information about you."
						className="w-full "
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
					<OwnerForm />
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
import { createOrganizationOwnerAction } from "../actions";
import { CircleDollarSign, Clock, Loader } from "lucide-react";
import { createUserSchema } from "@/lib/validations/users";
import { DateOfBirthPicker } from "@hr-toolkit/ui/date-of-birth-picker";
import { subYears } from "date-fns";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";

const formSchema = createUserSchema.omit({
	department_id: true,
	organization_id: true,
});

export function OwnerForm() {
	const router = useRouter();
	const session = useSession();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			first_name: "",
			last_name: "",
			avatar_url: null,
			phone_number: "",
			date_of_birth: new Date(subYears(new Date(), 18)).toISOString(),
			employment_status: "active",
			employment_type: "full_time",
			gender: "male",
			hire_date: new Date().toISOString(),
			leave_date: null,
			job_title: "CEO",
			salary_per_hour: 0,
			work_hours_per_week: 40,
			address_1: "",
			address_2: null,
			city: "",
			state: "",
			zip_code: "",
			country: "US",
			user_role: "admin",
		},
	});

	useEffect(() => {
		if (session) {
			form.setValue("email", session.user.email as string);
		}
	}, [session, form.setValue]);

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const result = await createOrganizationOwnerAction(data);
		if (result?.serverError) {
			toast.error(result.serverError, {
				position: "top-center",
			});
			return;
		}
		if (!result?.serverError && !result?.validationErrors) {
			router.push("/onboarding/congrats");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="full space-y-4">
				<h3 className="text-lg font-semibold text-center text-muted-foreground">
					Personal Information
				</h3>
				<div className="w-full flex gap-4">
					<FormField
						control={form.control}
						name="first_name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="last_name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full flex gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input placeholder="example@domain.com" disabled {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Gender</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full flex gap-4">
					<FormField
						control={form.control}
						name="date_of_birth"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Date of Birth</FormLabel>

								<DateOfBirthPicker
									date={new Date(field.value)}
									onSelect={(value) => {
										field.onChange(value?.toISOString() || "");
									}}
									className="w-full"
									toDate={new Date(subYears(new Date(), 18))}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone_number"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<PhoneInputSimple
										onChange={(value: RPNInput.Value) => {
											field.onChange(value);
										}}
										value={field.value as RPNInput.Value}
										defaultCountry={form.watch("country") as RPNInput.Country}
										disabled={!form.getValues().country}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full flex gap-4">
					<FormField
						control={form.control}
						name="work_hours_per_week"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Work Hours / Week</FormLabel>
								<FormControl>
									<Input
										placeholder="40"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
										value={
											Number.isNaN(field.value) ? "" : field.value.toString()
										}
										startIcon={Clock}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="salary_per_hour"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Salary / Hour</FormLabel>
								<FormControl>
									<Input
										placeholder="100"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
										value={
											field.value && Number.isNaN(field.value)
												? ""
												: field?.value?.toString() ?? ""
										}
										startIcon={CircleDollarSign}
									/>
								</FormControl>
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
								<Input placeholder="123 Main St" {...field} />
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

				<div className="w-full flex gap-4">
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder="New York" {...field} />
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
									<Input placeholder="NY" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full flex gap-4">
					<FormField
						control={form.control}
						name="zip_code"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Zip Code</FormLabel>
								<FormControl>
									<Input placeholder="10001" {...field} />
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
