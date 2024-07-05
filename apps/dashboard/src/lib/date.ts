import { format } from "date-fns";
import type { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";

export function amPm(time: string) {
  const [hours, minutes] = time.split(":");
  const hoursInt = Number(hours);
  const amPm = hoursInt >= 12 ? "PM" : "AM";
  const hours12 = hoursInt % 12 || 12;
  return `${hours12}:${minutes} ${amPm}`;
}

export function handleDateSearch(
  date: DateRange,
  searchParams: URLSearchParams,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  prefix?: string,
) {
  const params = new URLSearchParams(searchParams);
  const fromKey = prefix ? `${prefix}-from` : "from";
  const toKey = prefix ? `${prefix}-to` : "to";

  if (date) {
    params.set(fromKey, format(new Date(date.from ?? ""), "yyyy-MM-dd") ?? "");
    if (date.to) {
      params.set(toKey, format(new Date(date.to ?? ""), "yyyy-MM-dd") ?? "");
    }
  } else {
    params.delete(fromKey);
    params.delete(toKey);
  }

  router.replace(`${pathname}?${params.toString()}`);
}


export function getHoursFromMinutes(minutes: number) {
	return (minutes / 60).toFixed(2);
}
