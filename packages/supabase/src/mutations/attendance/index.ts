import { AttendanceStatus, type SupabaseClient } from "../../types";
import { getUser } from "../../queries/user";
import { getCurrentAttendanceByUserId } from "../../queries/attendance";
import { format } from "date-fns";

export async function clockIn(supabase: SupabaseClient, clockedInAt: string) {
  const { user, error: userError } = await getUser(supabase);


  if (!user || !user.id || !user.organization_id) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase.from("attendance").insert(
    [
      {
        user_id: user.id,
        organization_id: user.organization_id,
        clock_in: clockedInAt,
        status: "clocked_in",
        date: clockedInAt.split(" ")[0],
      },
    ],
  )
    .select("*")
    .single();

  if (error) {
    throw Error(error.message);
  }

  return data;
}

export async function clockOut(supabase: SupabaseClient, clockedOutAt: string) {
  const { user } = await getUser(supabase);

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  const currentAttendance = await getCurrentAttendanceByUserId(
    supabase,
    user.id,
  );

  if (!currentAttendance) {
    throw new Error("No attendance found");
  }

  const totalTime = getTotalWorkedTime(
    currentAttendance.clock_in,
    clockedOutAt,
  );

  const { data, error } = await supabase
    .from("attendance")
    .update({
      clock_out: clockedOutAt,
      status: AttendanceStatus.PENDING,
      total_time: totalTime,
    })
    .eq("user_id", user.id)
    .eq("status", "clocked_in")
    .select("*")
    .single();

  if (error) {
    throw Error(error.message);
  }

  return data;
}

function getTotalWorkedTime(clockIn: string, clockOut: string) {
  const diff = new Date(clockOut).getTime() - new Date(clockIn).getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  return hours * 60 + minutes; // return in minutes
}
