"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	subDays,
	addDays,
	format,
} from "date-fns";
import { handleDateSearch } from "@/lib/date";

import type { DateRangeOption } from "@/types";
import type { DateRange } from "react-day-picker";

import { DatePickerWithRange } from "@hr-toolkit/ui/date-range-picker";

export default function AttendanceFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const isMobile = useMediaQuery("only screen and (max-width : 768px)");

	const from = searchParams.get("from");
	const to = searchParams.get("to");

	const [date, setDate] = useState<DateRange>({
		from: from
			? addDays(new Date(from), 1)
			: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
		to: to
			? addDays(new Date(to), 1)
			: from
				? undefined
				: endOfWeek(new Date(), { weekStartsOn: 1 }),
	});

	return (
		<section className="flex items-center justify-end">
			<DatePickerWithRange
				className="w-fit"
				dateRangeOptions={dateRangeOptions}
				align="end"
				date={date}
				onSelect={(date) => {
					setDate(date as DateRange);
					handleDateSearch(date as DateRange, searchParams, router, pathname);
				}}
				numberOfMonths={isMobile ? 1 : 2}
			/>
		</section>
	);
}

const dateRangeOptions: DateRangeOption[] = [
	{
		title: "Today",
		range: {
			from: new Date(),
			to: new Date(),
		},
	},
	{
		title: "This Week",
		range: {
			from: startOfWeek(new Date(), { weekStartsOn: 1 }),
			to: endOfWeek(new Date(), { weekStartsOn: 1 }),
		},
	},
	{
		title: "Last Week",
		range: {
			from: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
			to: endOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
		},
	},
	{
		title: "This & Last Week",
		range: {
			from: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
			to: endOfWeek(new Date(), { weekStartsOn: 1 }),
		},
	},
	{
		title: "Last 2 Weeks",
		range: {
			from: startOfWeek(subDays(new Date(), 14), { weekStartsOn: 1 }),
			to: endOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
		},
	},
	{
		title: "This Month",
		range: {
			from: startOfMonth(new Date()),
			to: endOfMonth(new Date()),
		},
	},
	{
		title: "Last Month",
		range: {
			from: startOfMonth(subDays(new Date(), 30)),
			to: endOfMonth(subDays(new Date(), 30)),
		},
	},
];
