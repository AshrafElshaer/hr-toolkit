export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          candidate_id: string | null;
          created_at: string;
          id: string;
          job_id: string | null;
          organization_id: string | null;
          stage_id: string | null;
          updated_at: string;
        };
        Insert: {
          candidate_id?: string | null;
          created_at?: string;
          id?: string;
          job_id?: string | null;
          organization_id?: string | null;
          stage_id?: string | null;
          updated_at?: string;
        };
        Update: {
          candidate_id?: string | null;
          created_at?: string;
          id?: string;
          job_id?: string | null;
          organization_id?: string | null;
          stage_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey";
            columns: ["candidate_id"];
            isOneToOne: false;
            referencedRelation: "candidates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "job_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_stage_id_fkey";
            columns: ["stage_id"];
            isOneToOne: false;
            referencedRelation: "interview_stages";
            referencedColumns: ["id"];
          },
        ];
      };
      candidates: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          embedding: string | null;
          id: string;
          linkedin_url: string | null;
          name: string;
          organization_id: string | null;
          phone_number: string | null;
          resume_url: string;
          time_zone: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          embedding?: string | null;
          id?: string;
          linkedin_url?: string | null;
          name: string;
          organization_id?: string | null;
          phone_number?: string | null;
          resume_url: string;
          time_zone: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          embedding?: string | null;
          id?: string;
          linkedin_url?: string | null;
          name?: string;
          organization_id?: string | null;
          phone_number?: string | null;
          resume_url?: string;
          time_zone?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "candidates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      interview_stages: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          organization_id: string | null;
          stage_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          organization_id?: string | null;
          stage_order: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          organization_id?: string | null;
          stage_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "interview_stages_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      interviews: {
        Row: {
          application_id: string | null;
          created_at: string;
          date: string;
          embedding: string | null;
          feedback: string | null;
          id: string;
          interviewer_id: string | null;
          location: string | null;
          organization_id: string;
          status: Database["public"]["Enums"]["interview_status"];
          updated_at: string;
        };
        Insert: {
          application_id?: string | null;
          created_at?: string;
          date: string;
          embedding?: string | null;
          feedback?: string | null;
          id?: string;
          interviewer_id?: string | null;
          location?: string | null;
          organization_id: string;
          status?: Database["public"]["Enums"]["interview_status"];
          updated_at?: string;
        };
        Update: {
          application_id?: string | null;
          created_at?: string;
          date?: string;
          embedding?: string | null;
          feedback?: string | null;
          id?: string;
          interviewer_id?: string | null;
          location?: string | null;
          organization_id?: string;
          status?: Database["public"]["Enums"]["interview_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interviews_interviewer_id_fkey";
            columns: ["interviewer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interviews_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      job_posts: {
        Row: {
          content: Json;
          created_at: string;
          created_by: string | null;
          embedding: string | null;
          employment_type: Database["public"]["Enums"]["employment_type_enum"];
          experience_level: Database["public"]["Enums"]["experience_level_enum"];
          id: string;
          is_active: boolean;
          is_published: boolean;
          organization_id: string | null;
          salary_range: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          content: Json;
          created_at?: string;
          created_by?: string | null;
          embedding?: string | null;
          employment_type: Database["public"]["Enums"]["employment_type_enum"];
          experience_level: Database["public"]["Enums"]["experience_level_enum"];
          id?: string;
          is_active?: boolean;
          is_published?: boolean;
          organization_id?: string | null;
          salary_range?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: Json;
          created_at?: string;
          created_by?: string | null;
          embedding?: string | null;
          employment_type?: Database["public"]["Enums"]["employment_type_enum"];
          experience_level?: Database["public"]["Enums"]["experience_level_enum"];
          id?: string;
          is_active?: boolean;
          is_published?: boolean;
          organization_id?: string | null;
          salary_range?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_posts_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_members: {
        Row: {
          created_at: string;
          organization_id: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          organization_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          organization_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          admin_id: string | null;
          created_at: string;
          description: string;
          id: string;
          industry: string;
          location: string;
          logo_url: string;
          name: string;
          updated_at: string;
          website: string;
        };
        Insert: {
          admin_id?: string | null;
          created_at?: string;
          description: string;
          id?: string;
          industry: string;
          location: string;
          logo_url: string;
          name: string;
          updated_at?: string;
          website: string;
        };
        Update: {
          admin_id?: string | null;
          created_at?: string;
          description?: string;
          id?: string;
          industry?: string;
          location?: string;
          logo_url?: string;
          name?: string;
          updated_at?: string;
          website?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          timezone: string;
          updated_at: string;
          user_role: Database["public"]["Enums"]["user_role_enum"];
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          timezone: string;
          updated_at?: string;
          user_role?: Database["public"]["Enums"]["user_role_enum"];
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          timezone?: string;
          updated_at?: string;
          user_role?: Database["public"]["Enums"]["user_role_enum"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_organization_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["Enums"]["user_role_enum"];
      };
      is_user_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_user_member: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_user_organization_admin: {
        Args: {
          organization_id: string;
        };
        Returns: boolean;
      };
      is_user_organization_member: {
        Args: {
          organization_id: string;
        };
        Returns: boolean;
      };
      match_candidate_embeddings: {
        Args: {
          query_embedding: string;
          match_threshold: number;
          match_count: number;
        };
        Returns: {
          id: string;
          name: string;
          similarity: number;
        }[];
      };
      match_interview_embeddings: {
        Args: {
          query_embedding: string;
          match_threshold: number;
          match_count: number;
        };
        Returns: {
          id: string;
          feedback: string;
          similarity: number;
        }[];
      };
      match_job_post_embeddings: {
        Args: {
          query_embedding: string;
          match_threshold: number;
          match_count: number;
        };
        Returns: {
          id: string;
          title: string;
          similarity: number;
        }[];
      };
    };
    Enums: {
      employment_type_enum:
        | "full_time"
        | "part_time"
        | "contract"
        | "internship";
      experience_level_enum: "entry" | "mid" | "senior" | "lead" | "executive";
      interview_status: "Scheduled" | "Completed" | "Canceled";
      user_role_enum: "admin" | "member";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
