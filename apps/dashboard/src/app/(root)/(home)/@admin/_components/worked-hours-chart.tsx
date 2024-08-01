"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@hr-toolkit/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@hr-toolkit/ui/chart";
import { DatePickerWithRange } from "@hr-toolkit/ui/date-range-picker";
import { addDays, endOfMonth, format, startOfMonth } from "date-fns";
import { useMediaQuery } from "usehooks-ts";
import { MonthRangePicker } from "@hr-toolkit/ui/month-range-picker";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import type { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { useRouter } from "next/navigation";
const generateChartData = (date: DateRange | undefined) => {
	if (!date) {
		return [];
	}

	const chartData = [];
	const startDate = new Date(date.from ?? "");
	const endDate = new Date(date.to ?? "");

	const currentDate = new Date(startDate);
	let worked = 30;
	const planned = 100;
	let remainingHours = planned;
	let overtime = 0;

	while (currentDate <= endDate) {
		remainingHours = planned - worked;

		if (remainingHours < 0) {
			overtime = Math.abs(remainingHours);
			remainingHours = 0;
		} else {
			overtime = 0;
		}

		chartData.push({
			date: currentDate.toISOString().split("T")[0],
			worked: worked < planned ? worked : worked - overtime,
			planned: planned,
			remainingHours: remainingHours,
			overtime: overtime,
		});

		// Increment worked by a random value for the sake of example
		worked = worked + Math.round(Math.random() * 10);

		// Increment the date by one day
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return chartData;
};

const chartConfig = {
	worked: {
		label: "Worked ",
		color: "hsl(var(--blue))",
	},
	remainingHours: {
		label: "Remaining",
		color: "hsl(var(--success))",
	},
	overtime: {
		label: "Overtime",
		color: "hsl(var(--destructive))",
	},
} satisfies ChartConfig;

export function WorkedHoursChart() {
	const router = useRouter();
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});

	const chartData = generateChartData(date);
	const totalWorkedHours = chartData.reduce(
		(acc, { worked }) => acc + worked,
		0,
	);
	const totalPlannedHours = chartData.reduce(
		(acc, { planned }) => acc + planned,
		0,
	);
	const totalOvertimeHours = chartData.reduce(
		(acc, { overtime }) => acc + overtime,
		0,
	);

	const isMobile = useMediaQuery("(max-width: 640px)");

	// biome-ignore lint/suspicious/noExplicitAny: TODO: Find Type And Fix It
	const onBarClick: CategoricalChartFunc = (data: any) => {
		const payload = data.payload;
		const date = payload.date;
		router.push(`/attendance?from=${date}&to=${date}`);
	};

	return (
		<Card className=" row-span-4 md:col-span-2 lg:md:col-span-4 flex flex-col w-full h-[355px] md:h-auto">
			<CardHeader className="flex flex-col-reverse lg:flex-row gap-2 items-start justify-between">
				<div className="flex flex-col sm:flex-row items-start md:items-center sm:gap-4">
					<CardTitle className="min-w-fit">Total Worked Hours</CardTitle>
					<CardDescription className="flex flex-wrap gap-4">
						<div className="">Planned : {totalPlannedHours} hours</div>
						<div>
							<span className="size-2.5 rounded-[2px] bg-blue mr-2" />
							Worked : {totalWorkedHours} hours
						</div>
						<div>
							<span className="size-2.5 rounded-[2px] bg-destructive mr-2" />
							Overtime : {totalOvertimeHours} hours
						</div>
					</CardDescription>
				</div>

				<DatePickerWithRange
					date={date}
					onSelect={(date) => setDate(date as DateRange | undefined)}
					numberOfMonths={isMobile ? 1 : 2}
					className="w-fit ml-auto"
					showOutsideDays={false}
					align="end"
				/>
			</CardHeader>
			<CardContent className="flex-grow">
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} horizontal={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => moment(value).format("DD MMM")}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(value) => moment(value).format("DD MMM")}
								/>
							}
						/>
						{/* <ChartLegend content={<ChartLegendContent />} /> */}
						<Bar
							dataKey="worked"
							stackId="a"
							fill="var(--color-worked)"
							radius={[8, 8, 8, 8]}
							barSize={isMobile ? 4 : 12}
							onClick={onBarClick}
						/>
						<Bar
							dataKey="remainingHours"
							stackId="a"
							fill="var(--color-remainingHours)"
							radius={[8, 8, 8, 8]}
							barSize={isMobile ? 4 : 12}
							onClick={onBarClick}
						/>
						<Bar
							dataKey="overtime"
							stackId="a"
							fill="var(--color-overtime)"
							radius={[8, 8, 8, 8]}
							barSize={isMobile ? 4 : 12}
							onClick={onBarClick}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
