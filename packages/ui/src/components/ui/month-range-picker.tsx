"use client";

import {
	endOfMonth,
	format,
	formatISO,
	isBefore,
	isSameDay,
	startOfMonth,
	subMonths,
} from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const monthsNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export type DateRange = {
	from?: string | null;
	to?: string | null;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
	date?: DateRange;
	setDate: (range?: DateRange) => void;
};

export const MonthRangeDate = ({ date, setDate }: Props) => {
	const [yearOffset, setYearOffset] = useState<number>(-1);

	const today = new Date();
	const fromDate = date?.from ? new Date(date.from) : null;
	const toDate = date?.to ? new Date(date.to) : null;

	const isMonthSelected = (month: Date) => {
		if (!fromDate || !toDate) {
			return false;
		}

		const startYearMonth = fromDate.getFullYear() * 12 + fromDate.getMonth();
		const endYearMonth = toDate.getFullYear() * 12 + toDate.getMonth();
		const currentYearMonth = month.getFullYear() * 12 + month.getMonth();

		return (
			currentYearMonth >= startYearMonth && currentYearMonth <= endYearMonth
		);
	};

	const isMonthStart = (month: Date) => {
		if (!fromDate) {
			return false;
		}

		const startYearMonth = fromDate.getFullYear() * 12 + fromDate.getMonth();
		const currentYearMonth = month.getFullYear() * 12 + month.getMonth();

		return currentYearMonth === startYearMonth;
	};

	const isMonthEnd = (month: Date) => {
		if (!toDate) {
			return false;
		}

		const endYearMonth = toDate.getFullYear() * 12 + toDate.getMonth();
		const currentYearMonth = month.getFullYear() * 12 + month.getMonth();

		return currentYearMonth === endYearMonth;
	};

	const handleMonthClick = (selectedDate: Date) => {
		if (toDate && isSameDay(endOfMonth(selectedDate), toDate)) {
			setDate({
				from: null,
				to: null,
			});

			return;
		}

		if (!date?.from || date?.to) {
			setDate({
				from: formatISO(startOfMonth(new Date(selectedDate)), {
					representation: "date",
				}),
				to: null,
			});
		} else if (fromDate && selectedDate < fromDate) {
			setDate({
				from: formatISO(startOfMonth(new Date(selectedDate)), {
					representation: "date",
				}),
				to: date?.from
					? formatISO(endOfMonth(new Date(date.from)), {
							representation: "date",
						})
					: null,
			});
		} else {
			setDate({
				to: formatISO(endOfMonth(new Date(selectedDate)), {
					representation: "date",
				}),
			});
		}
	};

	const renderMonth = (year: number, month: number) => {
		const monthStart = new Date(year, month, 1);
		const isSelected = isMonthSelected(monthStart);
		const isStart = isMonthStart(monthStart);
		const isEnd = isMonthEnd(monthStart);

		const isSelectedDate = isStart || isEnd;
		const isRange = isSelected && !isSelectedDate;
		const isDisabled = isBefore(today, subMonths(endOfMonth(monthStart), 1));

		return (
			<button
				type="button"
				key={month}
				disabled={isDisabled}
				className={cn(
					"!w-[40px] !h-[40px] m-0 pr-[60px] rounded-none mb-1.5 bg-transparent",
					isStart && toDate && "bg-secondary rounded-l-lg",
					isEnd && "bg-secondary rounded-r-lg pr-0",
					isRange && "bg-secondary",
					isDisabled && "opacity-40",
				)}
				onClick={() => handleMonthClick(monthStart)}
			>
				<div
					className={cn(
						"flex items-center justify-center !w-[40px] !h-[40px] !text-xs font-medium  border border-transparent hover:border-border rounded-lg",
						isSelectedDate && "bg-accent text-accent-foreground ",
						isSelectedDate &&
							"rounded-lg hover:bg-accent/80",
						isDisabled && "hover:border-transparent",
						isStart && "",
						isEnd && "",
					)}
				>
					<span>
						{new Intl.DateTimeFormat("en-US", { month: "short" }).format(
							monthStart,
						)}
					</span>
				</div>
			</button>
		);
	};

	const renderYear = (year: number) =>
		monthsNumber.map((month) => renderMonth(year, month));

	return (
		<>
			<div className="flex justify-between py-2 mt-2">
				<Button
					onClick={() => setYearOffset(yearOffset - 1)}
					variant="ghost"
					size="icon"
				>
					<ChevronLeft className="w-[18px]" />
				</Button>

				<Button
					onClick={() => setYearOffset(yearOffset + 1)}
					variant="ghost"
					size="icon"
				>
					<ChevronRight className="w-[18px]" />
				</Button>
			</div>

			<div className="-mt-10 text-center flex justify-between">
				<p className="ml-[76px] text-sm">{today.getFullYear() + yearOffset}</p>
				<p className="mr-[78px] text-sm">
					{today.getFullYear() + yearOffset + 1}
				</p>
			</div>

			<div className="flex mt-4 justify-between">
				<div className="grid grid-cols-3">
					{renderYear(today.getFullYear() + yearOffset)}
				</div>
				<div className="grid grid-cols-3">
					{renderYear(today.getFullYear() + yearOffset + 1)}
				</div>
			</div>
		</>
	);
};

export function MonthRangePicker({ date, setDate }: Props) {
	const disabled = false;
	const placeholder =
		date?.from && date?.to
			? `${format(new Date(date.from), "MMM d")} - ${format(
					new Date(date.to),
					"MMM d yyyy",
				)}`
			: "Select a range";

	return (
		<div className="flex space-x-4">
			<Popover>
				<PopoverTrigger asChild disabled={disabled}>
					<Button
						variant="outline"
						className="justify-start text-left font-medium space-x-2"
					>
						<span className="line-clamp-1 text-ellipsis">{placeholder}</span>
						<ChevronDown size={14} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[370px] sm:w-[450px] p-2" align="end">
					<MonthRangeDate setDate={setDate} date={date} />
				</PopoverContent>
			</Popover>
		</div>
	);
}
