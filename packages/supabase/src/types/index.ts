import type { SupabaseClient as ClientType } from "@supabase/supabase-js";
import type { Database } from "./db";
export * from "./db";
export * from "./enums";

// _____________________ TYPES _____________________
export type SupabaseClient = ClientType<Database>;

export type User = Database["public"]["Tables"]["users"];
export type UserInsert = User["Insert"];
export type UserSelect = User["Row"];
export type UserUpdate = User["Update"];

export type Organization = Database["public"]["Tables"]["organizations"];
export type OrganizationInsert = Organization["Insert"];
export type OrganizationSelect = Organization["Row"];
export type OrganizationUpdate = Organization["Update"];

export type Department = Database["public"]["Tables"]["departments"];
export type DepartmentInsert = Department["Insert"];
export type DepartmentSelect = Department["Row"];
export type DepartmentUpdate = Department["Update"];

export interface DepartmentWithManager extends DepartmentSelect {
  manager : UserSelect
}

export type Addresses = Database["public"]["Tables"]["addresses"];
export type AddressInsert = Addresses["Insert"];
export type AddressSelect = Addresses["Row"];
export type AddressUpdate = Addresses["Update"];

export type EmergencyContact =
  Database["public"]["Tables"]["emergency_contacts"];
export type EmergencyContactInsert = EmergencyContact["Insert"];
export type EmergencyContactSelect = EmergencyContact["Row"];
export type EmergencyContactUpdate = EmergencyContact["Update"];

export type Attendance = Database["public"]["Tables"]["attendances"];
export type AttendanceInsert = Attendance["Insert"];
export type AttendanceSelect = Attendance["Row"];
export type AttendanceUpdate = Attendance["Update"];

export type Payroll = Database["public"]["Tables"]["payrolls"];
export type PayrollInsert = Payroll["Insert"];
export type PayrollSelect = Payroll["Row"];
export type PayrollUpdate = Payroll["Update"];

export type TimeOff = Database["public"]["Tables"]["time_offs"];
export type TimeOffInsert = TimeOff["Insert"];
export type TimeOffSelect = TimeOff["Row"];
export type TimeOffUpdate = TimeOff["Update"];

export type Event = Database["public"]["Tables"]["events"];
export type EventInsert = Event["Insert"];
export type EventSelect = Event["Row"];
export type EventUpdate = Event["Update"];

export type Team = Database["public"]["Tables"]["teams"];
export type TeamInsert = Team["Insert"];
export type TeamSelect = Team["Row"];
export type TeamUpdate = Team["Update"];

export type Project = Database["public"]["Tables"]["projects"];
export type ProjectInsert = Project["Insert"];
export type ProjectSelect = Project["Row"];
export type ProjectUpdate = Project["Update"];

export type Task = Database["public"]["Tables"]["tasks"];
export type TaskInsert = Task["Insert"];
export type TaskSelect = Task["Row"];
export type TaskUpdate = Task["Update"];

export type TaskComment = Database["public"]["Tables"]["task_comments"];
export type TaskCommentInsert = TaskComment["Insert"];
export type TaskCommentSelect = TaskComment["Row"];
export type TaskCommentUpdate = TaskComment["Update"];

export type ProjectTeam = Database["public"]["Tables"]["project_team"];
export type ProjectTeamInsert = ProjectTeam["Insert"];
export type ProjectTeamSelect = ProjectTeam["Row"];
export type ProjectTeamUpdate = ProjectTeam["Update"];

export type TeamMember = Database["public"]["Tables"]["team_members"];
export type TeamMemberInsert = TeamMember["Insert"];
export type TeamMemberSelect = TeamMember["Row"];
export type TeamMemberUpdate = TeamMember["Update"];

export type Note = Database["public"]["Tables"]["notes"];
export type NoteInsert = Note["Insert"];
export type NoteSelect = Note["Row"];
export type NoteUpdate = Note["Update"];

type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<
  ReturnType<ListFunctionReturn["list"]>
>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];


