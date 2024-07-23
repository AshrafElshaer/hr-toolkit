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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
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
            foreignKeyName: "addresses_owner_id_fkey"
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
          id: string
          organization_id: string
          payroll_id: string | null
          status: Database["public"]["Enums"]["attendance_status_enum"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          clock_in: string
          clock_out?: string | null
          created_at?: string | null
          date: string
          id?: string
          organization_id: string
          payroll_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status_enum"] | null
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
          id?: string
          organization_id?: string
          payroll_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status_enum"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendances_org_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_payroll_id_fkey"
            columns: ["payroll_id"]
            isOneToOne: false
            referencedRelation: "payrolls"
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
          description: string | null
          employees_count: number
          id: string
          manager_id: string
          name: string
          organization_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          employees_count?: number
          id?: string
          manager_id: string
          name: string
          organization_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          employees_count?: number
          id?: string
          manager_id?: string
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
            foreignKeyName: "emergency_contacts_org_id_fkey"
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
          name: string
          owner_id: string | null
          payroll_pattern: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day: number
          registration_number: string
          state: string
          tax_id: string
          type: Database["public"]["Enums"]["organization_type_enum"]
          updated_at: string
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
          name: string
          owner_id?: string | null
          payroll_pattern: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day: number
          registration_number: string
          state: string
          tax_id: string
          type: Database["public"]["Enums"]["organization_type_enum"]
          updated_at?: string
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
          name?: string
          owner_id?: string | null
          payroll_pattern?: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day?: number
          registration_number?: string
          state?: string
          tax_id?: string
          type?: Database["public"]["Enums"]["organization_type_enum"]
          updated_at?: string
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
          bonuses: number | null
          created_at: string | null
          deductions: number
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
          bonuses?: number | null
          created_at?: string | null
          deductions?: number
          gross_pay?: number
          hours_worked?: number
          id?: string
          net_pay?: number
          organization_id: string
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          status?: Database["public"]["Enums"]["payroll_status_enum"]
          taxes?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bonuses?: number | null
          created_at?: string | null
          deductions?: number
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
            foreignKeyName: "payrolls_org_id_fkey"
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
      time_offs: {
        Row: {
          created_at: string | null
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
            foreignKeyName: "time_offs_org_id_fkey"
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
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          department_id: string | null
          email: string
          employment_status:
            | Database["public"]["Enums"]["employment_status_enum"]
            | null
          employment_type:
            | Database["public"]["Enums"]["employment_type_enum"]
            | null
          first_name: string | null
          gender: string | null
          hire_date: string | null
          id: string
          job_title: string | null
          last_name: string | null
          leave_date: string | null
          organization_id: string | null
          phone_number: string | null
          role: Database["public"]["Enums"]["roles_enum"] | null
          salary_per_hour: number | null
          updated_at: string | null
          work_hours_per_week: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department_id?: string | null
          email: string
          employment_status?:
            | Database["public"]["Enums"]["employment_status_enum"]
            | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type_enum"]
            | null
          first_name?: string | null
          gender?: string | null
          hire_date?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          leave_date?: string | null
          organization_id?: string | null
          phone_number?: string | null
          role?: Database["public"]["Enums"]["roles_enum"] | null
          salary_per_hour?: number | null
          updated_at?: string | null
          work_hours_per_week?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department_id?: string | null
          email?: string
          employment_status?:
            | Database["public"]["Enums"]["employment_status_enum"]
            | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type_enum"]
            | null
          first_name?: string | null
          gender?: string | null
          hire_date?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          leave_date?: string | null
          organization_id?: string | null
          phone_number?: string | null
          role?: Database["public"]["Enums"]["roles_enum"] | null
          salary_per_hour?: number | null
          updated_at?: string | null
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
      get_user_department_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_organization_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_organization_owner_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
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
      organization_type_enum: "public" | "private" | "non-profit"
      payroll_pattern_enum: "weekly" | "biweekly" | "monthly"
      payroll_status_enum: "pending" | "paid" | "failed"
      roles_enum: "admin" | "manager" | "team_leader" | "staff"
      time_off_status_enum: "pending" | "approved" | "rejected"
      time_off_type_enum:
        | "vacation"
        | "sick_leave"
        | "personal_leave"
        | "maternity_leave"
        | "paternity_leave"
        | "unpaid_leave"
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
