export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_1: string
          address_2: string | null
          city: string
          country: string
          created_at: string | null
          id: string
          organization_id: string
          state: string
          updated_at: string | null
          user_id: string
          zip_code: string
        }
        Insert: {
          address_1: string
          address_2?: string | null
          city: string
          country: string
          created_at?: string | null
          id?: string
          organization_id: string
          state: string
          updated_at?: string | null
          user_id: string
          zip_code: string
        }
        Update: {
          address_1?: string
          address_2?: string | null
          city?: string
          country?: string
          created_at?: string | null
          id?: string
          organization_id?: string
          state?: string
          updated_at?: string | null
          user_id?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      attendances: {
        Row: {
          break_end: string | null
          break_start: string | null
          clock_in: string
          clock_out: string | null
          created_at: string | null
          date: string
          department_id: string
          id: string
          organization_id: string
          payroll_id: string | null
          status: Database["public"]["Enums"]["attendance_status_enum"] | null
          total_worked: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          clock_in?: string
          clock_out?: string | null
          created_at?: string | null
          date: string
          department_id: string
          id?: string
          organization_id: string
          payroll_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status_enum"] | null
          total_worked?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          clock_in?: string
          clock_out?: string | null
          created_at?: string | null
          date?: string
          department_id?: string
          id?: string
          organization_id?: string
          payroll_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status_enum"] | null
          total_worked?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendances_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description: string
          employees_count: number
          id: string
          manager_id: string | null
          name: string
          organization_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          employees_count?: number
          id?: string
          manager_id?: string | null
          name: string
          organization_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          employees_count?: number
          id?: string
          manager_id?: string | null
          name?: string
          organization_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          organization_id: string
          phone_number: string
          relation: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          organization_id: string
          phone_number: string
          relation: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          organization_id?: string
          phone_number?: string
          relation?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          date: string
          department_id: string | null
          description: string
          end_time: string
          id: string
          location: string
          name: string
          organization_id: string
          organizer_id: string
          start_time: string
          type: Database["public"]["Enums"]["event_type_enum"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          department_id?: string | null
          description: string
          end_time: string
          id?: string
          location: string
          name: string
          organization_id: string
          organizer_id: string
          start_time: string
          type?: Database["public"]["Enums"]["event_type_enum"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          department_id?: string | null
          description?: string
          end_time?: string
          id?: string
          location?: string
          name?: string
          organization_id?: string
          organizer_id?: string
          start_time?: string
          type?: Database["public"]["Enums"]["event_type_enum"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_completed: boolean
          tag: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean
          tag: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean
          tag?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address_1: string
          address_2: string | null
          city: string
          contact_email: string
          contact_name: string
          contact_number: string
          country: string
          created_at: string
          employees_count: number
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          payroll_pattern: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day: number
          state: string
          time_zone: string
          type: Database["public"]["Enums"]["organization_type_enum"]
          updated_at: string
          website: string | null
          zip_code: string
        }
        Insert: {
          address_1: string
          address_2?: string | null
          city: string
          contact_email: string
          contact_name: string
          contact_number: string
          country: string
          created_at?: string
          employees_count?: number
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          payroll_pattern: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day: number
          state: string
          time_zone: string
          type: Database["public"]["Enums"]["organization_type_enum"]
          updated_at?: string
          website?: string | null
          zip_code: string
        }
        Update: {
          address_1?: string
          address_2?: string | null
          city?: string
          contact_email?: string
          contact_name?: string
          contact_number?: string
          country?: string
          created_at?: string
          employees_count?: number
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          payroll_pattern?: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day?: number
          state?: string
          time_zone?: string
          type?: Database["public"]["Enums"]["organization_type_enum"]
          updated_at?: string
          website?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payrolls: {
        Row: {
          bonuses: number
          created_at: string | null
          deductions: number
          department_id: string
          gross_pay: number
          hours_worked: number
          id: string
          net_pay: number
          organization_id: string
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          status: Database["public"]["Enums"]["payroll_status_enum"]
          taxes: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bonuses: number
          created_at?: string | null
          deductions: number
          department_id: string
          gross_pay: number
          hours_worked: number
          id?: string
          net_pay: number
          organization_id: string
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          status?: Database["public"]["Enums"]["payroll_status_enum"]
          taxes: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bonuses?: number
          created_at?: string | null
          deductions?: number
          department_id?: string
          gross_pay?: number
          hours_worked?: number
          id?: string
          net_pay?: number
          organization_id?: string
          pay_date?: string
          pay_period_end?: string
          pay_period_start?: string
          status?: Database["public"]["Enums"]["payroll_status_enum"]
          taxes?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payrolls_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payrolls_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payrolls_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team: {
        Row: {
          created_at: string | null
          department_id: string | null
          organization_id: string
          project_id: string
          team_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          organization_id: string
          project_id: string
          team_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          organization_id?: string
          project_id?: string
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          department_id: string
          description: string
          id: string
          name: string
          organization_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id: string
          description: string
          id?: string
          name: string
          organization_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string
          description?: string
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          comment: string
          created_at: string | null
          task_id: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string | null
          task_id: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string | null
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string
          created_at: string | null
          description: string
          due_date: string
          id: string
          name: string
          organization_id: string
          priority: Database["public"]["Enums"]["task_priority"]
          project_id: string
          status: Database["public"]["Enums"]["task_status"]
          updated_at: string | null
        }
        Insert: {
          assigned_to: string
          created_at?: string | null
          description: string
          due_date: string
          id?: string
          name: string
          organization_id: string
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id: string
          status?: Database["public"]["Enums"]["task_status"]
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string
          created_at?: string | null
          description?: string
          due_date?: string
          id?: string
          name?: string
          organization_id?: string
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string
          status?: Database["public"]["Enums"]["task_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          department_id: string
          organization_id: string
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department_id: string
          organization_id: string
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department_id?: string
          organization_id?: string
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          department_id: string
          description: string
          id: string
          leader_id: string
          name: string
          organization_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id: string
          description: string
          id?: string
          leader_id: string
          name: string
          organization_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string
          description?: string
          id?: string
          leader_id?: string
          name?: string
          organization_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      time_offs: {
        Row: {
          created_at: string | null
          department_id: string
          end_date: string
          id: string
          organization_id: string
          reason: string | null
          start_date: string
          status: Database["public"]["Enums"]["time_off_status_enum"]
          type: Database["public"]["Enums"]["time_off_type_enum"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department_id: string
          end_date: string
          id?: string
          organization_id: string
          reason?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["time_off_status_enum"]
          type?: Database["public"]["Enums"]["time_off_type_enum"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department_id?: string
          end_date?: string
          id?: string
          organization_id?: string
          reason?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["time_off_status_enum"]
          type?: Database["public"]["Enums"]["time_off_type_enum"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_offs_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_offs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_offs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string | null
          date_of_birth: string
          department_id: string | null
          email: string
          employment_status:
            | Database["public"]["Enums"]["employment_status_enum"]
            | null
          employment_type:
            | Database["public"]["Enums"]["employment_type_enum"]
            | null
          first_name: string
          gender: string
          hire_date: string
          id: string
          job_title: string
          last_name: string
          leave_date: string | null
          organization_id: string | null
          phone_number: string
          salary_per_hour: number | null
          updated_at: string | null
          user_role: Database["public"]["Enums"]["user_roles_enum"] | null
          work_hours_per_week: number | null
        }
        Insert: {
          avatar_url?: string
          created_at?: string | null
          date_of_birth?: string
          department_id?: string | null
          email: string
          employment_status?:
            | Database["public"]["Enums"]["employment_status_enum"]
            | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type_enum"]
            | null
          first_name?: string
          gender?: string
          hire_date?: string
          id: string
          job_title?: string
          last_name?: string
          leave_date?: string | null
          organization_id?: string | null
          phone_number?: string
          salary_per_hour?: number | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_roles_enum"] | null
          work_hours_per_week?: number | null
        }
        Update: {
          avatar_url?: string
          created_at?: string | null
          date_of_birth?: string
          department_id?: string | null
          email?: string
          employment_status?:
            | Database["public"]["Enums"]["employment_status_enum"]
            | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type_enum"]
            | null
          first_name?: string
          gender?: string
          hire_date?: string
          id?: string
          job_title?: string
          last_name?: string
          leave_date?: string | null
          organization_id?: string | null
          phone_number?: string
          salary_per_hour?: number | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_roles_enum"] | null
          work_hours_per_week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_team_leader_id: {
        Args: {
          team_id: string
        }
        Returns: string
      }
      get_user_department_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_organization_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_roles_enum"]
      }
      is_user_project_member: {
        Args: {
          project_id: string
        }
        Returns: boolean
      }
      is_user_team_leader: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_user_team_member: {
        Args: {
          team_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      attendance_status_enum:
        | "clocked_in"
        | "pending"
        | "clocked_out"
        | "approved"
        | "rejected"
      employment_status_enum: "active" | "on_hold" | "terminated"
      employment_type_enum: "full_time" | "part_time" | "contractor"
      event_type_enum:
        | "meeting"
        | "conference"
        | "seminar"
        | "workshop"
        | "webinar"
        | "training"
        | "social"
        | "other"
      organization_type_enum: "public" | "private" | "non-profit"
      payroll_pattern_enum: "weekly" | "biweekly" | "monthly"
      payroll_status_enum: "pending" | "paid" | "failed"
      task_priority: "low" | "medium" | "high"
      task_status: "to_do" | "in_progress" | "in_review" | "completed"
      time_off_status_enum: "pending" | "approved" | "rejected"
      time_off_type_enum:
        | "vacation"
        | "sick_leave"
        | "personal_leave"
        | "maternity_leave"
        | "paternity_leave"
        | "unpaid_leave"
      user_roles_enum: "admin" | "manager" | "team_leader" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
