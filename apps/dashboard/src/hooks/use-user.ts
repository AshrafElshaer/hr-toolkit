import { createClient } from "@/lib/supabase/client";
import { getUser } from "@hr-toolkit/supabase/user-queries";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
	const supabase = createClient();
	const {
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { error, user } = await getUser(supabase);
			if (error) {
				throw Error(error.message);
			}
			return user;
		},
	});

	return {
		user,
		error,
		isUserLoading: isLoading,
	};
}
