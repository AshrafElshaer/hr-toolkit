import type { Database } from "./db";

export type AttendanceStatus =
  Database["public"]["Enums"]["attendance_status_enum"];

export const AttendanceStatusEnum: {
  [key in AttendanceStatus]: key;
} = {
  clocked_in: "clocked_in",
  pending: "pending",
  clocked_out: "clocked_out",
  approved: "approved",
  rejected: "rejected",
};

export type UserRoles = Database["public"]["Enums"]["user_roles_enum"];

export const UserRolesEnum: {
  [key in UserRoles]: key;
} = {
  admin: "admin",
  manager: "manager",
  staff: "staff",
  team_leader: "team_leader",
};

export type EmploymentStatus =
  Database["public"]["Enums"]["employment_status_enum"];

export const EmploymentStatusEnum: {
  [key in EmploymentStatus]: key;
} = {
  active: "active",
  terminated: "terminated",
  on_hold: "on_hold",
};

export type EmploymentType =
  Database["public"]["Enums"]["employment_type_enum"];

export const EmploymentTypeEnum: {
  [key in EmploymentType]: key;
} = {
  full_time: "full_time",
  part_time: "part_time",
  contractor: "contractor",
};

export type OrganizationType =
  Database["public"]["Enums"]["organization_type_enum"];

export const OrganizationTypeEnum: {
  [key in OrganizationType]: key;
} = {
  private: "private",
  public: "public",
  "non-profit": "non-profit",
};

export type EventType = Database["public"]["Enums"]["event_type_enum"];

export const EventTypeEnum: {
  [key in EventType]: key;
} = {
  meeting: "meeting",
  conference: "conference",
  seminar: "seminar",
  workshop: "workshop",
  webinar: "webinar",
  training: "training",
  social: "social",
  other: "other",
}


 
export type PayrollPattern =
  Database["public"]["Enums"]["payroll_pattern_enum"];

export const PayrollPatternEnum: {
  [key in PayrollPattern]: key;
} = {
  weekly: "weekly",
  biweekly: "biweekly",
  monthly: "monthly",
};

export type PayrollStatus = Database["public"]["Enums"]["payroll_status_enum"];

export const PayrollStatusEnum: {
  [key in PayrollStatus]: key;
} = {
  pending: "pending",
  failed: "failed",
  paid: "paid",
};

export type TimeOffType = Database["public"]["Enums"]["time_off_type_enum"];

export const TimeOffTypeEnum: {
  [key in TimeOffType]: key;
} = {
  vacation: "vacation",
  unpaid_leave: "unpaid_leave",
  sick_leave: "sick_leave",
  maternity_leave: "maternity_leave",
  paternity_leave: "paternity_leave",
  personal_leave: "personal_leave",
};

export type TimeOffStatus = Database["public"]["Enums"]["time_off_status_enum"];

export const TimeOffStatusEnum: {
  [key in TimeOffStatus]: key;
} = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
};

export type TaskStatus = Database["public"]["Enums"]["task_status"];

export const TaskStatusEnum: {
  [key in TaskStatus]: key;
} = {
  in_progress: "in_progress",
  completed: "completed",
  in_review: "in_review",
  to_do: "to_do",
};

export type TaskPriority = Database["public"]["Enums"]["task_priority"];

export const TaskPriorityEnum: {
  [key in TaskPriority]: key;
} = {
  low: "low",
  medium: "medium",
  high: "high",
};
