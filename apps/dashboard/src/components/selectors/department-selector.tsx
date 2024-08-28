import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getDepartments } from "@hr-toolkit/supabase/departments-queries";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@hr-toolkit/ui/select";
import { Skeleton } from "@hr-toolkit/ui/skeleton";

type Props = {
	value: string;
	onChange: (value: string) => void;
	isOpen?: boolean;
};

export default function DepartmentSelector({
	onChange,
	value,
	isOpen = true,
}: Props) {
	const { data: departments, isFetching } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const supabase = createClient();

			const { data, error } = await getDepartments(supabase);
			if (error) throw new Error(error.message);

			return data;
		},
		enabled: isOpen,
	});
	return (
		<Select onValueChange={onChange} value={value}>
			{isFetching ? (
				<Skeleton className="w-full h-10" />
			) : (
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select a department" />
				</SelectTrigger>
			)}
			<SelectContent>
				{departments?.map((department) => (
					<SelectItem key={department.id} value={department.id}>
						{department.name}
						{department?.description ? ` - ${department.description}` : ""}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
