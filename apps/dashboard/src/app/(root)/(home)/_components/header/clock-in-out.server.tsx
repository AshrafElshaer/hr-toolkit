import { createServerClient } from "@/lib/supabase/server";
import ClockInOut from "./clock-in-out";
import { getCurrentAttendanceByUserId } from "@hr-toolkit/supabase/attendance-queries";

export default async function ClockInOutServer() {
	const supabase = createServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return null;

	const { data } = await getCurrentAttendanceByUserId(supabase, user.id);

	return <ClockInOut currentAttendance={data} />;
}
