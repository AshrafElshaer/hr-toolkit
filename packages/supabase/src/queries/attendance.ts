import { AttendanceStatusEnum, type SupabaseClient } from "../types";

export async function getCurrentAttendanceByUserId(
  supabase: SupabaseClient,
  userId: string,
) {
  return supabase
    .from("attendances")
    .select("*")
    .eq("user_id", userId)
    .eq("status", AttendanceStatusEnum.clocked_in)
    .single();
}


