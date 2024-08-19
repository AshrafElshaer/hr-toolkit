import type { SupabaseClient } from "../types";

export async function getEventsByDateRange(
  supabase: SupabaseClient,
  dateRange: { from: string; to: string },
) {
  return supabase.from("events").select(
    "*, organizer:organizer_id(*),department:department_id(*)",
  )
    .gte("date", dateRange.from)
    .lte(
      "date",
      dateRange.to,
    );
}
