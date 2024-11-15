import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@toolkit/supabase/queries";
import { useSupabase } from "./use-supabase";

export function useCurrentUser() {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data, error } = await getCurrentUser(supabase);

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
