import type { SupabaseClient as ClientType } from "@supabase/supabase-js";
import type { createServerClient } from "@supabase/ssr";




import type { Database } from "./db";
export * from "./db";



// _____________________ ENUMS _____________________
export enum AttendanceStatus {
  CLOCKED_IN = "clocked_in",
  PENDING = "pending",
  CLOCKED_OUT = "clocked_out",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum UserRole {
  ADMIN = "admin",
  DEPARTMENT_MANAGER = "department_manager",
  HR_MANAGER = "hr_manager",
  TEAM_LEAD = "team_lead",
  STAFF = "staff",
}

export enum EmploymentStatus {
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  TERMINATED = "terminated",
}

export enum EmploymentType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACTOR = "contractor",
}

// _____________________ TYPES _____________________
export type SupabaseClient = ClientType<Database>;

export type User = Database["public"]["Tables"]["users"];
export type Organization = Database["public"]["Tables"]["organizations"];
export type Department = Database["public"]["Tables"]["departments"];

export type Addresses = Database["public"]["Tables"]["addresses"];

type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<
  ReturnType<ListFunctionReturn["list"]>
>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];



export type CreateAddress = Addresses["Insert"];
