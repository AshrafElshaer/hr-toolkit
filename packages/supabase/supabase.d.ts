import type { User as CustomUser } from "./src/types";

type UserSelect = CustomUser["Row"];

type CustomUserMetadata = Omit<
  UserSelect,
  "id" | "created_at" | "updated_at" | "email"
>;

declare module "@supabase/supabase-js" {
  interface UserMetadata extends CustomUserMetadata {}
}
