import { AttendanceStatus, type SupabaseClient } from "../../types";

export async function getCurrentAttendanceByUserId(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId)
    .eq("status", AttendanceStatus.CLOCKED_IN)
    .single();

  if (error) {
    throw Error(error.message);
  }

  return data;
}

export async function getAttendanceByDate(
  supabase: SupabaseClient,
  userId: string,
  {
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  },
) {
  return await supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId)
    .neq("status", AttendanceStatus.CLOCKED_IN)
    .lte("date", endDate)
    .gte("date", startDate)
    .order("clock_in", { ascending: false });
}

export async function getAllAttendanceByDate(supabase: SupabaseClient, {
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return await supabase
    .from("attendance")
    .select("*,user:user_id(*)")
    .neq("status", AttendanceStatus.CLOCKED_IN)
    .lte("date", endDate)
    .gte("date", startDate)
    .order("clock_in", { ascending: false });
}
