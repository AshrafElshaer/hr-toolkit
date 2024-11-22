import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database";

export type SupabaseInstance = SupabaseClient<Database>;

export * from "./database";

export type Table = Database["public"]["Tables"];

export type UserTable = Table["users"];
export type User = UserTable["Row"];

export type OrganizationTable = Table["organizations"];
export type Organization = OrganizationTable["Row"];

export type OrganizationMemberTable = Table["organization_members"];
export type OrganizationMember = OrganizationMemberTable["Row"];

export interface OrganizationMemberWithUser extends OrganizationMember {
  users: User | null;
}
