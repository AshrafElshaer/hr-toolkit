"use client";
import React, { useState } from "react";
import moment from "moment";
import { cn } from "@hr-toolkit/ui/utils";

import { Button } from "@hr-toolkit/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DateSelector() {
	const [currentDate, setCurrentDate] = useState(moment());
	const [dates, setDates] = useState([
		moment(currentDate).subtract(2, "day"),
		moment(currentDate).subtract(1, "day"),
		moment(currentDate),
		moment(currentDate).add(1, "day"),
		moment(currentDate).add(2, "day"),
	]);

	function nextMonth() {
		setCurrentDate((prev) => {
			setDates([
				moment(prev).add(1, "month").subtract(2, "day"),
				moment(prev).add(1, "month").subtract(1, "day"),
				moment(prev).add(1, "month"),
				moment(prev).add(1, "month").add(1, "day"),
				moment(prev).add(1, "month").add(2, "day"),
			]);
			return moment(prev).add(1, "month");
		});
	}

	function prevMonth() {
		setCurrentDate((prev) => {
			setDates([
				moment(prev).subtract(1, "month").subtract(2, "day"),
				moment(prev).subtract(1, "month").subtract(1, "day"),
				moment(prev).subtract(1, "month"),
				moment(prev).subtract(1, "month").add(1, "day"),
				moment(prev).subtract(1, "month").add(2, "day"),
			]);
			return moment(prev).subtract(1, "month");
		});
	}

	function nextDay() {
		setDates((prevState) => {
			return [
				...prevState.slice(1, dates.length),
				moment(prevState[prevState.length - 1]).add(1, "day"),
			];
		});

		setCurrentDate((date) => moment(date).add(1, "day"));
	}

	function prevDay() {
		setDates((prevState) => {
			return [
				moment(prevState[0]).subtract(1, "day"),
				...prevState.slice(0, dates.length - 1),
			];
		});

		setCurrentDate((date) => moment(date).subtract(1, "day"));
	}

	function onDateSelected(date: moment.Moment) {
		setCurrentDate(date);
		setDates([
			moment(date).subtract(2, "day"),
			moment(date).subtract(1, "day"),
			moment(date),
			moment(date).add(1, "day"),
			moment(date).add(2, "day"),
		]);
	}

	return (
		<div className="flex flex-col gap-4 p-2">
			<div className="flex items-center justify-between p-1 rounded-lg bg-secondary">
				<Button size="iconSm" onClick={prevMonth}>
					<ChevronLeft className="size-4" />
				</Button>
				<p className="font-semibold text-sm">
					{currentDate.format("MMMM YYYY")}
				</p>
				<Button size="iconSm" onClick={nextMonth}>
					<ChevronRight className="size-4" />
				</Button>
			</div>

			<div className="flex items-center justify-between gap-2 ">
				<Button
					size="icon"
					onClick={prevDay}
					variant="outline"
					className="min-w-8"
				>
					<ChevronLeft className="size-4" />
				</Button>
				<AnimatePresence mode="wait" initial={false}>
					<div className="flex  items-center  justify-between gap-1 flex-grow relative overflow-hidden">
						{dates.map((date) => {
							const formattedDate = date.format("ddd Do MMM YYYY");
							const isCurrentDate = date.isSame(currentDate, "day");
							const isPrevDate = date.isBefore(currentDate, "day");
							const isVisible = dates.includes(date);

							return (
								<motion.div
									key={formattedDate}
									layout
									className="text-sm z-10"
									initial={{
										opacity: 1,
										x: isCurrentDate ? 0 : isPrevDate ? -70 : 70,
									}}
									transition={{
										duration: 0.4,
									}}
									variants={{
										visible: { opacity: 1, x: 0 },
										hidden: {
											opacity: 1,
											x: isCurrentDate ? 0 : isPrevDate ? -70 : 70,
										},
									}}
									animate={
										isVisible ? "visible" : isPrevDate ? "hidden" : "hidden"
									}
								>
									<Button
										className={cn(
											"flex-col gap-2",
											date.isSame(currentDate, "day") &&
												"text-foreground hover:bg-transparent",
										)}
										variant={isCurrentDate ? "secondary" : "ghost"}
										onClick={() => onDateSelected(date)}
									>
										<p>{date.format("ddd")}</p>
										<p>{date.format("Do")}</p>
									</Button>
								</motion.div>
							);
						})}
					</div>
				</AnimatePresence>

				<Button
					size="icon"
					onClick={nextDay}
					variant="outline"
					className="min-w-8"
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
	);
}
