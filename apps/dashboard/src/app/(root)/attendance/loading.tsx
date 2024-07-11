import Main from "@/components/main";
import AttendanceFilter from "../employees/[organizationId]/[employeeId]/attendance/_components/attendance-filter";
export default function AttendanceLoading() {
	return (
		<Main className="flex justify-end" maxHeight>
			<AttendanceFilter />
		</Main>
	);
}
