import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@hr-toolkit/ui/select";
import { getManagers } from "@hr-toolkit/supabase/user-queries";
import UserAvatar from "../user-avatar";
import { useUser } from "@/hooks/use-user";
import { useSupabase } from "@/hooks/use-supabase";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

type Props = {
	value: string;
	onChange: (value: string) => void;
	isOpen?: boolean;
};

export default function ManagersSelector({
	onChange,
	value,
	isOpen = true,
}: Props) {
	const supabase = useSupabase();
	const { data: currentUser } = useUser();
	const { data: managers, isFetching } = useQuery({
		queryKey: ["managers"],
		queryFn: async () => {
			const { data, error } = await getManagers(supabase);

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
		enabled: isOpen,
	});

	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select a manager" />
			</SelectTrigger>

			<SelectContent>
				{isFetching
					? Array.from({ length: 3 }).map((_, index) => (
							<div className="flex items-center gap-2" key={index.toString()}>
								<Skeleton className="w-6 h-6 rounded-full" />
								<Skeleton className="w-20 h-4" />
							</div>
						))
					: managers?.map((manager) => (
							<SelectItem key={manager.id} value={manager.id}>
								<div className="flex items-center gap-2">
									<UserAvatar
										firstName={manager.first_name}
										lastName={manager.last_name}
										url={manager.avatar_url}
										className="w-6 h-6"
										fallbackSize="text-xs"
									/>
									{manager.first_name} {manager.last_name}{" "}
									{manager.id === currentUser?.id ? "( You )" : null}
								</div>
							</SelectItem>
						))}
				{}
			</SelectContent>
		</Select>
	);
}
