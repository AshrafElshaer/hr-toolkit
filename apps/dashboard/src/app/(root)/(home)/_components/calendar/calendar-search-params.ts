import moment from "moment";
import {
	createSearchParamsCache,
	parseAsInteger,
	parseAsString,
} from "nuqs/server";

export const calendarSearchParamsParser = {
	from: parseAsString.withDefault(moment().format("YYYY-MM-DD")),
	to: parseAsString.withDefault(moment().add(6, "days").format("YYYY-MM-DD")),
};

export const calendarSearchParamsCache = createSearchParamsCache(
	calendarSearchParamsParser,
);
