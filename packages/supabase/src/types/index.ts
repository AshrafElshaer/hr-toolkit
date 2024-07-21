import type { SupabaseClient as ClientType } from "@supabase/supabase-js";
import type { createServerClient } from "@supabase/ssr";

import type { Database } from "./db";
export * from "./db";

export type SupabaseClient = ReturnType<typeof createServerClient<Database>>;

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Organization = Database["public"]["Tables"]["organizations"];

export type Addresses = Database["public"]["Tables"]["addresses"];

type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<
  ReturnType<ListFunctionReturn["list"]>
>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];

export enum AttendanceStatus {
  CLOCKED_IN = "clocked_in",
  PENDING = "pending",
  CLOCKED_OUT = "clocked_out",
  APPROVED = "approved",
  REJECTED = "rejected",
}
