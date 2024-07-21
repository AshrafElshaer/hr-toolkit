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
          id: string
          owner_id: string
          state: string
          zip_code: string
        }
        Insert: {
          address_1: string
          address_2?: string | null
          city: string
          country: string
          id?: string
          owner_id: string
          state: string
          zip_code: string
        }
        Update: {
          address_1?: string
          address_2?: string | null
          city?: string
          country?: string
          id?: string
          owner_id?: string
          state?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_users_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          contact_email: string
          contact_name: string
          contact_number: string
          created_at: string
          employees_count: number
          id: string
          name: string
          owner_id: string
          payroll_pattern: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day: number
          type: string
          updated_at: string
        }
        Insert: {
          contact_email: string
          contact_name: string
          contact_number: string
          created_at?: string
          employees_count?: number
          id?: string
          name: string
          owner_id: string
          payroll_pattern: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day: number
          type: string
          updated_at?: string
        }
        Update: {
          contact_email?: string
          contact_name?: string
          contact_number?: string
          created_at?: string
          employees_count?: number
          id?: string
          name?: string
          owner_id?: string
          payroll_pattern?: Database["public"]["Enums"]["payroll_pattern_enum"]
          payroll_start_day?: number
          type?: string
          updated_at?: string
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
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
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
          role: Database["public"]["Enums"]["role_enum"] | null
          salary_per_hour: number | null
          updated_at: string | null
          work_hours_per_week: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
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
          role?: Database["public"]["Enums"]["role_enum"] | null
          salary_per_hour?: number | null
          updated_at?: string | null
          work_hours_per_week?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
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
          role?: Database["public"]["Enums"]["role_enum"] | null
          salary_per_hour?: number | null
          updated_at?: string | null
          work_hours_per_week?: number | null
        }
        Relationships: [
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
      get_organization_employees_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_organization_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      employment_status_enum: "active" | "on_hold" | "terminated"
      employment_type_enum: "full_time" | "part_time" | "contractor"
      organization_type_enum: "public" | "private" | "non-profit"
      payroll_pattern_enum: "weekly" | "biweekly" | "monthly"
      role_enum:
        | "admin"
        | "department_manager"
        | "hr_manager"
        | "team- lead"
        | "staff"
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
