import type { User as CustomUser } from "@hr-toolkit/supabase/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type UserSelect = CustomUser["Row"];

type CustomUserMetadata = Omit<
  UserSelect,
  "id" | "created_at" | "updated_at" | "email"
>;

declare module "@supabase/supabase-js" {
  interface UserMetadata extends CustomUserMetadata {}
}
