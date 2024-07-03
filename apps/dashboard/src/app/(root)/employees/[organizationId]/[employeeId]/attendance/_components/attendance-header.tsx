"use client";
import React from "react";
import { DatePickerWithRange } from "@hr-toolkit/ui/date-range-picker";
import type { DateRangeOption } from "@/types";
import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	subDays,
	addDays,
	format,
} from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { handleDateSearch } from "@/lib/date";

type Props = {
	name: string;
};



export default function AttendanceHeader({ name }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const from = searchParams.get("from");
	const to = searchParams.get("to");

	const [date, setDate] = React.useState<DateRange>({
		from: from
			? addDays(new Date(from), 1)
			: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
		to: to
			? addDays(new Date(to), 1)
			: from
				? undefined
				: endOfWeek(new Date(), { weekStartsOn: 1 }),
	});

	// const handleDateSearch = (date: DateRange) => {
	// 	const params = new URLSearchParams(searchParams);
	// 	if (date) {
	// 		params.set("from", format(new Date(date.from ?? ""), "yyy-MM-dd") ?? "");
	// 		if (date.to) {
	// 			params.set("to", format(new Date(date.to ?? ""), "yyyy-MM-dd") ?? "");
	// 		}
	// 	} else {
	// 		params.delete("from");
	// 		params.delete("to");
	// 	}

	// 	router.replace(`${pathname}?${params.toString()}`);
	// };
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
		title: "Last 2 Weeks",
		range: {
			from: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
			to: endOfWeek(new Date(), { weekStartsOn: 1 }),
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