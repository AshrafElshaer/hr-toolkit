import {
  AttendanceStatus,
  AttendanceStatusEnum,
  type SupabaseClient,
  type UserSelect,
} from "../types";
import moment from "moment";

async function clockIn(
  supabase: SupabaseClient,
  clockedInAt: string,
  user: UserSelect,
) {
  return supabase.from("attendances").insert(
    [
      {
        user_id: user.id,
        organization_id: user.organization_id as string,
        department_id: user.department_id as string,
        date: moment(clockedInAt).format("YYYY-MM-DD"),
      },
    ],
  )
    .select("*")
    .single();
}

function startBreak(supabase: SupabaseClient, attendanceId: string) {
  const now = moment().utc().toString();

  return supabase.from("attendances").update({
    break_start: now,
  })
    .eq("id", attendanceId);
}

function endBreak(supabase: SupabaseClient, attendanceId: string) {
  const now = moment().utc().toString();
  return supabase.from("attendances").update({
    break_end: now,
  })
    .eq("id", attendanceId);
}

export async function clockOut(supabase: SupabaseClient, attendanceId: string) {
  const { data: currentAttendance } = await supabase.from("attendances").select(
    "*",
  ).eq(
    "id",
    attendanceId,
  ).single();

  if (!currentAttendance) throw new Error("Attendance is not found");
  const now = moment().utc().toString();

  const totalTime = calcClockInTime(
    currentAttendance.clock_in,
    currentAttendance.break_start,
    currentAttendance.break_end,
    now,
  );

  return await supabase
    .from("attendances")
    .update({
      clock_out: now,
      status: AttendanceStatusEnum.pending,
      total_worked: totalTime,
    })

    .eq("id", currentAttendance.id)
    .select("*")
    .single();
}

export function calcClockInTime(
  clockInAt: string,
  breakStart: string | null,
  breakEnd: string | null,
  clockOutAt?: string,
) {
  const clockInTime = new Date(clockInAt).getTime();
  const breakStartTime = breakStart ? new Date(breakStart).getTime() : 0;
  const breakEndTime = breakEnd ? new Date(breakEnd).getTime() : 0;
  const clockOutTime = clockOutAt
    ? new Date(clockOutAt).getTime()
    : new Date().getTime();

  let totalWorkTime: number;

  // If break has started but not ended, calculate up to the break start
  if (breakStart && !breakEnd) {
    totalWorkTime = breakStartTime - clockInTime;
  } else if (breakStart && breakEnd) {
    // If break has started and ended, exclude the break duration
    totalWorkTime = clockOutTime - clockInTime -
      (breakEndTime - breakStartTime);
  } else {
    // If no break, calculate time worked from clock-in to clock-out
    totalWorkTime = clockOutTime - clockInTime;
  }

  // Convert milliseconds to minutes
  const minutes = Math.floor(totalWorkTime / (1000 * 60));

  return minutes;
}

export default {
  clockIn,
  startBreak,
  endBreak,
  clockOut,
};
