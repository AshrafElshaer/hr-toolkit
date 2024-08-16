import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";

import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const supabase = createClient();
 return useQuery({
  	queryKey: ["user"],
  	queryFn: async () => {
  		const { error, user } = await getCurrentUser(supabase);
  		if (error) {
  			throw Error(error.message);
  		}
  		return user;
  	},
  });

 
}
