import Main from "@/components/main";
import AttendanceFilter from "../employees/[organizationId]/[employeeId]/attendance/_components/attendance-filter";
export default function AttendanceLoading() {
	return (
		<Main className="flex flex-col items-center justify-center" maxHeight>
			<div className="flex items-start flex-col-reverse sm:flex-row gap-4 w-full justify-between">
				<AttendanceFilter className="ml-auto" />
			</div>
		</Main>
	);
}
